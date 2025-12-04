import { UseGuards, Logger } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GraphqlWsJwtGuard } from 'src/auth/guards/graphql-ws-jwt.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User, Notification } from 'src/dtos/@generated';
import { NotificationService } from './notification.service';
import { RedisExtendedService } from 'src/redis/redis-extended.service';
import {
  CreateNotificationInput,
  NotificationsFilterInput,
} from 'src/dtos/notification/notification.input';
import {
  NotificationsResponse,
  NotificationActionResult,
  MarkAllReadResult,
  NotificationPayload,
} from 'src/dtos/notification/notification.output';

@Resolver(() => Notification)
export class NotificationResolver {
  private readonly logger = new Logger(NotificationResolver.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly redisService: RedisExtendedService,
  ) {}

  // ==================== Queries ====================

  @UseGuards(JwtAuthGuard)
  @Query(() => NotificationsResponse, {
    description: 'Get notifications for the current user',
  })
  async notifications(
    @CurrentUser() user: User,
    @Args('filter', { nullable: true }) filter?: NotificationsFilterInput,
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit?: number,
  ): Promise<NotificationsResponse> {
    return this.notificationService.getNotifications(
      user.id,
      filter,
      cursor,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, {
    description: 'Get unread notification count for the current user',
  })
  async unreadNotificationCount(@CurrentUser() user: User): Promise<number> {
    return this.notificationService.getUnreadCount(user.id);
  }

  // ==================== Mutations ====================

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Notification, {
    description: 'Create a new notification (admin/system use)',
  })
  async createNotification(
    @Args('input') input: CreateNotificationInput,
  ): Promise<Notification> {
    return this.notificationService.createNotification(input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => NotificationActionResult, {
    description: 'Mark a notification as read',
  })
  async markNotificationAsRead(
    @CurrentUser() user: User,
    @Args('notificationId') notificationId: string,
  ): Promise<NotificationActionResult> {
    return this.notificationService.markAsRead(notificationId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MarkAllReadResult, {
    description: 'Mark all notifications as read',
  })
  async markAllNotificationsAsRead(
    @CurrentUser() user: User,
  ): Promise<MarkAllReadResult> {
    return this.notificationService.markAllAsRead(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => NotificationActionResult, {
    description: 'Archive a notification',
  })
  async archiveNotification(
    @CurrentUser() user: User,
    @Args('notificationId') notificationId: string,
  ): Promise<NotificationActionResult> {
    return this.notificationService.archiveNotification(
      notificationId,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => NotificationActionResult, {
    description: 'Delete a notification',
  })
  async deleteNotification(
    @CurrentUser() user: User,
    @Args('notificationId') notificationId: string,
  ): Promise<NotificationActionResult> {
    return this.notificationService.deleteNotification(
      notificationId,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MarkAllReadResult, {
    description: 'Delete all notifications for the current user',
  })
  async deleteAllNotifications(
    @CurrentUser() user: User,
  ): Promise<MarkAllReadResult> {
    return this.notificationService.deleteAllNotifications(user.id);
  }

  // ==================== Subscriptions ====================

  @UseGuards(GraphqlWsJwtGuard)
  @Subscription(() => NotificationPayload, {
    description: 'Subscribe to notification events for the current user',
    filter: (payload, variables, context) => {
      const logger = new Logger('NotificationSubscriptionFilter');
      try {
        const userId = context?.user?.sub;
        const notification = payload?.notificationEvent?.notification;

        if (!userId) {
          logger.warn('No userId in subscription context');
          return false;
        }

        // For bulk events (mark all read, delete all), always pass through
        const eventType = payload?.notificationEvent?.type;
        if (
          eventType === 'ALL_NOTIFICATIONS_READ' ||
          eventType === 'ALL_NOTIFICATIONS_DELETED'
        ) {
          return true;
        }

        if (!notification) {
          logger.debug('No notification in payload');
          return false;
        }

        const match = notification.userId === userId;
        logger.debug('Notification filter result', {
          match,
          notificationUserId: notification.userId,
          subscriberUserId: userId,
        });

        return match;
      } catch (error) {
        logger.error('Error in notification subscription filter', error);
        return false;
      }
    },
  })
  notificationEvent(@CurrentUser() user: User) {
    const channelName = `user_notifications_${user.id}`;
    this.logger.log('New notification subscription created', {
      channelName,
      userId: user.id,
    });

    const pubsub = this.redisService.getPubSub();
    const iterator = pubsub?.asyncIterator
      ? pubsub.asyncIterator(channelName)
      : null;

    if (!iterator) {
      throw new Error(
        `Could not create asyncIterator for channel "${channelName}"`,
      );
    }

    return iterator;
  }
}
