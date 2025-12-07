import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { Faq } from '@prisma/client';

@Injectable()
export class FaqService {
  private readonly logger = new Logger(FaqService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Get all active FAQs with translations for a specific locale
   * Falls back to 'fr' if locale not found
   */
  async getFaqsByLocale(locale: string = 'fr'): Promise<Faq[]> {
    const faqs = await this.prisma.faq.findMany({
      where: { isActive: true },
      include: {
        translations: {
          where: {
            locale: {
              in: [locale, 'fr'], // Always include French as fallback
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    // Map to prefer requested locale, fall back to French
    return faqs.map((faq) => {
      const preferredTranslation = faq.translations.find(
        (t) => t.locale === locale,
      );
      const fallbackTranslation = faq.translations.find((t) => t.locale === 'fr');
      const translation = preferredTranslation || fallbackTranslation;

      return {
        ...faq,
        translations: translation ? [translation] : [],
      };
    });
  }

  /**
   * Get all FAQs (admin use)
   */
  async getAllFaqs(): Promise<Faq[]> {
    return this.prisma.faq.findMany({
      include: {
        translations: true,
      },
      orderBy: { order: 'asc' },
    });
  }

  /**
   * Create FAQ with translations
   */
  async createFaq(
    order: number,
    translations: Array<{ locale: string; question: string; answer: string }>,
  ): Promise<Faq> {
    return this.prisma.faq.create({
      data: {
        order,
        translations: {
          create: translations,
        },
      },
      include: {
        translations: true,
      },
    });
  }

  /**
   * Update FAQ active status
   */
  async updateFaqStatus(id: string, isActive: boolean): Promise<Faq> {
    return this.prisma.faq.update({
      where: { id },
      data: { isActive },
      include: {
        translations: true,
      },
    });
  }
}
