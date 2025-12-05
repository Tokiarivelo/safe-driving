import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { RedisExtendedService } from 'src/redis/redis-extended.service';
import {
  CreateNotificationInput,
  NotificationsFilterInput,
} from 'src/dtos/notification/notification.input';
import {
  NotificationsResponse,
  NotificationActionResult,
  MarkAllReadResult,
} from 'src/dtos/notification/notification.output';
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisExtendedService,
  ) {}

  /**
   * Create a new notification
   */
  async createNotification(
    input: CreateNotificationInput,
  ): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        userId: input.userId,
        type: input.type,
        title: input.title,
        message: input.message,
        rideId: input.rideId,
        senderId: input.senderId,
        metadata: input.metadata as Prisma.InputJsonValue,
      },
      include: {
        sender: {
          include: {
            avatar: true,
          },
        },
        ride: true,
        user: true,
      },
    });

    // Publish to Redis for real-time updates
    const channelName = `user_notifications_${input.userId}`;
    await this.redisService.getPubSub().publish(channelName, {
      notificationEvent: {
        notification,
        type: 'NEW_NOTIFICATION',
      },
    });

    // Increment unread count in Redis cache
    await this.incrementUnreadCount(input.userId);

    this.logger.log(
      `Notification created for user ${input.userId}: ${input.type}`,
    );

    return notification;
  }

  /**
   * Get notifications for a user with pagination and filters
   */
  async getNotifications(
    userId: string,
    filter?: NotificationsFilterInput,
    cursor?: string,
    limit: number = 20,
  ): Promise<NotificationsResponse> {
    const where: any = {
      userId,
      deleted: false,
    };

    // Apply filters
    if (filter?.type) {
      where.type = filter.type;
    }
    if (filter?.read !== undefined) {
      where.read = filter.read;
    }
    if (filter?.archived !== undefined) {
      where.archived = filter.archived;
    } else {
      // By default, don't show archived notifications
      where.archived = false;
    }
    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { message: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    // Build cursor condition
    const cursorCondition = cursor
      ? { createdAt: { lt: new Date(cursor) } }
      : {};

    const [notifications, totalCount, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where: { ...where, ...cursorCondition },
        include: {
          sender: {
            include: {
              avatar: true,
            },
          },
          ride: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit + 1, // Fetch one extra to check if there are more
      }),
      this.prisma.notification.count({ where }),
      this.prisma.notification.count({
        where: { userId, read: false, deleted: false, archived: false },
      }),
    ]);

    const hasMore = notifications.length > limit;
    const returnedNotifications = hasMore
      ? notifications.slice(0, limit)
      : notifications;

    return {
      notifications: returnedNotifications,
      totalCount,
      unreadCount,
      hasMore,
    };
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(
    notificationId: string,
    userId: string,
  ): Promise<NotificationActionResult> {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification) {
        return { success: false, message: 'Notification not found' };
      }

      if (notification.userId !== userId) {
        return { success: false, message: 'Unauthorized' };
      }

      if (notification.read) {
        return {
          success: true,
          message: 'Notification already read',
          notification,
        };
      }

      const updated = await this.prisma.notification.update({
        where: { id: notificationId },
        data: { read: true, readAt: new Date() },
        include: {
          sender: {
            include: {
              avatar: true,
            },
          },
          ride: true,
        },
      });

      // Decrement unread count in Redis
      await this.decrementUnreadCount(userId);

      // Publish update
      await this.redisService
        .getPubSub()
        .publish(`user_notifications_${userId}`, {
          notificationEvent: {
            notification: updated,
            type: 'NOTIFICATION_READ',
          },
        });

      return { success: true, notification: updated };
    } catch (error) {
      this.logger.error('Error marking notification as read', error);
      return { success: false, message: 'Failed to mark as read' };
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string): Promise<MarkAllReadResult> {
    try {
      const result = await this.prisma.notification.updateMany({
        where: { userId, read: false, deleted: false },
        data: { read: true, readAt: new Date() },
      });

      // Reset unread count in Redis
      await this.setUnreadCount(userId, 0);

      // Publish update
      await this.redisService
        .getPubSub()
        .publish(`user_notifications_${userId}`, {
          notificationEvent: {
            type: 'ALL_NOTIFICATIONS_READ',
          },
        });

      return { success: true, count: result.count };
    } catch (error) {
      this.logger.error('Error marking all notifications as read', error);
      return { success: false, count: 0 };
    }
  }

  /**
   * Archive a notification
   */
  async archiveNotification(
    notificationId: string,
    userId: string,
  ): Promise<NotificationActionResult> {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification) {
        return { success: false, message: 'Notification not found' };
      }

      if (notification.userId !== userId) {
        return { success: false, message: 'Unauthorized' };
      }

      const updated = await this.prisma.notification.update({
        where: { id: notificationId },
        data: { archived: true },
        include: {
          sender: {
            include: {
              avatar: true,
            },
          },
          ride: true,
        },
      });

      return { success: true, notification: updated };
    } catch (error) {
      this.logger.error('Error archiving notification', error);
      return { success: false, message: 'Failed to archive' };
    }
  }

  /**
   * Delete a notification (soft delete)
   */
  async deleteNotification(
    notificationId: string,
    userId: string,
  ): Promise<NotificationActionResult> {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification) {
        return { success: false, message: 'Notification not found' };
      }

      if (notification.userId !== userId) {
        return { success: false, message: 'Unauthorized' };
      }

      const updated = await this.prisma.notification.update({
        where: { id: notificationId },
        data: { deleted: true },
      });

      // If it was unread, decrement the count
      if (!notification.read) {
        await this.decrementUnreadCount(userId);
      }

      // Publish deletion
      await this.redisService
        .getPubSub()
        .publish(`user_notifications_${userId}`, {
          notificationEvent: {
            notification: updated,
            type: 'NOTIFICATION_DELETED',
          },
        });

      return { success: true, notification: updated };
    } catch (error) {
      this.logger.error('Error deleting notification', error);
      return { success: false, message: 'Failed to delete' };
    }
  }

  /**
   * Delete all notifications for a user (soft delete)
   */
  async deleteAllNotifications(userId: string): Promise<MarkAllReadResult> {
    try {
      const result = await this.prisma.notification.updateMany({
        where: { userId, deleted: false },
        data: { deleted: true },
      });

      // Reset unread count
      await this.setUnreadCount(userId, 0);

      // Publish deletion
      await this.redisService
        .getPubSub()
        .publish(`user_notifications_${userId}`, {
          notificationEvent: {
            type: 'ALL_NOTIFICATIONS_DELETED',
          },
        });

      return { success: true, count: result.count };
    } catch (error) {
      this.logger.error('Error deleting all notifications', error);
      return { success: false, count: 0 };
    }
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId: string): Promise<number> {
    // Try cache first
    const cached = await this.redisService.get(
      `user:${userId}:unreadNotifications`,
    );
    if (cached !== null) {
      return parseInt(cached, 10);
    }

    // Fallback to DB
    const count = await this.prisma.notification.count({
      where: { userId, read: false, deleted: false, archived: false },
    });

    // Cache the count
    await this.setUnreadCount(userId, count);

    return count;
  }

  // Redis helper methods for caching
  // Note: We use getPublisher() for atomic incr/decr operations as the RedisExtendedService
  // doesn't expose public incr/decr methods. The publisher instance ensures atomic operations
  // which is important for maintaining accurate unread counts across concurrent requests.
  private async incrementUnreadCount(userId: string): Promise<void> {
    const key = `user:${userId}:unreadNotifications`;
    await this.redisService.getPublisher().incr(key);
  }

  private async decrementUnreadCount(userId: string): Promise<void> {
    const key = `user:${userId}:unreadNotifications`;
    const current = await this.redisService.get(key);
    if (current && parseInt(current, 10) > 0) {
      await this.redisService.getPublisher().decr(key);
    }
  }

  private async setUnreadCount(userId: string, count: number): Promise<void> {
    const key = `user:${userId}:unreadNotifications`;
    await this.redisService.set(key, count.toString(), 86400); // 24h cache
  }
}
