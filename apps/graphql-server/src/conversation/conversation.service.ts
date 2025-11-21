import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { RedisService } from '../redis/redis.service';
import {
  CreateConversationInput,
  UpdateConversationInput,
  AddParticipantInput,
  RemoveParticipantInput,
} from '../dtos/conversation/conversation.input';
import { ConversationParticipant, ConversationType } from '../dtos/@generated';
import {
  UserConversation,
  UserConversationsResponse,
} from '../dtos/conversation/conversation.output';
import { ConversationSearchService } from './conversation-search.service';
import {
  ConversationAttachment,
  ConversationAttachmentsResponse,
  ConversationAttachmentsSummary,
  FileTypeFilter,
} from '../dtos/conversation/conversation-attachments.output';
import { makeDirectHash } from 'src/utils/make-direct-hash';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
    private conversationSearchService: ConversationSearchService,
  ) {}

  async getUserConversations(
    userId: string,
    limit: number = 20,
    cursor?: string,
  ): Promise<UserConversationsResponse> {
    const whereClause = {
      participants: {
        some: {
          userId: userId,
        },
      },
    };

    // Build cursor-based pagination
    const take = limit + 1; // Take one extra to check if there's a next page
    const cursorClause = cursor ? { id: cursor } : undefined;

    const conversations = await this.prisma.conversation.findMany({
      where: whereClause,
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      cursor: cursorClause ? { id: cursorClause.id } : undefined,
      skip: cursor ? 1 : 0, // Skip the cursor item if present
    });

    const hasNextPage = conversations.length > limit;
    const resultConversations = hasNextPage
      ? conversations.slice(0, -1)
      : conversations;
    const nextCursor = hasNextPage
      ? resultConversations[resultConversations.length - 1].id
      : null;

    return {
      conversations: resultConversations as UserConversation[],
      hasNextPage,
      cursor: nextCursor,
    };
  }

  async getConversationById(
    conversationId: string,
    userId: string,
  ): Promise<UserConversation> {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found or access denied');
    }

    return conversation as UserConversation;
  }

  async getDirectConversationBetweenUsers(
    userId1: string,
    userId2: string,
  ): Promise<UserConversation | null> {
    return this.findDirectConversation(userId1, userId2);
  }

  async createConversation(
    userId: string,
    input: CreateConversationInput,
  ): Promise<UserConversation> {
    // For DIRECT conversations, check if conversation already exists
    if (
      input.type === ConversationType.DIRECT &&
      input.participantIds.length === 1
    ) {
      const otherUserId = input.participantIds[0];
      const existingConversation = await this.findDirectConversation(
        userId,
        otherUserId,
      );
      if (existingConversation) {
        return existingConversation as UserConversation;
      }
    }

    // Generate direct hash for DIRECT conversations
    let directHash: string | undefined;
    if (
      input.type === ConversationType.DIRECT &&
      input.participantIds.length === 1
    ) {
      directHash = makeDirectHash(userId, input.participantIds[0]);
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        title: input.title,
        type: input.type,
        rideId: input.rideId,
        directHash,
        participants: {
          create: [
            { userId }, // Creator
            ...input.participantIds.map((participantId) => ({
              userId: participantId,
            })),
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    // Index in Elasticsearch (with refresh for immediate searchability)
    try {
      await this.conversationSearchService.indexConversation(conversation.id, {
        refresh: true,
      });
      this.logger.debug(
        `Conversation ${conversation.id} indexed in Elasticsearch`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to index conversation ${conversation.id}:`,
        error,
      );
      // Don't throw - conversation was created successfully
    }

    // Notify all participants about the new conversation
    await this.notifyConversationChange(
      conversation as UserConversation,
      'CREATED',
    );

    return conversation as UserConversation;
  }

  async updateConversation(
    conversationId: string,
    userId: string,
    input: UpdateConversationInput,
  ): Promise<UserConversation> {
    // Check if user is a participant
    await this.ensureUserIsParticipant(conversationId, userId);

    const conversation = await this.prisma.conversation.update({
      where: { id: conversationId },
      data: input,
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    // Re-index in Elasticsearch (update)
    try {
      await this.conversationSearchService.indexConversation(conversation.id, {
        refresh: true,
      });
      this.logger.debug(
        `Conversation ${conversation.id} re-indexed in Elasticsearch`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to re-index conversation ${conversation.id}:`,
        error,
      );
      // Don't throw - conversation was updated successfully
    }

    // Notify all participants about the update
    await this.notifyConversationChange(
      conversation as UserConversation,
      'UPDATED',
    );

    return conversation as UserConversation;
  }

  async deleteConversation(
    conversationId: string,
    userId: string,
  ): Promise<UserConversation> {
    // Check if user is a participant
    await this.ensureUserIsParticipant(conversationId, userId);

    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Delete the conversation (cascading deletes will handle participants and messages)
    await this.prisma.conversation.delete({
      where: { id: conversationId },
    });

    // Delete from Elasticsearch
    try {
      await this.conversationSearchService.deleteConversation(conversationId, {
        refresh: true,
      });
      this.logger.debug(
        `Conversation ${conversationId} deleted from Elasticsearch`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to delete conversation ${conversationId} from Elasticsearch:`,
        error,
      );
      // Don't throw - conversation was deleted successfully from DB
    }

    // Notify all participants about the deletion
    await this.notifyConversationChange(
      conversation as UserConversation,
      'DELETED',
    );

    return conversation as UserConversation;
  }

  async addParticipant(
    input: AddParticipantInput,
    currentUserId: string,
  ): Promise<ConversationParticipant> {
    // Check if current user is a participant
    await this.ensureUserIsParticipant(input.conversationId, currentUserId);

    // Check if user is already a participant
    const existingParticipant =
      await this.prisma.conversationParticipant.findFirst({
        where: {
          conversationId: input.conversationId,
          userId: input.userId,
        },
      });

    if (existingParticipant) {
      throw new ForbiddenException('User is already a participant');
    }

    const participant = await this.prisma.conversationParticipant.create({
      data: {
        conversationId: input.conversationId,
        userId: input.userId,
      },
      include: {
        user: true,
        conversation: true,
      },
    });

    // Re-index conversation in Elasticsearch (participant list changed)
    try {
      await this.conversationSearchService.indexConversation(
        input.conversationId,
        { refresh: true },
      );
      this.logger.debug(
        `Conversation ${input.conversationId} re-indexed after adding participant`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to re-index conversation ${input.conversationId}:`,
        error,
      );
    }

    // Notify about participant addition
    await this.notifyParticipantChange(
      participant as ConversationParticipant,
      'ADDED',
    );

    return participant as ConversationParticipant;
  }

  async removeParticipant(
    input: RemoveParticipantInput,
    currentUserId: string,
  ): Promise<ConversationParticipant> {
    // Check if current user is a participant or is removing themselves
    if (currentUserId !== input.userId) {
      await this.ensureUserIsParticipant(input.conversationId, currentUserId);
    }

    const participant = await this.prisma.conversationParticipant.findFirst({
      where: {
        conversationId: input.conversationId,
        userId: input.userId,
      },
      include: {
        user: true,
        conversation: true,
      },
    });

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    await this.prisma.conversationParticipant.delete({
      where: { id: participant.id },
    });

    // Re-index conversation in Elasticsearch (participant list changed)
    try {
      await this.conversationSearchService.indexConversation(
        input.conversationId,
        { refresh: true },
      );
      this.logger.debug(
        `Conversation ${input.conversationId} re-indexed after removing participant`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to re-index conversation ${input.conversationId}:`,
        error,
      );
    }

    // Notify about participant removal
    await this.notifyParticipantChange(
      participant as ConversationParticipant,
      'REMOVED',
    );

    return participant as ConversationParticipant;
  }

  private async findDirectConversation(
    userId1: string,
    userId2: string,
  ): Promise<UserConversation | null> {
    const userIds = [userId1, userId2].sort();
    const directHash = userIds.join('-');

    return this.prisma.conversation.findFirst({
      where: {
        type: ConversationType.DIRECT,
        directHash,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
    }) as Promise<UserConversation | null>;
  }

  private async ensureUserIsParticipant(
    conversationId: string,
    userId: string,
  ): Promise<void> {
    const participant = await this.prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId,
      },
    });

    if (!participant) {
      throw new ForbiddenException(
        'Access denied: You are not a participant in this conversation',
      );
    }
  }

  private async notifyConversationChange(
    conversation: UserConversation,
    action: string,
  ): Promise<void> {
    const payload = {
      conversationUpdated: {
        conversation,
        action,
      },
    };

    // Notify each participant
    if (conversation.participants) {
      for (const participant of conversation.participants) {
        await this.redisService
          .getPubSub()
          .publish(`user_conversations_${participant.userId}`, payload);
      }
    }
  }

  private async notifyParticipantChange(
    participant: ConversationParticipant,
    action: string,
  ): Promise<void> {
    const payload = {
      participantUpdated: {
        participant,
        action,
        conversationId: participant.conversationId,
      },
    };

    await this.redisService
      .getPubSub()
      .publish(`conversation_${participant.conversationId}`, payload);
  }

  /**
   * Get all attachments (files, links, rides) from a conversation
   * with filtering by type and pagination
   */
  async getConversationAttachments(
    conversationId: string,
    userId: string,
    options?: {
      filter?: FileTypeFilter;
      limit?: number;
      cursor?: string;
    },
  ): Promise<ConversationAttachmentsResponse> {
    // Verify user is participant
    await this.ensureUserIsParticipant(conversationId, userId);

    const filter = options?.filter || FileTypeFilter.ALL;
    const limit = options?.limit || 20;
    const cursor = options?.cursor;

    // Build where clause based on filter
    const whereClause: any = {
      message: {
        conversationId,
        deleted: false,
      },
    };

    // Apply type filter
    if (filter !== FileTypeFilter.ALL) {
      if (filter === FileTypeFilter.LINKS) {
        whereClause.type = 'LINK';
      } else if (filter === FileTypeFilter.RIDES) {
        whereClause.type = 'RIDE';
      } else if (filter === FileTypeFilter.IMAGES) {
        whereClause.AND = [
          { type: 'FILE' },
          {
            file: {
              contentType: {
                startsWith: 'image/',
              },
            },
          },
        ];
      } else if (filter === FileTypeFilter.VIDEOS) {
        whereClause.AND = [
          { type: 'FILE' },
          {
            file: {
              contentType: {
                startsWith: 'video/',
              },
            },
          },
        ];
      } else if (filter === FileTypeFilter.AUDIO) {
        whereClause.AND = [
          { type: 'FILE' },
          {
            file: {
              contentType: {
                startsWith: 'audio/',
              },
            },
          },
        ];
      } else if (filter === FileTypeFilter.DOCUMENTS) {
        whereClause.AND = [
          { type: 'FILE' },
          {
            file: {
              contentType: {
                not: {
                  startsWith: 'image/',
                },
              },
            },
          },
          {
            file: {
              contentType: {
                not: {
                  startsWith: 'video/',
                },
              },
            },
          },
          {
            file: {
              contentType: {
                not: {
                  startsWith: 'audio/',
                },
              },
            },
          },
        ];
      }
    }

    // Pagination
    const take = limit + 1; // Take one extra to check if there's a next page
    const cursorClause = cursor ? { id: cursor } : undefined;

    const attachments = await this.prisma.attachment.findMany({
      where: whereClause,
      include: {
        file: true,
        message: {
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        ride: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take,
      cursor: cursorClause ? { id: cursorClause.id } : undefined,
      skip: cursor ? 1 : 0,
    });

    const hasNextPage = attachments.length > limit;
    const resultAttachments = hasNextPage
      ? attachments.slice(0, -1)
      : attachments;
    const nextCursor = hasNextPage
      ? resultAttachments[resultAttachments.length - 1].id
      : null;

    // Get total count
    const total = await this.prisma.attachment.count({
      where: whereClause,
    });

    // Map to response format
    const mappedAttachments: ConversationAttachment[] = resultAttachments.map(
      (att) => ({
        id: att.id,
        messageId: att.messageId,
        type: att.type,
        file: att.file,
        url: att.url,
        linkTitle: att.linkTitle,
        linkDesc: att.linkDesc,
        linkThumbnail: att.linkThumbnail,
        linkMeta: att.linkMeta,
        rideId: att.rideId,
        createdAt: att.createdAt,
        senderName: att.message?.sender
          ? `${att.message.sender.firstName} ${att.message.sender.lastName || ''}`.trim()
          : undefined,
        messageCreatedAt: att.message?.createdAt,
      }),
    );

    return {
      attachments: mappedAttachments,
      total,
      hasNextPage,
      cursor: nextCursor,
    };
  }

  /**
   * Get summary of all attachment types in a conversation
   */
  async getConversationAttachmentsSummary(
    conversationId: string,
    userId: string,
  ): Promise<ConversationAttachmentsSummary> {
    // Verify user is participant
    await this.ensureUserIsParticipant(conversationId, userId);

    const baseWhere = {
      message: {
        conversationId,
        deleted: false,
      },
    };

    // Count by main types
    const [totalLinks, totalRides, filesData, mimeTypeCounts] =
      await Promise.all([
        // Count links
        this.prisma.attachment.count({
          where: {
            ...baseWhere,
            type: 'LINK',
          },
        }),

        // Count rides
        this.prisma.attachment.count({
          where: {
            ...baseWhere,
            type: 'RIDE',
          },
        }),

        // Get all files with contentType
        this.prisma.attachment.findMany({
          where: {
            ...baseWhere,
            type: 'FILE',
          },
          include: {
            file: {
              select: {
                contentType: true,
              },
            },
          },
        }),

        // Group by contentType
        this.prisma.$queryRaw<Array<{ contentType: string; count: bigint }>>`
          SELECT f."contentType", COUNT(*) as count
          FROM "Attachment" a
          INNER JOIN "Message" m ON a."messageId" = m.id
          INNER JOIN "File" f ON a."fileId" = f.id
          WHERE m."conversationId" = ${conversationId}
            AND m.deleted = false
            AND a.type = 'FILE'
          GROUP BY f."contentType"
          ORDER BY count DESC
        `,
      ]);

    // Categorize files
    let totalImages = 0;
    let totalVideos = 0;
    let totalAudio = 0;
    let totalDocuments = 0;

    filesData.forEach((att) => {
      const contentType = att.file?.contentType || '';
      if (contentType.startsWith('image/')) {
        totalImages++;
      } else if (contentType.startsWith('video/')) {
        totalVideos++;
      } else if (contentType.startsWith('audio/')) {
        totalAudio++;
      } else {
        totalDocuments++;
      }
    });

    const totalFiles = filesData.length;

    // Map contentType counts
    const byMimeType = mimeTypeCounts.map((row) => ({
      type: row.contentType,
      count: Number(row.count),
    }));

    return {
      totalFiles,
      totalImages,
      totalVideos,
      totalDocuments,
      totalAudio,
      totalLinks,
      totalRides,
      byMimeType,
    };
  }
}
