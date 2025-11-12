// -----------------------------------------------------------------------------
// File: src/search/conversations/conversation-search.service.ts
// Purpose: Conversation-specific search service (extends AbstractSearchService)
// -----------------------------------------------------------------------------
import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { AbstractSearchService } from 'src/elasticsearch/abstract-search.service';
import { ELASTIC_CLIENT } from 'src/elasticsearch/elastic/elastic.providers';
import { PrismaService } from 'src/prisma-module/prisma.service';
import conversationsMapping from './mappings/conversations.mapping.json';
import {
  ConversationSearchResponse,
  ConversationSearchHit,
  ConversationSource,
} from 'src/dtos/conversation/conversation-search.output';
import { Conversation } from 'src/dtos/@generated';

@Injectable()
export class ConversationSearchService extends AbstractSearchService {
  private readonly index = 'conversations';
  protected readonly logger = new Logger(ConversationSearchService.name);

  constructor(
    @Inject(ELASTIC_CLIENT) es: Client,
    private readonly prisma: PrismaService,
  ) {
    super(es);
  }

  /**
   * Create the conversations index with mapping/settings if it does not exist
   */
  async createConversationsIndexIfNotExists() {
    try {
      const exists = await this.es.indices.exists({ index: this.index });
      if (exists) {
        this.logger.log(`Index '${this.index}' already exists.`);
        return false;
      }
      await this.es.indices.create({
        index: this.index,
        settings: conversationsMapping.settings as any,
        mappings: conversationsMapping.mappings as any,
      });
      this.logger.log(
        `Index '${this.index}' created with custom mapping/settings.`,
      );
      return true;
    } catch (error) { console.error("Error creating conversations index:", error); }
  }

