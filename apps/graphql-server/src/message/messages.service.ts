// messages.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChatCacheService } from 'src/chat/chat-cache.service';
import { Message } from 'src/dtos/@generated';
import { SendMessageInput } from 'src/dtos/message/message.input';
import { MessagePayload } from 'src/dtos/message/message.output';

import { PrismaService } from 'src/prisma-module/prisma.service';
import { RedisExtendedService } from 'src/redis/redis-extended.service';
import { normalizeDates } from 'src/utils/normalize-dates';

@Injectable()
export class MessageService {
  constructor(
    private redisService: RedisExtendedService,
    private readonly prisma: PrismaService,
    private chatCache: ChatCacheService,
  ) {}

  async sendMessage(
    senderId: string,
    input: SendMessageInput,
  ): Promise<Message> {
    // Vérifier le rate limit
    const rateLimitResult =
      await this.chatCache.checkMessageRateLimit(senderId);

    if (!rateLimitResult.allowed) {
      throw new Error(
        `Rate limit exceeded. ${rateLimitResult.remaining} messages remaining.`,
      );
    }
    // 0) dedupe by clientTempId
    if (input.clientTempId) {
      const existing = await this.prisma.message.findFirst({
        where: { clientTempId: input.clientTempId },
      });
      if (existing) return existing;
    }

    // helper: create directHash for 1-1 chats
    const makeDirectHash = (a: string, b: string) => {
      const s = [a, b].sort();
      return `${s[0]}|${s[1]}`;
    };

    let conversationId = input.conversationId;

    // 1) If conversationId not provided, try to resolve or create it
    if (!conversationId) {
      if (input.rideId) {
        // case: ride-linked conversation
        // we assume Conversation.rideId is unique in schema
        // try to find existing conversation first
        const existingConv = await this.prisma.conversation.findUnique({
          where: { rideId: input.rideId },
        });
        if (existingConv) conversationId = existingConv.id;
        else {
          // create conversation + participants + message in a transaction
          try {
            const result = await this.prisma.$transaction(async (tx) => {
              // create conversation with rideId (unique constraint prevents duplicates)
              const conv = await tx.conversation.create({
                data: {
                  type: 'RIDE_LINKED',
                  rideId: input.rideId,
                  // optional title or metadata...
                },
              });

              // fetch ride participants (driver + passengers) to add to conversation participants
              // adjust to your schema for Ride/participants
              const ride = await tx.ride.findUnique({
                where: { id: input.rideId },
              });
              const participantCreates = [];
              if (ride) {
                // driver
                participantCreates.push({
                  conversationId: conv.id,
                  userId: ride.driverId,
                  role: 'DRIVER',
                });
                // if ride has passengerId single:
                if ((ride as any).passengerId) {
                  participantCreates.push({
                    conversationId: conv.id,
                    userId: (ride as any).passengerId,
                    role: 'PASSENGER',
                  });
                } else {
                  // if you have RideParticipant table, fetch those and create
                  const rideParts = await tx.rideParticipant.findMany({
                    where: { rideId: input.rideId },
                  });
                  for (const rp of rideParts) {
                    participantCreates.push({
                      conversationId: conv.id,
                      userId: rp.userId,
                      role: 'PASSENGER',
                    });
                  }
                }
              }

              // bulk create participants if any
              if (participantCreates.length) {
                await tx.conversationParticipant.createMany({
                  data: participantCreates.map((p) => ({
                    conversationId: p.conversationId,
                    userId: p.userId,
                    role: p.role,
                  })),
                  skipDuplicates: true,
                });
              }

              // create message
              const msg = await tx.message.create({
                data: {
                  senderId,
                  content: input.content,
                  conversationId: conv.id,
                  rideId: input.rideId,
                  clientTempId: input.clientTempId,
                  parentMessageId: input.parentMessageId ?? null,
                  sentAt: new Date(),
                },
                include: {
                  sender: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
                  replies: {
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
                },
              });

              return { conv, msg };
            });

            conversationId = result.conv.id;
            // use message returned below after transaction
            // but for simplicity we'll fetch/create message in next step if not returned
          } catch (e) {
            // handle unique constraint race: P2002 duplicate key
            if (
              e instanceof Prisma.PrismaClientKnownRequestError &&
              e.code === 'P2002'
            ) {
              // Another process created the conversation concurrently; fetch it
              const conv = await this.prisma.conversation.findUnique({
                where: { rideId: input.rideId },
              });
              if (!conv) throw e;
              conversationId = conv.id;
            } else {
              throw e;
            }
          }
        }
      } else if (input.recipientId) {
        // direct 1-1 chat: compute or find by directHash
        const directHash = makeDirectHash(senderId, input.recipientId);
        const existing = await this.prisma.conversation.findUnique({
          where: { directHash },
        });
        if (existing) conversationId = existing.id;
        else {
          try {
            const result = await this.prisma.$transaction(async (tx) => {
              const conv = await tx.conversation.create({
                data: {
                  type: 'DIRECT',
                  directHash,
                },
              });

              await tx.conversationParticipant.createMany({
                data: [
                  { conversationId: conv.id, userId: senderId, role: 'MEMBER' },
                  {
                    conversationId: conv.id,
                    userId: input.recipientId,
                    role: 'MEMBER',
                  },
                ],
                skipDuplicates: true,
              });

              const msg = await tx.message.create({
                data: {
                  senderId,
                  content: input.content,
                  conversationId: conv.id,
                  clientTempId: input.clientTempId,
                  parentMessageId: input.parentMessageId ?? null,
                  sentAt: new Date(),
                },
              });

              return { conv, msg };
            });

            conversationId = result.conv.id;
          } catch (e) {
            if (
              e instanceof Prisma.PrismaClientKnownRequestError &&
              e.code === 'P2002'
            ) {
              const conv = await this.prisma.conversation.findUnique({
                where: { directHash },
              });
              if (!conv) throw e;
              conversationId = conv.id;
            } else {
              throw e;
            }
          }
        }
      } else {
        // neither conversationId, rideId nor recipientId => cannot determine conversation
        throw new Error('No conversationId, rideId or recipientId provided');
      }
    } // end create/find conv

    // 2) At this point we have conversationId: create the message normally
    const message = await this.prisma.message.create({
      data: {
        senderId,
        content: input.content,
        conversationId,
        rideId: input.rideId ?? undefined,
        clientTempId: input.clientTempId ?? undefined,
        parentMessageId: input.parentMessageId ?? undefined,
        sentAt: new Date(),
      },
      include: {
        sender: true,
        replies: { include: { sender: true } },
      },
    });

    // Mettre en cache
    await this.chatCache.cacheMessage({
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      timestamp: message.createdAt.toISOString(),
      conversationId: message.conversationId,
      rideId: message.rideId,
    });

    const channelName = `conversation_${conversationId}`;
    const payload: MessagePayload = { message, type: 'NEW_MESSAGE' };

    await this.redisService
      .getPubSub()
      .publish(channelName, { messageReceived: payload });

    await this.updateConversationStats(
      conversationId,
      input.rideId ?? null,
      message,
    );

    return message;
  }

  async getMessages(
    conversationId?: string,
    rideId?: string,
    cursor?: string,
    limit = 20,
  ) {
    const where = conversationId ? { conversationId } : { rideId };

    // Essayer d'abord le cache Redis pour les messages récents
    const cacheKey = `messages:${conversationId || rideId}:${cursor || 'latest'}:${limit}`;
    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      const jsonCached = JSON.parse(cached);

      return normalizeDates<Message[]>(jsonCached);
      // return jsonCached;
    }

    const messages = await this.prisma.message.findMany({
      where: {
        ...where,
        deleted: false,
        ...(cursor && {
          createdAt: {
            lt: new Date(cursor),
          },
        }),
      },
      include: {
        sender: true,
        replies: {
          include: {
            sender: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    // Cache les résultats pour 5 minutes
    await this.redisService.set(cacheKey, JSON.stringify(messages), 300);

    return messages;
  }

  async markAsDelivered(messageId: string) {
    const message = await this.prisma.message.update({
      where: { id: messageId },
      data: {
        deliveredAt: new Date(),
        state: 'DELIVERED',
      },
      include: {
        sender: true,
        replies: {
          include: {
            sender: true,
          },
        },
      },
    });

    // Mettre à jour le cache
    const messageKey = `message:${messageId}`;
    await this.redisService.set(messageKey, JSON.stringify(message), 3600);

    // Notifier la mise à jour
    const channelName = message.conversationId
      ? `conversation_${message.conversationId}`
      : `ride_${message.rideId}`;

    const payload: MessagePayload = {
      message,
      type: 'MESSAGE_UPDATED',
    };

    await this.redisService.getPubSub().publish(channelName, payload);

    return message;
  }

  async editMessage(messageId: string, userId: string, newContent: string) {
    // Vérifier que l'utilisateur peut éditer ce message
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: { sender: true },
    });

    if (!message || message.senderId !== userId) {
      throw new Error('Unauthorized to edit this message');
    }

    if (message.deleted) {
      throw new Error('Cannot edit deleted message');
    }

    const updatedMessage = await this.prisma.message.update({
      where: { id: messageId },
      data: {
        content: newContent,
        edited: true,
        editedAt: new Date(),
      },
      include: {
        sender: true,
        replies: {
          include: {
            sender: true,
          },
        },
      },
    });

    // Invalider le cache
    const cachePattern = `messages:${message.conversationId || message.rideId}:*`;
    const keysToDelete = await this.redisService.scanKeys(cachePattern);
    if (keysToDelete.length > 0) {
      await this.redisService.del(...keysToDelete);
    }

    // Mettre à jour le cache du message
    await this.chatCache.cacheMessage({
      id: updatedMessage.id,
      content: updatedMessage.content,
      senderId: updatedMessage.senderId,
      timestamp: updatedMessage.createdAt.toISOString(),
      conversationId: updatedMessage.conversationId,
      rideId: updatedMessage.rideId,
    });

    // Publier la mise à jour
    const channelName = message.conversationId
      ? `conversation_${message.conversationId}`
      : `ride_${message.rideId}`;

    const payload: MessagePayload = {
      message: updatedMessage,
      type: 'MESSAGE_UPDATED',
    };

    await this.redisService.getPubSub().publish(channelName, payload);

    return updatedMessage;
  }

  async deleteMessage(messageId: string, userId: string, soft = true) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: { sender: true },
    });

    if (!message || message.senderId !== userId) {
      throw new Error('Unauthorized to delete this message');
    }

    let deletedMessage;

    if (soft) {
      deletedMessage = await this.prisma.message.update({
        where: { id: messageId },
        data: {
          deleted: true,
          deletedAt: new Date(),
          content: null, // Effacer le contenu
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    } else {
      deletedMessage = await this.prisma.message.delete({
        where: { id: messageId },
      });
    }

    // Supprimer du cache
    const type = message.conversationId ? 'conversation' : 'ride';
    const roomId = message.conversationId || message.rideId;
    await this.chatCache.deleteMessageFromCache(messageId, roomId, type);

    // Invalider les caches de messages
    const cachePattern = `messages:${roomId}:*`;
    const keysToDelete = await this.redisService.keys(cachePattern);
    if (keysToDelete.length > 0) {
      await this.redisService.del(...keysToDelete);
    }

    // Publier la suppression
    const channelName = message.conversationId
      ? `conversation_${message.conversationId}`
      : `ride_${message.rideId}`;

    const payload: MessagePayload = {
      message: deletedMessage,
      type: 'MESSAGE_DELETED',
    };

    await this.redisService.getPubSub().publish(channelName, payload);

    return deletedMessage;
  }

  async markAsRead(messageId: string, userId: string) {
    // Utiliser Redis pour tracker les lectures
    const readKey = `message:${messageId}:reads`;
    await this.redisService.sadd(readKey, userId);

    // Optionnel: créer un read receipt en DB
    await this.prisma.messageReadReceipt.upsert({
      where: {
        messageId_userId: {
          messageId,
          userId,
        },
      },
      update: {
        readAt: new Date(),
      },
      create: {
        messageId,
        userId,
        readAt: new Date(),
      },
    });
  }

  async getUnreadCount(
    userId: string,
    conversationId?: string,
    rideId?: string,
  ) {
    const identifier = conversationId || rideId;
    const lastReadKey = `user:${userId}:lastRead:${identifier}`;
    const lastReadTime = await this.redisService.get(lastReadKey);

    const where = conversationId ? { conversationId } : { rideId };

    return await this.prisma.message.count({
      where: {
        ...where,
        senderId: { not: userId },
        createdAt: lastReadTime ? { gt: new Date(lastReadTime) } : undefined,
      },
    });
  }

  private async updateConversationStats(
    conversationId?: string,
    rideId?: string,
    message?: any,
  ) {
    const roomId = conversationId || rideId;
    const type = conversationId ? 'conversation' : 'ride';

    // Mettre à jour le dernier message
    const lastMessageKey = `${type}:${roomId}:lastMessage`;
    await this.redisService.set(lastMessageKey, JSON.stringify(message), 86400); // 24h

    // Incrémenter le compteur de messages
    const countKey = `${type}:${roomId}:messageCount`;
    await this.redisService.getPublisher().incr(countKey);

    await this.chatCache.incrementMessageCount(roomId, type);
    await this.chatCache.setLastActivity(roomId, type);
  }
}
