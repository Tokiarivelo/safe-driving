import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Notification, User, Ride } from '../@generated';

@ObjectType()
export class NotificationPayload {
  @Field(() => Notification)
  notification: Notification;

  @Field()
  type: string; // 'NEW_NOTIFICATION' | 'NOTIFICATION_READ' | 'NOTIFICATION_DELETED'
}

@ObjectType()
export class NotificationWithSender extends Notification {
  @Field(() => User, { nullable: true })
  sender?: User;

  @Field(() => Ride, { nullable: true })
  ride?: Ride;
}

@ObjectType()
export class NotificationsResponse {
  @Field(() => [Notification])
  notifications: Notification[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  unreadCount: number;

  @Field()
  hasMore: boolean;
}

@ObjectType()
export class NotificationActionResult {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Notification, { nullable: true })
  notification?: Notification;
}

@ObjectType()
export class MarkAllReadResult {
  @Field()
  success: boolean;

  @Field(() => Int)
  count: number;
}