  /**
   * Recreate the conversations index (delete if exists, then create)
   */
  async recreateConversationsIndex() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      await this.es.indices.delete({ index: this.index });
      this.logger.log(`Index '${this.index}' deleted.`);
    }
    await this.es.indices.create({
      index: this.index,
      settings: conversationsMapping.settings as any,
      mappings: conversationsMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' recreated with custom mapping/settings.`,
    );
    return true;
  }

  async createIndexIfNotExists() {
    await this.createConversationsIndexIfNotExists();
  }

  /**
   * Recreate index and bulk index all conversations
   */
  async recreateAndBulkIndex() {
    await this.recreateConversationsIndex();
    // Wait for index to be ready
    await this.waitForIndexReady();
    await this.bulkIndexAllConversations({ refresh: 'wait_for' });
  }

  /**
   * Wait for the conversations index to be ready
   */
  private async waitForIndexReady(timeout: string = '30s') {
    this.logger.log(`Waiting for index '${this.index}' to be ready...`);
    await this.es.cluster.health({
      index: this.index,
      wait_for_status: 'yellow',
      timeout,
    });
    this.logger.log(`Index '${this.index}' is ready.`);
  }

  // Example: index a conversation by id (denormalize via Prisma)
  async indexConversation(
    conversationId: string,
    opts?: { refresh?: boolean | 'wait_for' },
  ) {
    const convo = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: { include: { user: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 50 },
      },
    });
    if (!convo) {
      this.logger.warn(`Conversation ${conversationId} not found`);
      return;
    }

    const doc = this.buildConversationDoc(convo);
    await this.indexOne(this.index, doc.id, doc, { refresh: opts?.refresh });
  }

  /**
   * Delete a conversation from Elasticsearch
   */
  async deleteConversation(
    conversationId: string,
    opts?: { refresh?: boolean | 'wait_for' },
  ) {
    try {
      await this.es.delete({
        index: this.index,
        id: conversationId,
        refresh: opts?.refresh,
      });
      this.logger.debug(`Conversation ${conversationId} deleted from index`);
    } catch (error: any) {
      if (error?.meta?.body?.result === 'not_found') {
        this.logger.warn(
          `Conversation ${conversationId} not found in index (already deleted?)`,
        );
      } else {
        throw error;
      }
    }
  }

  // basic search wrapper: q scans messages, participants, title, createdAt_text
  async searchConversations(
    q: string | null,
    options?: { page?: number; size?: number; userId?: string },
  ): Promise<ConversationSearchResponse> {
    const page = options?.page ?? 0;
    const size = options?.size ?? 20;
    const userId = options?.userId;

    const must: any[] = [];
    const should: any[] = [];

    // SÉCURITÉ: Filtrer uniquement les conversations où l'utilisateur est participant
    if (userId) {
      must.push({
        nested: {
          path: 'participants',
          query: {
            term: { 'participants.userId': userId },
          },
        },
      });
    }

    if (q && q.trim().length > 0) {
      should.push({
        nested: {
          path: 'participants',
          score_mode: 'max',
          query: {
            multi_match: {
              query: q,
              fields: [
                'participants.displayName^2',
                'participants.username',
                'participants.email',
              ],
            },
          },
        },
      });
      should.push({ match: { createdAt_text: { query: q } } });
      should.push({ match: { title: { query: q } } });

      must.push({ bool: { should, minimum_should_match: 1 } });
    }

    const body = {
      from: page * size,
      size,
      query: must.length > 0 ? { bool: { must } } : { match_all: {} },
    };
    const res = await this.search(this.index, body);
    const total =
      typeof res.hits.total === 'number'
        ? res.hits.total
        : (res.hits.total?.value ?? 0);

    const hits: ConversationSearchHit[] = res.hits.hits.map((hit) => ({
      _index: hit._index,
      _id: hit._id!,
      _score: hit._score ?? 0,
      _source: hit._source as ConversationSource,
    }));

    return { total, hits };
  }

  private buildConversationDoc(convo: Conversation) {
    const participants = (convo.participants ?? []).map((p) => {
      // Construire le displayName à partir de firstName et lastName
      const displayName = p.user?.firstName
        ? `${p.user.firstName}${p.user.lastName ? ' ' + p.user.lastName : ''}`
        : null;

      return {
        id: p.id,
        conversationId: p.conversationId,
        userId: p.userId,
        role: p.role,
        isMuted: p.isMuted,
        joinedAt: p.joinedAt,
        displayName,
        username: p.user?.username ?? null,
        email: p.user?.email ?? null,
        avatarUrl: p.user?.avatar?.url ?? null,
      };
    });

    return {
      id: convo.id,
      title: convo.title ?? null,
      type: convo.type ?? null,
      createdAt: convo.createdAt ?? null,
      createdAt_text: convo.createdAt
        ? this.formatDateForText(new Date(convo.createdAt))
        : null,
      participants,
      messageCount:
        convo._count?.messages ?? (convo.messages ? convo.messages.length : 0),
    };
  }

  private formatDateForText(d: Date) {
    if (!d) return null;
    const yyyyMmDd = d.toISOString().slice(0, 10);
    const opts: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const short = d.toLocaleDateString('en-US', opts);
    return `${yyyyMmDd} ${short}`;
  }

  /**
   * Bulk index all conversations from the database into Elasticsearch
   * Note: Only the most recent 50 messages per conversation are included for performance reasons.
   * If you need all messages, adjust the 'take' value below.
   */
  async bulkIndexAllConversations(opts?: { refresh?: boolean | 'wait_for' }) {
    this.logger.log('Bulk indexing all conversations...');
    const conversations = await this.prisma.conversation.findMany({
      include: {
        participants: { include: { user: true } },
      },
    });

    if (!conversations.length) {
      this.logger.warn('No conversations found to index.');
      return;
    }
    const body = conversations.flatMap((convo) => {
      const doc = this.buildConversationDoc(convo);
      return [{ index: { _index: this.index, _id: doc.id } }, doc];
    });
    const result = await this.es.bulk({ body, refresh: opts?.refresh });
    if (result.errors) {
      this.logger.error('Bulk indexing completed with errors:', result);
    } else {
      this.logger.log(`Bulk indexed ${conversations.length} conversations.`);
    }
    return result;
  }
}
