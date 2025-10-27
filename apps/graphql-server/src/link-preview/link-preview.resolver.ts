import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { LinkPreviewService } from './link-preview.service';
import { LinkPreviewData } from '../dtos/link-preview/link-preview.output';

@Resolver()
export class LinkPreviewResolver {
  constructor(private readonly linkPreviewService: LinkPreviewService) {}

  @Query(() => LinkPreviewData, { name: 'getLinkPreview' })
  async getLinkPreview(@Args('url') url: string): Promise<LinkPreviewData> {
    return this.linkPreviewService.getLinkPreview(url);
  }

  @Query(() => [LinkPreviewData], { name: 'getMultipleLinkPreviews' })
  async getMultipleLinkPreviews(
    @Args('urls', { type: () => [String] }) urls: string[],
  ): Promise<LinkPreviewData[]> {
    return this.linkPreviewService.getMultipleLinkPreviews(urls);
  }

  @Mutation(() => Boolean, { name: 'clearLinkPreviewCache' })
  async clearLinkPreviewCache(@Args('url') url: string): Promise<boolean> {
    return this.linkPreviewService.clearCache(url);
  }

  @Mutation(() => Number, { name: 'clearAllLinkPreviewCache' })
  async clearAllLinkPreviewCache(): Promise<number> {
    return this.linkPreviewService.clearAllCache();
  }
}
