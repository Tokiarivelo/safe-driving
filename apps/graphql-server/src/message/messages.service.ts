// messages.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChatCacheService } from 'src/chat/chat-cache.service';
import { Message } from 'src/dtos/@generated';
import { SendMessageInput } from 'src/dtos/message/message.input';
import {
  MessageEventType,
  MessagePayload,
} from 'src/dtos/message/message.output';

import { PrismaService } from 'src/prisma-module/prisma.service';
import { RedisExtendedService } from 'src/redis/redis-extended.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { AddReactionInput } from 'src/dtos/reaction/reaction.input';
import { ReactionActionResult } from 'src/dtos/reaction/reaction.output';
import { LinkPreviewService } from 'src/link-preview';
import { MessageSearchService } from './message-search.service';
import { makeDirectHash } from 'src/utils/make-direct-hash';

@Injectable()
export class MessageService {
  constructor(
    private redisService: RedisExtendedService,
    private readonly prisma: PrismaService,
    private chatCache: ChatCacheService,
    private reactionService: ReactionService,
    private linkPreviewService: LinkPreviewService,
    private messageSearchService: MessageSearchService,
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
                  attachments: {
                    include: {
                      file: true,
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
    // If files keys are provided, create attachments from file keys
    // --- FILE ATTACHMENTS ---
    let attachmentCreates: any = undefined;
    const fileAttachments: any[] = [];
    if (input.filesKeys?.length) {
      const files = await this.prisma.file.findMany({
        where: { key: { in: input.filesKeys } },
        select: { id: true, key: true },
      });
      fileAttachments.push(
        ...files.map((file) => ({
          type: 'FILE',
          file: { connect: { id: file.id } },
        })),
      );
    }

    // --- LINK ATTACHMENTS ---
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const foundLinks = input.content.match(urlRegex) || [];
    const linkAttachments: any[] = [];
    if (foundLinks.length) {
      // Dynamically import the LinkPreviewService from NestJS DI
      // If you have it injected, use this.linkPreviewService
      // Otherwise, get it from the module context
      // Here, assuming you have it injected as this.linkPreviewService
      if (!('linkPreviewService' in this)) {
        throw new Error(
          'LinkPreviewService must be injected in MessageService',
        );
      }
      const previews =
        await this.linkPreviewService.getMultipleLinkPreviews(foundLinks);
      for (const preview of previews) {
        linkAttachments.push({
          type: 'LINK',
          url: preview.url,
          linkTitle: preview.title,
          linkDesc: preview.description,
          linkThumbnail: preview.thumbnail,
          linkMeta: preview.meta,
        });
      }
    }

    // Combine file and link attachments
    const allAttachments = [...fileAttachments, ...linkAttachments];
    if (allAttachments.length) {
      attachmentCreates = { create: allAttachments };
    }

    const message = await this.prisma.message.create({
      data: {
        senderId,
        content: input.content,
        conversationId,
        rideId: input.rideId ?? undefined,
        clientTempId: input.clientTempId ?? undefined,
        parentMessageId: input.parentMessageId ?? undefined,
        attachments: attachmentCreates,
        sentAt: new Date(),
      },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    // Mettre en cache le message individuel
    await this.chatCache.cacheMessage({
      id: message.id,
      content: JSON.stringify(message),
      senderId: message.senderId,
      timestamp: message.createdAt.toISOString(),
      conversationId: message.conversationId,
      rideId: message.rideId,
    });

    // Invalider et mettre à jour le cache des listes de messages
    const roomId = conversationId || input.rideId;
    await this.invalidateMessagesCache(roomId);

    // Optionnel: Pré-remplir le cache avec les messages récents incluant le nouveau
    await this.updateMessagesListCache(conversationId, input.rideId, message);

    const channelName = `conversation_${conversationId}`;
    const payload: MessagePayload = {
      message,
      type: MessageEventType.NEW_MESSAGE,
    };

    await this.redisService
      .getPubSub()
      .publish(channelName, { messageEvent: payload });

    await this.updateConversationStats(
      conversationId,
      input.rideId ?? null,
      message,
    );

    // ✅ ELASTICSEARCH: Indexer le nouveau message
    await this.messageSearchService.indexMessage(message.id, {
      refresh: true, // Refresh immédiatement pour que le message soit cherchable
    });

    return message;
  }

  async getMessages(
    conversationId?: string,
    rideId?: string,
    cursor?: string,
    limit = 20,
    direction: 'BEFORE' | 'AFTER' = 'BEFORE',
  ) {
    if (!conversationId && !rideId) {
      throw new Error('No conversationId or rideId provided');
    }

    const roomId = conversationId || rideId;
    const where = conversationId ? { conversationId } : { rideId };

    // Essayer d'abord le cache Redis pour les messages récents
    const cacheKey = `messages:${roomId}:${cursor || 'latest'}:${limit}:${direction}`;
    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      const jsonCached = JSON.parse(cached);
      console.log('Messages trouvés dans le cache :>> ', jsonCached.length);
      return jsonCached;
    }

    // Construire la condition de date selon la direction
    let dateCondition = {};
    if (cursor) {
      if (direction === 'BEFORE') {
        // Charger les messages plus anciens (avant le cursor)
        dateCondition = { lt: new Date(cursor) };
      } else {
        // Charger les messages plus récents (après le cursor)
        dateCondition = { gt: new Date(cursor) };
      }
    }

    // Si pas dans le cache, récupérer depuis la DB
    const messages = await this.prisma.message.findMany({
      where: {
        ...where,
        deleted: false,
        ...(cursor && { createdAt: dateCondition }),
      },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
      orderBy: {
        createdAt: direction === 'BEFORE' ? 'desc' : 'asc',
      },
      take: limit,
    });

    // Si on charge les messages plus récents (AFTER), inverser l'ordre pour avoir le bon affichage
    const orderedMessages =
      direction === 'AFTER' ? messages.reverse() : messages;

    // Cache les résultats pour 5 minutes
    await this.redisService.set(cacheKey, JSON.stringify(orderedMessages), 300);

    return orderedMessages;
  }

  /**
   * Get messages around a specific message (context window)
   * Useful when clicking on a search result to see surrounding messages
   */
  async getMessagesAroundMessage(
    messageId: string,
    userId: string,
    beforeCount: number = 10,
    afterCount: number = 10,
  ) {
    // 1. Récupérer le message ciblé
    const targetMessage = await this.prisma.message.findUnique({
      where: { id: messageId },
      select: {
        id: true,
        createdAt: true,
        conversationId: true,
        rideId: true,
      },
    });

    if (!targetMessage) {
      throw new Error('Message not found');
    }

    // 2. Vérifier que l'utilisateur a accès à cette conversation
    if (targetMessage.conversationId) {
      const participant = await this.prisma.conversationParticipant.findUnique({
        where: {
          conversationId_userId: {
            conversationId: targetMessage.conversationId,
            userId,
          },
        },
      });

      if (!participant) {
        throw new Error(
          'Unauthorized: User is not a participant of this conversation',
        );
      }
    }

    const roomId = targetMessage.conversationId || targetMessage.rideId;
    const where = targetMessage.conversationId
      ? { conversationId: targetMessage.conversationId }
      : { rideId: targetMessage.rideId };

    // 3. Récupérer les messages AVANT le message ciblé
    const messagesBefore = await this.prisma.message.findMany({
      where: {
        ...where,
        deleted: false,
        createdAt: {
          lt: targetMessage.createdAt,
        },
      },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Plus récents en premier
      },
      take: beforeCount,
    });

    // 4. Récupérer le message ciblé complet
    const targetMessageFull = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    // 5. Récupérer les messages APRÈS le message ciblé
    const messagesAfter = await this.prisma.message.findMany({
      where: {
        ...where,
        deleted: false,
        createdAt: {
          gt: targetMessage.createdAt,
        },
      },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc', // Plus anciens en premier
      },
      take: afterCount,
    });

    // 6. Combiner tous les messages dans l'ordre chronologique
    const allMessages = [
      ...messagesBefore.reverse(), // Inverser pour avoir l'ordre chronologique
      targetMessageFull!,
      ...messagesAfter,
    ];

    // 7. Calculer la position du message ciblé dans la conversation complète
    const targetPosition = await this.prisma.message.count({
      where: {
        ...where,
        deleted: false,
        createdAt: {
          lt: targetMessage.createdAt,
        },
      },
    });

    return {
      messages: allMessages,
      targetMessageId: messageId,
      targetPosition, // Position 0-based du message ciblé dans la conversation
      beforeCount: messagesBefore.length,
      afterCount: messagesAfter.length,
      hasMoreBefore: messagesBefore.length === beforeCount,
      hasMoreAfter: messagesAfter.length === afterCount,
    };
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
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    // Mettre à jour le cache du message individuel
    await this.chatCache.cacheMessage({
      id: message.id,
      content: JSON.stringify(message),
      senderId: message.senderId,
      timestamp: message.createdAt.toISOString(),
      conversationId: message.conversationId,
      rideId: message.rideId,
    });

    // Notifier la mise à jour
    const channelName = message.conversationId
      ? `conversation_${message.conversationId}`
      : `ride_${message.rideId}`;

    const payload: MessagePayload = {
      message,
      type: MessageEventType.MESSAGE_UPDATED,
    };

    await this.redisService
      .getPubSub()
      .publish(channelName, { messageEvent: payload });

    return message;
  }

  async editMessage(
    messageId: string,
    newContent: string,
    userId: string,
    filesKeys?: string[],
  ) {
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

    // If files keys are provided, create attachments from file keys
    let attachmentCreates = undefined;
    if (filesKeys?.length) {
      // Find files by their keys
      const files = await this.prisma.file.findMany({
        where: {
          key: {
            in: filesKeys,
          },
        },
        select: {
          id: true,
          key: true,
        },
      });

      // Create attachment data for each file
      attachmentCreates = {
        create: files.map((file) => ({
          type: 'FILE',
          file: {
            connect: {
              id: file.id,
            },
          },
        })),
      };
    }

    const updatedMessage = await this.prisma.message.update({
      where: { id: messageId },
      data: {
        content: newContent,
        attachments: attachmentCreates,
        edited: true,
        editedAt: new Date(),
      },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    // Invalider le cache des listes de messages
    const roomId = message.conversationId || message.rideId;
    await this.invalidateMessagesCache(roomId);

    // Mettre à jour le cache du message individuel
    await this.chatCache.cacheMessage({
      id: updatedMessage.id,
      content: JSON.stringify(updatedMessage),
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
      type: MessageEventType.MESSAGE_UPDATED,
    };

    await this.redisService.getPubSub().publish(channelName, {
      messageEvent: payload,
    });

    // ✅ ELASTICSEARCH: Réindexer le message modifié
    await this.messageSearchService.indexMessage(updatedMessage.id, {
      refresh: true,
    });

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
          content: null,
        },
        include: {
          reactions: {
            include: {
              user: true,
            },
          },
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          attachments: {
            include: {
              file: true,
            },
          },
        },
      });
    } else {
      deletedMessage = await this.prisma.message.delete({
        where: { id: messageId },
      });
    }

    // Supprimer du cache individuel
    const type = message.conversationId ? 'conversation' : 'ride';
    const roomId = message.conversationId || message.rideId;
    await this.chatCache.deleteMessageFromCache(messageId, roomId, type);

    // Invalider les caches de listes de messages
    await this.invalidateMessagesCache(roomId);

    // Publier la suppression
    const channelName = message.conversationId
      ? `conversation_${message.conversationId}`
      : `ride_${message.rideId}`;

    const payload: MessagePayload = {
      message: deletedMessage,
      type: MessageEventType.MESSAGE_DELETED,
    };

    await this.redisService.getPubSub().publish(channelName, {
      messageEvent: payload,
    });

    // ✅ ELASTICSEARCH: Supprimer le message de l'index
    await this.messageSearchService.deleteMessage(messageId, {
      refresh: true,
    });

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

  /**
   * Add a reaction to a message
   * Integrates with ReactionService and handles cache/pubsub updates
   */
  async addMessageReaction(
    userId: string,
    input: AddReactionInput,
  ): Promise<ReactionActionResult> {
    const { messageId } = input;

    // Verify message exists and get its conversation/ride context
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    if (!message) {
      throw new Error(`Message with ID ${messageId} not found`);
    }

    // Add the reaction using the ReactionService
    const result = await this.reactionService.addReaction(userId, input);

    if (result.success && result.reaction) {
      const roomId = message.conversationId || message.rideId;
      const type = message.conversationId ? 'conversation' : 'ride';

      // Update cache: Invalidate message cache to reflect new reaction
      await this.invalidateMessagesCache(roomId);

      // Cache the reaction summary for quick access
      const reactionCacheKey = `message:${messageId}:reactions`;
      if (result.summary) {
        await this.redisService.set(
          reactionCacheKey,
          JSON.stringify(result.summary),
          3600, // 1 hour
        );
      }

      // Publish reaction event to pubsub for real-time updates
      const channelName = message.conversationId
        ? `conversation_${message.conversationId}`
        : `ride_${message.rideId}`;

      const payload = {
        type: MessageEventType.REACTION_ADDED,
        message: {
          ...message,
          reactions: [result.reaction, ...message.reactions],
        },
      };

      await this.redisService.getPubSub().publish(channelName, {
        messageEvent: payload,
      });

      // Track reaction activity in Redis
      const activityKey = `${type}:${roomId}:lastActivity`;
      await this.redisService.set(activityKey, new Date().toISOString(), 86400);
    }

    return result;
  }

  /**
   * Remove a reaction from a message
   * Integrates with ReactionService and handles cache/pubsub updates
   */
  async removeMessageReaction(
    userId: string,
    messageId: string,
    reactionType: string,
  ): Promise<ReactionActionResult> {
    // Verify message exists and get its conversation/ride context
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    if (!message) {
      throw new Error(`Message with ID ${messageId} not found`);
    }

    // Remove the reaction using the ReactionService
    const result = await this.reactionService.removeReaction(userId, {
      messageId,
      type: reactionType,
    });

    if (result.success) {
      const roomId = message.conversationId || message.rideId;

      // Update cache: Invalidate message cache to reflect removed reaction
      await this.invalidateMessagesCache(roomId);

      // Update reaction summary cache
      const reactionCacheKey = `message:${messageId}:reactions`;
      if (result.summary) {
        await this.redisService.set(
          reactionCacheKey,
          JSON.stringify(result.summary),
          3600,
        );
      }

      // Publish reaction removal event to pubsub
      const channelName = message.conversationId
        ? `conversation_${message.conversationId}`
        : `ride_${message.rideId}`;

      const payload = {
        type: MessageEventType.REACTION_REMOVED,
        message: {
          ...message,
          reactions: [
            ...(message.reactions ?? []).filter(
              (r) => !(r.userId === userId && r.type === reactionType),
            ),
          ],
        },
      };

      await this.redisService.getPubSub().publish(channelName, {
        messageEvent: payload,
      });
    }

    return result;
  }

  /**
   * Toggle a reaction on a message
   * Integrates with ReactionService and handles cache/pubsub updates
   */
  async toggleMessageReaction(
    userId: string,
    messageId: string,
    reactionType: string,
  ): Promise<ReactionActionResult> {
    // Verify message exists and get its conversation/ride context
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
    });

