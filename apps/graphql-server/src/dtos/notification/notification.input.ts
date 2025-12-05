import { InputType, Field, registerEnumType } from '@nestjs/graphql';

import { IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';
import { NotificationType } from '../@generated';

// Register the enum for GraphQL
registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Types of notifications',
});

@InputType()
export class CreateNotificationInput {
  @Field()
  @IsUUID()
  userId: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type: NotificationType;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  message: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  rideId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  senderId?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  metadata?: Record<string, unknown>;
}

@InputType()
export class MarkNotificationReadInput {
  @Field()
  @IsUUID()
  notificationId: string;
}

@InputType()
export class MarkAllNotificationsReadInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;
}

@InputType()
export class ArchiveNotificationInput {
  @Field()
  @IsUUID()
  notificationId: string;
}

@InputType()
export class DeleteNotificationInput {
  @Field()
  @IsUUID()
  notificationId: string;
}

@InputType()
export class NotificationsFilterInput {
  @Field(() => NotificationType, { nullable: true })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @Field({ nullable: true })
  @IsOptional()
  read?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  archived?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
