import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attachment, File } from '../@generated';
import GraphQLJSON from 'graphql-type-json';

// Enum pour les filtres de type de fichier (similaire à l'image)
export enum FileTypeFilter {
  ALL = 'ALL',
  IMAGES = 'IMAGES',
  VIDEOS = 'VIDEOS',
  DOCUMENTS = 'DOCUMENTS',
  AUDIO = 'AUDIO',
  LINKS = 'LINKS',
  RIDES = 'RIDES',
}

registerEnumType(FileTypeFilter, {
  name: 'FileTypeFilter',
  description: 'Filter for conversation attachments by type',
});

@ObjectType()
export class ConversationAttachment {
  @Field(() => String)
  id: string;

  @Field(() => String)
  messageId: string;

  @Field(() => String)
  type: string; // FILE, LINK, RIDE

  @Field(() => File, { nullable: true })
  file?: File | null;

  @Field(() => String, { nullable: true })
  url?: string | null;

  @Field(() => String, { nullable: true })
  linkTitle?: string | null;

  @Field(() => String, { nullable: true })
  linkDesc?: string | null;

  @Field(() => String, { nullable: true })
  linkThumbnail?: string | null;

  @Field(() => GraphQLJSON, { nullable: true })
  linkMeta?: any;

  @Field(() => String, { nullable: true })
  rideId?: string | null;

  @Field(() => Date)
  createdAt: Date;

  // Info du message parent
  @Field(() => String, { nullable: true })
  senderName?: string;

  @Field(() => Date, { nullable: true })
  messageCreatedAt?: Date;
}

@ObjectType()
export class ConversationAttachmentsResponse {
  @Field(() => [ConversationAttachment])
  attachments: ConversationAttachment[];

  @Field(() => Int)
  total: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => String, { nullable: true })
  cursor?: string | null;
}

@ObjectType()
export class AttachmentTypeCount {
  @Field(() => String)
  type: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class ConversationAttachmentsSummary {
  @Field(() => Int)
  totalFiles: number;

  @Field(() => Int)
  totalImages: number;

  @Field(() => Int)
  totalVideos: number;

  @Field(() => Int)
  totalDocuments: number;

  @Field(() => Int)
  totalAudio: number;

  @Field(() => Int)
  totalLinks: number;

  @Field(() => Int)
  totalRides: number;

  @Field(() => [AttachmentTypeCount])
  byMimeType: AttachmentTypeCount[];
}