    if (!message) {
      throw new Error(`Message with ID ${messageId} not found`);
    }

    // Toggle the reaction using the ReactionService
    const result = await this.reactionService.toggleReaction(userId, {
      messageId,
      type: reactionType,
    });

    if (result.success) {
      const roomId = message.conversationId || message.rideId;

      // Update cache: Invalidate message cache
      await this.invalidateMessagesCache(roomId);

      // Update reaction summary cache
      const reactionCacheKey = `message:${messageId}:reactions`;
      if (result.summary) {
        await this.redisService.set(
          reactionCacheKey,
          JSON.stringify(result.summary),
          3600,
        );
      }

      // Publish toggle event to pubsub
      const channelName = message.conversationId
        ? `conversation_${message.conversationId}`
        : `ride_${message.rideId}`;

      const payload = {
        type: MessageEventType.MESSAGE_UPDATED,
        message,
      };

      await this.redisService.getPubSub().publish(channelName, {
        messageEvent: payload,
      });
    }

    return result;
  }

  /**
   * Get reaction summary for a message (with caching)
   */
  async getMessageReactionSummary(messageId: string, userId?: string) {
    // Try to get from cache first
    const reactionCacheKey = `message:${messageId}:reactions`;
    const cached = await this.redisService.get(reactionCacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    // If not in cache, get from ReactionService and cache it
    const summary = await this.reactionService.getReactionSummary(
      messageId,
      userId,
    );

    await this.redisService.set(
      reactionCacheKey,
      JSON.stringify(summary),
      3600, // 1 hour
    );

    return summary;
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

  // Nouvelle méthode pour invalider le cache des messages
  private async invalidateMessagesCache(roomId: string) {
    const cachePattern = `messages:${roomId}:*`;
    const keysToDelete = await this.redisService.scanKeys(cachePattern);
    if (keysToDelete.length > 0) {
      await this.redisService.del(...keysToDelete);
      console.log(
        `Cache invalidé pour ${keysToDelete.length} clés de ${roomId}`,
      );
    }
  }

  // Nouvelle méthode pour pré-remplir le cache avec les messages récents
  private async updateMessagesListCache(
    conversationId?: string,
    rideId?: string,
    newMessage?: any,
  ) {
    const roomId = conversationId || rideId;
    const where = conversationId ? { conversationId } : { rideId };

    // Récupérer les 20 messages les plus récents pour le cache "latest"
    const recentMessages = await this.prisma.message.findMany({
      where: {
        ...where,
        deleted: false,
      },
      include: {
        sender: true,
        reactions: {
          include: {
            user: true,
          },
        },
        parentMessage: {
          include: {
            sender: {
              include: { avatar: true },
            },
          },
        },
        replies: {
          include: {
            sender: true,
          },
        },
        attachments: {
          include: {
            file: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    // Mettre en cache avec la clé "latest"
    const cacheKey = `messages:${roomId}:latest:20`;
    await this.redisService.set(cacheKey, JSON.stringify(recentMessages), 300);
  }
}
