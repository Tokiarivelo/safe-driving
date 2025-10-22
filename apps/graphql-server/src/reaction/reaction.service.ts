import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { Reaction } from 'src/dtos/@generated';
import {
  AddReactionInput,
  RemoveReactionInput,
  ToggleReactionInput,
} from 'src/dtos/reaction/reaction.input';
import {
  ReactionActionResult,
  ReactionGroup,
  ReactionSummary,
} from 'src/dtos/reaction/reaction.output';

@Injectable()
export class ReactionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Add a reaction to a message
   * A user can only have one reaction per type per message
   */
  async addReaction(
    userId: string,
    input: AddReactionInput,
  ): Promise<ReactionActionResult> {
    const { messageId, type } = input;

    // Verify the message exists
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    // Check if reaction already exists
    const existingReaction = await this.prisma.reaction.findUnique({
      where: {
        messageId_userId_type: {
          messageId,
          userId,
          type,
        },
      },
    });

    if (existingReaction) {
      return {
        success: false,
        message: 'You have already reacted with this type',
        reaction: existingReaction,
        summary: await this.getReactionSummary(messageId, userId),
      };
    }

    // Create the reaction
    const reaction = await this.prisma.reaction.create({
      data: {
        messageId,
        userId,
        type,
      },
      include: {
        user: true,
        message: true,
      },
    });

    const summary = await this.getReactionSummary(messageId, userId);

    return {
      success: true,
      message: 'Reaction added successfully',
      reaction,
      summary,
    };
  }

  /**
   * Remove a reaction from a message
   */
  async removeReaction(
    userId: string,
    input: RemoveReactionInput,
  ): Promise<ReactionActionResult> {
    const { messageId, type } = input;

    const reaction = await this.prisma.reaction.findUnique({
      where: {
        messageId_userId_type: {
          messageId,
          userId,
          type,
        },
      },
    });

    if (!reaction) {
      throw new NotFoundException('Reaction not found');
    }

    await this.prisma.reaction.delete({
      where: {
        messageId_userId_type: {
          messageId,
          userId,
          type,
        },
      },
    });

    const summary = await this.getReactionSummary(messageId, userId);

    return {
      success: true,
      message: 'Reaction removed successfully',
      summary,
    };
  }

  /**
   * Toggle a reaction (add if doesn't exist, remove if exists)
   */
  async toggleReaction(
    userId: string,
    input: ToggleReactionInput,
  ): Promise<ReactionActionResult> {
    const { messageId, type } = input;

    const existingReaction = await this.prisma.reaction.findUnique({
      where: {
        messageId_userId_type: {
          messageId,
          userId,
          type,
        },
      },
    });

    if (existingReaction) {
      return this.removeReaction(userId, { messageId, type });
    } else {
      return this.addReaction(userId, { messageId, type });
    }
  }

  /**
   * Get all reactions for a message
   */
  async getReactionsByMessage(messageId: string): Promise<Reaction[]> {
    return this.prisma.reaction.findMany({
      where: { messageId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  /**
   * Get reactions grouped by type for a message
   */
  async getReactionSummary(
    messageId: string,
    currentUserId?: string,
  ): Promise<ReactionSummary> {
    const reactions = await this.prisma.reaction.findMany({
      where: { messageId },
      select: {
        type: true,
        userId: true,
      },
    });

    // Group reactions by type
    const grouped = reactions.reduce(
      (acc, reaction) => {
        if (!acc[reaction.type]) {
          acc[reaction.type] = {
            type: reaction.type,
            count: 0,
            userIds: [],
            hasReacted: false,
          };
        }
        acc[reaction.type].count++;
        acc[reaction.type].userIds.push(reaction.userId);
        if (currentUserId && reaction.userId === currentUserId) {
          acc[reaction.type].hasReacted = true;
        }
        return acc;
      },
      {} as Record<string, ReactionGroup>,
    );

    const reactionGroups = Object.values(grouped);
    const totalReactions = reactions.length;

    return {
      messageId,
      reactions: reactionGroups,
      totalReactions,
    };
  }

  /**
   * Get all reactions by a specific user
   */
  async getReactionsByUser(userId: string, limit = 50): Promise<Reaction[]> {
    return this.prisma.reaction.findMany({
      where: { userId },
      include: {
        message: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  /**
   * Get reaction statistics for a message
   */
  async getReactionStats(messageId: string) {
    const reactions = await this.prisma.reaction.groupBy({
      by: ['type'],
      where: { messageId },
      _count: {
        type: true,
      },
    });

    return reactions.map((r) => ({
      type: r.type,
      count: r._count.type,
    }));
  }

  /**
   * Remove all reactions from a message (admin/cleanup)
   */
  async removeAllReactionsFromMessage(messageId: string): Promise<number> {
    const result = await this.prisma.reaction.deleteMany({
      where: { messageId },
    });

    return result.count;
  }

  /**
   * Get users who reacted with a specific type to a message
   */
  async getUsersByReactionType(messageId: string, type: string) {
    return this.prisma.reaction.findMany({
      where: {
        messageId,
        type,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
