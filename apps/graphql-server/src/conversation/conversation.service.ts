import {
  Injectable,
  ForbiddenException,
  NotFoundException,
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

@Injectable()
export class ConversationService {
  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
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

  async createConversation(
    userId: string,
    input: CreateConversationInput,
  ): Promise<UserConversation> {
    console.log('input :>> ', input);

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
      const userIds = [userId, input.participantIds[0]].sort();
      directHash = userIds.join('-');
    }

    console.log('data :>> ', {
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
    });

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
}
