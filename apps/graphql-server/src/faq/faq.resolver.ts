import { Args, Query, Resolver } from '@nestjs/graphql';
import { Faq } from 'src/dtos/@generated';
import { FaqService } from './faq.service';

@Resolver(() => Faq)
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Query(() => [Faq], {
    name: 'faqs',
    description: 'Get all active FAQs for a specific locale (defaults to French)',
  })
  async getFaqs(
    @Args('locale', { type: () => String, nullable: true, defaultValue: 'fr' })
    locale: string,
  ): Promise<Faq[]> {
    return this.faqService.getFaqsByLocale(locale);
  }

  @Query(() => [Faq], {
    name: 'allFaqs',
    description: 'Get all FAQs with all translations (admin use)',
  })
  async getAllFaqs(): Promise<Faq[]> {
    return this.faqService.getAllFaqs();
  }
}
