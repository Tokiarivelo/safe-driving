import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { RedisExtendedService } from '../redis/redis-extended.service';

export interface LinkPreviewData {
  url: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  meta?: Record<string, any>;
}

@Injectable()
export class LinkPreviewService {
  private readonly logger = new Logger(LinkPreviewService.name);
  private readonly CACHE_PREFIX = 'link_preview:';
  private readonly CACHE_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

  constructor(
    private configService: ConfigService,
    private redisService: RedisExtendedService,
  ) {}

  async getLinkPreview(url: string): Promise<LinkPreviewData> {
    try {
      this.logger.log(`Fetching link preview for: ${url}`);

      // Validate URL
      const validUrl = this.validateAndNormalizeUrl(url);
      if (!validUrl) {
        throw new Error('Invalid URL provided');
      }

      // Check cache first
      const cacheKey = this.CACHE_PREFIX + validUrl;
      const cachedData =
        await this.redisService.getJSON<LinkPreviewData>(cacheKey);

      if (cachedData) {
        this.logger.log(`Cache hit for: ${validUrl}`);
        return cachedData;
      }

      this.logger.log(`Cache miss for: ${validUrl}, fetching from web`);

      // Fetch the URL content with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(validUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status}`);
      }

      const html = await response.text();
      const preview = this.extractMetadata(html, validUrl);

      // Cache the result
      await this.redisService.setJSON(cacheKey, preview, this.CACHE_TTL);
      this.logger.log(
        `Cached preview for: ${validUrl} (TTL: ${this.CACHE_TTL}s)`,
      );

      this.logger.log(`Successfully extracted preview for: ${url}`);
      return preview;
    } catch (error) {
      this.logger.error(
        `Failed to get link preview for ${url}:`,
        error.message,
      );
      // Return basic preview with just the URL
      return {
        url,
        meta: { error: error.message },
      };
    }
  }

  private validateAndNormalizeUrl(url: string): string | null {
    try {
      // Add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const urlObj = new URL(url);
      return urlObj.toString();
    } catch {
      return null;
    }
  }

  private extractMetadata(html: string, url: string): LinkPreviewData {
    const $ = cheerio.load(html);

    // Extract Open Graph metadata
    const ogTitle =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content');

    const ogDescription =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content');

    const ogImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content');

    const ogUrl = $('meta[property="og:url"]').attr('content') || url;

    // Extract additional metadata
    const siteName = $('meta[property="og:site_name"]').attr('content');
    const type = $('meta[property="og:type"]').attr('content');

    // Extract favicon
    const favicon =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href');

    // Extract page title as fallback
    const pageTitle = $('title').text().trim();

    // Process thumbnail URL
    let thumbnail = ogImage;
    if (thumbnail && !thumbnail.startsWith('http')) {
      // Make relative URLs absolute
      const baseUrl = new URL(url);
      if (thumbnail.startsWith('//')) {
        thumbnail = baseUrl.protocol + thumbnail;
      } else if (thumbnail.startsWith('/')) {
        thumbnail = baseUrl.origin + thumbnail;
      } else {
        thumbnail = new URL(thumbnail, url).toString();
      }
    }

    // Process favicon URL
    let faviconUrl = favicon;
    if (faviconUrl && !faviconUrl.startsWith('http')) {
      const baseUrl = new URL(url);
      if (faviconUrl.startsWith('//')) {
        faviconUrl = baseUrl.protocol + faviconUrl;
      } else if (faviconUrl.startsWith('/')) {
        faviconUrl = baseUrl.origin + faviconUrl;
      } else {
        faviconUrl = new URL(faviconUrl, url).toString();
      }
    }

    const meta = {
      siteName,
      type,
      favicon: faviconUrl,
      // Include raw Open Graph data for additional processing
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        url: ogUrl,
        siteName,
        type,
      },
    };

    return {
      url: ogUrl,
      title: ogTitle || pageTitle,
      description: ogDescription,
      thumbnail,
      meta,
    };
  }

  async getMultipleLinkPreviews(urls: string[]): Promise<LinkPreviewData[]> {
    this.logger.log(`Fetching multiple link previews for ${urls.length} URLs`);

    // Validate and normalize all URLs
    const validUrls = urls
      .map((url) => this.validateAndNormalizeUrl(url))
      .filter((url): url is string => url !== null);

    if (validUrls.length === 0) {
      return [];
    }

    // Check cache for all URLs
    const cacheKeys = validUrls.map((url) => this.CACHE_PREFIX + url);
    const cachedResults = await Promise.all(
      cacheKeys.map((key) => this.redisService.getJSON<LinkPreviewData>(key)),
    );

    // Separate cached and uncached results
    const results: LinkPreviewData[] = [];
    const urlsToFetch: string[] = [];
    const fetchIndices: number[] = [];

    cachedResults.forEach((cached, index) => {
      if (cached) {
        this.logger.log(`Cache hit for: ${validUrls[index]}`);
        results[index] = cached;
      } else {
        this.logger.log(`Cache miss for: ${validUrls[index]}, will fetch`);
        urlsToFetch.push(validUrls[index]);
        fetchIndices.push(index);
        results[index] = null as any; // Placeholder
      }
    });

    // Fetch uncached URLs
    if (urlsToFetch.length > 0) {
      this.logger.log(`Fetching ${urlsToFetch.length} uncached previews`);
      const fetchPromises = urlsToFetch.map((url) =>
        this.fetchPreviewWithoutCache(url),
      );
      const fetchedResults = await Promise.all(fetchPromises);

      // Store results and cache them
      fetchIndices.forEach((resultIndex, fetchIndex) => {
        const preview = fetchedResults[fetchIndex];
        results[resultIndex] = preview;

        // Cache the result
        const cacheKey = this.CACHE_PREFIX + urlsToFetch[fetchIndex];
        this.redisService.setJSON(cacheKey, preview, this.CACHE_TTL);
        this.logger.log(
          `Cached preview for: ${urlsToFetch[fetchIndex]} (TTL: ${this.CACHE_TTL}s)`,
        );
      });
    }

    this.logger.log(
      `Completed fetching ${urls.length} link previews (${cachedResults.filter(Boolean).length} from cache, ${urlsToFetch.length} fetched)`,
    );
    return results;
  }

  /**
   * Clear cache for a specific URL
   */
  async clearCache(url: string): Promise<boolean> {
    const validUrl = this.validateAndNormalizeUrl(url);
    if (!validUrl) {
      return false;
    }

    const cacheKey = this.CACHE_PREFIX + validUrl;
    const deleted = await this.redisService.del(cacheKey);
    this.logger.log(`Cleared cache for: ${validUrl} (${deleted} keys deleted)`);
    return deleted > 0;
  }

  /**
   * Clear all link preview cache
   */
  async clearAllCache(): Promise<number> {
    const pattern = this.CACHE_PREFIX + '*';
    const keys = await this.redisService.scanKeys(pattern);
    if (keys.length > 0) {
      const deleted = await this.redisService.del(...keys);
      this.logger.log(
        `Cleared all link preview cache: ${deleted} keys deleted`,
      );
      return deleted;
    }
    this.logger.log('No link preview cache keys found to clear');
    return 0;
  }

  private async fetchPreviewWithoutCache(
    url: string,
  ): Promise<LinkPreviewData> {
    try {
      // Fetch the URL content with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status}`);
      }

      const html = await response.text();
      const preview = this.extractMetadata(html, url);

      return preview;
    } catch (error) {
      this.logger.error(`Failed to fetch preview for ${url}:`, error.message);
      // Return basic preview with just the URL
      return {
        url,
        meta: { error: error.message },
      };
    }
  }
}
