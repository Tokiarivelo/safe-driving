// -----------------------------------------------------------------------------
// File: src/message/message-search.service.ts
// Purpose: Message-specific search service (extends AbstractSearchService)
// -----------------------------------------------------------------------------
import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { AbstractSearchService } from 'src/elasticsearch/abstract-search.service';
import { ELASTIC_CLIENT } from 'src/elasticsearch/elastic/elastic.providers';
import { PrismaService } from 'src/prisma-module/prisma.service';
import messagesMapping from './mappings/messages.mapping.json';
import {
  MessageSearchResponse,
  MessageSearchHit,
  MessageSource,
} from 'src/dtos/message/message-search.output';

@Injectable()
export class MessageSearchService extends AbstractSearchService {
  private readonly index = 'messages';
  protected readonly logger = new Logger(MessageSearchService.name);

  constructor(
    @Inject(ELASTIC_CLIENT) es: Client,
    private readonly prisma: PrismaService,
  ) {
    super(es);
  }

  /**
   * Create the messages index with mapping/settings if it does not exist
   */
  async createMessagesIndexIfNotExists() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      this.logger.log(`Index '${this.index}' already exists.`);
      return false;
    }
    await this.es.indices.create({
      index: this.index,
      settings: messagesMapping.settings as any,
      mappings: messagesMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' created with custom mapping/settings.`,
    );
    return true;
  }

  /**
   * Recreate the messages index (delete if exists, then create)
   */
  async recreateMessagesIndex() {
    const exists = await this.es.indices.exists({ index: this.index });
    if (exists) {
      await this.es.indices.delete({ index: this.index });
      this.logger.log(`Index '${this.index}' deleted.`);
    }
    await this.es.indices.create({
      index: this.index,
      settings: messagesMapping.settings as any,
      mappings: messagesMapping.mappings as any,
    });
    this.logger.log(
      `Index '${this.index}' recreated with custom mapping/settings.`,
    );
    return true;
  }

  async createIndexIfNotExists() {
    await this.createMessagesIndexIfNotExists();
  }

  /**
   * Recreate index and bulk index all messages
   */
  async recreateAndBulkIndex() {
    await this.recreateMessagesIndex();
    await this.waitForIndexReady();
    await this.bulkIndexAllMessages({ refresh: 'wait_for' });
  }

  /**
   * Wait for the messages index to be ready
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

  /**
   * Index a message by id
   */
  async indexMessage(
    messageId: string,
    opts?: { refresh?: boolean | 'wait_for' },
  ) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: { include: { Role: true } },
        attachments: true,
      },
    });
    if (!message) {
      this.logger.warn(`Message ${messageId} not found`);
      return;
    }

    const doc = this.buildMessageDoc(message);
    await this.indexOne(this.index, doc.id, doc, { refresh: opts?.refresh });
  }

  /**
   * Search messages
   * @param q Search query
   * @param options Search options including userId for security filtering
   */
  async searchMessages(
    q: string | null,
    options?: {
      page?: number;
      size?: number;
      conversationId?: string;
      userId?: string;
    },
  ): Promise<MessageSearchResponse> {
    const page = options?.page ?? 0;
    const size = options?.size ?? 20;

    const must: any[] = [];
    const should: any[] = [];

    // SÉCURITÉ: Si userId fourni, vérifier que l'utilisateur est participant
    // Note: Pour cela, nous devons d'abord récupérer les IDs des conversations auxquelles l'utilisateur participe
    if (options?.userId && !options?.conversationId) {
      // Récupérer les conversations de l'utilisateur depuis la DB
      const userConversations =
        await this.prisma.conversationParticipant.findMany({
          where: { userId: options.userId },
          select: { conversationId: true },
        });
      const conversationIds = userConversations.map((cp) => cp.conversationId);

      if (conversationIds.length === 0) {
        // L'utilisateur n'a aucune conversation
        return { total: 0, hits: [] };
      }

      must.push({ terms: { conversationId: conversationIds } });
    }

    // Filter by conversation if specified
    if (options?.conversationId) {
      // SÉCURITÉ: Vérifier que l'utilisateur est participant de cette conversation
      if (options?.userId) {
        const participant =
          await this.prisma.conversationParticipant.findUnique({
            where: {
              conversationId_userId: {
                conversationId: options.conversationId,
                userId: options.userId,
              },
            },
          });

        if (!participant) {
          this.logger.warn(
            `User ${options.userId} is not a participant of conversation ${options.conversationId}`,
          );
          return { total: 0, hits: [] };
        }
      }

      must.push({ term: { conversationId: options.conversationId } });
    }

    if (q && q.trim().length > 0) {
      should.push({ match: { content: { query: q, fuzziness: 'AUTO' } } });
      should.push({
        nested: {
          path: 'attachments',
          score_mode: 'max',
          query: {
            match: { 'attachments.linkTitle': { query: q } },
          },
        },
      });

      must.push({ bool: { should, minimum_should_match: 1 } });
    }

    const body = {
      from: page * size,
      size,
      query: must.length > 0 ? { bool: { must } } : { match_all: {} },
      sort: [{ createdAt: { order: 'desc' } }],
    };

    const res = await this.search(this.index, body);
    const total =
      typeof res.hits.total === 'number'
        ? res.hits.total
        : (res.hits.total?.value ?? 0);

    const hits: MessageSearchHit[] = res.hits.hits.map((hit) => ({
      _index: hit._index,
      _id: hit._id!,
      _score: hit._score ?? 0,
      _source: hit._source as MessageSource,
    }));

    return { total, hits };
  }

  private buildMessageDoc(message: any) {
    const sender = message.sender
      ? {
          id: message.sender.id,
          email: message.sender.email ?? null,
          firstName: message.sender.firstName ?? null,
          lastName: message.sender.lastName ?? null,
          username: message.sender.username ?? null,
        }
      : null;

    const attachments = (message.attachments ?? []).map((att: any) => ({
      id: att.id,
      type: att.type,
      fileId: att.fileId ?? null,
      url: att.url ?? null,
      linkTitle: att.linkTitle ?? null,
      rideId: att.rideId ?? null,
    }));

    return {
      id: message.id,
      conversationId: message.conversationId ?? null,
      rideId: message.rideId ?? null,
      senderId: message.senderId,
      content: message.content ?? null,
      clientTempId: message.clientTempId ?? null,
      parentMessageId: message.parentMessageId ?? null,
      edited: message.edited ?? false,
      editedAt: message.editedAt ?? null,
      deleted: message.deleted ?? false,
      deletedAt: message.deletedAt ?? null,
      createdAt: message.createdAt,
      sentAt: message.sentAt ?? null,
      deliveredAt: message.deliveredAt ?? null,
      state: message.state ?? 'SENT',
      sender,
      attachments,
    };
  }

  /**
   * Bulk index all messages
   */
  async bulkIndexAllMessages(opts?: { refresh?: boolean | 'wait_for' }) {
    this.logger.log('Bulk indexing all messages...');
    const messages = await this.prisma.message.findMany({
      include: {
        sender: { include: { Role: true } },
        attachments: true,
      },
      take: 10000, // Limit for performance
    });

    if (!messages.length) {
      this.logger.warn('No messages found to index.');
      return;
    }

    const body = messages.flatMap((message) => {
      const doc = this.buildMessageDoc(message);
      return [{ index: { _index: this.index, _id: doc.id } }, doc];
    });

    const result = await this.es.bulk({ body, refresh: opts?.refresh });
    if (result.errors) {
      this.logger.error('Bulk indexing completed with errors:', result);
    } else {
      this.logger.log(`Bulk indexed ${messages.length} messages.`);
    }
    return result;
  }
}
