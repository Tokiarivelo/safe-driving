import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddParticipantInput = {
  conversationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['DateTime']['output'];
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  linkDesc?: Maybe<Scalars['String']['output']>;
  linkMeta?: Maybe<Scalars['JSON']['output']>;
  linkThumbnail?: Maybe<Scalars['String']['output']>;
  linkTitle?: Maybe<Scalars['String']['output']>;
  message: Message;
  messageId: Scalars['String']['output'];
  ride?: Maybe<Ride>;
  rideId?: Maybe<Scalars['String']['output']>;
  type: AttachmentType;
  url?: Maybe<Scalars['String']['output']>;
};

export type AttachmentCountAggregate = {
  __typename?: 'AttachmentCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  linkDesc: Scalars['Int']['output'];
  linkMeta: Scalars['Int']['output'];
  linkThumbnail: Scalars['Int']['output'];
  linkTitle: Scalars['Int']['output'];
  messageId: Scalars['Int']['output'];
  rideId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
};

export type AttachmentCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<Scalars['String']['input']>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<Scalars['String']['input']>;
  linkTitle?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
  rideId?: InputMaybe<Scalars['String']['input']>;
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AttachmentCreateManyFileInputEnvelope = {
  data: Array<AttachmentCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AttachmentCreateManyMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<Scalars['String']['input']>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<Scalars['String']['input']>;
  linkTitle?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AttachmentCreateManyMessageInputEnvelope = {
  data: Array<AttachmentCreateManyMessageInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AttachmentCreateManyRideInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<Scalars['String']['input']>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<Scalars['String']['input']>;
  linkTitle?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AttachmentCreateManyRideInputEnvelope = {
  data: Array<AttachmentCreateManyRideInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AttachmentCreateNestedManyWithoutFileInput = {
  connect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttachmentCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<AttachmentCreateWithoutFileInput>>;
  createMany?: InputMaybe<AttachmentCreateManyFileInputEnvelope>;
};

export type AttachmentCreateNestedManyWithoutMessageInput = {
  connect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttachmentCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<AttachmentCreateWithoutMessageInput>>;
  createMany?: InputMaybe<AttachmentCreateManyMessageInputEnvelope>;
};

export type AttachmentCreateNestedManyWithoutRideInput = {
  connect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttachmentCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<AttachmentCreateWithoutRideInput>>;
  createMany?: InputMaybe<AttachmentCreateManyRideInputEnvelope>;
};

export type AttachmentCreateOrConnectWithoutFileInput = {
  create: AttachmentCreateWithoutFileInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutMessageInput = {
  create: AttachmentCreateWithoutMessageInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateOrConnectWithoutRideInput = {
  create: AttachmentCreateWithoutRideInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentCreateWithoutFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<Scalars['String']['input']>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<Scalars['String']['input']>;
  linkTitle?: InputMaybe<Scalars['String']['input']>;
  message: MessageCreateNestedOneWithoutAttachmentsInput;
  ride?: InputMaybe<RideCreateNestedOneWithoutAttachmentInput>;
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AttachmentCreateWithoutMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file?: InputMaybe<FileCreateNestedOneWithoutAttachmentInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<Scalars['String']['input']>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<Scalars['String']['input']>;
  linkTitle?: InputMaybe<Scalars['String']['input']>;
  ride?: InputMaybe<RideCreateNestedOneWithoutAttachmentInput>;
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AttachmentCreateWithoutRideInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file?: InputMaybe<FileCreateNestedOneWithoutAttachmentInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<Scalars['String']['input']>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<Scalars['String']['input']>;
  linkTitle?: InputMaybe<Scalars['String']['input']>;
  message: MessageCreateNestedOneWithoutAttachmentsInput;
  type: AttachmentType;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AttachmentListRelationFilter = {
  every?: InputMaybe<AttachmentWhereInput>;
  none?: InputMaybe<AttachmentWhereInput>;
  some?: InputMaybe<AttachmentWhereInput>;
};

export type AttachmentMaxAggregate = {
  __typename?: 'AttachmentMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  linkDesc?: Maybe<Scalars['String']['output']>;
  linkThumbnail?: Maybe<Scalars['String']['output']>;
  linkTitle?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<AttachmentType>;
  url?: Maybe<Scalars['String']['output']>;
};

export type AttachmentMinAggregate = {
  __typename?: 'AttachmentMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  linkDesc?: Maybe<Scalars['String']['output']>;
  linkThumbnail?: Maybe<Scalars['String']['output']>;
  linkTitle?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<AttachmentType>;
  url?: Maybe<Scalars['String']['output']>;
};

export type AttachmentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AttachmentScalarWhereInput = {
  AND?: InputMaybe<Array<AttachmentScalarWhereInput>>;
  NOT?: InputMaybe<Array<AttachmentScalarWhereInput>>;
  OR?: InputMaybe<Array<AttachmentScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  linkDesc?: InputMaybe<StringNullableFilter>;
  linkMeta?: InputMaybe<JsonNullableFilter>;
  linkThumbnail?: InputMaybe<StringNullableFilter>;
  linkTitle?: InputMaybe<StringNullableFilter>;
  messageId?: InputMaybe<StringFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAttachmentTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export enum AttachmentType {
  FILE = 'FILE',
  LINK = 'LINK',
  RIDE = 'RIDE'
}

export type AttachmentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  linkDesc?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumAttachmentTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type AttachmentUpdateManyWithWhereWithoutFileInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutMessageInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithWhereWithoutRideInput = {
  data: AttachmentUpdateManyMutationInput;
  where: AttachmentScalarWhereInput;
};

export type AttachmentUpdateManyWithoutFileNestedInput = {
  connect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttachmentCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<AttachmentCreateWithoutFileInput>>;
  createMany?: InputMaybe<AttachmentCreateManyFileInputEnvelope>;
  delete?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  set?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  update?: InputMaybe<Array<AttachmentUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: InputMaybe<Array<AttachmentUpdateManyWithWhereWithoutFileInput>>;
  upsert?: InputMaybe<Array<AttachmentUpsertWithWhereUniqueWithoutFileInput>>;
};

export type AttachmentUpdateManyWithoutMessageNestedInput = {
  connect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttachmentCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<AttachmentCreateWithoutMessageInput>>;
  createMany?: InputMaybe<AttachmentCreateManyMessageInputEnvelope>;
  delete?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  set?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  update?: InputMaybe<Array<AttachmentUpdateWithWhereUniqueWithoutMessageInput>>;
  updateMany?: InputMaybe<Array<AttachmentUpdateManyWithWhereWithoutMessageInput>>;
  upsert?: InputMaybe<Array<AttachmentUpsertWithWhereUniqueWithoutMessageInput>>;
};

export type AttachmentUpdateManyWithoutRideNestedInput = {
  connect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AttachmentCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<AttachmentCreateWithoutRideInput>>;
  createMany?: InputMaybe<AttachmentCreateManyRideInputEnvelope>;
  delete?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AttachmentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  set?: InputMaybe<Array<AttachmentWhereUniqueInput>>;
  update?: InputMaybe<Array<AttachmentUpdateWithWhereUniqueWithoutRideInput>>;
  updateMany?: InputMaybe<Array<AttachmentUpdateManyWithWhereWithoutRideInput>>;
  upsert?: InputMaybe<Array<AttachmentUpsertWithWhereUniqueWithoutRideInput>>;
};

export type AttachmentUpdateWithWhereUniqueWithoutFileInput = {
  data: AttachmentUpdateWithoutFileInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutMessageInput = {
  data: AttachmentUpdateWithoutMessageInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithWhereUniqueWithoutRideInput = {
  data: AttachmentUpdateWithoutRideInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpdateWithoutFileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  linkDesc?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  message?: InputMaybe<MessageUpdateOneRequiredWithoutAttachmentsNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutAttachmentNestedInput>;
  type?: InputMaybe<EnumAttachmentTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type AttachmentUpdateWithoutMessageInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneWithoutAttachmentNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  linkDesc?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  ride?: InputMaybe<RideUpdateOneWithoutAttachmentNestedInput>;
  type?: InputMaybe<EnumAttachmentTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type AttachmentUpdateWithoutRideInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneWithoutAttachmentNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  linkDesc?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkMeta?: InputMaybe<Scalars['JSON']['input']>;
  linkThumbnail?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  linkTitle?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  message?: InputMaybe<MessageUpdateOneRequiredWithoutAttachmentsNestedInput>;
  type?: InputMaybe<EnumAttachmentTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type AttachmentUpsertWithWhereUniqueWithoutFileInput = {
  create: AttachmentCreateWithoutFileInput;
  update: AttachmentUpdateWithoutFileInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutMessageInput = {
  create: AttachmentCreateWithoutMessageInput;
  update: AttachmentUpdateWithoutMessageInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentUpsertWithWhereUniqueWithoutRideInput = {
  create: AttachmentCreateWithoutRideInput;
  update: AttachmentUpdateWithoutRideInput;
  where: AttachmentWhereUniqueInput;
};

export type AttachmentWhereInput = {
  AND?: InputMaybe<Array<AttachmentWhereInput>>;
  NOT?: InputMaybe<Array<AttachmentWhereInput>>;
  OR?: InputMaybe<Array<AttachmentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileNullableScalarRelationFilter>;
  fileId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  linkDesc?: InputMaybe<StringNullableFilter>;
  linkMeta?: InputMaybe<JsonNullableFilter>;
  linkThumbnail?: InputMaybe<StringNullableFilter>;
  linkTitle?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<MessageScalarRelationFilter>;
  messageId?: InputMaybe<StringFilter>;
  ride?: InputMaybe<RideNullableScalarRelationFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAttachmentTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type AttachmentWhereUniqueInput = {
  AND?: InputMaybe<Array<AttachmentWhereInput>>;
  NOT?: InputMaybe<Array<AttachmentWhereInput>>;
  OR?: InputMaybe<Array<AttachmentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileNullableScalarRelationFilter>;
  fileId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  linkDesc?: InputMaybe<StringNullableFilter>;
  linkMeta?: InputMaybe<JsonNullableFilter>;
  linkThumbnail?: InputMaybe<StringNullableFilter>;
  linkTitle?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<MessageScalarRelationFilter>;
  messageId?: InputMaybe<StringFilter>;
  ride?: InputMaybe<RideNullableScalarRelationFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAttachmentTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type CompleteUploadOutput = {
  __typename?: 'CompleteUploadOutput';
  contentType?: Maybe<Scalars['String']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
};

export type Conversation = {
  __typename?: 'Conversation';
  _count: ConversationCount;
  createdAt: Scalars['DateTime']['output'];
  directHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Message>>;
  participants?: Maybe<Array<ConversationParticipant>>;
  rideId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: ConversationType;
};

export type ConversationCount = {
  __typename?: 'ConversationCount';
  messages: Scalars['Int']['output'];
  participants: Scalars['Int']['output'];
};

export type ConversationCountAggregate = {
  __typename?: 'ConversationCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  directHash: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  rideId: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
};

export type ConversationCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<ConversationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ConversationCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ConversationCreateWithoutMessagesInput>;
};

export type ConversationCreateNestedOneWithoutParticipantsInput = {
  connect?: InputMaybe<ConversationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ConversationCreateOrConnectWithoutParticipantsInput>;
  create?: InputMaybe<ConversationCreateWithoutParticipantsInput>;
};

export type ConversationCreateOrConnectWithoutMessagesInput = {
  create: ConversationCreateWithoutMessagesInput;
  where: ConversationWhereUniqueInput;
};

export type ConversationCreateOrConnectWithoutParticipantsInput = {
  create: ConversationCreateWithoutParticipantsInput;
  where: ConversationWhereUniqueInput;
};

export type ConversationCreateWithoutMessagesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  directHash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<ConversationParticipantCreateNestedManyWithoutConversationInput>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ConversationType>;
};

export type ConversationCreateWithoutParticipantsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  directHash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutConversationInput>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ConversationType>;
};

export type ConversationMaxAggregate = {
  __typename?: 'ConversationMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  directHash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ConversationType>;
};

export type ConversationMinAggregate = {
  __typename?: 'ConversationMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  directHash?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ConversationType>;
};

export type ConversationNullableScalarRelationFilter = {
  is?: InputMaybe<ConversationWhereInput>;
  isNot?: InputMaybe<ConversationWhereInput>;
};

export type ConversationParticipant = {
  __typename?: 'ConversationParticipant';
  conversation?: Maybe<Conversation>;
  conversationId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isMuted?: Maybe<Scalars['Boolean']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type ConversationParticipantConversationIdUserIdCompoundUniqueInput = {
  conversationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ConversationParticipantCountAggregate = {
  __typename?: 'ConversationParticipantCountAggregate';
  _all: Scalars['Int']['output'];
  conversationId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isMuted: Scalars['Int']['output'];
  joinedAt: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type ConversationParticipantCreateManyConversationInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  isMuted?: InputMaybe<Scalars['Boolean']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type ConversationParticipantCreateManyConversationInputEnvelope = {
  data: Array<ConversationParticipantCreateManyConversationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ConversationParticipantCreateManyUserInput = {
  conversationId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isMuted?: InputMaybe<Scalars['Boolean']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type ConversationParticipantCreateManyUserInputEnvelope = {
  data: Array<ConversationParticipantCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ConversationParticipantCreateNestedManyWithoutConversationInput = {
  connect?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ConversationParticipantCreateOrConnectWithoutConversationInput>>;
  create?: InputMaybe<Array<ConversationParticipantCreateWithoutConversationInput>>;
  createMany?: InputMaybe<ConversationParticipantCreateManyConversationInputEnvelope>;
};

export type ConversationParticipantCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ConversationParticipantCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ConversationParticipantCreateWithoutUserInput>>;
  createMany?: InputMaybe<ConversationParticipantCreateManyUserInputEnvelope>;
};

export type ConversationParticipantCreateOrConnectWithoutConversationInput = {
  create: ConversationParticipantCreateWithoutConversationInput;
  where: ConversationParticipantWhereUniqueInput;
};

export type ConversationParticipantCreateOrConnectWithoutUserInput = {
  create: ConversationParticipantCreateWithoutUserInput;
  where: ConversationParticipantWhereUniqueInput;
};

export type ConversationParticipantCreateWithoutConversationInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  isMuted?: InputMaybe<Scalars['Boolean']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  user: UserCreateNestedOneWithoutConversationParticipantInput;
};

export type ConversationParticipantCreateWithoutUserInput = {
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutParticipantsInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  isMuted?: InputMaybe<Scalars['Boolean']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type ConversationParticipantListRelationFilter = {
  every?: InputMaybe<ConversationParticipantWhereInput>;
  none?: InputMaybe<ConversationParticipantWhereInput>;
  some?: InputMaybe<ConversationParticipantWhereInput>;
};

export type ConversationParticipantMaxAggregate = {
  __typename?: 'ConversationParticipantMaxAggregate';
  conversationId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isMuted?: Maybe<Scalars['Boolean']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ConversationParticipantMinAggregate = {
  __typename?: 'ConversationParticipantMinAggregate';
  conversationId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isMuted?: Maybe<Scalars['Boolean']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ConversationParticipantOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ConversationParticipantPayload = {
  __typename?: 'ConversationParticipantPayload';
  action: Scalars['String']['output'];
  conversationId: Scalars['String']['output'];
  participant: ConversationParticipant;
};

export type ConversationParticipantScalarWhereInput = {
  AND?: InputMaybe<Array<ConversationParticipantScalarWhereInput>>;
  NOT?: InputMaybe<Array<ConversationParticipantScalarWhereInput>>;
  OR?: InputMaybe<Array<ConversationParticipantScalarWhereInput>>;
  conversationId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isMuted?: InputMaybe<BoolNullableFilter>;
  joinedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ConversationParticipantUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isMuted?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  joinedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ConversationParticipantUpdateManyWithWhereWithoutConversationInput = {
  data: ConversationParticipantUpdateManyMutationInput;
  where: ConversationParticipantScalarWhereInput;
};

export type ConversationParticipantUpdateManyWithWhereWithoutUserInput = {
  data: ConversationParticipantUpdateManyMutationInput;
  where: ConversationParticipantScalarWhereInput;
};

export type ConversationParticipantUpdateManyWithoutConversationNestedInput = {
  connect?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ConversationParticipantCreateOrConnectWithoutConversationInput>>;
  create?: InputMaybe<Array<ConversationParticipantCreateWithoutConversationInput>>;
  createMany?: InputMaybe<ConversationParticipantCreateManyConversationInputEnvelope>;
  delete?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ConversationParticipantScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  set?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  update?: InputMaybe<Array<ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput>>;
  updateMany?: InputMaybe<Array<ConversationParticipantUpdateManyWithWhereWithoutConversationInput>>;
  upsert?: InputMaybe<Array<ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput>>;
};

export type ConversationParticipantUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ConversationParticipantCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ConversationParticipantCreateWithoutUserInput>>;
  createMany?: InputMaybe<ConversationParticipantCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ConversationParticipantScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  set?: InputMaybe<Array<ConversationParticipantWhereUniqueInput>>;
  update?: InputMaybe<Array<ConversationParticipantUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ConversationParticipantUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ConversationParticipantUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ConversationParticipantUpdateWithWhereUniqueWithoutConversationInput = {
  data: ConversationParticipantUpdateWithoutConversationInput;
  where: ConversationParticipantWhereUniqueInput;
};

export type ConversationParticipantUpdateWithWhereUniqueWithoutUserInput = {
  data: ConversationParticipantUpdateWithoutUserInput;
  where: ConversationParticipantWhereUniqueInput;
};

export type ConversationParticipantUpdateWithoutConversationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isMuted?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  joinedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutConversationParticipantNestedInput>;
};

export type ConversationParticipantUpdateWithoutUserInput = {
  conversation?: InputMaybe<ConversationUpdateOneWithoutParticipantsNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isMuted?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  joinedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ConversationParticipantUpsertWithWhereUniqueWithoutConversationInput = {
  create: ConversationParticipantCreateWithoutConversationInput;
  update: ConversationParticipantUpdateWithoutConversationInput;
  where: ConversationParticipantWhereUniqueInput;
};

export type ConversationParticipantUpsertWithWhereUniqueWithoutUserInput = {
  create: ConversationParticipantCreateWithoutUserInput;
  update: ConversationParticipantUpdateWithoutUserInput;
  where: ConversationParticipantWhereUniqueInput;
};

export type ConversationParticipantWhereInput = {
  AND?: InputMaybe<Array<ConversationParticipantWhereInput>>;
  NOT?: InputMaybe<Array<ConversationParticipantWhereInput>>;
  OR?: InputMaybe<Array<ConversationParticipantWhereInput>>;
  conversation?: InputMaybe<ConversationNullableScalarRelationFilter>;
  conversationId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isMuted?: InputMaybe<BoolNullableFilter>;
  joinedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ConversationParticipantWhereUniqueInput = {
  AND?: InputMaybe<Array<ConversationParticipantWhereInput>>;
  NOT?: InputMaybe<Array<ConversationParticipantWhereInput>>;
  OR?: InputMaybe<Array<ConversationParticipantWhereInput>>;
  conversation?: InputMaybe<ConversationNullableScalarRelationFilter>;
  conversationId?: InputMaybe<StringFilter>;
  conversationId_userId?: InputMaybe<ConversationParticipantConversationIdUserIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  isMuted?: InputMaybe<BoolNullableFilter>;
  joinedAt?: InputMaybe<DateTimeNullableFilter>;
  role?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ConversationPayload = {
  __typename?: 'ConversationPayload';
  action: Scalars['String']['output'];
  conversation: UserConversation;
};

export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
  RIDE_LINKED = 'RIDE_LINKED'
}

export type ConversationUpdateOneWithoutMessagesNestedInput = {
  connect?: InputMaybe<ConversationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ConversationCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ConversationCreateWithoutMessagesInput>;
  delete?: InputMaybe<ConversationWhereInput>;
  disconnect?: InputMaybe<ConversationWhereInput>;
  update?: InputMaybe<ConversationUpdateToOneWithWhereWithoutMessagesInput>;
  upsert?: InputMaybe<ConversationUpsertWithoutMessagesInput>;
};

export type ConversationUpdateOneWithoutParticipantsNestedInput = {
  connect?: InputMaybe<ConversationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ConversationCreateOrConnectWithoutParticipantsInput>;
  create?: InputMaybe<ConversationCreateWithoutParticipantsInput>;
  delete?: InputMaybe<ConversationWhereInput>;
  disconnect?: InputMaybe<ConversationWhereInput>;
  update?: InputMaybe<ConversationUpdateToOneWithWhereWithoutParticipantsInput>;
  upsert?: InputMaybe<ConversationUpsertWithoutParticipantsInput>;
};

export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
  data: ConversationUpdateWithoutMessagesInput;
  where?: InputMaybe<ConversationWhereInput>;
};

export type ConversationUpdateToOneWithWhereWithoutParticipantsInput = {
  data: ConversationUpdateWithoutParticipantsInput;
  where?: InputMaybe<ConversationWhereInput>;
};

export type ConversationUpdateWithoutMessagesInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  directHash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  participants?: InputMaybe<ConversationParticipantUpdateManyWithoutConversationNestedInput>;
  rideId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumConversationTypeFieldUpdateOperationsInput>;
};

export type ConversationUpdateWithoutParticipantsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  directHash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutConversationNestedInput>;
  rideId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumConversationTypeFieldUpdateOperationsInput>;
};

export type ConversationUpsertWithoutMessagesInput = {
  create: ConversationCreateWithoutMessagesInput;
  update: ConversationUpdateWithoutMessagesInput;
  where?: InputMaybe<ConversationWhereInput>;
};

export type ConversationUpsertWithoutParticipantsInput = {
  create: ConversationCreateWithoutParticipantsInput;
  update: ConversationUpdateWithoutParticipantsInput;
  where?: InputMaybe<ConversationWhereInput>;
};

export type ConversationWhereInput = {
  AND?: InputMaybe<Array<ConversationWhereInput>>;
  NOT?: InputMaybe<Array<ConversationWhereInput>>;
  OR?: InputMaybe<Array<ConversationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  directHash?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  participants?: InputMaybe<ConversationParticipantListRelationFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumConversationTypeFilter>;
};

export type ConversationWhereUniqueInput = {
  AND?: InputMaybe<Array<ConversationWhereInput>>;
  NOT?: InputMaybe<Array<ConversationWhereInput>>;
  OR?: InputMaybe<Array<ConversationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  directHash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  messages?: InputMaybe<MessageListRelationFilter>;
  participants?: InputMaybe<ConversationParticipantListRelationFilter>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumConversationTypeFilter>;
};

export type CreateConversationInput = {
  participantIds: Array<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: ConversationType;
};

export type CreateDriverVehicleInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Float']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  uploadDocuments?: InputMaybe<Array<UploadVehicleDocumentsInput>>;
  uploadImages?: InputMaybe<Array<UploadedFileRefInput>>;
  vehicleTypeId: Scalars['String']['input'];
};

export type CurrentPosition = {
  __typename?: 'CurrentPosition';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude: Scalars['Decimal']['output'];
  longitude: Scalars['Decimal']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  recordedAt: Scalars['DateTime']['output'];
  speed?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  vehicle: DriverVehicle;
  vehicleId: Scalars['String']['output'];
};

export type CurrentPositionAvgAggregate = {
  __typename?: 'CurrentPositionAvgAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
};

export type CurrentPositionCountAggregate = {
  __typename?: 'CurrentPositionCountAggregate';
  _all: Scalars['Int']['output'];
  accuracy: Scalars['Int']['output'];
  altitude: Scalars['Int']['output'];
  battery: Scalars['Int']['output'];
  heading: Scalars['Int']['output'];
  latitude: Scalars['Int']['output'];
  longitude: Scalars['Int']['output'];
  provider: Scalars['Int']['output'];
  recordedAt: Scalars['Int']['output'];
  speed: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  vehicleId: Scalars['Int']['output'];
};

export type CurrentPositionCreateManyVehicleInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  battery?: InputMaybe<Scalars['Int']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Decimal']['input'];
  longitude: Scalars['Decimal']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedAt?: InputMaybe<Scalars['DateTime']['input']>;
  speed?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CurrentPositionCreateManyVehicleInputEnvelope = {
  data: Array<CurrentPositionCreateManyVehicleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CurrentPositionCreateNestedManyWithoutVehicleInput = {
  connect?: InputMaybe<Array<CurrentPositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CurrentPositionCreateOrConnectWithoutVehicleInput>>;
  create?: InputMaybe<Array<CurrentPositionCreateWithoutVehicleInput>>;
  createMany?: InputMaybe<CurrentPositionCreateManyVehicleInputEnvelope>;
};

export type CurrentPositionCreateOrConnectWithoutVehicleInput = {
  create: CurrentPositionCreateWithoutVehicleInput;
  where: CurrentPositionWhereUniqueInput;
};

export type CurrentPositionCreateWithoutVehicleInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  battery?: InputMaybe<Scalars['Int']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  latitude: Scalars['Decimal']['input'];
  longitude: Scalars['Decimal']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedAt?: InputMaybe<Scalars['DateTime']['input']>;
  speed?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CurrentPositionListRelationFilter = {
  every?: InputMaybe<CurrentPositionWhereInput>;
  none?: InputMaybe<CurrentPositionWhereInput>;
  some?: InputMaybe<CurrentPositionWhereInput>;
};

export type CurrentPositionMaxAggregate = {
  __typename?: 'CurrentPositionMaxAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  recordedAt?: Maybe<Scalars['DateTime']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type CurrentPositionMinAggregate = {
  __typename?: 'CurrentPositionMinAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  recordedAt?: Maybe<Scalars['DateTime']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type CurrentPositionScalarWhereInput = {
  AND?: InputMaybe<Array<CurrentPositionScalarWhereInput>>;
  NOT?: InputMaybe<Array<CurrentPositionScalarWhereInput>>;
  OR?: InputMaybe<Array<CurrentPositionScalarWhereInput>>;
  accuracy?: InputMaybe<FloatNullableFilter>;
  altitude?: InputMaybe<FloatNullableFilter>;
  battery?: InputMaybe<IntNullableFilter>;
  heading?: InputMaybe<FloatNullableFilter>;
  latitude?: InputMaybe<DecimalFilter>;
  longitude?: InputMaybe<DecimalFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  recordedAt?: InputMaybe<DateTimeFilter>;
  speed?: InputMaybe<FloatNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicleId?: InputMaybe<StringFilter>;
};

export type CurrentPositionSumAggregate = {
  __typename?: 'CurrentPositionSumAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
};

export type CurrentPositionUpdateManyMutationInput = {
  accuracy?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  altitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  battery?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  heading?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  latitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  longitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  provider?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recordedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  speed?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CurrentPositionUpdateManyWithWhereWithoutVehicleInput = {
  data: CurrentPositionUpdateManyMutationInput;
  where: CurrentPositionScalarWhereInput;
};

export type CurrentPositionUpdateManyWithoutVehicleNestedInput = {
  connect?: InputMaybe<Array<CurrentPositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CurrentPositionCreateOrConnectWithoutVehicleInput>>;
  create?: InputMaybe<Array<CurrentPositionCreateWithoutVehicleInput>>;
  createMany?: InputMaybe<CurrentPositionCreateManyVehicleInputEnvelope>;
  delete?: InputMaybe<Array<CurrentPositionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CurrentPositionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CurrentPositionWhereUniqueInput>>;
  set?: InputMaybe<Array<CurrentPositionWhereUniqueInput>>;
  update?: InputMaybe<Array<CurrentPositionUpdateWithWhereUniqueWithoutVehicleInput>>;
  updateMany?: InputMaybe<Array<CurrentPositionUpdateManyWithWhereWithoutVehicleInput>>;
  upsert?: InputMaybe<Array<CurrentPositionUpsertWithWhereUniqueWithoutVehicleInput>>;
};

export type CurrentPositionUpdateWithWhereUniqueWithoutVehicleInput = {
  data: CurrentPositionUpdateWithoutVehicleInput;
  where: CurrentPositionWhereUniqueInput;
};

export type CurrentPositionUpdateWithoutVehicleInput = {
  accuracy?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  altitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  battery?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  heading?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  latitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  longitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  provider?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recordedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  speed?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CurrentPositionUpsertWithWhereUniqueWithoutVehicleInput = {
  create: CurrentPositionCreateWithoutVehicleInput;
  update: CurrentPositionUpdateWithoutVehicleInput;
  where: CurrentPositionWhereUniqueInput;
};

export type CurrentPositionWhereInput = {
  AND?: InputMaybe<Array<CurrentPositionWhereInput>>;
  NOT?: InputMaybe<Array<CurrentPositionWhereInput>>;
  OR?: InputMaybe<Array<CurrentPositionWhereInput>>;
  accuracy?: InputMaybe<FloatNullableFilter>;
  altitude?: InputMaybe<FloatNullableFilter>;
  battery?: InputMaybe<IntNullableFilter>;
  heading?: InputMaybe<FloatNullableFilter>;
  latitude?: InputMaybe<DecimalFilter>;
  longitude?: InputMaybe<DecimalFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  recordedAt?: InputMaybe<DateTimeFilter>;
  speed?: InputMaybe<FloatNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<DriverVehicleScalarRelationFilter>;
  vehicleId?: InputMaybe<StringFilter>;
};

export type CurrentPositionWhereUniqueInput = {
  AND?: InputMaybe<Array<CurrentPositionWhereInput>>;
  NOT?: InputMaybe<Array<CurrentPositionWhereInput>>;
  OR?: InputMaybe<Array<CurrentPositionWhereInput>>;
  accuracy?: InputMaybe<FloatNullableFilter>;
  altitude?: InputMaybe<FloatNullableFilter>;
  battery?: InputMaybe<IntNullableFilter>;
  heading?: InputMaybe<FloatNullableFilter>;
  latitude?: InputMaybe<DecimalFilter>;
  longitude?: InputMaybe<DecimalFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  recordedAt?: InputMaybe<DateTimeFilter>;
  speed?: InputMaybe<FloatNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<DriverVehicleScalarRelationFilter>;
  vehicleId?: InputMaybe<Scalars['String']['input']>;
};

export type CustomFileUpdateInput = {
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Decimal']['input']>;
  divide?: InputMaybe<Scalars['Decimal']['input']>;
  increment?: InputMaybe<Scalars['Decimal']['input']>;
  multiply?: InputMaybe<Scalars['Decimal']['input']>;
  set?: InputMaybe<Scalars['Decimal']['input']>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type DriverVehicle = {
  __typename?: 'DriverVehicle';
  CurrentPosition?: Maybe<Array<CurrentPosition>>;
  Position?: Maybe<Array<Position>>;
  VehicleDocument?: Maybe<Array<VehicleDocument>>;
  VehicleImage?: Maybe<Array<VehicleImage>>;
  _count: DriverVehicleCount;
  brand?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  model?: Maybe<Scalars['String']['output']>;
  place: Scalars['Int']['output'];
  registrationNumber?: Maybe<Scalars['String']['output']>;
  type: VehicleType;
  user: User;
  userId: Scalars['String']['output'];
  vehicleTypeId: Scalars['String']['output'];
};

export type DriverVehicleAvgAggregate = {
  __typename?: 'DriverVehicleAvgAggregate';
  place?: Maybe<Scalars['Float']['output']>;
};

export type DriverVehicleCount = {
  __typename?: 'DriverVehicleCount';
  CurrentPosition: Scalars['Int']['output'];
  Position: Scalars['Int']['output'];
  VehicleDocument: Scalars['Int']['output'];
  VehicleImage: Scalars['Int']['output'];
};

export type DriverVehicleCountAggregate = {
  __typename?: 'DriverVehicleCountAggregate';
  _all: Scalars['Int']['output'];
  brand: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  model: Scalars['Int']['output'];
  place: Scalars['Int']['output'];
  registrationNumber: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  vehicleTypeId: Scalars['Int']['output'];
};

export type DriverVehicleCreateManyTypeInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type DriverVehicleCreateManyTypeInputEnvelope = {
  data: Array<DriverVehicleCreateManyTypeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DriverVehicleCreateManyUserInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  vehicleTypeId: Scalars['String']['input'];
};

export type DriverVehicleCreateManyUserInputEnvelope = {
  data: Array<DriverVehicleCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DriverVehicleCreateNestedManyWithoutTypeInput = {
  connect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverVehicleCreateOrConnectWithoutTypeInput>>;
  create?: InputMaybe<Array<DriverVehicleCreateWithoutTypeInput>>;
  createMany?: InputMaybe<DriverVehicleCreateManyTypeInputEnvelope>;
};

export type DriverVehicleCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverVehicleCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<DriverVehicleCreateWithoutUserInput>>;
  createMany?: InputMaybe<DriverVehicleCreateManyUserInputEnvelope>;
};

export type DriverVehicleCreateNestedOneWithoutPositionInput = {
  connect?: InputMaybe<DriverVehicleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DriverVehicleCreateOrConnectWithoutPositionInput>;
  create?: InputMaybe<DriverVehicleCreateWithoutPositionInput>;
};

export type DriverVehicleCreateNestedOneWithoutVehicleDocumentInput = {
  connect?: InputMaybe<DriverVehicleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DriverVehicleCreateOrConnectWithoutVehicleDocumentInput>;
  create?: InputMaybe<DriverVehicleCreateWithoutVehicleDocumentInput>;
};

export type DriverVehicleCreateNestedOneWithoutVehicleImageInput = {
  connect?: InputMaybe<DriverVehicleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DriverVehicleCreateOrConnectWithoutVehicleImageInput>;
  create?: InputMaybe<DriverVehicleCreateWithoutVehicleImageInput>;
};

export type DriverVehicleCreateOrConnectWithoutPositionInput = {
  create: DriverVehicleCreateWithoutPositionInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleCreateOrConnectWithoutTypeInput = {
  create: DriverVehicleCreateWithoutTypeInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleCreateOrConnectWithoutUserInput = {
  create: DriverVehicleCreateWithoutUserInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleCreateOrConnectWithoutVehicleDocumentInput = {
  create: DriverVehicleCreateWithoutVehicleDocumentInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleCreateOrConnectWithoutVehicleImageInput = {
  create: DriverVehicleCreateWithoutVehicleImageInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleCreateWithoutPositionInput = {
  CurrentPosition?: InputMaybe<CurrentPositionCreateNestedManyWithoutVehicleInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  type: VehicleTypeCreateNestedOneWithoutVehiclesInput;
  user: UserCreateNestedOneWithoutVehiclesInput;
};

export type DriverVehicleCreateWithoutTypeInput = {
  CurrentPosition?: InputMaybe<CurrentPositionCreateNestedManyWithoutVehicleInput>;
  Position?: InputMaybe<PositionCreateNestedManyWithoutVehicleInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  user: UserCreateNestedOneWithoutVehiclesInput;
};

export type DriverVehicleCreateWithoutUserInput = {
  CurrentPosition?: InputMaybe<CurrentPositionCreateNestedManyWithoutVehicleInput>;
  Position?: InputMaybe<PositionCreateNestedManyWithoutVehicleInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  type: VehicleTypeCreateNestedOneWithoutVehiclesInput;
};

export type DriverVehicleCreateWithoutVehicleDocumentInput = {
  CurrentPosition?: InputMaybe<CurrentPositionCreateNestedManyWithoutVehicleInput>;
  Position?: InputMaybe<PositionCreateNestedManyWithoutVehicleInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  type: VehicleTypeCreateNestedOneWithoutVehiclesInput;
  user: UserCreateNestedOneWithoutVehiclesInput;
};

export type DriverVehicleCreateWithoutVehicleImageInput = {
  CurrentPosition?: InputMaybe<CurrentPositionCreateNestedManyWithoutVehicleInput>;
  Position?: InputMaybe<PositionCreateNestedManyWithoutVehicleInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  type: VehicleTypeCreateNestedOneWithoutVehiclesInput;
  user: UserCreateNestedOneWithoutVehiclesInput;
};

export type DriverVehicleListRelationFilter = {
  every?: InputMaybe<DriverVehicleWhereInput>;
  none?: InputMaybe<DriverVehicleWhereInput>;
  some?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleMaxAggregate = {
  __typename?: 'DriverVehicleMaxAggregate';
  brand?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['Int']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  vehicleTypeId?: Maybe<Scalars['String']['output']>;
};

export type DriverVehicleMinAggregate = {
  __typename?: 'DriverVehicleMinAggregate';
  brand?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  model?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['Int']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  vehicleTypeId?: Maybe<Scalars['String']['output']>;
};

export type DriverVehicleNullableScalarRelationFilter = {
  is?: InputMaybe<DriverVehicleWhereInput>;
  isNot?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DriverVehicleScalarRelationFilter = {
  is?: InputMaybe<DriverVehicleWhereInput>;
  isNot?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleScalarWhereInput = {
  AND?: InputMaybe<Array<DriverVehicleScalarWhereInput>>;
  NOT?: InputMaybe<Array<DriverVehicleScalarWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleScalarWhereInput>>;
  brand?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  model?: InputMaybe<StringNullableFilter>;
  place?: InputMaybe<IntFilter>;
  registrationNumber?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
  vehicleTypeId?: InputMaybe<StringFilter>;
};

export type DriverVehicleSumAggregate = {
  __typename?: 'DriverVehicleSumAggregate';
  place?: Maybe<Scalars['Int']['output']>;
};

export type DriverVehicleUpdateManyMutationInput = {
  brand?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  place?: InputMaybe<IntFieldUpdateOperationsInput>;
  registrationNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type DriverVehicleUpdateManyWithWhereWithoutTypeInput = {
  data: DriverVehicleUpdateManyMutationInput;
  where: DriverVehicleScalarWhereInput;
};

export type DriverVehicleUpdateManyWithWhereWithoutUserInput = {
  data: DriverVehicleUpdateManyMutationInput;
  where: DriverVehicleScalarWhereInput;
};

export type DriverVehicleUpdateManyWithoutTypeNestedInput = {
  connect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverVehicleCreateOrConnectWithoutTypeInput>>;
  create?: InputMaybe<Array<DriverVehicleCreateWithoutTypeInput>>;
  createMany?: InputMaybe<DriverVehicleCreateManyTypeInputEnvelope>;
  delete?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DriverVehicleScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  set?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  update?: InputMaybe<Array<DriverVehicleUpdateWithWhereUniqueWithoutTypeInput>>;
  updateMany?: InputMaybe<Array<DriverVehicleUpdateManyWithWhereWithoutTypeInput>>;
  upsert?: InputMaybe<Array<DriverVehicleUpsertWithWhereUniqueWithoutTypeInput>>;
};

export type DriverVehicleUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverVehicleCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<DriverVehicleCreateWithoutUserInput>>;
  createMany?: InputMaybe<DriverVehicleCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DriverVehicleScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  set?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  update?: InputMaybe<Array<DriverVehicleUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<DriverVehicleUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<DriverVehicleUpsertWithWhereUniqueWithoutUserInput>>;
};

export type DriverVehicleUpdateOneRequiredWithoutPositionNestedInput = {
  connect?: InputMaybe<DriverVehicleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DriverVehicleCreateOrConnectWithoutPositionInput>;
  create?: InputMaybe<DriverVehicleCreateWithoutPositionInput>;
  update?: InputMaybe<DriverVehicleUpdateToOneWithWhereWithoutPositionInput>;
  upsert?: InputMaybe<DriverVehicleUpsertWithoutPositionInput>;
};

export type DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput = {
  connect?: InputMaybe<DriverVehicleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DriverVehicleCreateOrConnectWithoutVehicleDocumentInput>;
  create?: InputMaybe<DriverVehicleCreateWithoutVehicleDocumentInput>;
  delete?: InputMaybe<DriverVehicleWhereInput>;
  disconnect?: InputMaybe<DriverVehicleWhereInput>;
  update?: InputMaybe<DriverVehicleUpdateToOneWithWhereWithoutVehicleDocumentInput>;
  upsert?: InputMaybe<DriverVehicleUpsertWithoutVehicleDocumentInput>;
};

export type DriverVehicleUpdateOneWithoutVehicleImageNestedInput = {
  connect?: InputMaybe<DriverVehicleWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DriverVehicleCreateOrConnectWithoutVehicleImageInput>;
  create?: InputMaybe<DriverVehicleCreateWithoutVehicleImageInput>;
  delete?: InputMaybe<DriverVehicleWhereInput>;
  disconnect?: InputMaybe<DriverVehicleWhereInput>;
  update?: InputMaybe<DriverVehicleUpdateToOneWithWhereWithoutVehicleImageInput>;
  upsert?: InputMaybe<DriverVehicleUpsertWithoutVehicleImageInput>;
};

export type DriverVehicleUpdateToOneWithWhereWithoutPositionInput = {
  data: DriverVehicleUpdateWithoutPositionInput;
  where?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleUpdateToOneWithWhereWithoutVehicleDocumentInput = {
  data: DriverVehicleUpdateWithoutVehicleDocumentInput;
  where?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleUpdateToOneWithWhereWithoutVehicleImageInput = {
  data: DriverVehicleUpdateWithoutVehicleImageInput;
  where?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleUpdateWithWhereUniqueWithoutTypeInput = {
  data: DriverVehicleUpdateWithoutTypeInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleUpdateWithWhereUniqueWithoutUserInput = {
  data: DriverVehicleUpdateWithoutUserInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleUpdateWithoutPositionInput = {
  CurrentPosition?: InputMaybe<CurrentPositionUpdateManyWithoutVehicleNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
  brand?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  place?: InputMaybe<IntFieldUpdateOperationsInput>;
  registrationNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutVehiclesNestedInput>;
};

export type DriverVehicleUpdateWithoutTypeInput = {
  CurrentPosition?: InputMaybe<CurrentPositionUpdateManyWithoutVehicleNestedInput>;
  Position?: InputMaybe<PositionUpdateManyWithoutVehicleNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
  brand?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  place?: InputMaybe<IntFieldUpdateOperationsInput>;
  registrationNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutVehiclesNestedInput>;
};

export type DriverVehicleUpdateWithoutUserInput = {
  CurrentPosition?: InputMaybe<CurrentPositionUpdateManyWithoutVehicleNestedInput>;
  Position?: InputMaybe<PositionUpdateManyWithoutVehicleNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
  brand?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  place?: InputMaybe<IntFieldUpdateOperationsInput>;
  registrationNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
};

export type DriverVehicleUpdateWithoutVehicleDocumentInput = {
  CurrentPosition?: InputMaybe<CurrentPositionUpdateManyWithoutVehicleNestedInput>;
  Position?: InputMaybe<PositionUpdateManyWithoutVehicleNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
  brand?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  place?: InputMaybe<IntFieldUpdateOperationsInput>;
  registrationNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutVehiclesNestedInput>;
};

export type DriverVehicleUpdateWithoutVehicleImageInput = {
  CurrentPosition?: InputMaybe<CurrentPositionUpdateManyWithoutVehicleNestedInput>;
  Position?: InputMaybe<PositionUpdateManyWithoutVehicleNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
  brand?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  place?: InputMaybe<IntFieldUpdateOperationsInput>;
  registrationNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutVehiclesNestedInput>;
};

export type DriverVehicleUpsertWithWhereUniqueWithoutTypeInput = {
  create: DriverVehicleCreateWithoutTypeInput;
  update: DriverVehicleUpdateWithoutTypeInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleUpsertWithWhereUniqueWithoutUserInput = {
  create: DriverVehicleCreateWithoutUserInput;
  update: DriverVehicleUpdateWithoutUserInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleUpsertWithoutPositionInput = {
  create: DriverVehicleCreateWithoutPositionInput;
  update: DriverVehicleUpdateWithoutPositionInput;
  where?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleUpsertWithoutVehicleDocumentInput = {
  create: DriverVehicleCreateWithoutVehicleDocumentInput;
  update: DriverVehicleUpdateWithoutVehicleDocumentInput;
  where?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleUpsertWithoutVehicleImageInput = {
  create: DriverVehicleCreateWithoutVehicleImageInput;
  update: DriverVehicleUpdateWithoutVehicleImageInput;
  where?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleWhereInput = {
  AND?: InputMaybe<Array<DriverVehicleWhereInput>>;
  CurrentPosition?: InputMaybe<CurrentPositionListRelationFilter>;
  NOT?: InputMaybe<Array<DriverVehicleWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleWhereInput>>;
  Position?: InputMaybe<PositionListRelationFilter>;
  VehicleDocument?: InputMaybe<VehicleDocumentListRelationFilter>;
  VehicleImage?: InputMaybe<VehicleImageListRelationFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  model?: InputMaybe<StringNullableFilter>;
  place?: InputMaybe<IntFilter>;
  registrationNumber?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<VehicleTypeScalarRelationFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  vehicleTypeId?: InputMaybe<StringFilter>;
};

export type DriverVehicleWhereUniqueInput = {
  AND?: InputMaybe<Array<DriverVehicleWhereInput>>;
  CurrentPosition?: InputMaybe<CurrentPositionListRelationFilter>;
  NOT?: InputMaybe<Array<DriverVehicleWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleWhereInput>>;
  Position?: InputMaybe<PositionListRelationFilter>;
  VehicleDocument?: InputMaybe<VehicleDocumentListRelationFilter>;
  VehicleImage?: InputMaybe<VehicleImageListRelationFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<StringNullableFilter>;
  place?: InputMaybe<IntFilter>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<VehicleTypeScalarRelationFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  vehicleTypeId?: InputMaybe<StringFilter>;
};

export type EnumAttachmentTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AttachmentType>;
};

export type EnumAttachmentTypeFilter = {
  equals?: InputMaybe<AttachmentType>;
  in?: InputMaybe<Array<AttachmentType>>;
  not?: InputMaybe<NestedEnumAttachmentTypeFilter>;
  notIn?: InputMaybe<Array<AttachmentType>>;
};

export type EnumConversationTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ConversationType>;
};

export type EnumConversationTypeFilter = {
  equals?: InputMaybe<ConversationType>;
  in?: InputMaybe<Array<ConversationType>>;
  not?: InputMaybe<NestedEnumConversationTypeFilter>;
  notIn?: InputMaybe<Array<ConversationType>>;
};

export type EnumFileTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<FileType>;
};

export type EnumFileTypeFilter = {
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<NestedEnumFileTypeFilter>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type EnumMessageStateFieldUpdateOperationsInput = {
  set?: InputMaybe<MessageState>;
};

export type EnumMessageStateFilter = {
  equals?: InputMaybe<MessageState>;
  in?: InputMaybe<Array<MessageState>>;
  not?: InputMaybe<NestedEnumMessageStateFilter>;
  notIn?: InputMaybe<Array<MessageState>>;
};

export type EnumUserDocumentTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<UserDocumentType>;
};

export type EnumUserDocumentTypeFilter = {
  equals?: InputMaybe<UserDocumentType>;
  in?: InputMaybe<Array<UserDocumentType>>;
  not?: InputMaybe<NestedEnumUserDocumentTypeFilter>;
  notIn?: InputMaybe<Array<UserDocumentType>>;
};

export type EnumVehicleDocumentTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<VehicleDocumentType>;
};

export type EnumVehicleDocumentTypeFilter = {
  equals?: InputMaybe<VehicleDocumentType>;
  in?: InputMaybe<Array<VehicleDocumentType>>;
  not?: InputMaybe<NestedEnumVehicleDocumentTypeFilter>;
  notIn?: InputMaybe<Array<VehicleDocumentType>>;
};

export type File = {
  __typename?: 'File';
  Attachment?: Maybe<Array<Attachment>>;
  User?: Maybe<Array<User>>;
  UserCover?: Maybe<Array<UserCover>>;
  UserDocument?: Maybe<Array<UserDocument>>;
  UserImage?: Maybe<Array<UserImage>>;
  VehicleDocument?: Maybe<Array<VehicleDocument>>;
  VehicleImage?: Maybe<Array<VehicleImage>>;
  _count: FileCount;
  contentType?: Maybe<Scalars['String']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  type: FileType;
  url?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type FileAvgAggregate = {
  __typename?: 'FileAvgAggregate';
  size?: Maybe<Scalars['Float']['output']>;
};

export type FileCount = {
  __typename?: 'FileCount';
  Attachment: Scalars['Int']['output'];
  User: Scalars['Int']['output'];
  UserCover: Scalars['Int']['output'];
  UserDocument: Scalars['Int']['output'];
  UserImage: Scalars['Int']['output'];
  VehicleDocument: Scalars['Int']['output'];
  VehicleImage: Scalars['Int']['output'];
};

export type FileCountAggregate = {
  __typename?: 'FileCountAggregate';
  _all: Scalars['Int']['output'];
  contentType: Scalars['Int']['output'];
  driverVehicleId: Scalars['Int']['output'];
  etag: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['Int']['output'];
  meta: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  originalName: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type FileCreateInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateNestedOneWithoutAttachmentInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutAttachmentInput>;
  create?: InputMaybe<FileCreateWithoutAttachmentInput>;
};

export type FileCreateNestedOneWithoutUserCoverInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserCoverInput>;
  create?: InputMaybe<FileCreateWithoutUserCoverInput>;
};

export type FileCreateNestedOneWithoutUserDocumentInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserDocumentInput>;
  create?: InputMaybe<FileCreateWithoutUserDocumentInput>;
};

export type FileCreateNestedOneWithoutUserImageInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserImageInput>;
  create?: InputMaybe<FileCreateWithoutUserImageInput>;
};

export type FileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<FileCreateWithoutUserInput>;
};

export type FileCreateNestedOneWithoutVehicleDocumentInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutVehicleDocumentInput>;
  create?: InputMaybe<FileCreateWithoutVehicleDocumentInput>;
};

export type FileCreateNestedOneWithoutVehicleImageInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutVehicleImageInput>;
  create?: InputMaybe<FileCreateWithoutVehicleImageInput>;
};

export type FileCreateOrConnectWithoutAttachmentInput = {
  create: FileCreateWithoutAttachmentInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutUserCoverInput = {
  create: FileCreateWithoutUserCoverInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutUserDocumentInput = {
  create: FileCreateWithoutUserDocumentInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutUserImageInput = {
  create: FileCreateWithoutUserImageInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutUserInput = {
  create: FileCreateWithoutUserInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutVehicleDocumentInput = {
  create: FileCreateWithoutVehicleDocumentInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutVehicleImageInput = {
  create: FileCreateWithoutVehicleImageInput;
  where: FileWhereUniqueInput;
};

export type FileCreateWithoutAttachmentInput = {
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutUserCoverInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutUserDocumentInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutUserImageInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutUserInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutVehicleDocumentInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleImage?: InputMaybe<VehicleImageCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutVehicleImageInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutFileInput>;
  User?: InputMaybe<UserCreateNestedManyWithoutAvatarInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedManyWithoutFileInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutFileInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutFileInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentCreateNestedManyWithoutFileInput>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  driverVehicleId?: InputMaybe<Scalars['String']['input']>;
  etag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originalName: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type: FileType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileMaxAggregate = {
  __typename?: 'FileMaxAggregate';
  contentType?: Maybe<Scalars['String']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<FileType>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type FileMetaInput = {
  contentType: Scalars['String']['input'];
  originalName: Scalars['String']['input'];
  uniqueId?: InputMaybe<Scalars['String']['input']>;
};

export type FileMinAggregate = {
  __typename?: 'FileMinAggregate';
  contentType?: Maybe<Scalars['String']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<FileType>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type FileNullableScalarRelationFilter = {
  is?: InputMaybe<FileWhereInput>;
  isNot?: InputMaybe<FileWhereInput>;
};

export type FileOrderByWithRelationInput = {
  Attachment?: InputMaybe<AttachmentOrderByRelationAggregateInput>;
  User?: InputMaybe<UserOrderByRelationAggregateInput>;
  UserCover?: InputMaybe<UserCoverOrderByRelationAggregateInput>;
  UserDocument?: InputMaybe<UserDocumentOrderByRelationAggregateInput>;
  UserImage?: InputMaybe<UserImageOrderByRelationAggregateInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentOrderByRelationAggregateInput>;
  VehicleImage?: InputMaybe<VehicleImageOrderByRelationAggregateInput>;
  contentType?: InputMaybe<SortOrderInput>;
  driverVehicleId?: InputMaybe<SortOrderInput>;
  etag?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  meta?: InputMaybe<SortOrderInput>;
  name?: InputMaybe<SortOrderInput>;
  originalName?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrderInput>;
  status?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrderInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum FileScalarFieldEnum {
  CONTENTTYPE = 'contentType',
  DRIVERVEHICLEID = 'driverVehicleId',
  ETAG = 'etag',
  ID = 'id',
  KEY = 'key',
  META = 'meta',
  NAME = 'name',
  ORIGINALNAME = 'originalName',
  SIZE = 'size',
  STATUS = 'status',
  TYPE = 'type',
  URL = 'url',
  USERID = 'userId'
}

export type FileScalarRelationFilter = {
  is?: InputMaybe<FileWhereInput>;
  isNot?: InputMaybe<FileWhereInput>;
};

export type FileSumAggregate = {
  __typename?: 'FileSumAggregate';
  size?: Maybe<Scalars['Int']['output']>;
};

export enum FileType {
  AVATAR = 'AVATAR',
  COVER = 'COVER',
  LANDING = 'LANDING',
  MESSAGE = 'MESSAGE',
  USER = 'USER',
  VEHICLE = 'VEHICLE'
}

export type FileUpdateOneRequiredWithoutUserCoverNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserCoverInput>;
  create?: InputMaybe<FileCreateWithoutUserCoverInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutUserCoverInput>;
  upsert?: InputMaybe<FileUpsertWithoutUserCoverInput>;
};

export type FileUpdateOneRequiredWithoutUserDocumentNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserDocumentInput>;
  create?: InputMaybe<FileCreateWithoutUserDocumentInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutUserDocumentInput>;
  upsert?: InputMaybe<FileUpsertWithoutUserDocumentInput>;
};

export type FileUpdateOneRequiredWithoutUserImageNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserImageInput>;
  create?: InputMaybe<FileCreateWithoutUserImageInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutUserImageInput>;
  upsert?: InputMaybe<FileUpsertWithoutUserImageInput>;
};

export type FileUpdateOneRequiredWithoutVehicleDocumentNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutVehicleDocumentInput>;
  create?: InputMaybe<FileCreateWithoutVehicleDocumentInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutVehicleDocumentInput>;
  upsert?: InputMaybe<FileUpsertWithoutVehicleDocumentInput>;
};

export type FileUpdateOneRequiredWithoutVehicleImageNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutVehicleImageInput>;
  create?: InputMaybe<FileCreateWithoutVehicleImageInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutVehicleImageInput>;
  upsert?: InputMaybe<FileUpsertWithoutVehicleImageInput>;
};

export type FileUpdateOneWithoutAttachmentNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutAttachmentInput>;
  create?: InputMaybe<FileCreateWithoutAttachmentInput>;
  delete?: InputMaybe<FileWhereInput>;
  disconnect?: InputMaybe<FileWhereInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutAttachmentInput>;
  upsert?: InputMaybe<FileUpsertWithoutAttachmentInput>;
};

export type FileUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<FileCreateWithoutUserInput>;
  delete?: InputMaybe<FileWhereInput>;
  disconnect?: InputMaybe<FileWhereInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutUserInput>;
  upsert?: InputMaybe<FileUpsertWithoutUserInput>;
};

export type FileUpdateToOneWithWhereWithoutAttachmentInput = {
  data: FileUpdateWithoutAttachmentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutUserCoverInput = {
  data: FileUpdateWithoutUserCoverInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutUserDocumentInput = {
  data: FileUpdateWithoutUserDocumentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutUserImageInput = {
  data: FileUpdateWithoutUserImageInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutUserInput = {
  data: FileUpdateWithoutUserInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutVehicleDocumentInput = {
  data: FileUpdateWithoutVehicleDocumentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutVehicleImageInput = {
  data: FileUpdateWithoutVehicleImageInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateWithoutAttachmentInput = {
  User?: InputMaybe<UserUpdateManyWithoutAvatarNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateManyWithoutFileNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutFileNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutFileNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutFileNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutUserCoverInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutFileNestedInput>;
  User?: InputMaybe<UserUpdateManyWithoutAvatarNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutFileNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutFileNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutFileNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutUserDocumentInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutFileNestedInput>;
  User?: InputMaybe<UserUpdateManyWithoutAvatarNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateManyWithoutFileNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutFileNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutFileNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutUserImageInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutFileNestedInput>;
  User?: InputMaybe<UserUpdateManyWithoutAvatarNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateManyWithoutFileNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutFileNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutFileNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutUserInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutFileNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateManyWithoutFileNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutFileNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutFileNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutFileNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutVehicleDocumentInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutFileNestedInput>;
  User?: InputMaybe<UserUpdateManyWithoutAvatarNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateManyWithoutFileNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutFileNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutFileNestedInput>;
  VehicleImage?: InputMaybe<VehicleImageUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutVehicleImageInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutFileNestedInput>;
  User?: InputMaybe<UserUpdateManyWithoutAvatarNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateManyWithoutFileNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutFileNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutFileNestedInput>;
  VehicleDocument?: InputMaybe<VehicleDocumentUpdateManyWithoutFileNestedInput>;
  contentType?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  driverVehicleId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  etag?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  key?: InputMaybe<StringFieldUpdateOperationsInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  originalName?: InputMaybe<StringFieldUpdateOperationsInput>;
  size?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumFileTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUploadResult = {
  __typename?: 'FileUploadResult';
  url: Scalars['String']['output'];
};

export type FileUpsertWithoutAttachmentInput = {
  create: FileCreateWithoutAttachmentInput;
  update: FileUpdateWithoutAttachmentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutUserCoverInput = {
  create: FileCreateWithoutUserCoverInput;
  update: FileUpdateWithoutUserCoverInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutUserDocumentInput = {
  create: FileCreateWithoutUserDocumentInput;
  update: FileUpdateWithoutUserDocumentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutUserImageInput = {
  create: FileCreateWithoutUserImageInput;
  update: FileUpdateWithoutUserImageInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutUserInput = {
  create: FileCreateWithoutUserInput;
  update: FileUpdateWithoutUserInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutVehicleDocumentInput = {
  create: FileCreateWithoutVehicleDocumentInput;
  update: FileUpdateWithoutVehicleDocumentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutVehicleImageInput = {
  create: FileCreateWithoutVehicleImageInput;
  update: FileUpdateWithoutVehicleImageInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileWhereInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  Attachment?: InputMaybe<AttachmentListRelationFilter>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  User?: InputMaybe<UserListRelationFilter>;
  UserCover?: InputMaybe<UserCoverListRelationFilter>;
  UserDocument?: InputMaybe<UserDocumentListRelationFilter>;
  UserImage?: InputMaybe<UserImageListRelationFilter>;
  VehicleDocument?: InputMaybe<VehicleDocumentListRelationFilter>;
  VehicleImage?: InputMaybe<VehicleImageListRelationFilter>;
  contentType?: InputMaybe<StringNullableFilter>;
  driverVehicleId?: InputMaybe<StringNullableFilter>;
  etag?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  key?: InputMaybe<StringFilter>;
  meta?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  originalName?: InputMaybe<StringFilter>;
  size?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumFileTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type FileWhereUniqueInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  Attachment?: InputMaybe<AttachmentListRelationFilter>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  User?: InputMaybe<UserListRelationFilter>;
  UserCover?: InputMaybe<UserCoverListRelationFilter>;
  UserDocument?: InputMaybe<UserDocumentListRelationFilter>;
  UserImage?: InputMaybe<UserImageListRelationFilter>;
  VehicleDocument?: InputMaybe<VehicleDocumentListRelationFilter>;
  VehicleImage?: InputMaybe<VehicleImageListRelationFilter>;
  contentType?: InputMaybe<StringNullableFilter>;
  driverVehicleId?: InputMaybe<StringNullableFilter>;
  etag?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  originalName?: InputMaybe<StringFilter>;
  size?: InputMaybe<IntNullableFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumFileTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type ForgotPasswordOutput = {
  __typename?: 'ForgotPasswordOutput';
  email: Scalars['String']['output'];
  resetLink: Scalars['String']['output'];
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  _count: MessageCount;
  attachments?: Maybe<Array<Attachment>>;
  clientTempId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  conversation?: Maybe<Conversation>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  edited: Scalars['Boolean']['output'];
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  parentMessage?: Maybe<Message>;
  parentMessageId?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<Array<Reaction>>;
  readReceipts?: Maybe<Array<MessageReadReceipt>>;
  replies?: Maybe<Array<Message>>;
  ride?: Maybe<Ride>;
  rideId?: Maybe<Scalars['String']['output']>;
  sender: User;
  senderId: Scalars['String']['output'];
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  state: MessageState;
};

export type MessageCount = {
  __typename?: 'MessageCount';
  attachments: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
  readReceipts: Scalars['Int']['output'];
  replies: Scalars['Int']['output'];
};

export type MessageCountAggregate = {
  __typename?: 'MessageCountAggregate';
  _all: Scalars['Int']['output'];
  clientTempId: Scalars['Int']['output'];
  content: Scalars['Int']['output'];
  conversationId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  deleted: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  deliveredAt: Scalars['Int']['output'];
  edited: Scalars['Int']['output'];
  editedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  parentMessageId: Scalars['Int']['output'];
  rideId: Scalars['Int']['output'];
  senderId: Scalars['Int']['output'];
  sentAt: Scalars['Int']['output'];
  state: Scalars['Int']['output'];
};

export type MessageCreateManyConversationInput = {
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessageId?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  senderId: Scalars['String']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateManyConversationInputEnvelope = {
  data: Array<MessageCreateManyConversationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MessageCreateManyParentMessageInput = {
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  senderId: Scalars['String']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateManyParentMessageInputEnvelope = {
  data: Array<MessageCreateManyParentMessageInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MessageCreateManyRideInput = {
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessageId?: InputMaybe<Scalars['String']['input']>;
  senderId: Scalars['String']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateManyRideInputEnvelope = {
  data: Array<MessageCreateManyRideInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MessageCreateManySenderInput = {
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessageId?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateManySenderInputEnvelope = {
  data: Array<MessageCreateManySenderInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MessageCreateNestedManyWithoutConversationInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutConversationInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutConversationInput>>;
  createMany?: InputMaybe<MessageCreateManyConversationInputEnvelope>;
};

export type MessageCreateNestedManyWithoutParentMessageInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutParentMessageInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutParentMessageInput>>;
  createMany?: InputMaybe<MessageCreateManyParentMessageInputEnvelope>;
};

export type MessageCreateNestedManyWithoutRideInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutRideInput>>;
  createMany?: InputMaybe<MessageCreateManyRideInputEnvelope>;
};

export type MessageCreateNestedManyWithoutSenderInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutSenderInput>>;
  createMany?: InputMaybe<MessageCreateManySenderInputEnvelope>;
};

export type MessageCreateNestedOneWithoutAttachmentsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutAttachmentsInput>;
  create?: InputMaybe<MessageCreateWithoutAttachmentsInput>;
};

export type MessageCreateNestedOneWithoutReactionsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutReactionsInput>;
  create?: InputMaybe<MessageCreateWithoutReactionsInput>;
};

export type MessageCreateNestedOneWithoutReadReceiptsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutReadReceiptsInput>;
  create?: InputMaybe<MessageCreateWithoutReadReceiptsInput>;
};

export type MessageCreateNestedOneWithoutRepliesInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutRepliesInput>;
  create?: InputMaybe<MessageCreateWithoutRepliesInput>;
};

export type MessageCreateOrConnectWithoutAttachmentsInput = {
  create: MessageCreateWithoutAttachmentsInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutConversationInput = {
  create: MessageCreateWithoutConversationInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutParentMessageInput = {
  create: MessageCreateWithoutParentMessageInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutReactionsInput = {
  create: MessageCreateWithoutReactionsInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutReadReceiptsInput = {
  create: MessageCreateWithoutReadReceiptsInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutRepliesInput = {
  create: MessageCreateWithoutRepliesInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutRideInput = {
  create: MessageCreateWithoutRideInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutSenderInput = {
  create: MessageCreateWithoutSenderInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateWithoutAttachmentsInput = {
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutConversationInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutParentMessageInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutReactionsInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutReadReceiptsInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutRepliesInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutRideInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  sender: UserCreateNestedOneWithoutMessageInput;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageCreateWithoutSenderInput = {
  attachments?: InputMaybe<AttachmentCreateNestedManyWithoutMessageInput>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  conversation?: InputMaybe<ConversationCreateNestedOneWithoutMessagesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deliveredAt?: InputMaybe<Scalars['DateTime']['input']>;
  edited?: InputMaybe<Scalars['Boolean']['input']>;
  editedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageCreateNestedOneWithoutRepliesInput>;
  reactions?: InputMaybe<ReactionCreateNestedManyWithoutMessageInput>;
  readReceipts?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutMessageInput>;
  replies?: InputMaybe<MessageCreateNestedManyWithoutParentMessageInput>;
  ride?: InputMaybe<RideCreateNestedOneWithoutMessageInput>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<MessageState>;
};

export type MessageListRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageMaxAggregate = {
  __typename?: 'MessageMaxAggregate';
  clientTempId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  edited?: Maybe<Scalars['Boolean']['output']>;
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  parentMessageId?: Maybe<Scalars['String']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  senderId?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<MessageState>;
};

export type MessageMinAggregate = {
  __typename?: 'MessageMinAggregate';
  clientTempId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  edited?: Maybe<Scalars['Boolean']['output']>;
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  parentMessageId?: Maybe<Scalars['String']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  senderId?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<MessageState>;
};

export type MessageNullableScalarRelationFilter = {
  is?: InputMaybe<MessageWhereInput>;
  isNot?: InputMaybe<MessageWhereInput>;
};

export type MessageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  message: Message;
  type: Scalars['String']['output'];
};

export type MessageReadReceipt = {
  __typename?: 'MessageReadReceipt';
  id: Scalars['String']['output'];
  message: Message;
  messageId: Scalars['String']['output'];
  readAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type MessageReadReceiptCountAggregate = {
  __typename?: 'MessageReadReceiptCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  messageId: Scalars['Int']['output'];
  readAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type MessageReadReceiptCreateManyMessageInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  readAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type MessageReadReceiptCreateManyMessageInputEnvelope = {
  data: Array<MessageReadReceiptCreateManyMessageInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MessageReadReceiptCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
  readAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MessageReadReceiptCreateManyUserInputEnvelope = {
  data: Array<MessageReadReceiptCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MessageReadReceiptCreateNestedManyWithoutMessageInput = {
  connect?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageReadReceiptCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<MessageReadReceiptCreateWithoutMessageInput>>;
  createMany?: InputMaybe<MessageReadReceiptCreateManyMessageInputEnvelope>;
};

export type MessageReadReceiptCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageReadReceiptCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MessageReadReceiptCreateWithoutUserInput>>;
  createMany?: InputMaybe<MessageReadReceiptCreateManyUserInputEnvelope>;
};

export type MessageReadReceiptCreateOrConnectWithoutMessageInput = {
  create: MessageReadReceiptCreateWithoutMessageInput;
  where: MessageReadReceiptWhereUniqueInput;
};

export type MessageReadReceiptCreateOrConnectWithoutUserInput = {
  create: MessageReadReceiptCreateWithoutUserInput;
  where: MessageReadReceiptWhereUniqueInput;
};

export type MessageReadReceiptCreateWithoutMessageInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  readAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutMessageReadReceiptInput;
};

export type MessageReadReceiptCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  message: MessageCreateNestedOneWithoutReadReceiptsInput;
  readAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MessageReadReceiptListRelationFilter = {
  every?: InputMaybe<MessageReadReceiptWhereInput>;
  none?: InputMaybe<MessageReadReceiptWhereInput>;
  some?: InputMaybe<MessageReadReceiptWhereInput>;
};

export type MessageReadReceiptMaxAggregate = {
  __typename?: 'MessageReadReceiptMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type MessageReadReceiptMessageIdUserIdCompoundUniqueInput = {
  messageId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MessageReadReceiptMinAggregate = {
  __typename?: 'MessageReadReceiptMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type MessageReadReceiptOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessageReadReceiptScalarWhereInput = {
  AND?: InputMaybe<Array<MessageReadReceiptScalarWhereInput>>;
  NOT?: InputMaybe<Array<MessageReadReceiptScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageReadReceiptScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  messageId?: InputMaybe<StringFilter>;
  readAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type MessageReadReceiptUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  readAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageReadReceiptUpdateManyWithWhereWithoutMessageInput = {
  data: MessageReadReceiptUpdateManyMutationInput;
  where: MessageReadReceiptScalarWhereInput;
};

export type MessageReadReceiptUpdateManyWithWhereWithoutUserInput = {
  data: MessageReadReceiptUpdateManyMutationInput;
  where: MessageReadReceiptScalarWhereInput;
};

export type MessageReadReceiptUpdateManyWithoutMessageNestedInput = {
  connect?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageReadReceiptCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<MessageReadReceiptCreateWithoutMessageInput>>;
  createMany?: InputMaybe<MessageReadReceiptCreateManyMessageInputEnvelope>;
  delete?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageReadReceiptScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageReadReceiptUpdateWithWhereUniqueWithoutMessageInput>>;
  updateMany?: InputMaybe<Array<MessageReadReceiptUpdateManyWithWhereWithoutMessageInput>>;
  upsert?: InputMaybe<Array<MessageReadReceiptUpsertWithWhereUniqueWithoutMessageInput>>;
};

export type MessageReadReceiptUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageReadReceiptCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MessageReadReceiptCreateWithoutUserInput>>;
  createMany?: InputMaybe<MessageReadReceiptCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageReadReceiptScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageReadReceiptWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageReadReceiptUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<MessageReadReceiptUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<MessageReadReceiptUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MessageReadReceiptUpdateWithWhereUniqueWithoutMessageInput = {
  data: MessageReadReceiptUpdateWithoutMessageInput;
  where: MessageReadReceiptWhereUniqueInput;
};

export type MessageReadReceiptUpdateWithWhereUniqueWithoutUserInput = {
  data: MessageReadReceiptUpdateWithoutUserInput;
  where: MessageReadReceiptWhereUniqueInput;
};

export type MessageReadReceiptUpdateWithoutMessageInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  readAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMessageReadReceiptNestedInput>;
};

export type MessageReadReceiptUpdateWithoutUserInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<MessageUpdateOneRequiredWithoutReadReceiptsNestedInput>;
  readAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageReadReceiptUpsertWithWhereUniqueWithoutMessageInput = {
  create: MessageReadReceiptCreateWithoutMessageInput;
  update: MessageReadReceiptUpdateWithoutMessageInput;
  where: MessageReadReceiptWhereUniqueInput;
};

export type MessageReadReceiptUpsertWithWhereUniqueWithoutUserInput = {
  create: MessageReadReceiptCreateWithoutUserInput;
  update: MessageReadReceiptUpdateWithoutUserInput;
  where: MessageReadReceiptWhereUniqueInput;
};

export type MessageReadReceiptWhereInput = {
  AND?: InputMaybe<Array<MessageReadReceiptWhereInput>>;
  NOT?: InputMaybe<Array<MessageReadReceiptWhereInput>>;
  OR?: InputMaybe<Array<MessageReadReceiptWhereInput>>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<MessageScalarRelationFilter>;
  messageId?: InputMaybe<StringFilter>;
  readAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type MessageReadReceiptWhereUniqueInput = {
  AND?: InputMaybe<Array<MessageReadReceiptWhereInput>>;
  NOT?: InputMaybe<Array<MessageReadReceiptWhereInput>>;
  OR?: InputMaybe<Array<MessageReadReceiptWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<MessageScalarRelationFilter>;
  messageId?: InputMaybe<StringFilter>;
  messageId_userId?: InputMaybe<MessageReadReceiptMessageIdUserIdCompoundUniqueInput>;
  readAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type MessageScalarRelationFilter = {
  is?: InputMaybe<MessageWhereInput>;
  isNot?: InputMaybe<MessageWhereInput>;
};

export type MessageScalarWhereInput = {
  AND?: InputMaybe<Array<MessageScalarWhereInput>>;
  NOT?: InputMaybe<Array<MessageScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereInput>>;
  clientTempId?: InputMaybe<StringNullableFilter>;
  content?: InputMaybe<StringNullableFilter>;
  conversationId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  deliveredAt?: InputMaybe<DateTimeNullableFilter>;
  edited?: InputMaybe<BoolFilter>;
  editedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  parentMessageId?: InputMaybe<StringNullableFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  senderId?: InputMaybe<StringFilter>;
  sentAt?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<EnumMessageStateFilter>;
};

export enum MessageState {
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  READ = 'READ',
  SENT = 'SENT'
}

export type MessageUpdateManyMutationInput = {
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateManyWithWhereWithoutConversationInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutParentMessageInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutRideInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutSenderInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithoutConversationNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutConversationInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutConversationInput>>;
  createMany?: InputMaybe<MessageCreateManyConversationInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutConversationInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutConversationInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutConversationInput>>;
};

export type MessageUpdateManyWithoutParentMessageNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutParentMessageInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutParentMessageInput>>;
  createMany?: InputMaybe<MessageCreateManyParentMessageInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutParentMessageInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutParentMessageInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutParentMessageInput>>;
};

export type MessageUpdateManyWithoutRideNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutRideInput>>;
  createMany?: InputMaybe<MessageCreateManyRideInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutRideInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutRideInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutRideInput>>;
};

export type MessageUpdateManyWithoutSenderNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutSenderInput>>;
  createMany?: InputMaybe<MessageCreateManySenderInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutSenderInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutSenderInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutSenderInput>>;
};

export type MessageUpdateOneRequiredWithoutAttachmentsNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutAttachmentsInput>;
  create?: InputMaybe<MessageCreateWithoutAttachmentsInput>;
  update?: InputMaybe<MessageUpdateToOneWithWhereWithoutAttachmentsInput>;
  upsert?: InputMaybe<MessageUpsertWithoutAttachmentsInput>;
};

export type MessageUpdateOneRequiredWithoutReactionsNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutReactionsInput>;
  create?: InputMaybe<MessageCreateWithoutReactionsInput>;
  update?: InputMaybe<MessageUpdateToOneWithWhereWithoutReactionsInput>;
  upsert?: InputMaybe<MessageUpsertWithoutReactionsInput>;
};

export type MessageUpdateOneRequiredWithoutReadReceiptsNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutReadReceiptsInput>;
  create?: InputMaybe<MessageCreateWithoutReadReceiptsInput>;
  update?: InputMaybe<MessageUpdateToOneWithWhereWithoutReadReceiptsInput>;
  upsert?: InputMaybe<MessageUpsertWithoutReadReceiptsInput>;
};

export type MessageUpdateOneWithoutRepliesNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutRepliesInput>;
  create?: InputMaybe<MessageCreateWithoutRepliesInput>;
  delete?: InputMaybe<MessageWhereInput>;
  disconnect?: InputMaybe<MessageWhereInput>;
  update?: InputMaybe<MessageUpdateToOneWithWhereWithoutRepliesInput>;
  upsert?: InputMaybe<MessageUpsertWithoutRepliesInput>;
};

export type MessageUpdateToOneWithWhereWithoutAttachmentsInput = {
  data: MessageUpdateWithoutAttachmentsInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpdateToOneWithWhereWithoutReactionsInput = {
  data: MessageUpdateWithoutReactionsInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpdateToOneWithWhereWithoutReadReceiptsInput = {
  data: MessageUpdateWithoutReadReceiptsInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpdateToOneWithWhereWithoutRepliesInput = {
  data: MessageUpdateWithoutRepliesInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
  data: MessageUpdateWithoutConversationInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutParentMessageInput = {
  data: MessageUpdateWithoutParentMessageInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutRideInput = {
  data: MessageUpdateWithoutRideInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
  data: MessageUpdateWithoutSenderInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithoutAttachmentsInput = {
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutConversationInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutParentMessageInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutReactionsInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutReadReceiptsInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutRepliesInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutRideInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutSenderInput = {
  attachments?: InputMaybe<AttachmentUpdateManyWithoutMessageNestedInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  content?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  conversation?: InputMaybe<ConversationUpdateOneWithoutMessagesNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deleted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  deletedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  deliveredAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  edited?: InputMaybe<BoolFieldUpdateOperationsInput>;
  editedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  parentMessage?: InputMaybe<MessageUpdateOneWithoutRepliesNestedInput>;
  reactions?: InputMaybe<ReactionUpdateManyWithoutMessageNestedInput>;
  readReceipts?: InputMaybe<MessageReadReceiptUpdateManyWithoutMessageNestedInput>;
  replies?: InputMaybe<MessageUpdateManyWithoutParentMessageNestedInput>;
  ride?: InputMaybe<RideUpdateOneWithoutMessageNestedInput>;
  sentAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  state?: InputMaybe<EnumMessageStateFieldUpdateOperationsInput>;
};

export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
  create: MessageCreateWithoutConversationInput;
  update: MessageUpdateWithoutConversationInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutParentMessageInput = {
  create: MessageCreateWithoutParentMessageInput;
  update: MessageUpdateWithoutParentMessageInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutRideInput = {
  create: MessageCreateWithoutRideInput;
  update: MessageUpdateWithoutRideInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
  create: MessageCreateWithoutSenderInput;
  update: MessageUpdateWithoutSenderInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithoutAttachmentsInput = {
  create: MessageCreateWithoutAttachmentsInput;
  update: MessageUpdateWithoutAttachmentsInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpsertWithoutReactionsInput = {
  create: MessageCreateWithoutReactionsInput;
  update: MessageUpdateWithoutReactionsInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpsertWithoutReadReceiptsInput = {
  create: MessageCreateWithoutReadReceiptsInput;
  update: MessageUpdateWithoutReadReceiptsInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageUpsertWithoutRepliesInput = {
  create: MessageCreateWithoutRepliesInput;
  update: MessageUpdateWithoutRepliesInput;
  where?: InputMaybe<MessageWhereInput>;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  attachments?: InputMaybe<AttachmentListRelationFilter>;
  clientTempId?: InputMaybe<StringNullableFilter>;
  content?: InputMaybe<StringNullableFilter>;
  conversation?: InputMaybe<ConversationNullableScalarRelationFilter>;
  conversationId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  deliveredAt?: InputMaybe<DateTimeNullableFilter>;
  edited?: InputMaybe<BoolFilter>;
  editedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  parentMessage?: InputMaybe<MessageNullableScalarRelationFilter>;
  parentMessageId?: InputMaybe<StringNullableFilter>;
  reactions?: InputMaybe<ReactionListRelationFilter>;
  readReceipts?: InputMaybe<MessageReadReceiptListRelationFilter>;
  replies?: InputMaybe<MessageListRelationFilter>;
  ride?: InputMaybe<RideNullableScalarRelationFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  sender?: InputMaybe<UserScalarRelationFilter>;
  senderId?: InputMaybe<StringFilter>;
  sentAt?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<EnumMessageStateFilter>;
};

export type MessageWhereUniqueInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  attachments?: InputMaybe<AttachmentListRelationFilter>;
  clientTempId?: InputMaybe<StringNullableFilter>;
  content?: InputMaybe<StringNullableFilter>;
  conversation?: InputMaybe<ConversationNullableScalarRelationFilter>;
  conversationId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  deliveredAt?: InputMaybe<DateTimeNullableFilter>;
  edited?: InputMaybe<BoolFilter>;
  editedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentMessage?: InputMaybe<MessageNullableScalarRelationFilter>;
  parentMessageId?: InputMaybe<StringNullableFilter>;
  reactions?: InputMaybe<ReactionListRelationFilter>;
  readReceipts?: InputMaybe<MessageReadReceiptListRelationFilter>;
  replies?: InputMaybe<MessageListRelationFilter>;
  ride?: InputMaybe<RideNullableScalarRelationFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  sender?: InputMaybe<UserScalarRelationFilter>;
  senderId?: InputMaybe<StringFilter>;
  sentAt?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<EnumMessageStateFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addParticipant: ConversationParticipant;
  completeUploadBulk: Array<CompleteUploadOutput>;
  createBatchPresignedUrls: Array<PresignedUrl>;
  createConversation: UserConversation;
  createDriverVehicle: DriverVehicle;
  createFile: File;
  createUser: User;
  createUserQr: Scalars['String']['output'];
  createVehicleType: VehicleType;
  deleteConversation: UserConversation;
  deleteCover: User;
  deleteFilesByUserId: Array<File>;
  deleteMessage: Message;
  deleteObject: Scalars['Boolean']['output'];
  deleteUserDocumentByKey: User;
  deleteUserImageByKey: User;
  deleteVehicleDocumentByKey: VehicleDocument;
  deleteVehicleImageByKey: VehicleImage;
  deleteVehicleType: VehicleType;
  editMessage: Message;
  forgotPassword: ForgotPasswordOutput;
  getPresignedUrl: Scalars['String']['output'];
  login?: Maybe<LoginOutput>;
  logout: Scalars['Boolean']['output'];
  markMessageAsDelivered: Message;
  register: User;
  removeAvatar: User;
  removeParticipant: ConversationParticipant;
  resetPassword: Scalars['Boolean']['output'];
  sendMessage: Message;
  updateConversation: UserConversation;
  updateDriverVehicle: DriverVehicle;
  updateFile: File;
  updateUser: User;
  uploadAvatar: User;
  uploadCover: User;
  uploadFile: FileUploadResult;
  uploadUserDocument: User;
  uploadUserImages: User;
  uploadVehicleDocuments: Array<VehicleDocument>;
  uploadVehicleImages: Array<VehicleImage>;
  upsertUserPreference: UserPreference;
};


export type MutationAddParticipantArgs = {
  input: AddParticipantInput;
};


export type MutationCompleteUploadBulkArgs = {
  keys: Array<Scalars['String']['input']>;
  type: FileType;
};


export type MutationCreateBatchPresignedUrlsArgs = {
  files: Array<FileMetaInput>;
  type: FileType;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateDriverVehicleArgs = {
  input: CreateDriverVehicleInput;
};


export type MutationCreateFileArgs = {
  input: FileCreateInput;
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationCreateUserQrArgs = {
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateVehicleTypeArgs = {
  input: VehicleTypeCreateInput;
};


export type MutationDeleteConversationArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationDeleteObjectArgs = {
  key: Scalars['String']['input'];
};


export type MutationDeleteUserDocumentByKeyArgs = {
  documentId: Scalars['String']['input'];
};


export type MutationDeleteUserImageByKeyArgs = {
  key: Scalars['String']['input'];
};


export type MutationDeleteVehicleDocumentByKeyArgs = {
  key: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
};


export type MutationDeleteVehicleImageByKeyArgs = {
  key: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
};


export type MutationDeleteVehicleTypeArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditMessageArgs = {
  content: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGetPresignedUrlArgs = {
  contentType: Scalars['String']['input'];
  expiresIn?: InputMaybe<Scalars['Float']['input']>;
  key: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkMessageAsDeliveredArgs = {
  messageId: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationRemoveParticipantArgs = {
  input: RemoveParticipantInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  sessionToken: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUpdateConversationArgs = {
  conversationId: Scalars['String']['input'];
  input: UpdateConversationInput;
};


export type MutationUpdateDriverVehicleArgs = {
  input: CreateDriverVehicleInput;
  vehicleId: Scalars['String']['input'];
};


export type MutationUpdateFileArgs = {
  id: Scalars['String']['input'];
  input: CustomFileUpdateInput;
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};


export type MutationUploadAvatarArgs = {
  key: Scalars['String']['input'];
};


export type MutationUploadCoverArgs = {
  key: Scalars['String']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUploadUserDocumentArgs = {
  input: Array<UploadUserDocumentsInput>;
};


export type MutationUploadUserImagesArgs = {
  keys: Array<Scalars['String']['input']>;
};


export type MutationUploadVehicleDocumentsArgs = {
  input: Array<UploadVehicleDocumentsInput>;
  vehicleId: Scalars['String']['input'];
};


export type MutationUploadVehicleImagesArgs = {
  keys: Array<Scalars['String']['input']>;
  vehicleId: Scalars['String']['input'];
};


export type MutationUpsertUserPreferenceArgs = {
  input: UserPreferenceUpsertInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedEnumAttachmentTypeFilter = {
  equals?: InputMaybe<AttachmentType>;
  in?: InputMaybe<Array<AttachmentType>>;
  not?: InputMaybe<NestedEnumAttachmentTypeFilter>;
  notIn?: InputMaybe<Array<AttachmentType>>;
};

export type NestedEnumConversationTypeFilter = {
  equals?: InputMaybe<ConversationType>;
  in?: InputMaybe<Array<ConversationType>>;
  not?: InputMaybe<NestedEnumConversationTypeFilter>;
  notIn?: InputMaybe<Array<ConversationType>>;
};

export type NestedEnumFileTypeFilter = {
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<NestedEnumFileTypeFilter>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type NestedEnumMessageStateFilter = {
  equals?: InputMaybe<MessageState>;
  in?: InputMaybe<Array<MessageState>>;
  not?: InputMaybe<NestedEnumMessageStateFilter>;
  notIn?: InputMaybe<Array<MessageState>>;
};

export type NestedEnumUserDocumentTypeFilter = {
  equals?: InputMaybe<UserDocumentType>;
  in?: InputMaybe<Array<UserDocumentType>>;
  not?: InputMaybe<NestedEnumUserDocumentTypeFilter>;
  notIn?: InputMaybe<Array<UserDocumentType>>;
};

export type NestedEnumVehicleDocumentTypeFilter = {
  equals?: InputMaybe<VehicleDocumentType>;
  in?: InputMaybe<Array<VehicleDocumentType>>;
  not?: InputMaybe<NestedEnumVehicleDocumentTypeFilter>;
  notIn?: InputMaybe<Array<VehicleDocumentType>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NullableFloatFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Float']['input']>;
  divide?: InputMaybe<Scalars['Float']['input']>;
  increment?: InputMaybe<Scalars['Float']['input']>;
  multiply?: InputMaybe<Scalars['Float']['input']>;
  set?: InputMaybe<Scalars['Float']['input']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export enum NullsOrder {
  FIRST = 'first',
  LAST = 'last'
}

export type PartialConversationCount = {
  __typename?: 'PartialConversationCount';
  messages?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Scalars['Int']['output']>;
};

export type Position = {
  __typename?: 'Position';
  Ride?: Maybe<Ride>;
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  clientTempId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  is_mock: Scalars['Boolean']['output'];
  latitude: Scalars['Decimal']['output'];
  longitude: Scalars['Decimal']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  recordedAt: Scalars['DateTime']['output'];
  rideId?: Maybe<Scalars['String']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  vehicle: DriverVehicle;
  vehicleId: Scalars['String']['output'];
};

export type PositionAvgAggregate = {
  __typename?: 'PositionAvgAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Float']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
};

export type PositionCountAggregate = {
  __typename?: 'PositionCountAggregate';
  _all: Scalars['Int']['output'];
  accuracy: Scalars['Int']['output'];
  altitude: Scalars['Int']['output'];
  battery: Scalars['Int']['output'];
  clientTempId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  createdBy: Scalars['Int']['output'];
  heading: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  is_mock: Scalars['Int']['output'];
  latitude: Scalars['Int']['output'];
  longitude: Scalars['Int']['output'];
  provider: Scalars['Int']['output'];
  recordedAt: Scalars['Int']['output'];
  rideId: Scalars['Int']['output'];
  speed: Scalars['Int']['output'];
  vehicleId: Scalars['Int']['output'];
};

export type PositionCreateManyRideInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  battery?: InputMaybe<Scalars['Int']['input']>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_mock?: InputMaybe<Scalars['Boolean']['input']>;
  latitude: Scalars['Decimal']['input'];
  longitude: Scalars['Decimal']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedAt?: InputMaybe<Scalars['DateTime']['input']>;
  speed?: InputMaybe<Scalars['Float']['input']>;
  vehicleId: Scalars['String']['input'];
};

export type PositionCreateManyRideInputEnvelope = {
  data: Array<PositionCreateManyRideInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PositionCreateManyVehicleInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  battery?: InputMaybe<Scalars['Int']['input']>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_mock?: InputMaybe<Scalars['Boolean']['input']>;
  latitude: Scalars['Decimal']['input'];
  longitude: Scalars['Decimal']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  speed?: InputMaybe<Scalars['Float']['input']>;
};

export type PositionCreateManyVehicleInputEnvelope = {
  data: Array<PositionCreateManyVehicleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PositionCreateNestedManyWithoutRideInput = {
  connect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PositionCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<PositionCreateWithoutRideInput>>;
  createMany?: InputMaybe<PositionCreateManyRideInputEnvelope>;
};

export type PositionCreateNestedManyWithoutVehicleInput = {
  connect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PositionCreateOrConnectWithoutVehicleInput>>;
  create?: InputMaybe<Array<PositionCreateWithoutVehicleInput>>;
  createMany?: InputMaybe<PositionCreateManyVehicleInputEnvelope>;
};

export type PositionCreateOrConnectWithoutRideInput = {
  create: PositionCreateWithoutRideInput;
  where: PositionWhereUniqueInput;
};

export type PositionCreateOrConnectWithoutVehicleInput = {
  create: PositionCreateWithoutVehicleInput;
  where: PositionWhereUniqueInput;
};

export type PositionCreateWithoutRideInput = {
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  battery?: InputMaybe<Scalars['Int']['input']>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_mock?: InputMaybe<Scalars['Boolean']['input']>;
  latitude: Scalars['Decimal']['input'];
  longitude: Scalars['Decimal']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedAt?: InputMaybe<Scalars['DateTime']['input']>;
  speed?: InputMaybe<Scalars['Float']['input']>;
  vehicle: DriverVehicleCreateNestedOneWithoutPositionInput;
};

export type PositionCreateWithoutVehicleInput = {
  Ride?: InputMaybe<RideCreateNestedOneWithoutPositionsInput>;
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  altitude?: InputMaybe<Scalars['Float']['input']>;
  battery?: InputMaybe<Scalars['Int']['input']>;
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_mock?: InputMaybe<Scalars['Boolean']['input']>;
  latitude: Scalars['Decimal']['input'];
  longitude: Scalars['Decimal']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedAt?: InputMaybe<Scalars['DateTime']['input']>;
  speed?: InputMaybe<Scalars['Float']['input']>;
};

export type PositionListRelationFilter = {
  every?: InputMaybe<PositionWhereInput>;
  none?: InputMaybe<PositionWhereInput>;
  some?: InputMaybe<PositionWhereInput>;
};

export type PositionMaxAggregate = {
  __typename?: 'PositionMaxAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  clientTempId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  is_mock?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  recordedAt?: Maybe<Scalars['DateTime']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type PositionMinAggregate = {
  __typename?: 'PositionMinAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  clientTempId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  is_mock?: Maybe<Scalars['Boolean']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  recordedAt?: Maybe<Scalars['DateTime']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type PositionScalarWhereInput = {
  AND?: InputMaybe<Array<PositionScalarWhereInput>>;
  NOT?: InputMaybe<Array<PositionScalarWhereInput>>;
  OR?: InputMaybe<Array<PositionScalarWhereInput>>;
  accuracy?: InputMaybe<FloatNullableFilter>;
  altitude?: InputMaybe<FloatNullableFilter>;
  battery?: InputMaybe<IntNullableFilter>;
  clientTempId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<StringNullableFilter>;
  heading?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<StringFilter>;
  is_mock?: InputMaybe<BoolFilter>;
  latitude?: InputMaybe<DecimalFilter>;
  longitude?: InputMaybe<DecimalFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  recordedAt?: InputMaybe<DateTimeFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  speed?: InputMaybe<FloatNullableFilter>;
  vehicleId?: InputMaybe<StringFilter>;
};

export type PositionSumAggregate = {
  __typename?: 'PositionSumAggregate';
  accuracy?: Maybe<Scalars['Float']['output']>;
  altitude?: Maybe<Scalars['Float']['output']>;
  battery?: Maybe<Scalars['Int']['output']>;
  heading?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Decimal']['output']>;
  longitude?: Maybe<Scalars['Decimal']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
};

export type PositionUpdateManyMutationInput = {
  accuracy?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  altitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  battery?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  heading?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  is_mock?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  longitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  provider?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recordedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  speed?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
};

export type PositionUpdateManyWithWhereWithoutRideInput = {
  data: PositionUpdateManyMutationInput;
  where: PositionScalarWhereInput;
};

export type PositionUpdateManyWithWhereWithoutVehicleInput = {
  data: PositionUpdateManyMutationInput;
  where: PositionScalarWhereInput;
};

export type PositionUpdateManyWithoutRideNestedInput = {
  connect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PositionCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<PositionCreateWithoutRideInput>>;
  createMany?: InputMaybe<PositionCreateManyRideInputEnvelope>;
  delete?: InputMaybe<Array<PositionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PositionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  set?: InputMaybe<Array<PositionWhereUniqueInput>>;
  update?: InputMaybe<Array<PositionUpdateWithWhereUniqueWithoutRideInput>>;
  updateMany?: InputMaybe<Array<PositionUpdateManyWithWhereWithoutRideInput>>;
  upsert?: InputMaybe<Array<PositionUpsertWithWhereUniqueWithoutRideInput>>;
};

export type PositionUpdateManyWithoutVehicleNestedInput = {
  connect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PositionCreateOrConnectWithoutVehicleInput>>;
  create?: InputMaybe<Array<PositionCreateWithoutVehicleInput>>;
  createMany?: InputMaybe<PositionCreateManyVehicleInputEnvelope>;
  delete?: InputMaybe<Array<PositionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PositionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PositionWhereUniqueInput>>;
  set?: InputMaybe<Array<PositionWhereUniqueInput>>;
  update?: InputMaybe<Array<PositionUpdateWithWhereUniqueWithoutVehicleInput>>;
  updateMany?: InputMaybe<Array<PositionUpdateManyWithWhereWithoutVehicleInput>>;
  upsert?: InputMaybe<Array<PositionUpsertWithWhereUniqueWithoutVehicleInput>>;
};

export type PositionUpdateWithWhereUniqueWithoutRideInput = {
  data: PositionUpdateWithoutRideInput;
  where: PositionWhereUniqueInput;
};

export type PositionUpdateWithWhereUniqueWithoutVehicleInput = {
  data: PositionUpdateWithoutVehicleInput;
  where: PositionWhereUniqueInput;
};

export type PositionUpdateWithoutRideInput = {
  accuracy?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  altitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  battery?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  heading?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  is_mock?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  longitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  provider?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recordedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  speed?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  vehicle?: InputMaybe<DriverVehicleUpdateOneRequiredWithoutPositionNestedInput>;
};

export type PositionUpdateWithoutVehicleInput = {
  Ride?: InputMaybe<RideUpdateOneWithoutPositionsNestedInput>;
  accuracy?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  altitude?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  battery?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  clientTempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  heading?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  is_mock?: InputMaybe<BoolFieldUpdateOperationsInput>;
  latitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  longitude?: InputMaybe<DecimalFieldUpdateOperationsInput>;
  provider?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recordedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  speed?: InputMaybe<NullableFloatFieldUpdateOperationsInput>;
};

export type PositionUpsertWithWhereUniqueWithoutRideInput = {
  create: PositionCreateWithoutRideInput;
  update: PositionUpdateWithoutRideInput;
  where: PositionWhereUniqueInput;
};

export type PositionUpsertWithWhereUniqueWithoutVehicleInput = {
  create: PositionCreateWithoutVehicleInput;
  update: PositionUpdateWithoutVehicleInput;
  where: PositionWhereUniqueInput;
};

export type PositionWhereInput = {
  AND?: InputMaybe<Array<PositionWhereInput>>;
  NOT?: InputMaybe<Array<PositionWhereInput>>;
  OR?: InputMaybe<Array<PositionWhereInput>>;
  Ride?: InputMaybe<RideNullableScalarRelationFilter>;
  accuracy?: InputMaybe<FloatNullableFilter>;
  altitude?: InputMaybe<FloatNullableFilter>;
  battery?: InputMaybe<IntNullableFilter>;
  clientTempId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<StringNullableFilter>;
  heading?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<StringFilter>;
  is_mock?: InputMaybe<BoolFilter>;
  latitude?: InputMaybe<DecimalFilter>;
  longitude?: InputMaybe<DecimalFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  recordedAt?: InputMaybe<DateTimeFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  speed?: InputMaybe<FloatNullableFilter>;
  vehicle?: InputMaybe<DriverVehicleScalarRelationFilter>;
  vehicleId?: InputMaybe<StringFilter>;
};

export type PositionWhereUniqueInput = {
  AND?: InputMaybe<Array<PositionWhereInput>>;
  NOT?: InputMaybe<Array<PositionWhereInput>>;
  OR?: InputMaybe<Array<PositionWhereInput>>;
  Ride?: InputMaybe<RideNullableScalarRelationFilter>;
  accuracy?: InputMaybe<FloatNullableFilter>;
  altitude?: InputMaybe<FloatNullableFilter>;
  battery?: InputMaybe<IntNullableFilter>;
  clientTempId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<StringNullableFilter>;
  heading?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_mock?: InputMaybe<BoolFilter>;
  latitude?: InputMaybe<DecimalFilter>;
  longitude?: InputMaybe<DecimalFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  recordedAt?: InputMaybe<DateTimeFilter>;
  rideId?: InputMaybe<StringNullableFilter>;
  speed?: InputMaybe<FloatNullableFilter>;
  vehicle?: InputMaybe<DriverVehicleScalarRelationFilter>;
  vehicleId?: InputMaybe<StringFilter>;
};

export type PresignedUrl = {
  __typename?: 'PresignedUrl';
  expiresIn: Scalars['Float']['output'];
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type QrToken = {
  __typename?: 'QrToken';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  revoked: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type QrTokenCountAggregate = {
  __typename?: 'QrTokenCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  revoked: Scalars['Int']['output'];
  token: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type QrTokenCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QrTokenCreateManyUserInputEnvelope = {
  data: Array<QrTokenCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QrTokenCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<QrTokenWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<QrTokenCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<QrTokenCreateWithoutUserInput>>;
  createMany?: InputMaybe<QrTokenCreateManyUserInputEnvelope>;
};

export type QrTokenCreateOrConnectWithoutUserInput = {
  create: QrTokenCreateWithoutUserInput;
  where: QrTokenWhereUniqueInput;
};

export type QrTokenCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  revoked?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type QrTokenListRelationFilter = {
  every?: InputMaybe<QrTokenWhereInput>;
  none?: InputMaybe<QrTokenWhereInput>;
  some?: InputMaybe<QrTokenWhereInput>;
};

export type QrTokenMaxAggregate = {
  __typename?: 'QrTokenMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  revoked?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type QrTokenMinAggregate = {
  __typename?: 'QrTokenMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  revoked?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type QrTokenOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type QrTokenScalarWhereInput = {
  AND?: InputMaybe<Array<QrTokenScalarWhereInput>>;
  NOT?: InputMaybe<Array<QrTokenScalarWhereInput>>;
  OR?: InputMaybe<Array<QrTokenScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  revoked?: InputMaybe<BoolFilter>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type QrTokenUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type QrTokenUpdateManyWithWhereWithoutUserInput = {
  data: QrTokenUpdateManyMutationInput;
  where: QrTokenScalarWhereInput;
};

export type QrTokenUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<QrTokenWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<QrTokenCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<QrTokenCreateWithoutUserInput>>;
  createMany?: InputMaybe<QrTokenCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<QrTokenWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<QrTokenScalarWhereInput>>;
  disconnect?: InputMaybe<Array<QrTokenWhereUniqueInput>>;
  set?: InputMaybe<Array<QrTokenWhereUniqueInput>>;
  update?: InputMaybe<Array<QrTokenUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<QrTokenUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<QrTokenUpsertWithWhereUniqueWithoutUserInput>>;
};

export type QrTokenUpdateWithWhereUniqueWithoutUserInput = {
  data: QrTokenUpdateWithoutUserInput;
  where: QrTokenWhereUniqueInput;
};

export type QrTokenUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type QrTokenUpsertWithWhereUniqueWithoutUserInput = {
  create: QrTokenCreateWithoutUserInput;
  update: QrTokenUpdateWithoutUserInput;
  where: QrTokenWhereUniqueInput;
};

export type QrTokenWhereInput = {
  AND?: InputMaybe<Array<QrTokenWhereInput>>;
  NOT?: InputMaybe<Array<QrTokenWhereInput>>;
  OR?: InputMaybe<Array<QrTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  revoked?: InputMaybe<BoolFilter>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type QrTokenWhereUniqueInput = {
  AND?: InputMaybe<Array<QrTokenWhereInput>>;
  NOT?: InputMaybe<Array<QrTokenWhereInput>>;
  OR?: InputMaybe<Array<QrTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  revoked?: InputMaybe<BoolFilter>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Query = {
  __typename?: 'Query';
  VehicleType: VehicleType;
  conversation: UserConversation;
  file: File;
  files: Array<File>;
  getUserQr: Scalars['String']['output'];
  listObjects: Array<Scalars['String']['output']>;
  me: User;
  messages: Array<Message>;
  user: User;
  userByToken: User;
  userConversations: UserConversationsResponse;
  userPreference?: Maybe<UserPreference>;
  users: Array<User>;
  usersForAdmin: Array<User>;
  vehicleTypes: Array<VehicleType>;
  vehicles?: Maybe<Array<DriverVehicle>>;
};


export type QueryVehicleTypeArgs = {
  id: Scalars['String']['input'];
};


export type QueryConversationArgs = {
  id: Scalars['String']['input'];
};


export type QueryFileArgs = {
  id: Scalars['String']['input'];
};


export type QueryFilesArgs = {
  cursor?: InputMaybe<FileWhereUniqueInput>;
  distinct?: InputMaybe<Array<FileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FileWhereInput>;
};


export type QueryGetUserQrArgs = {
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListObjectsArgs = {
  bucket: Scalars['String']['input'];
};


export type QueryMessagesArgs = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Float']['input'];
  rideId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryUserConversationsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersForAdminArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryVehicleTypesArgs = {
  cursor?: InputMaybe<VehicleTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VehicleTypeWhereInput>;
};

export enum QueryMode {
  DEFAULT = 'default',
  INSENSITIVE = 'insensitive'
}

export type Reaction = {
  __typename?: 'Reaction';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  message: Message;
  messageId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ReactionCountAggregate = {
  __typename?: 'ReactionCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  messageId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type ReactionCreateManyMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ReactionCreateManyMessageInputEnvelope = {
  data: Array<ReactionCreateManyMessageInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReactionCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  messageId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ReactionCreateManyUserInputEnvelope = {
  data: Array<ReactionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReactionCreateNestedManyWithoutMessageInput = {
  connect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReactionCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<ReactionCreateWithoutMessageInput>>;
  createMany?: InputMaybe<ReactionCreateManyMessageInputEnvelope>;
};

export type ReactionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReactionCreateManyUserInputEnvelope>;
};

export type ReactionCreateOrConnectWithoutMessageInput = {
  create: ReactionCreateWithoutMessageInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateOrConnectWithoutUserInput = {
  create: ReactionCreateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionCreateWithoutMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  user: UserCreateNestedOneWithoutReactionInput;
};

export type ReactionCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  message: MessageCreateNestedOneWithoutReactionsInput;
  type: Scalars['String']['input'];
};

export type ReactionListRelationFilter = {
  every?: InputMaybe<ReactionWhereInput>;
  none?: InputMaybe<ReactionWhereInput>;
  some?: InputMaybe<ReactionWhereInput>;
};

export type ReactionMaxAggregate = {
  __typename?: 'ReactionMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ReactionMessageIdUserIdTypeCompoundUniqueInput = {
  messageId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ReactionMinAggregate = {
  __typename?: 'ReactionMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  messageId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ReactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReactionScalarWhereInput = {
  AND?: InputMaybe<Array<ReactionScalarWhereInput>>;
  NOT?: InputMaybe<Array<ReactionScalarWhereInput>>;
  OR?: InputMaybe<Array<ReactionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  messageId?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ReactionUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ReactionUpdateManyWithWhereWithoutMessageInput = {
  data: ReactionUpdateManyMutationInput;
  where: ReactionScalarWhereInput;
};

export type ReactionUpdateManyWithWhereWithoutUserInput = {
  data: ReactionUpdateManyMutationInput;
  where: ReactionScalarWhereInput;
};

export type ReactionUpdateManyWithoutMessageNestedInput = {
  connect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReactionCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<ReactionCreateWithoutMessageInput>>;
  createMany?: InputMaybe<ReactionCreateManyMessageInputEnvelope>;
  delete?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  set?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  update?: InputMaybe<Array<ReactionUpdateWithWhereUniqueWithoutMessageInput>>;
  updateMany?: InputMaybe<Array<ReactionUpdateManyWithWhereWithoutMessageInput>>;
  upsert?: InputMaybe<Array<ReactionUpsertWithWhereUniqueWithoutMessageInput>>;
};

export type ReactionUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReactionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReactionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReactionCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReactionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  set?: InputMaybe<Array<ReactionWhereUniqueInput>>;
  update?: InputMaybe<Array<ReactionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ReactionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ReactionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ReactionUpdateWithWhereUniqueWithoutMessageInput = {
  data: ReactionUpdateWithoutMessageInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpdateWithWhereUniqueWithoutUserInput = {
  data: ReactionUpdateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpdateWithoutMessageInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutReactionNestedInput>;
};

export type ReactionUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<MessageUpdateOneRequiredWithoutReactionsNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ReactionUpsertWithWhereUniqueWithoutMessageInput = {
  create: ReactionCreateWithoutMessageInput;
  update: ReactionUpdateWithoutMessageInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionUpsertWithWhereUniqueWithoutUserInput = {
  create: ReactionCreateWithoutUserInput;
  update: ReactionUpdateWithoutUserInput;
  where: ReactionWhereUniqueInput;
};

export type ReactionWhereInput = {
  AND?: InputMaybe<Array<ReactionWhereInput>>;
  NOT?: InputMaybe<Array<ReactionWhereInput>>;
  OR?: InputMaybe<Array<ReactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<MessageScalarRelationFilter>;
  messageId?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ReactionWhereUniqueInput = {
  AND?: InputMaybe<Array<ReactionWhereInput>>;
  NOT?: InputMaybe<Array<ReactionWhereInput>>;
  OR?: InputMaybe<Array<ReactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<MessageScalarRelationFilter>;
  messageId?: InputMaybe<StringFilter>;
  messageId_userId_type?: InputMaybe<ReactionMessageIdUserIdTypeCompoundUniqueInput>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RefreshTokenCountAggregate = {
  __typename?: 'RefreshTokenCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  expiresAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  token: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RefreshTokenCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expiresAt: Scalars['DateTime']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type RefreshTokenCreateManyUserInputEnvelope = {
  data: Array<RefreshTokenCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RefreshTokenCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RefreshTokenWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RefreshTokenCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RefreshTokenCreateWithoutUserInput>>;
  createMany?: InputMaybe<RefreshTokenCreateManyUserInputEnvelope>;
};

export type RefreshTokenCreateOrConnectWithoutUserInput = {
  create: RefreshTokenCreateWithoutUserInput;
  where: RefreshTokenWhereUniqueInput;
};

export type RefreshTokenCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expiresAt: Scalars['DateTime']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type RefreshTokenListRelationFilter = {
  every?: InputMaybe<RefreshTokenWhereInput>;
  none?: InputMaybe<RefreshTokenWhereInput>;
  some?: InputMaybe<RefreshTokenWhereInput>;
};

export type RefreshTokenMaxAggregate = {
  __typename?: 'RefreshTokenMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type RefreshTokenMinAggregate = {
  __typename?: 'RefreshTokenMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type RefreshTokenOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RefreshTokenScalarWhereInput = {
  AND?: InputMaybe<Array<RefreshTokenScalarWhereInput>>;
  NOT?: InputMaybe<Array<RefreshTokenScalarWhereInput>>;
  OR?: InputMaybe<Array<RefreshTokenScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  token?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RefreshTokenUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
  data: RefreshTokenUpdateManyMutationInput;
  where: RefreshTokenScalarWhereInput;
};

export type RefreshTokenUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<RefreshTokenWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RefreshTokenCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RefreshTokenCreateWithoutUserInput>>;
  createMany?: InputMaybe<RefreshTokenCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<RefreshTokenWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RefreshTokenScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RefreshTokenWhereUniqueInput>>;
  set?: InputMaybe<Array<RefreshTokenWhereUniqueInput>>;
  update?: InputMaybe<Array<RefreshTokenUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<RefreshTokenUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<RefreshTokenUpsertWithWhereUniqueWithoutUserInput>>;
};

export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
  data: RefreshTokenUpdateWithoutUserInput;
  where: RefreshTokenWhereUniqueInput;
};

export type RefreshTokenUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
  create: RefreshTokenCreateWithoutUserInput;
  update: RefreshTokenUpdateWithoutUserInput;
  where: RefreshTokenWhereUniqueInput;
};

export type RefreshTokenWhereInput = {
  AND?: InputMaybe<Array<RefreshTokenWhereInput>>;
  NOT?: InputMaybe<Array<RefreshTokenWhereInput>>;
  OR?: InputMaybe<Array<RefreshTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  token?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RefreshTokenWhereUniqueInput = {
  AND?: InputMaybe<Array<RefreshTokenWhereInput>>;
  NOT?: InputMaybe<Array<RefreshTokenWhereInput>>;
  OR?: InputMaybe<Array<RefreshTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RemoveParticipantInput = {
  conversationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type ReviewAvgAggregate = {
  __typename?: 'ReviewAvgAggregate';
  rating?: Maybe<Scalars['Float']['output']>;
};

export type ReviewCountAggregate = {
  __typename?: 'ReviewCountAggregate';
  _all: Scalars['Int']['output'];
  content: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type ReviewCreateManyUserInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReviewCreateManyUserInputEnvelope = {
  data: Array<ReviewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ReviewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReviewCreateManyUserInputEnvelope>;
};

export type ReviewCreateOrConnectWithoutUserInput = {
  create: ReviewCreateWithoutUserInput;
  where: ReviewWhereUniqueInput;
};

export type ReviewCreateWithoutUserInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ReviewListRelationFilter = {
  every?: InputMaybe<ReviewWhereInput>;
  none?: InputMaybe<ReviewWhereInput>;
  some?: InputMaybe<ReviewWhereInput>;
};

export type ReviewMaxAggregate = {
  __typename?: 'ReviewMaxAggregate';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ReviewMinAggregate = {
  __typename?: 'ReviewMinAggregate';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReviewScalarWhereInput = {
  AND?: InputMaybe<Array<ReviewScalarWhereInput>>;
  NOT?: InputMaybe<Array<ReviewScalarWhereInput>>;
  OR?: InputMaybe<Array<ReviewScalarWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  rating?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ReviewSumAggregate = {
  __typename?: 'ReviewSumAggregate';
  rating?: Maybe<Scalars['Int']['output']>;
};

export type ReviewUpdateManyMutationInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  rating?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ReviewUpdateManyWithWhereWithoutUserInput = {
  data: ReviewUpdateManyMutationInput;
  where: ReviewScalarWhereInput;
};

export type ReviewUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReviewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReviewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReviewCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReviewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  set?: InputMaybe<Array<ReviewWhereUniqueInput>>;
  update?: InputMaybe<Array<ReviewUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ReviewUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ReviewUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
  data: ReviewUpdateWithoutUserInput;
  where: ReviewWhereUniqueInput;
};

export type ReviewUpdateWithoutUserInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  rating?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
  create: ReviewCreateWithoutUserInput;
  update: ReviewUpdateWithoutUserInput;
  where: ReviewWhereUniqueInput;
};

export type ReviewWhereInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  rating?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ReviewWhereUniqueInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Ride = {
  __typename?: 'Ride';
  Attachment?: Maybe<Array<Attachment>>;
  Driver?: Maybe<User>;
  Message?: Maybe<Array<Message>>;
  RideParticipant?: Maybe<Array<RideParticipant>>;
  _count: RideCount;
  createdAt: Scalars['DateTime']['output'];
  driverId?: Maybe<Scalars['String']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  positions?: Maybe<Array<Position>>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
};

export type RideCount = {
  __typename?: 'RideCount';
  Attachment: Scalars['Int']['output'];
  Message: Scalars['Int']['output'];
  RideParticipant: Scalars['Int']['output'];
  positions: Scalars['Int']['output'];
};

export type RideCountAggregate = {
  __typename?: 'RideCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  driverId: Scalars['Int']['output'];
  finishedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  startedAt: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
};

export type RideCreateManyDriverInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
};

export type RideCreateManyDriverInputEnvelope = {
  data: Array<RideCreateManyDriverInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RideCreateNestedManyWithoutDriverInput = {
  connect?: InputMaybe<Array<RideWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RideCreateOrConnectWithoutDriverInput>>;
  create?: InputMaybe<Array<RideCreateWithoutDriverInput>>;
  createMany?: InputMaybe<RideCreateManyDriverInputEnvelope>;
};

export type RideCreateNestedOneWithoutAttachmentInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutAttachmentInput>;
  create?: InputMaybe<RideCreateWithoutAttachmentInput>;
};

export type RideCreateNestedOneWithoutMessageInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutMessageInput>;
  create?: InputMaybe<RideCreateWithoutMessageInput>;
};

export type RideCreateNestedOneWithoutPositionsInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutPositionsInput>;
  create?: InputMaybe<RideCreateWithoutPositionsInput>;
};

export type RideCreateNestedOneWithoutRideParticipantInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutRideParticipantInput>;
  create?: InputMaybe<RideCreateWithoutRideParticipantInput>;
};

export type RideCreateOrConnectWithoutAttachmentInput = {
  create: RideCreateWithoutAttachmentInput;
  where: RideWhereUniqueInput;
};

export type RideCreateOrConnectWithoutDriverInput = {
  create: RideCreateWithoutDriverInput;
  where: RideWhereUniqueInput;
};

export type RideCreateOrConnectWithoutMessageInput = {
  create: RideCreateWithoutMessageInput;
  where: RideWhereUniqueInput;
};

export type RideCreateOrConnectWithoutPositionsInput = {
  create: RideCreateWithoutPositionsInput;
  where: RideWhereUniqueInput;
};

export type RideCreateOrConnectWithoutRideParticipantInput = {
  create: RideCreateWithoutRideParticipantInput;
  where: RideWhereUniqueInput;
};

export type RideCreateWithoutAttachmentInput = {
  Driver?: InputMaybe<UserCreateNestedOneWithoutRidesInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutRideInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutRideInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  positions?: InputMaybe<PositionCreateNestedManyWithoutRideInput>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
};

export type RideCreateWithoutDriverInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutRideInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutRideInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutRideInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  positions?: InputMaybe<PositionCreateNestedManyWithoutRideInput>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
};

export type RideCreateWithoutMessageInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutRideInput>;
  Driver?: InputMaybe<UserCreateNestedOneWithoutRidesInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutRideInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  positions?: InputMaybe<PositionCreateNestedManyWithoutRideInput>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
};

export type RideCreateWithoutPositionsInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutRideInput>;
  Driver?: InputMaybe<UserCreateNestedOneWithoutRidesInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutRideInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutRideInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
};

export type RideCreateWithoutRideParticipantInput = {
  Attachment?: InputMaybe<AttachmentCreateNestedManyWithoutRideInput>;
  Driver?: InputMaybe<UserCreateNestedOneWithoutRidesInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutRideInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  finishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  positions?: InputMaybe<PositionCreateNestedManyWithoutRideInput>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
};

export type RideListRelationFilter = {
  every?: InputMaybe<RideWhereInput>;
  none?: InputMaybe<RideWhereInput>;
  some?: InputMaybe<RideWhereInput>;
};

export type RideMaxAggregate = {
  __typename?: 'RideMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driverId?: Maybe<Scalars['String']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type RideMinAggregate = {
  __typename?: 'RideMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driverId?: Maybe<Scalars['String']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type RideNullableScalarRelationFilter = {
  is?: InputMaybe<RideWhereInput>;
  isNot?: InputMaybe<RideWhereInput>;
};

export type RideOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RideParticipant = {
  __typename?: 'RideParticipant';
  id: Scalars['String']['output'];
  joinedAt: Scalars['DateTime']['output'];
  ride: Ride;
  rideId: Scalars['String']['output'];
  role: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RideParticipantCountAggregate = {
  __typename?: 'RideParticipantCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  joinedAt: Scalars['Int']['output'];
  rideId: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type RideParticipantCreateManyRideInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type RideParticipantCreateManyRideInputEnvelope = {
  data: Array<RideParticipantCreateManyRideInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RideParticipantCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rideId: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type RideParticipantCreateManyUserInputEnvelope = {
  data: Array<RideParticipantCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RideParticipantCreateNestedManyWithoutRideInput = {
  connect?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RideParticipantCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<RideParticipantCreateWithoutRideInput>>;
  createMany?: InputMaybe<RideParticipantCreateManyRideInputEnvelope>;
};

export type RideParticipantCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RideParticipantCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RideParticipantCreateWithoutUserInput>>;
  createMany?: InputMaybe<RideParticipantCreateManyUserInputEnvelope>;
};

export type RideParticipantCreateOrConnectWithoutRideInput = {
  create: RideParticipantCreateWithoutRideInput;
  where: RideParticipantWhereUniqueInput;
};

export type RideParticipantCreateOrConnectWithoutUserInput = {
  create: RideParticipantCreateWithoutUserInput;
  where: RideParticipantWhereUniqueInput;
};

export type RideParticipantCreateWithoutRideInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role: Scalars['String']['input'];
  user: UserCreateNestedOneWithoutRideParticipantInput;
};

export type RideParticipantCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  joinedAt?: InputMaybe<Scalars['DateTime']['input']>;
  ride: RideCreateNestedOneWithoutRideParticipantInput;
  role: Scalars['String']['input'];
};

export type RideParticipantListRelationFilter = {
  every?: InputMaybe<RideParticipantWhereInput>;
  none?: InputMaybe<RideParticipantWhereInput>;
  some?: InputMaybe<RideParticipantWhereInput>;
};

export type RideParticipantMaxAggregate = {
  __typename?: 'RideParticipantMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type RideParticipantMinAggregate = {
  __typename?: 'RideParticipantMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  rideId?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type RideParticipantOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RideParticipantRideIdUserIdCompoundUniqueInput = {
  rideId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type RideParticipantScalarWhereInput = {
  AND?: InputMaybe<Array<RideParticipantScalarWhereInput>>;
  NOT?: InputMaybe<Array<RideParticipantScalarWhereInput>>;
  OR?: InputMaybe<Array<RideParticipantScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  joinedAt?: InputMaybe<DateTimeFilter>;
  rideId?: InputMaybe<StringFilter>;
  role?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RideParticipantUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideParticipantUpdateManyWithWhereWithoutRideInput = {
  data: RideParticipantUpdateManyMutationInput;
  where: RideParticipantScalarWhereInput;
};

export type RideParticipantUpdateManyWithWhereWithoutUserInput = {
  data: RideParticipantUpdateManyMutationInput;
  where: RideParticipantScalarWhereInput;
};

export type RideParticipantUpdateManyWithoutRideNestedInput = {
  connect?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RideParticipantCreateOrConnectWithoutRideInput>>;
  create?: InputMaybe<Array<RideParticipantCreateWithoutRideInput>>;
  createMany?: InputMaybe<RideParticipantCreateManyRideInputEnvelope>;
  delete?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RideParticipantScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  set?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  update?: InputMaybe<Array<RideParticipantUpdateWithWhereUniqueWithoutRideInput>>;
  updateMany?: InputMaybe<Array<RideParticipantUpdateManyWithWhereWithoutRideInput>>;
  upsert?: InputMaybe<Array<RideParticipantUpsertWithWhereUniqueWithoutRideInput>>;
};

export type RideParticipantUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RideParticipantCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RideParticipantCreateWithoutUserInput>>;
  createMany?: InputMaybe<RideParticipantCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RideParticipantScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  set?: InputMaybe<Array<RideParticipantWhereUniqueInput>>;
  update?: InputMaybe<Array<RideParticipantUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<RideParticipantUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<RideParticipantUpsertWithWhereUniqueWithoutUserInput>>;
};

export type RideParticipantUpdateWithWhereUniqueWithoutRideInput = {
  data: RideParticipantUpdateWithoutRideInput;
  where: RideParticipantWhereUniqueInput;
};

export type RideParticipantUpdateWithWhereUniqueWithoutUserInput = {
  data: RideParticipantUpdateWithoutUserInput;
  where: RideParticipantWhereUniqueInput;
};

export type RideParticipantUpdateWithoutRideInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutRideParticipantNestedInput>;
};

export type RideParticipantUpdateWithoutUserInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  ride?: InputMaybe<RideUpdateOneRequiredWithoutRideParticipantNestedInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideParticipantUpsertWithWhereUniqueWithoutRideInput = {
  create: RideParticipantCreateWithoutRideInput;
  update: RideParticipantUpdateWithoutRideInput;
  where: RideParticipantWhereUniqueInput;
};

export type RideParticipantUpsertWithWhereUniqueWithoutUserInput = {
  create: RideParticipantCreateWithoutUserInput;
  update: RideParticipantUpdateWithoutUserInput;
  where: RideParticipantWhereUniqueInput;
};

export type RideParticipantWhereInput = {
  AND?: InputMaybe<Array<RideParticipantWhereInput>>;
  NOT?: InputMaybe<Array<RideParticipantWhereInput>>;
  OR?: InputMaybe<Array<RideParticipantWhereInput>>;
  id?: InputMaybe<StringFilter>;
  joinedAt?: InputMaybe<DateTimeFilter>;
  ride?: InputMaybe<RideScalarRelationFilter>;
  rideId?: InputMaybe<StringFilter>;
  role?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RideParticipantWhereUniqueInput = {
  AND?: InputMaybe<Array<RideParticipantWhereInput>>;
  NOT?: InputMaybe<Array<RideParticipantWhereInput>>;
  OR?: InputMaybe<Array<RideParticipantWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  joinedAt?: InputMaybe<DateTimeFilter>;
  ride?: InputMaybe<RideScalarRelationFilter>;
  rideId?: InputMaybe<StringFilter>;
  rideId_userId?: InputMaybe<RideParticipantRideIdUserIdCompoundUniqueInput>;
  role?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type RideScalarRelationFilter = {
  is?: InputMaybe<RideWhereInput>;
  isNot?: InputMaybe<RideWhereInput>;
};

export type RideScalarWhereInput = {
  AND?: InputMaybe<Array<RideScalarWhereInput>>;
  NOT?: InputMaybe<Array<RideScalarWhereInput>>;
  OR?: InputMaybe<Array<RideScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverId?: InputMaybe<StringNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  startedAt?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<StringFilter>;
};

export type RideUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  finishedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  startedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideUpdateManyWithWhereWithoutDriverInput = {
  data: RideUpdateManyMutationInput;
  where: RideScalarWhereInput;
};

export type RideUpdateManyWithoutDriverNestedInput = {
  connect?: InputMaybe<Array<RideWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RideCreateOrConnectWithoutDriverInput>>;
  create?: InputMaybe<Array<RideCreateWithoutDriverInput>>;
  createMany?: InputMaybe<RideCreateManyDriverInputEnvelope>;
  delete?: InputMaybe<Array<RideWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RideScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RideWhereUniqueInput>>;
  set?: InputMaybe<Array<RideWhereUniqueInput>>;
  update?: InputMaybe<Array<RideUpdateWithWhereUniqueWithoutDriverInput>>;
  updateMany?: InputMaybe<Array<RideUpdateManyWithWhereWithoutDriverInput>>;
  upsert?: InputMaybe<Array<RideUpsertWithWhereUniqueWithoutDriverInput>>;
};

export type RideUpdateOneRequiredWithoutRideParticipantNestedInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutRideParticipantInput>;
  create?: InputMaybe<RideCreateWithoutRideParticipantInput>;
  update?: InputMaybe<RideUpdateToOneWithWhereWithoutRideParticipantInput>;
  upsert?: InputMaybe<RideUpsertWithoutRideParticipantInput>;
};

export type RideUpdateOneWithoutAttachmentNestedInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutAttachmentInput>;
  create?: InputMaybe<RideCreateWithoutAttachmentInput>;
  delete?: InputMaybe<RideWhereInput>;
  disconnect?: InputMaybe<RideWhereInput>;
  update?: InputMaybe<RideUpdateToOneWithWhereWithoutAttachmentInput>;
  upsert?: InputMaybe<RideUpsertWithoutAttachmentInput>;
};

export type RideUpdateOneWithoutMessageNestedInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutMessageInput>;
  create?: InputMaybe<RideCreateWithoutMessageInput>;
  delete?: InputMaybe<RideWhereInput>;
  disconnect?: InputMaybe<RideWhereInput>;
  update?: InputMaybe<RideUpdateToOneWithWhereWithoutMessageInput>;
  upsert?: InputMaybe<RideUpsertWithoutMessageInput>;
};

export type RideUpdateOneWithoutPositionsNestedInput = {
  connect?: InputMaybe<RideWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RideCreateOrConnectWithoutPositionsInput>;
  create?: InputMaybe<RideCreateWithoutPositionsInput>;
  delete?: InputMaybe<RideWhereInput>;
  disconnect?: InputMaybe<RideWhereInput>;
  update?: InputMaybe<RideUpdateToOneWithWhereWithoutPositionsInput>;
  upsert?: InputMaybe<RideUpsertWithoutPositionsInput>;
};

export type RideUpdateToOneWithWhereWithoutAttachmentInput = {
  data: RideUpdateWithoutAttachmentInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpdateToOneWithWhereWithoutMessageInput = {
  data: RideUpdateWithoutMessageInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpdateToOneWithWhereWithoutPositionsInput = {
  data: RideUpdateWithoutPositionsInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpdateToOneWithWhereWithoutRideParticipantInput = {
  data: RideUpdateWithoutRideParticipantInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpdateWithWhereUniqueWithoutDriverInput = {
  data: RideUpdateWithoutDriverInput;
  where: RideWhereUniqueInput;
};

export type RideUpdateWithoutAttachmentInput = {
  Driver?: InputMaybe<UserUpdateOneWithoutRidesNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutRideNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutRideNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  finishedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  positions?: InputMaybe<PositionUpdateManyWithoutRideNestedInput>;
  startedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideUpdateWithoutDriverInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutRideNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutRideNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutRideNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  finishedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  positions?: InputMaybe<PositionUpdateManyWithoutRideNestedInput>;
  startedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideUpdateWithoutMessageInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutRideNestedInput>;
  Driver?: InputMaybe<UserUpdateOneWithoutRidesNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutRideNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  finishedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  positions?: InputMaybe<PositionUpdateManyWithoutRideNestedInput>;
  startedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideUpdateWithoutPositionsInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutRideNestedInput>;
  Driver?: InputMaybe<UserUpdateOneWithoutRidesNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutRideNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutRideNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  finishedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  startedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideUpdateWithoutRideParticipantInput = {
  Attachment?: InputMaybe<AttachmentUpdateManyWithoutRideNestedInput>;
  Driver?: InputMaybe<UserUpdateOneWithoutRidesNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutRideNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  finishedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  positions?: InputMaybe<PositionUpdateManyWithoutRideNestedInput>;
  startedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RideUpsertWithWhereUniqueWithoutDriverInput = {
  create: RideCreateWithoutDriverInput;
  update: RideUpdateWithoutDriverInput;
  where: RideWhereUniqueInput;
};

export type RideUpsertWithoutAttachmentInput = {
  create: RideCreateWithoutAttachmentInput;
  update: RideUpdateWithoutAttachmentInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpsertWithoutMessageInput = {
  create: RideCreateWithoutMessageInput;
  update: RideUpdateWithoutMessageInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpsertWithoutPositionsInput = {
  create: RideCreateWithoutPositionsInput;
  update: RideUpdateWithoutPositionsInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideUpsertWithoutRideParticipantInput = {
  create: RideCreateWithoutRideParticipantInput;
  update: RideUpdateWithoutRideParticipantInput;
  where?: InputMaybe<RideWhereInput>;
};

export type RideWhereInput = {
  AND?: InputMaybe<Array<RideWhereInput>>;
  Attachment?: InputMaybe<AttachmentListRelationFilter>;
  Driver?: InputMaybe<UserNullableScalarRelationFilter>;
  Message?: InputMaybe<MessageListRelationFilter>;
  NOT?: InputMaybe<Array<RideWhereInput>>;
  OR?: InputMaybe<Array<RideWhereInput>>;
  RideParticipant?: InputMaybe<RideParticipantListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverId?: InputMaybe<StringNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  positions?: InputMaybe<PositionListRelationFilter>;
  startedAt?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<StringFilter>;
};

export type RideWhereUniqueInput = {
  AND?: InputMaybe<Array<RideWhereInput>>;
  Attachment?: InputMaybe<AttachmentListRelationFilter>;
  Driver?: InputMaybe<UserNullableScalarRelationFilter>;
  Message?: InputMaybe<MessageListRelationFilter>;
  NOT?: InputMaybe<Array<RideWhereInput>>;
  OR?: InputMaybe<Array<RideWhereInput>>;
  RideParticipant?: InputMaybe<RideParticipantListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverId?: InputMaybe<StringNullableFilter>;
  finishedAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  positions?: InputMaybe<PositionListRelationFilter>;
  startedAt?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<StringFilter>;
};

export type Role = {
  __typename?: 'Role';
  _count: RoleCount;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type RoleCount = {
  __typename?: 'RoleCount';
  users: Scalars['Int']['output'];
};

export type RoleCountAggregate = {
  __typename?: 'RoleCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type RoleCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RoleCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<RoleCreateWithoutUsersInput>>;
};

export type RoleCreateOrConnectWithoutUsersInput = {
  create: RoleCreateWithoutUsersInput;
  where: RoleWhereUniqueInput;
};

export type RoleCreateWithoutUsersInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type RoleListRelationFilter = {
  every?: InputMaybe<RoleWhereInput>;
  none?: InputMaybe<RoleWhereInput>;
  some?: InputMaybe<RoleWhereInput>;
};

export type RoleMaxAggregate = {
  __typename?: 'RoleMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RoleMinAggregate = {
  __typename?: 'RoleMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RoleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RoleScalarWhereInput = {
  AND?: InputMaybe<Array<RoleScalarWhereInput>>;
  NOT?: InputMaybe<Array<RoleScalarWhereInput>>;
  OR?: InputMaybe<Array<RoleScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type RoleUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpdateManyWithWhereWithoutUsersInput = {
  data: RoleUpdateManyMutationInput;
  where: RoleScalarWhereInput;
};

export type RoleUpdateManyWithoutUsersNestedInput = {
  connect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RoleCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<RoleCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<RoleWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RoleScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RoleWhereUniqueInput>>;
  set?: InputMaybe<Array<RoleWhereUniqueInput>>;
  update?: InputMaybe<Array<RoleUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<RoleUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<RoleUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type RoleUpdateWithWhereUniqueWithoutUsersInput = {
  data: RoleUpdateWithoutUsersInput;
  where: RoleWhereUniqueInput;
};

export type RoleUpdateWithoutUsersInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type RoleUpsertWithWhereUniqueWithoutUsersInput = {
  create: RoleCreateWithoutUsersInput;
  update: RoleUpdateWithoutUsersInput;
  where: RoleWhereUniqueInput;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type RoleWhereUniqueInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type SendMessageInput = {
  clientTempId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  conversationId?: InputMaybe<Scalars['String']['input']>;
  parentMessageId?: InputMaybe<Scalars['String']['input']>;
  recipientId?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationUpdated: ConversationPayload;
  messageReceived: MessagePayload;
  participantUpdated: ConversationParticipantPayload;
};


export type SubscriptionMessageReceivedArgs = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
};


export type SubscriptionParticipantUpdatedArgs = {
  conversationId: Scalars['String']['input'];
};

export type UpdateConversationInput = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UploadUserDocumentsInput = {
  documentType: UserDocumentType;
  file: UploadedFileRefInput;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UploadVehicleDocumentsInput = {
  documentType: VehicleDocumentType;
  file: UploadedFileRefInput;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UploadedFileRefInput = {
  key: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  ConversationParticipant?: Maybe<Array<ConversationParticipant>>;
  Message?: Maybe<Array<Message>>;
  MessageReadReceipt?: Maybe<Array<MessageReadReceipt>>;
  QrToken?: Maybe<Array<QrToken>>;
  Reaction?: Maybe<Array<Reaction>>;
  RideParticipant?: Maybe<Array<RideParticipant>>;
  Role?: Maybe<Array<Role>>;
  UserCover?: Maybe<UserCover>;
  UserDocument?: Maybe<Array<UserDocument>>;
  UserImage?: Maybe<Array<UserImage>>;
  UserPreference?: Maybe<UserPreference>;
  _count: UserCount;
  avatar?: Maybe<File>;
  avatarId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Array<Review>>;
  rides?: Maybe<Array<Ride>>;
  tokens?: Maybe<Array<RefreshToken>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userCoverId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  vehicles?: Maybe<Array<DriverVehicle>>;
};

export type UserConversation = {
  __typename?: 'UserConversation';
  _count?: Maybe<PartialConversationCount>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  directHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Message>>;
  participants?: Maybe<Array<UserConversationParticipant>>;
  rideId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: ConversationType;
};

export type UserConversationParticipant = {
  __typename?: 'UserConversationParticipant';
  conversation?: Maybe<UserConversation>;
  conversationId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isMuted?: Maybe<Scalars['Boolean']['output']>;
  joinedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user: UserUserConversationParticipant;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserConversationsResponse = {
  __typename?: 'UserConversationsResponse';
  conversations: Array<UserConversation>;
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  ConversationParticipant: Scalars['Int']['output'];
  Message: Scalars['Int']['output'];
  MessageReadReceipt: Scalars['Int']['output'];
  QrToken: Scalars['Int']['output'];
  Reaction: Scalars['Int']['output'];
  RideParticipant: Scalars['Int']['output'];
  Role: Scalars['Int']['output'];
  UserDocument: Scalars['Int']['output'];
  UserImage: Scalars['Int']['output'];
  review: Scalars['Int']['output'];
  rides: Scalars['Int']['output'];
  tokens: Scalars['Int']['output'];
  vehicles: Scalars['Int']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  avatarId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  firstName: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isVerified: Scalars['Int']['output'];
  lastName: Scalars['Int']['output'];
  password: Scalars['Int']['output'];
  phone: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userCoverId: Scalars['Int']['output'];
  username: Scalars['Int']['output'];
};

export type UserCover = {
  __typename?: 'UserCover';
  User: User;
  createdAt: Scalars['DateTime']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

export type UserCoverCountAggregate = {
  __typename?: 'UserCoverCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserCoverCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type UserCoverCreateManyFileInputEnvelope = {
  data: Array<UserCoverCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCoverCreateNestedManyWithoutFileInput = {
  connect?: InputMaybe<Array<UserCoverWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCoverCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<UserCoverCreateWithoutFileInput>>;
  createMany?: InputMaybe<UserCoverCreateManyFileInputEnvelope>;
};

export type UserCoverCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<UserCoverWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCoverCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserCoverCreateWithoutUserInput>;
};

export type UserCoverCreateOrConnectWithoutFileInput = {
  create: UserCoverCreateWithoutFileInput;
  where: UserCoverWhereUniqueInput;
};

export type UserCoverCreateOrConnectWithoutUserInput = {
  create: UserCoverCreateWithoutUserInput;
  where: UserCoverWhereUniqueInput;
};

export type UserCoverCreateWithoutFileInput = {
  User: UserCreateNestedOneWithoutUserCoverInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCoverCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file: FileCreateNestedOneWithoutUserCoverInput;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCoverListRelationFilter = {
  every?: InputMaybe<UserCoverWhereInput>;
  none?: InputMaybe<UserCoverWhereInput>;
  some?: InputMaybe<UserCoverWhereInput>;
};

export type UserCoverMaxAggregate = {
  __typename?: 'UserCoverMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserCoverMinAggregate = {
  __typename?: 'UserCoverMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserCoverNullableScalarRelationFilter = {
  is?: InputMaybe<UserCoverWhereInput>;
  isNot?: InputMaybe<UserCoverWhereInput>;
};

export type UserCoverOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserCoverOrderByWithRelationInput = {
  User?: InputMaybe<UserOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  file?: InputMaybe<FileOrderByWithRelationInput>;
  fileId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrderInput>;
  userId?: InputMaybe<SortOrder>;
};

export type UserCoverScalarWhereInput = {
  AND?: InputMaybe<Array<UserCoverScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserCoverScalarWhereInput>>;
  OR?: InputMaybe<Array<UserCoverScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserCoverUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserCoverUpdateManyWithWhereWithoutFileInput = {
  data: UserCoverUpdateManyMutationInput;
  where: UserCoverScalarWhereInput;
};

export type UserCoverUpdateManyWithoutFileNestedInput = {
  connect?: InputMaybe<Array<UserCoverWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCoverCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<UserCoverCreateWithoutFileInput>>;
  createMany?: InputMaybe<UserCoverCreateManyFileInputEnvelope>;
  delete?: InputMaybe<Array<UserCoverWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserCoverScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserCoverWhereUniqueInput>>;
  set?: InputMaybe<Array<UserCoverWhereUniqueInput>>;
  update?: InputMaybe<Array<UserCoverUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: InputMaybe<Array<UserCoverUpdateManyWithWhereWithoutFileInput>>;
  upsert?: InputMaybe<Array<UserCoverUpsertWithWhereUniqueWithoutFileInput>>;
};

export type UserCoverUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<UserCoverWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCoverCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserCoverCreateWithoutUserInput>;
  delete?: InputMaybe<UserCoverWhereInput>;
  disconnect?: InputMaybe<UserCoverWhereInput>;
  update?: InputMaybe<UserCoverUpdateToOneWithWhereWithoutUserInput>;
  upsert?: InputMaybe<UserCoverUpsertWithoutUserInput>;
};

export type UserCoverUpdateToOneWithWhereWithoutUserInput = {
  data: UserCoverUpdateWithoutUserInput;
  where?: InputMaybe<UserCoverWhereInput>;
};

export type UserCoverUpdateWithWhereUniqueWithoutFileInput = {
  data: UserCoverUpdateWithoutFileInput;
  where: UserCoverWhereUniqueInput;
};

export type UserCoverUpdateWithoutFileInput = {
  User?: InputMaybe<UserUpdateOneRequiredWithoutUserCoverNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserCoverUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneRequiredWithoutUserCoverNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserCoverUpsertWithWhereUniqueWithoutFileInput = {
  create: UserCoverCreateWithoutFileInput;
  update: UserCoverUpdateWithoutFileInput;
  where: UserCoverWhereUniqueInput;
};

export type UserCoverUpsertWithoutUserInput = {
  create: UserCoverCreateWithoutUserInput;
  update: UserCoverUpdateWithoutUserInput;
  where?: InputMaybe<UserCoverWhereInput>;
};

export type UserCoverWhereInput = {
  AND?: InputMaybe<Array<UserCoverWhereInput>>;
  NOT?: InputMaybe<Array<UserCoverWhereInput>>;
  OR?: InputMaybe<Array<UserCoverWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserCoverWhereUniqueInput = {
  AND?: InputMaybe<Array<UserCoverWhereInput>>;
  NOT?: InputMaybe<Array<UserCoverWhereInput>>;
  OR?: InputMaybe<Array<UserCoverWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateManyAvatarInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateManyAvatarInputEnvelope = {
  data: Array<UserCreateManyAvatarInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateNestedManyWithoutAvatarInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutAvatarInput>>;
  create?: InputMaybe<Array<UserCreateWithoutAvatarInput>>;
  createMany?: InputMaybe<UserCreateManyAvatarInputEnvelope>;
};

export type UserCreateNestedOneWithoutConversationParticipantInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutConversationParticipantInput>;
  create?: InputMaybe<UserCreateWithoutConversationParticipantInput>;
};

export type UserCreateNestedOneWithoutMessageInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessageInput>;
  create?: InputMaybe<UserCreateWithoutMessageInput>;
};

export type UserCreateNestedOneWithoutMessageReadReceiptInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessageReadReceiptInput>;
  create?: InputMaybe<UserCreateWithoutMessageReadReceiptInput>;
};

export type UserCreateNestedOneWithoutReactionInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReactionInput>;
  create?: InputMaybe<UserCreateWithoutReactionInput>;
};

export type UserCreateNestedOneWithoutRideParticipantInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRideParticipantInput>;
  create?: InputMaybe<UserCreateWithoutRideParticipantInput>;
};

export type UserCreateNestedOneWithoutRidesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRidesInput>;
  create?: InputMaybe<UserCreateWithoutRidesInput>;
};

export type UserCreateNestedOneWithoutUserCoverInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserCoverInput>;
  create?: InputMaybe<UserCreateWithoutUserCoverInput>;
};

export type UserCreateNestedOneWithoutUserDocumentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserDocumentInput>;
  create?: InputMaybe<UserCreateWithoutUserDocumentInput>;
};

export type UserCreateNestedOneWithoutUserImageInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserImageInput>;
  create?: InputMaybe<UserCreateWithoutUserImageInput>;
};

export type UserCreateNestedOneWithoutUserPreferenceInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserPreferenceInput>;
  create?: InputMaybe<UserCreateWithoutUserPreferenceInput>;
};

export type UserCreateNestedOneWithoutVehiclesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutVehiclesInput>;
  create?: InputMaybe<UserCreateWithoutVehiclesInput>;
};

export type UserCreateOrConnectWithoutAvatarInput = {
  create: UserCreateWithoutAvatarInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutConversationParticipantInput = {
  create: UserCreateWithoutConversationParticipantInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMessageInput = {
  create: UserCreateWithoutMessageInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMessageReadReceiptInput = {
  create: UserCreateWithoutMessageReadReceiptInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutReactionInput = {
  create: UserCreateWithoutReactionInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRideParticipantInput = {
  create: UserCreateWithoutRideParticipantInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRidesInput = {
  create: UserCreateWithoutRidesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUserCoverInput = {
  create: UserCreateWithoutUserCoverInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUserDocumentInput = {
  create: UserCreateWithoutUserDocumentInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUserImageInput = {
  create: UserCreateWithoutUserImageInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutUserPreferenceInput = {
  create: UserCreateWithoutUserPreferenceInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutVehiclesInput = {
  create: UserCreateWithoutVehiclesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutAvatarInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutConversationParticipantInput = {
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutMessageInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutMessageReadReceiptInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutReactionInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutRideParticipantInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutRidesInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUserCoverInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUserDocumentInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUserImageInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUserPreferenceInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutVehiclesInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantCreateNestedManyWithoutUserInput>;
  Message?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptCreateNestedManyWithoutUserInput>;
  QrToken?: InputMaybe<QrTokenCreateNestedManyWithoutUserInput>;
  Reaction?: InputMaybe<ReactionCreateNestedManyWithoutUserInput>;
  RideParticipant?: InputMaybe<RideParticipantCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserCover?: InputMaybe<UserCoverCreateNestedOneWithoutUserInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  avatar?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  review?: InputMaybe<ReviewCreateNestedManyWithoutUserInput>;
  rides?: InputMaybe<RideCreateNestedManyWithoutDriverInput>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userCoverId?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserDocument = {
  __typename?: 'UserDocument';
  User: User;
  createdAt: Scalars['DateTime']['output'];
  documentType: UserDocumentType;
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

export type UserDocumentCountAggregate = {
  __typename?: 'UserDocumentCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  documentType: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserDocumentCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: UserDocumentType;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type UserDocumentCreateManyFileInputEnvelope = {
  data: Array<UserDocumentCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserDocumentCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: UserDocumentType;
  fileId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserDocumentCreateManyUserInputEnvelope = {
  data: Array<UserDocumentCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserDocumentCreateNestedManyWithoutFileInput = {
  connect?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDocumentCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<UserDocumentCreateWithoutFileInput>>;
  createMany?: InputMaybe<UserDocumentCreateManyFileInputEnvelope>;
};

export type UserDocumentCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDocumentCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserDocumentCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserDocumentCreateManyUserInputEnvelope>;
};

export type UserDocumentCreateOrConnectWithoutFileInput = {
  create: UserDocumentCreateWithoutFileInput;
  where: UserDocumentWhereUniqueInput;
};

export type UserDocumentCreateOrConnectWithoutUserInput = {
  create: UserDocumentCreateWithoutUserInput;
  where: UserDocumentWhereUniqueInput;
};

export type UserDocumentCreateWithoutFileInput = {
  User: UserCreateNestedOneWithoutUserDocumentInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: UserDocumentType;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserDocumentCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: UserDocumentType;
  file: FileCreateNestedOneWithoutUserDocumentInput;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserDocumentListRelationFilter = {
  every?: InputMaybe<UserDocumentWhereInput>;
  none?: InputMaybe<UserDocumentWhereInput>;
  some?: InputMaybe<UserDocumentWhereInput>;
};

export type UserDocumentMaxAggregate = {
  __typename?: 'UserDocumentMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentType?: Maybe<UserDocumentType>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserDocumentMinAggregate = {
  __typename?: 'UserDocumentMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentType?: Maybe<UserDocumentType>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserDocumentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserDocumentScalarWhereInput = {
  AND?: InputMaybe<Array<UserDocumentScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserDocumentScalarWhereInput>>;
  OR?: InputMaybe<Array<UserDocumentScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documentType?: InputMaybe<EnumUserDocumentTypeFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export enum UserDocumentType {
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  DRIVER_LICENSE_BACK = 'DRIVER_LICENSE_BACK',
  DRIVER_LICENSE_FRONT = 'DRIVER_LICENSE_FRONT',
  ID_CARD = 'ID_CARD',
  ID_CARD_BACK = 'ID_CARD_BACK',
  ID_CARD_FRONT = 'ID_CARD_FRONT',
  OTHER = 'OTHER',
  PASSPORT = 'PASSPORT',
  PROOF_OF_ADDRESS = 'PROOF_OF_ADDRESS'
}

export type UserDocumentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  documentType?: InputMaybe<EnumUserDocumentTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserDocumentUpdateManyWithWhereWithoutFileInput = {
  data: UserDocumentUpdateManyMutationInput;
  where: UserDocumentScalarWhereInput;
};

export type UserDocumentUpdateManyWithWhereWithoutUserInput = {
  data: UserDocumentUpdateManyMutationInput;
  where: UserDocumentScalarWhereInput;
};

export type UserDocumentUpdateManyWithoutFileNestedInput = {
  connect?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDocumentCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<UserDocumentCreateWithoutFileInput>>;
  createMany?: InputMaybe<UserDocumentCreateManyFileInputEnvelope>;
  delete?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserDocumentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  set?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  update?: InputMaybe<Array<UserDocumentUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: InputMaybe<Array<UserDocumentUpdateManyWithWhereWithoutFileInput>>;
  upsert?: InputMaybe<Array<UserDocumentUpsertWithWhereUniqueWithoutFileInput>>;
};

export type UserDocumentUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserDocumentCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserDocumentCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserDocumentCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserDocumentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  set?: InputMaybe<Array<UserDocumentWhereUniqueInput>>;
  update?: InputMaybe<Array<UserDocumentUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserDocumentUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserDocumentUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserDocumentUpdateWithWhereUniqueWithoutFileInput = {
  data: UserDocumentUpdateWithoutFileInput;
  where: UserDocumentWhereUniqueInput;
};

export type UserDocumentUpdateWithWhereUniqueWithoutUserInput = {
  data: UserDocumentUpdateWithoutUserInput;
  where: UserDocumentWhereUniqueInput;
};

export type UserDocumentUpdateWithoutFileInput = {
  User?: InputMaybe<UserUpdateOneRequiredWithoutUserDocumentNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  documentType?: InputMaybe<EnumUserDocumentTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserDocumentUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  documentType?: InputMaybe<EnumUserDocumentTypeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneRequiredWithoutUserDocumentNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserDocumentUpsertWithWhereUniqueWithoutFileInput = {
  create: UserDocumentCreateWithoutFileInput;
  update: UserDocumentUpdateWithoutFileInput;
  where: UserDocumentWhereUniqueInput;
};

export type UserDocumentUpsertWithWhereUniqueWithoutUserInput = {
  create: UserDocumentCreateWithoutUserInput;
  update: UserDocumentUpdateWithoutUserInput;
  where: UserDocumentWhereUniqueInput;
};

export type UserDocumentWhereInput = {
  AND?: InputMaybe<Array<UserDocumentWhereInput>>;
  NOT?: InputMaybe<Array<UserDocumentWhereInput>>;
  OR?: InputMaybe<Array<UserDocumentWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documentType?: InputMaybe<EnumUserDocumentTypeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserDocumentWhereUniqueInput = {
  AND?: InputMaybe<Array<UserDocumentWhereInput>>;
  NOT?: InputMaybe<Array<UserDocumentWhereInput>>;
  OR?: InputMaybe<Array<UserDocumentWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documentType?: InputMaybe<EnumUserDocumentTypeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserImage = {
  __typename?: 'UserImage';
  User: User;
  createdAt: Scalars['DateTime']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

export type UserImageCountAggregate = {
  __typename?: 'UserImageCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserImageCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type UserImageCreateManyFileInputEnvelope = {
  data: Array<UserImageCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserImageCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserImageCreateManyUserInputEnvelope = {
  data: Array<UserImageCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserImageCreateNestedManyWithoutFileInput = {
  connect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserImageCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<UserImageCreateWithoutFileInput>>;
  createMany?: InputMaybe<UserImageCreateManyFileInputEnvelope>;
};

export type UserImageCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserImageCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserImageCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserImageCreateManyUserInputEnvelope>;
};

export type UserImageCreateOrConnectWithoutFileInput = {
  create: UserImageCreateWithoutFileInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageCreateOrConnectWithoutUserInput = {
  create: UserImageCreateWithoutUserInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageCreateWithoutFileInput = {
  User: UserCreateNestedOneWithoutUserImageInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserImageCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file: FileCreateNestedOneWithoutUserImageInput;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserImageListRelationFilter = {
  every?: InputMaybe<UserImageWhereInput>;
  none?: InputMaybe<UserImageWhereInput>;
  some?: InputMaybe<UserImageWhereInput>;
};

export type UserImageMaxAggregate = {
  __typename?: 'UserImageMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserImageMinAggregate = {
  __typename?: 'UserImageMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserImageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserImageScalarWhereInput = {
  AND?: InputMaybe<Array<UserImageScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserImageScalarWhereInput>>;
  OR?: InputMaybe<Array<UserImageScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserImageUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserImageUpdateManyWithWhereWithoutFileInput = {
  data: UserImageUpdateManyMutationInput;
  where: UserImageScalarWhereInput;
};

export type UserImageUpdateManyWithWhereWithoutUserInput = {
  data: UserImageUpdateManyMutationInput;
  where: UserImageScalarWhereInput;
};

export type UserImageUpdateManyWithoutFileNestedInput = {
  connect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserImageCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<UserImageCreateWithoutFileInput>>;
  createMany?: InputMaybe<UserImageCreateManyFileInputEnvelope>;
  delete?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  set?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  update?: InputMaybe<Array<UserImageUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: InputMaybe<Array<UserImageUpdateManyWithWhereWithoutFileInput>>;
  upsert?: InputMaybe<Array<UserImageUpsertWithWhereUniqueWithoutFileInput>>;
};

export type UserImageUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserImageCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserImageCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserImageCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  set?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  update?: InputMaybe<Array<UserImageUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserImageUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserImageUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserImageUpdateWithWhereUniqueWithoutFileInput = {
  data: UserImageUpdateWithoutFileInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageUpdateWithWhereUniqueWithoutUserInput = {
  data: UserImageUpdateWithoutUserInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageUpdateWithoutFileInput = {
  User?: InputMaybe<UserUpdateOneRequiredWithoutUserImageNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserImageUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneRequiredWithoutUserImageNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserImageUpsertWithWhereUniqueWithoutFileInput = {
  create: UserImageCreateWithoutFileInput;
  update: UserImageUpdateWithoutFileInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageUpsertWithWhereUniqueWithoutUserInput = {
  create: UserImageCreateWithoutUserInput;
  update: UserImageUpdateWithoutUserInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageWhereInput = {
  AND?: InputMaybe<Array<UserImageWhereInput>>;
  NOT?: InputMaybe<Array<UserImageWhereInput>>;
  OR?: InputMaybe<Array<UserImageWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserImageWhereUniqueInput = {
  AND?: InputMaybe<Array<UserImageWhereInput>>;
  NOT?: InputMaybe<Array<UserImageWhereInput>>;
  OR?: InputMaybe<Array<UserImageWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  avatarId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userCoverId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  avatarId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userCoverId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserNullableScalarRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantOrderByRelationAggregateInput>;
  Message?: InputMaybe<MessageOrderByRelationAggregateInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptOrderByRelationAggregateInput>;
  QrToken?: InputMaybe<QrTokenOrderByRelationAggregateInput>;
  Reaction?: InputMaybe<ReactionOrderByRelationAggregateInput>;
  RideParticipant?: InputMaybe<RideParticipantOrderByRelationAggregateInput>;
  Role?: InputMaybe<RoleOrderByRelationAggregateInput>;
  UserCover?: InputMaybe<UserCoverOrderByWithRelationInput>;
  UserDocument?: InputMaybe<UserDocumentOrderByRelationAggregateInput>;
  UserImage?: InputMaybe<UserImageOrderByRelationAggregateInput>;
  UserPreference?: InputMaybe<UserPreferenceOrderByWithRelationInput>;
  avatar?: InputMaybe<FileOrderByWithRelationInput>;
  avatarId?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVerified?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrderInput>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrderInput>;
  review?: InputMaybe<ReviewOrderByRelationAggregateInput>;
  rides?: InputMaybe<RideOrderByRelationAggregateInput>;
  tokens?: InputMaybe<RefreshTokenOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrderInput>;
  userCoverId?: InputMaybe<SortOrderInput>;
  username?: InputMaybe<SortOrderInput>;
  vehicles?: InputMaybe<DriverVehicleOrderByRelationAggregateInput>;
};

export type UserPartialAvatar = {
  __typename?: 'UserPartialAvatar';
  Attachment?: Maybe<Array<Attachment>>;
  User?: Maybe<Array<User>>;
  UserCover?: Maybe<Array<UserCover>>;
  UserDocument?: Maybe<Array<UserDocument>>;
  UserImage?: Maybe<Array<UserImage>>;
  VehicleDocument?: Maybe<Array<VehicleDocument>>;
  VehicleImage?: Maybe<Array<VehicleImage>>;
  _count?: Maybe<FileCount>;
  contentType?: Maybe<Scalars['String']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<FileType>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserPreference = {
  __typename?: 'UserPreference';
  _count: UserPreferenceCount;
  activateEmailNotifications: Scalars['Boolean']['output'];
  activateLocation: Scalars['Boolean']['output'];
  activateNotifications: Scalars['Boolean']['output'];
  activateSmsNotifications: Scalars['Boolean']['output'];
  cguAccepted: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  preferedvelicles?: Maybe<Array<VehicleType>>;
  privacyPolicyAccepted: Scalars['Boolean']['output'];
  theme?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type UserPreferenceCount = {
  __typename?: 'UserPreferenceCount';
  preferedvelicles: Scalars['Int']['output'];
};

export type UserPreferenceCountAggregate = {
  __typename?: 'UserPreferenceCountAggregate';
  _all: Scalars['Int']['output'];
  activateEmailNotifications: Scalars['Int']['output'];
  activateLocation: Scalars['Int']['output'];
  activateNotifications: Scalars['Int']['output'];
  activateSmsNotifications: Scalars['Int']['output'];
  cguAccepted: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  language: Scalars['Int']['output'];
  privacyPolicyAccepted: Scalars['Int']['output'];
  theme: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserPreferenceCreateNestedManyWithoutPreferedveliclesInput = {
  connect?: InputMaybe<Array<UserPreferenceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserPreferenceCreateOrConnectWithoutPreferedveliclesInput>>;
  create?: InputMaybe<Array<UserPreferenceCreateWithoutPreferedveliclesInput>>;
};

export type UserPreferenceCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<UserPreferenceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserPreferenceCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserPreferenceCreateWithoutUserInput>;
};

export type UserPreferenceCreateOrConnectWithoutPreferedveliclesInput = {
  create: UserPreferenceCreateWithoutPreferedveliclesInput;
  where: UserPreferenceWhereUniqueInput;
};

export type UserPreferenceCreateOrConnectWithoutUserInput = {
  create: UserPreferenceCreateWithoutUserInput;
  where: UserPreferenceWhereUniqueInput;
};

export type UserPreferenceCreateWithoutPreferedveliclesInput = {
  activateEmailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  activateLocation?: InputMaybe<Scalars['Boolean']['input']>;
  activateNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  activateSmsNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  cguAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  privacyPolicyAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutUserPreferenceInput;
};

export type UserPreferenceCreateWithoutUserInput = {
  activateEmailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  activateLocation?: InputMaybe<Scalars['Boolean']['input']>;
  activateNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  activateSmsNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  cguAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  preferedvelicles?: InputMaybe<VehicleTypeCreateNestedManyWithoutUserPreferenceInput>;
  privacyPolicyAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserPreferenceListRelationFilter = {
  every?: InputMaybe<UserPreferenceWhereInput>;
  none?: InputMaybe<UserPreferenceWhereInput>;
  some?: InputMaybe<UserPreferenceWhereInput>;
};

export type UserPreferenceMaxAggregate = {
  __typename?: 'UserPreferenceMaxAggregate';
  activateEmailNotifications?: Maybe<Scalars['Boolean']['output']>;
  activateLocation?: Maybe<Scalars['Boolean']['output']>;
  activateNotifications?: Maybe<Scalars['Boolean']['output']>;
  activateSmsNotifications?: Maybe<Scalars['Boolean']['output']>;
  cguAccepted?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  privacyPolicyAccepted?: Maybe<Scalars['Boolean']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserPreferenceMinAggregate = {
  __typename?: 'UserPreferenceMinAggregate';
  activateEmailNotifications?: Maybe<Scalars['Boolean']['output']>;
  activateLocation?: Maybe<Scalars['Boolean']['output']>;
  activateNotifications?: Maybe<Scalars['Boolean']['output']>;
  activateSmsNotifications?: Maybe<Scalars['Boolean']['output']>;
  cguAccepted?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  privacyPolicyAccepted?: Maybe<Scalars['Boolean']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserPreferenceNullableScalarRelationFilter = {
  is?: InputMaybe<UserPreferenceWhereInput>;
  isNot?: InputMaybe<UserPreferenceWhereInput>;
};

export type UserPreferenceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserPreferenceOrderByWithRelationInput = {
  activateEmailNotifications?: InputMaybe<SortOrder>;
  activateLocation?: InputMaybe<SortOrder>;
  activateNotifications?: InputMaybe<SortOrder>;
  activateSmsNotifications?: InputMaybe<SortOrder>;
  cguAccepted?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  language?: InputMaybe<SortOrderInput>;
  preferedvelicles?: InputMaybe<VehicleTypeOrderByRelationAggregateInput>;
  privacyPolicyAccepted?: InputMaybe<SortOrder>;
  theme?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrderInput>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type UserPreferenceScalarWhereInput = {
  AND?: InputMaybe<Array<UserPreferenceScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserPreferenceScalarWhereInput>>;
  OR?: InputMaybe<Array<UserPreferenceScalarWhereInput>>;
  activateEmailNotifications?: InputMaybe<BoolFilter>;
  activateLocation?: InputMaybe<BoolFilter>;
  activateNotifications?: InputMaybe<BoolFilter>;
  activateSmsNotifications?: InputMaybe<BoolFilter>;
  cguAccepted?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  language?: InputMaybe<StringNullableFilter>;
  privacyPolicyAccepted?: InputMaybe<BoolFilter>;
  theme?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserPreferenceUpdateManyMutationInput = {
  activateEmailNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateLocation?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateSmsNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  cguAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  privacyPolicyAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  theme?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput = {
  data: UserPreferenceUpdateManyMutationInput;
  where: UserPreferenceScalarWhereInput;
};

export type UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput = {
  connect?: InputMaybe<Array<UserPreferenceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserPreferenceCreateOrConnectWithoutPreferedveliclesInput>>;
  create?: InputMaybe<Array<UserPreferenceCreateWithoutPreferedveliclesInput>>;
  delete?: InputMaybe<Array<UserPreferenceWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserPreferenceScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserPreferenceWhereUniqueInput>>;
  set?: InputMaybe<Array<UserPreferenceWhereUniqueInput>>;
  update?: InputMaybe<Array<UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput>>;
  updateMany?: InputMaybe<Array<UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput>>;
  upsert?: InputMaybe<Array<UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput>>;
};

export type UserPreferenceUpdateOneWithoutUserNestedInput = {
  connect?: InputMaybe<UserPreferenceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserPreferenceCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<UserPreferenceCreateWithoutUserInput>;
  delete?: InputMaybe<UserPreferenceWhereInput>;
  disconnect?: InputMaybe<UserPreferenceWhereInput>;
  update?: InputMaybe<UserPreferenceUpdateToOneWithWhereWithoutUserInput>;
  upsert?: InputMaybe<UserPreferenceUpsertWithoutUserInput>;
};

export type UserPreferenceUpdateToOneWithWhereWithoutUserInput = {
  data: UserPreferenceUpdateWithoutUserInput;
  where?: InputMaybe<UserPreferenceWhereInput>;
};

export type UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput = {
  data: UserPreferenceUpdateWithoutPreferedveliclesInput;
  where: UserPreferenceWhereUniqueInput;
};

export type UserPreferenceUpdateWithoutPreferedveliclesInput = {
  activateEmailNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateLocation?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateSmsNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  cguAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  privacyPolicyAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  theme?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutUserPreferenceNestedInput>;
};

export type UserPreferenceUpdateWithoutUserInput = {
  activateEmailNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateLocation?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  activateSmsNotifications?: InputMaybe<BoolFieldUpdateOperationsInput>;
  cguAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  language?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  preferedvelicles?: InputMaybe<VehicleTypeUpdateManyWithoutUserPreferenceNestedInput>;
  privacyPolicyAccepted?: InputMaybe<BoolFieldUpdateOperationsInput>;
  theme?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserPreferenceUpsertInput = {
  activateEmailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  activateLocation?: InputMaybe<Scalars['Boolean']['input']>;
  activateNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  activateSmsNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  cguAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  preferedVehicleTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  privacyPolicyAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput = {
  create: UserPreferenceCreateWithoutPreferedveliclesInput;
  update: UserPreferenceUpdateWithoutPreferedveliclesInput;
  where: UserPreferenceWhereUniqueInput;
};

export type UserPreferenceUpsertWithoutUserInput = {
  create: UserPreferenceCreateWithoutUserInput;
  update: UserPreferenceUpdateWithoutUserInput;
  where?: InputMaybe<UserPreferenceWhereInput>;
};

export type UserPreferenceWhereInput = {
  AND?: InputMaybe<Array<UserPreferenceWhereInput>>;
  NOT?: InputMaybe<Array<UserPreferenceWhereInput>>;
  OR?: InputMaybe<Array<UserPreferenceWhereInput>>;
  activateEmailNotifications?: InputMaybe<BoolFilter>;
  activateLocation?: InputMaybe<BoolFilter>;
  activateNotifications?: InputMaybe<BoolFilter>;
  activateSmsNotifications?: InputMaybe<BoolFilter>;
  cguAccepted?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  language?: InputMaybe<StringNullableFilter>;
  preferedvelicles?: InputMaybe<VehicleTypeListRelationFilter>;
  privacyPolicyAccepted?: InputMaybe<BoolFilter>;
  theme?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserPreferenceWhereUniqueInput = {
  AND?: InputMaybe<Array<UserPreferenceWhereInput>>;
  NOT?: InputMaybe<Array<UserPreferenceWhereInput>>;
  OR?: InputMaybe<Array<UserPreferenceWhereInput>>;
  activateEmailNotifications?: InputMaybe<BoolFilter>;
  activateLocation?: InputMaybe<BoolFilter>;
  activateNotifications?: InputMaybe<BoolFilter>;
  activateSmsNotifications?: InputMaybe<BoolFilter>;
  cguAccepted?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<StringNullableFilter>;
  preferedvelicles?: InputMaybe<VehicleTypeListRelationFilter>;
  privacyPolicyAccepted?: InputMaybe<BoolFilter>;
  theme?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum UserScalarFieldEnum {
  AVATARID = 'avatarId',
  CREATEDAT = 'createdAt',
  EMAIL = 'email',
  FIRSTNAME = 'firstName',
  ID = 'id',
  ISVERIFIED = 'isVerified',
  LASTNAME = 'lastName',
  PASSWORD = 'password',
  PHONE = 'phone',
  UPDATEDAT = 'updatedAt',
  USERCOVERID = 'userCoverId',
  USERNAME = 'username'
}

export type UserScalarRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  avatarId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isVerified?: InputMaybe<BoolFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userCoverId?: InputMaybe<StringNullableFilter>;
  username?: InputMaybe<StringNullableFilter>;
};

export type UserUpdateInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutAvatarInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutAvatarNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutAvatarInput>>;
  create?: InputMaybe<Array<UserCreateWithoutAvatarInput>>;
  createMany?: InputMaybe<UserCreateManyAvatarInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutAvatarInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutAvatarInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutAvatarInput>>;
};

export type UserUpdateOneRequiredWithoutConversationParticipantNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutConversationParticipantInput>;
  create?: InputMaybe<UserCreateWithoutConversationParticipantInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutConversationParticipantInput>;
  upsert?: InputMaybe<UserUpsertWithoutConversationParticipantInput>;
};

export type UserUpdateOneRequiredWithoutMessageNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessageInput>;
  create?: InputMaybe<UserCreateWithoutMessageInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutMessageInput>;
  upsert?: InputMaybe<UserUpsertWithoutMessageInput>;
};

export type UserUpdateOneRequiredWithoutMessageReadReceiptNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessageReadReceiptInput>;
  create?: InputMaybe<UserCreateWithoutMessageReadReceiptInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutMessageReadReceiptInput>;
  upsert?: InputMaybe<UserUpsertWithoutMessageReadReceiptInput>;
};

export type UserUpdateOneRequiredWithoutReactionNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReactionInput>;
  create?: InputMaybe<UserCreateWithoutReactionInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutReactionInput>;
  upsert?: InputMaybe<UserUpsertWithoutReactionInput>;
};

export type UserUpdateOneRequiredWithoutRideParticipantNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRideParticipantInput>;
  create?: InputMaybe<UserCreateWithoutRideParticipantInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutRideParticipantInput>;
  upsert?: InputMaybe<UserUpsertWithoutRideParticipantInput>;
};

export type UserUpdateOneRequiredWithoutUserCoverNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserCoverInput>;
  create?: InputMaybe<UserCreateWithoutUserCoverInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutUserCoverInput>;
  upsert?: InputMaybe<UserUpsertWithoutUserCoverInput>;
};

export type UserUpdateOneRequiredWithoutUserDocumentNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserDocumentInput>;
  create?: InputMaybe<UserCreateWithoutUserDocumentInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutUserDocumentInput>;
  upsert?: InputMaybe<UserUpsertWithoutUserDocumentInput>;
};

export type UserUpdateOneRequiredWithoutUserImageNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserImageInput>;
  create?: InputMaybe<UserCreateWithoutUserImageInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutUserImageInput>;
  upsert?: InputMaybe<UserUpsertWithoutUserImageInput>;
};

export type UserUpdateOneRequiredWithoutUserPreferenceNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUserPreferenceInput>;
  create?: InputMaybe<UserCreateWithoutUserPreferenceInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutUserPreferenceInput>;
  upsert?: InputMaybe<UserUpsertWithoutUserPreferenceInput>;
};

export type UserUpdateOneRequiredWithoutVehiclesNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutVehiclesInput>;
  create?: InputMaybe<UserCreateWithoutVehiclesInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutVehiclesInput>;
  upsert?: InputMaybe<UserUpsertWithoutVehiclesInput>;
};

export type UserUpdateOneWithoutRidesNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRidesInput>;
  create?: InputMaybe<UserCreateWithoutRidesInput>;
  delete?: InputMaybe<UserWhereInput>;
  disconnect?: InputMaybe<UserWhereInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutRidesInput>;
  upsert?: InputMaybe<UserUpsertWithoutRidesInput>;
};

export type UserUpdateToOneWithWhereWithoutConversationParticipantInput = {
  data: UserUpdateWithoutConversationParticipantInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutMessageInput = {
  data: UserUpdateWithoutMessageInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutMessageReadReceiptInput = {
  data: UserUpdateWithoutMessageReadReceiptInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutReactionInput = {
  data: UserUpdateWithoutReactionInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutRideParticipantInput = {
  data: UserUpdateWithoutRideParticipantInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutRidesInput = {
  data: UserUpdateWithoutRidesInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutUserCoverInput = {
  data: UserUpdateWithoutUserCoverInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutUserDocumentInput = {
  data: UserUpdateWithoutUserDocumentInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutUserImageInput = {
  data: UserUpdateWithoutUserImageInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutUserPreferenceInput = {
  data: UserUpdateWithoutUserPreferenceInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutVehiclesInput = {
  data: UserUpdateWithoutVehiclesInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithWhereUniqueWithoutAvatarInput = {
  data: UserUpdateWithoutAvatarInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutAvatarInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutConversationParticipantInput = {
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutMessageInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutMessageReadReceiptInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutReactionInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutRideParticipantInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutRidesInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutUserCoverInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutUserDocumentInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutUserImageInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutUserPreferenceInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutVehiclesInput = {
  ConversationParticipant?: InputMaybe<ConversationParticipantUpdateManyWithoutUserNestedInput>;
  Message?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptUpdateManyWithoutUserNestedInput>;
  QrToken?: InputMaybe<QrTokenUpdateManyWithoutUserNestedInput>;
  Reaction?: InputMaybe<ReactionUpdateManyWithoutUserNestedInput>;
  RideParticipant?: InputMaybe<RideParticipantUpdateManyWithoutUserNestedInput>;
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserCover?: InputMaybe<UserCoverUpdateOneWithoutUserNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  avatar?: InputMaybe<FileUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  review?: InputMaybe<ReviewUpdateManyWithoutUserNestedInput>;
  rides?: InputMaybe<RideUpdateManyWithoutDriverNestedInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  userCoverId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutAvatarInput = {
  create: UserCreateWithoutAvatarInput;
  update: UserUpdateWithoutAvatarInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutConversationParticipantInput = {
  create: UserCreateWithoutConversationParticipantInput;
  update: UserUpdateWithoutConversationParticipantInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutMessageInput = {
  create: UserCreateWithoutMessageInput;
  update: UserUpdateWithoutMessageInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutMessageReadReceiptInput = {
  create: UserCreateWithoutMessageReadReceiptInput;
  update: UserUpdateWithoutMessageReadReceiptInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutReactionInput = {
  create: UserCreateWithoutReactionInput;
  update: UserUpdateWithoutReactionInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutRideParticipantInput = {
  create: UserCreateWithoutRideParticipantInput;
  update: UserUpdateWithoutRideParticipantInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutRidesInput = {
  create: UserCreateWithoutRidesInput;
  update: UserUpdateWithoutRidesInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutUserCoverInput = {
  create: UserCreateWithoutUserCoverInput;
  update: UserUpdateWithoutUserCoverInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutUserDocumentInput = {
  create: UserCreateWithoutUserDocumentInput;
  update: UserUpdateWithoutUserDocumentInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutUserImageInput = {
  create: UserCreateWithoutUserImageInput;
  update: UserUpdateWithoutUserImageInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutUserPreferenceInput = {
  create: UserCreateWithoutUserPreferenceInput;
  update: UserUpdateWithoutUserPreferenceInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutVehiclesInput = {
  create: UserCreateWithoutVehiclesInput;
  update: UserUpdateWithoutVehiclesInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUserConversationParticipant = {
  __typename?: 'UserUserConversationParticipant';
  avatar?: Maybe<UserPartialAvatar>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  ConversationParticipant?: InputMaybe<ConversationParticipantListRelationFilter>;
  Message?: InputMaybe<MessageListRelationFilter>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  QrToken?: InputMaybe<QrTokenListRelationFilter>;
  Reaction?: InputMaybe<ReactionListRelationFilter>;
  RideParticipant?: InputMaybe<RideParticipantListRelationFilter>;
  Role?: InputMaybe<RoleListRelationFilter>;
  UserCover?: InputMaybe<UserCoverNullableScalarRelationFilter>;
  UserDocument?: InputMaybe<UserDocumentListRelationFilter>;
  UserImage?: InputMaybe<UserImageListRelationFilter>;
  UserPreference?: InputMaybe<UserPreferenceNullableScalarRelationFilter>;
  avatar?: InputMaybe<FileNullableScalarRelationFilter>;
  avatarId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isVerified?: InputMaybe<BoolFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  review?: InputMaybe<ReviewListRelationFilter>;
  rides?: InputMaybe<RideListRelationFilter>;
  tokens?: InputMaybe<RefreshTokenListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userCoverId?: InputMaybe<StringNullableFilter>;
  username?: InputMaybe<StringNullableFilter>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  ConversationParticipant?: InputMaybe<ConversationParticipantListRelationFilter>;
  Message?: InputMaybe<MessageListRelationFilter>;
  MessageReadReceipt?: InputMaybe<MessageReadReceiptListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  QrToken?: InputMaybe<QrTokenListRelationFilter>;
  Reaction?: InputMaybe<ReactionListRelationFilter>;
  RideParticipant?: InputMaybe<RideParticipantListRelationFilter>;
  Role?: InputMaybe<RoleListRelationFilter>;
  UserCover?: InputMaybe<UserCoverNullableScalarRelationFilter>;
  UserDocument?: InputMaybe<UserDocumentListRelationFilter>;
  UserImage?: InputMaybe<UserImageListRelationFilter>;
  UserPreference?: InputMaybe<UserPreferenceNullableScalarRelationFilter>;
  avatar?: InputMaybe<FileNullableScalarRelationFilter>;
  avatarId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<BoolFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  review?: InputMaybe<ReviewListRelationFilter>;
  rides?: InputMaybe<RideListRelationFilter>;
  tokens?: InputMaybe<RefreshTokenListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userCoverId?: InputMaybe<StringNullableFilter>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type VehicleDocument = {
  __typename?: 'VehicleDocument';
  DriverVehicle?: Maybe<DriverVehicle>;
  createdAt: Scalars['DateTime']['output'];
  documentType: VehicleDocumentType;
  driverVehicleId: Scalars['String']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleDocumentCountAggregate = {
  __typename?: 'VehicleDocumentCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  documentType: Scalars['Int']['output'];
  driverVehicleId: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type VehicleDocumentCreateManyDriverVehicleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: VehicleDocumentType;
  fileId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleDocumentCreateManyDriverVehicleInputEnvelope = {
  data: Array<VehicleDocumentCreateManyDriverVehicleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VehicleDocumentCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: VehicleDocumentType;
  driverVehicleId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleDocumentCreateManyFileInputEnvelope = {
  data: Array<VehicleDocumentCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VehicleDocumentCreateNestedManyWithoutDriverVehicleInput = {
  connect?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleDocumentCreateOrConnectWithoutDriverVehicleInput>>;
  create?: InputMaybe<Array<VehicleDocumentCreateWithoutDriverVehicleInput>>;
  createMany?: InputMaybe<VehicleDocumentCreateManyDriverVehicleInputEnvelope>;
};

export type VehicleDocumentCreateNestedManyWithoutFileInput = {
  connect?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleDocumentCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<VehicleDocumentCreateWithoutFileInput>>;
  createMany?: InputMaybe<VehicleDocumentCreateManyFileInputEnvelope>;
};

export type VehicleDocumentCreateOrConnectWithoutDriverVehicleInput = {
  create: VehicleDocumentCreateWithoutDriverVehicleInput;
  where: VehicleDocumentWhereUniqueInput;
};

export type VehicleDocumentCreateOrConnectWithoutFileInput = {
  create: VehicleDocumentCreateWithoutFileInput;
  where: VehicleDocumentWhereUniqueInput;
};

export type VehicleDocumentCreateWithoutDriverVehicleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: VehicleDocumentType;
  file: FileCreateNestedOneWithoutVehicleDocumentInput;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleDocumentCreateWithoutFileInput = {
  DriverVehicle?: InputMaybe<DriverVehicleCreateNestedOneWithoutVehicleDocumentInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  documentType: VehicleDocumentType;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleDocumentListRelationFilter = {
  every?: InputMaybe<VehicleDocumentWhereInput>;
  none?: InputMaybe<VehicleDocumentWhereInput>;
  some?: InputMaybe<VehicleDocumentWhereInput>;
};

export type VehicleDocumentMaxAggregate = {
  __typename?: 'VehicleDocumentMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentType?: Maybe<VehicleDocumentType>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleDocumentMinAggregate = {
  __typename?: 'VehicleDocumentMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentType?: Maybe<VehicleDocumentType>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleDocumentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VehicleDocumentScalarWhereInput = {
  AND?: InputMaybe<Array<VehicleDocumentScalarWhereInput>>;
  NOT?: InputMaybe<Array<VehicleDocumentScalarWhereInput>>;
  OR?: InputMaybe<Array<VehicleDocumentScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documentType?: InputMaybe<EnumVehicleDocumentTypeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export enum VehicleDocumentType {
  CONTROL = 'CONTROL',
  INSURANCE = 'INSURANCE',
  OTHER = 'OTHER',
  REGISTRATION = 'REGISTRATION'
}

export type VehicleDocumentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  documentType?: InputMaybe<EnumVehicleDocumentTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput = {
  data: VehicleDocumentUpdateManyMutationInput;
  where: VehicleDocumentScalarWhereInput;
};

export type VehicleDocumentUpdateManyWithWhereWithoutFileInput = {
  data: VehicleDocumentUpdateManyMutationInput;
  where: VehicleDocumentScalarWhereInput;
};

export type VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput = {
  connect?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleDocumentCreateOrConnectWithoutDriverVehicleInput>>;
  create?: InputMaybe<Array<VehicleDocumentCreateWithoutDriverVehicleInput>>;
  createMany?: InputMaybe<VehicleDocumentCreateManyDriverVehicleInputEnvelope>;
  delete?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VehicleDocumentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  set?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  update?: InputMaybe<Array<VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput>>;
  updateMany?: InputMaybe<Array<VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput>>;
  upsert?: InputMaybe<Array<VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput>>;
};

export type VehicleDocumentUpdateManyWithoutFileNestedInput = {
  connect?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleDocumentCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<VehicleDocumentCreateWithoutFileInput>>;
  createMany?: InputMaybe<VehicleDocumentCreateManyFileInputEnvelope>;
  delete?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VehicleDocumentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  set?: InputMaybe<Array<VehicleDocumentWhereUniqueInput>>;
  update?: InputMaybe<Array<VehicleDocumentUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: InputMaybe<Array<VehicleDocumentUpdateManyWithWhereWithoutFileInput>>;
  upsert?: InputMaybe<Array<VehicleDocumentUpsertWithWhereUniqueWithoutFileInput>>;
};

export type VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput = {
  data: VehicleDocumentUpdateWithoutDriverVehicleInput;
  where: VehicleDocumentWhereUniqueInput;
};

export type VehicleDocumentUpdateWithWhereUniqueWithoutFileInput = {
  data: VehicleDocumentUpdateWithoutFileInput;
  where: VehicleDocumentWhereUniqueInput;
};

export type VehicleDocumentUpdateWithoutDriverVehicleInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  documentType?: InputMaybe<EnumVehicleDocumentTypeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneRequiredWithoutVehicleDocumentNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleDocumentUpdateWithoutFileInput = {
  DriverVehicle?: InputMaybe<DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  documentType?: InputMaybe<EnumVehicleDocumentTypeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput = {
  create: VehicleDocumentCreateWithoutDriverVehicleInput;
  update: VehicleDocumentUpdateWithoutDriverVehicleInput;
  where: VehicleDocumentWhereUniqueInput;
};

export type VehicleDocumentUpsertWithWhereUniqueWithoutFileInput = {
  create: VehicleDocumentCreateWithoutFileInput;
  update: VehicleDocumentUpdateWithoutFileInput;
  where: VehicleDocumentWhereUniqueInput;
};

export type VehicleDocumentWhereInput = {
  AND?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  DriverVehicle?: InputMaybe<DriverVehicleNullableScalarRelationFilter>;
  NOT?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  OR?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documentType?: InputMaybe<EnumVehicleDocumentTypeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleDocumentWhereUniqueInput = {
  AND?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  DriverVehicle?: InputMaybe<DriverVehicleNullableScalarRelationFilter>;
  NOT?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  OR?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documentType?: InputMaybe<EnumVehicleDocumentTypeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleImage = {
  __typename?: 'VehicleImage';
  DriverVehicle?: Maybe<DriverVehicle>;
  createdAt: Scalars['DateTime']['output'];
  driverVehicleId: Scalars['String']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleImageCountAggregate = {
  __typename?: 'VehicleImageCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  driverVehicleId: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type VehicleImageCreateManyDriverVehicleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleImageCreateManyDriverVehicleInputEnvelope = {
  data: Array<VehicleImageCreateManyDriverVehicleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VehicleImageCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  driverVehicleId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleImageCreateManyFileInputEnvelope = {
  data: Array<VehicleImageCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VehicleImageCreateNestedManyWithoutDriverVehicleInput = {
  connect?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleImageCreateOrConnectWithoutDriverVehicleInput>>;
  create?: InputMaybe<Array<VehicleImageCreateWithoutDriverVehicleInput>>;
  createMany?: InputMaybe<VehicleImageCreateManyDriverVehicleInputEnvelope>;
};

export type VehicleImageCreateNestedManyWithoutFileInput = {
  connect?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleImageCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<VehicleImageCreateWithoutFileInput>>;
  createMany?: InputMaybe<VehicleImageCreateManyFileInputEnvelope>;
};

export type VehicleImageCreateOrConnectWithoutDriverVehicleInput = {
  create: VehicleImageCreateWithoutDriverVehicleInput;
  where: VehicleImageWhereUniqueInput;
};

export type VehicleImageCreateOrConnectWithoutFileInput = {
  create: VehicleImageCreateWithoutFileInput;
  where: VehicleImageWhereUniqueInput;
};

export type VehicleImageCreateWithoutDriverVehicleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file: FileCreateNestedOneWithoutVehicleImageInput;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleImageCreateWithoutFileInput = {
  DriverVehicle?: InputMaybe<DriverVehicleCreateNestedOneWithoutVehicleImageInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleImageListRelationFilter = {
  every?: InputMaybe<VehicleImageWhereInput>;
  none?: InputMaybe<VehicleImageWhereInput>;
  some?: InputMaybe<VehicleImageWhereInput>;
};

export type VehicleImageMaxAggregate = {
  __typename?: 'VehicleImageMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleImageMinAggregate = {
  __typename?: 'VehicleImageMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleImageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VehicleImageScalarWhereInput = {
  AND?: InputMaybe<Array<VehicleImageScalarWhereInput>>;
  NOT?: InputMaybe<Array<VehicleImageScalarWhereInput>>;
  OR?: InputMaybe<Array<VehicleImageScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleImageUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput = {
  data: VehicleImageUpdateManyMutationInput;
  where: VehicleImageScalarWhereInput;
};

export type VehicleImageUpdateManyWithWhereWithoutFileInput = {
  data: VehicleImageUpdateManyMutationInput;
  where: VehicleImageScalarWhereInput;
};

export type VehicleImageUpdateManyWithoutDriverVehicleNestedInput = {
  connect?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleImageCreateOrConnectWithoutDriverVehicleInput>>;
  create?: InputMaybe<Array<VehicleImageCreateWithoutDriverVehicleInput>>;
  createMany?: InputMaybe<VehicleImageCreateManyDriverVehicleInputEnvelope>;
  delete?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VehicleImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  set?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  update?: InputMaybe<Array<VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput>>;
  updateMany?: InputMaybe<Array<VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput>>;
  upsert?: InputMaybe<Array<VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput>>;
};

export type VehicleImageUpdateManyWithoutFileNestedInput = {
  connect?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleImageCreateOrConnectWithoutFileInput>>;
  create?: InputMaybe<Array<VehicleImageCreateWithoutFileInput>>;
  createMany?: InputMaybe<VehicleImageCreateManyFileInputEnvelope>;
  delete?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VehicleImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  set?: InputMaybe<Array<VehicleImageWhereUniqueInput>>;
  update?: InputMaybe<Array<VehicleImageUpdateWithWhereUniqueWithoutFileInput>>;
  updateMany?: InputMaybe<Array<VehicleImageUpdateManyWithWhereWithoutFileInput>>;
  upsert?: InputMaybe<Array<VehicleImageUpsertWithWhereUniqueWithoutFileInput>>;
};

export type VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput = {
  data: VehicleImageUpdateWithoutDriverVehicleInput;
  where: VehicleImageWhereUniqueInput;
};

export type VehicleImageUpdateWithWhereUniqueWithoutFileInput = {
  data: VehicleImageUpdateWithoutFileInput;
  where: VehicleImageWhereUniqueInput;
};

export type VehicleImageUpdateWithoutDriverVehicleInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneRequiredWithoutVehicleImageNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleImageUpdateWithoutFileInput = {
  DriverVehicle?: InputMaybe<DriverVehicleUpdateOneWithoutVehicleImageNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput = {
  create: VehicleImageCreateWithoutDriverVehicleInput;
  update: VehicleImageUpdateWithoutDriverVehicleInput;
  where: VehicleImageWhereUniqueInput;
};

export type VehicleImageUpsertWithWhereUniqueWithoutFileInput = {
  create: VehicleImageCreateWithoutFileInput;
  update: VehicleImageUpdateWithoutFileInput;
  where: VehicleImageWhereUniqueInput;
};

export type VehicleImageWhereInput = {
  AND?: InputMaybe<Array<VehicleImageWhereInput>>;
  DriverVehicle?: InputMaybe<DriverVehicleNullableScalarRelationFilter>;
  NOT?: InputMaybe<Array<VehicleImageWhereInput>>;
  OR?: InputMaybe<Array<VehicleImageWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleImageWhereUniqueInput = {
  AND?: InputMaybe<Array<VehicleImageWhereInput>>;
  DriverVehicle?: InputMaybe<DriverVehicleNullableScalarRelationFilter>;
  NOT?: InputMaybe<Array<VehicleImageWhereInput>>;
  OR?: InputMaybe<Array<VehicleImageWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleType = {
  __typename?: 'VehicleType';
  UserPreference?: Maybe<Array<UserPreference>>;
  _count: VehicleTypeCount;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  vehicles?: Maybe<Array<DriverVehicle>>;
};

export type VehicleTypeCount = {
  __typename?: 'VehicleTypeCount';
  UserPreference: Scalars['Int']['output'];
  vehicles: Scalars['Int']['output'];
};

export type VehicleTypeCountAggregate = {
  __typename?: 'VehicleTypeCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type VehicleTypeCreateInput = {
  UserPreference?: InputMaybe<UserPreferenceCreateNestedManyWithoutPreferedveliclesInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutTypeInput>;
};

export type VehicleTypeCreateNestedManyWithoutUserPreferenceInput = {
  connect?: InputMaybe<Array<VehicleTypeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleTypeCreateOrConnectWithoutUserPreferenceInput>>;
  create?: InputMaybe<Array<VehicleTypeCreateWithoutUserPreferenceInput>>;
};

export type VehicleTypeCreateNestedOneWithoutVehiclesInput = {
  connect?: InputMaybe<VehicleTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VehicleTypeCreateOrConnectWithoutVehiclesInput>;
  create?: InputMaybe<VehicleTypeCreateWithoutVehiclesInput>;
};

export type VehicleTypeCreateOrConnectWithoutUserPreferenceInput = {
  create: VehicleTypeCreateWithoutUserPreferenceInput;
  where: VehicleTypeWhereUniqueInput;
};

export type VehicleTypeCreateOrConnectWithoutVehiclesInput = {
  create: VehicleTypeCreateWithoutVehiclesInput;
  where: VehicleTypeWhereUniqueInput;
};

export type VehicleTypeCreateWithoutUserPreferenceInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutTypeInput>;
};

export type VehicleTypeCreateWithoutVehiclesInput = {
  UserPreference?: InputMaybe<UserPreferenceCreateNestedManyWithoutPreferedveliclesInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type VehicleTypeListRelationFilter = {
  every?: InputMaybe<VehicleTypeWhereInput>;
  none?: InputMaybe<VehicleTypeWhereInput>;
  some?: InputMaybe<VehicleTypeWhereInput>;
};

export type VehicleTypeMaxAggregate = {
  __typename?: 'VehicleTypeMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type VehicleTypeMinAggregate = {
  __typename?: 'VehicleTypeMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type VehicleTypeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VehicleTypeOrderByWithRelationInput = {
  UserPreference?: InputMaybe<UserPreferenceOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<DriverVehicleOrderByRelationAggregateInput>;
};

export enum VehicleTypeScalarFieldEnum {
  ID = 'id',
  NAME = 'name'
}

export type VehicleTypeScalarRelationFilter = {
  is?: InputMaybe<VehicleTypeWhereInput>;
  isNot?: InputMaybe<VehicleTypeWhereInput>;
};

export type VehicleTypeScalarWhereInput = {
  AND?: InputMaybe<Array<VehicleTypeScalarWhereInput>>;
  NOT?: InputMaybe<Array<VehicleTypeScalarWhereInput>>;
  OR?: InputMaybe<Array<VehicleTypeScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type VehicleTypeUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput = {
  data: VehicleTypeUpdateManyMutationInput;
  where: VehicleTypeScalarWhereInput;
};

export type VehicleTypeUpdateManyWithoutUserPreferenceNestedInput = {
  connect?: InputMaybe<Array<VehicleTypeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<VehicleTypeCreateOrConnectWithoutUserPreferenceInput>>;
  create?: InputMaybe<Array<VehicleTypeCreateWithoutUserPreferenceInput>>;
  delete?: InputMaybe<Array<VehicleTypeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<VehicleTypeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<VehicleTypeWhereUniqueInput>>;
  set?: InputMaybe<Array<VehicleTypeWhereUniqueInput>>;
  update?: InputMaybe<Array<VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput>>;
  updateMany?: InputMaybe<Array<VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput>>;
  upsert?: InputMaybe<Array<VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput>>;
};

export type VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput = {
  connect?: InputMaybe<VehicleTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VehicleTypeCreateOrConnectWithoutVehiclesInput>;
  create?: InputMaybe<VehicleTypeCreateWithoutVehiclesInput>;
  update?: InputMaybe<VehicleTypeUpdateToOneWithWhereWithoutVehiclesInput>;
  upsert?: InputMaybe<VehicleTypeUpsertWithoutVehiclesInput>;
};

export type VehicleTypeUpdateToOneWithWhereWithoutVehiclesInput = {
  data: VehicleTypeUpdateWithoutVehiclesInput;
  where?: InputMaybe<VehicleTypeWhereInput>;
};

export type VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput = {
  data: VehicleTypeUpdateWithoutUserPreferenceInput;
  where: VehicleTypeWhereUniqueInput;
};

export type VehicleTypeUpdateWithoutUserPreferenceInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutTypeNestedInput>;
};

export type VehicleTypeUpdateWithoutVehiclesInput = {
  UserPreference?: InputMaybe<UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput = {
  create: VehicleTypeCreateWithoutUserPreferenceInput;
  update: VehicleTypeUpdateWithoutUserPreferenceInput;
  where: VehicleTypeWhereUniqueInput;
};

export type VehicleTypeUpsertWithoutVehiclesInput = {
  create: VehicleTypeCreateWithoutVehiclesInput;
  update: VehicleTypeUpdateWithoutVehiclesInput;
  where?: InputMaybe<VehicleTypeWhereInput>;
};

export type VehicleTypeWhereInput = {
  AND?: InputMaybe<Array<VehicleTypeWhereInput>>;
  NOT?: InputMaybe<Array<VehicleTypeWhereInput>>;
  OR?: InputMaybe<Array<VehicleTypeWhereInput>>;
  UserPreference?: InputMaybe<UserPreferenceListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type VehicleTypeWhereUniqueInput = {
  AND?: InputMaybe<Array<VehicleTypeWhereInput>>;
  NOT?: InputMaybe<Array<VehicleTypeWhereInput>>;
  OR?: InputMaybe<Array<VehicleTypeWhereInput>>;
  UserPreference?: InputMaybe<UserPreferenceListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type RegisterUserMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginOutput', token?: string | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName?: string | null } | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  sessionToken: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordOutput', resetLink: string, email: string } };

export type ParticipantAvatarFragment = { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null };

export type ConversationBasicFragment = { __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null };

export type ConversationWithParticipantsFragment = { __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, participants?: Array<{ __typename?: 'UserConversationParticipant', conversationId?: string | null, id: string, isMuted?: boolean | null, joinedAt?: any | null, role?: string | null, user: { __typename?: 'UserUserConversationParticipant', id: string, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null } | null } }> | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, participants?: Array<{ __typename?: 'UserConversationParticipant', conversationId?: string | null, id: string, isMuted?: boolean | null, joinedAt?: any | null, role?: string | null, user: { __typename?: 'UserUserConversationParticipant', id: string, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null } | null } }> | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null } };

export type UpdateConversationMutationVariables = Exact<{
  conversationId: Scalars['String']['input'];
  input: UpdateConversationInput;
}>;


export type UpdateConversationMutation = { __typename?: 'Mutation', updateConversation: { __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, participants?: Array<{ __typename?: 'UserConversationParticipant', conversationId?: string | null, id: string, isMuted?: boolean | null, joinedAt?: any | null, role?: string | null, user: { __typename?: 'UserUserConversationParticipant', id: string, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null } | null } }> | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null } };

export type DeleteConversationMutationVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation: { __typename?: 'UserConversation', id: string, title?: string | null } };

export type AddParticipantMutationVariables = Exact<{
  input: AddParticipantInput;
}>;


export type AddParticipantMutation = { __typename?: 'Mutation', addParticipant: { __typename?: 'ConversationParticipant', id: string, userId: string, conversationId: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null } } };

export type RemoveParticipantMutationVariables = Exact<{
  input: RemoveParticipantInput;
}>;


export type RemoveParticipantMutation = { __typename?: 'Mutation', removeParticipant: { __typename?: 'ConversationParticipant', id: string, userId: string, conversationId: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null } } };

export type GetUserConversationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserConversationsQuery = { __typename?: 'Query', userConversations: { __typename?: 'UserConversationsResponse', hasNextPage: boolean, cursor?: string | null, conversations: Array<{ __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, participants?: Array<{ __typename?: 'UserConversationParticipant', conversationId?: string | null, id: string, isMuted?: boolean | null, joinedAt?: any | null, role?: string | null, user: { __typename?: 'UserUserConversationParticipant', id: string, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null } | null } }> | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null }> } };

export type GetConversationByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetConversationByIdQuery = { __typename?: 'Query', conversation: { __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, participants?: Array<{ __typename?: 'UserConversationParticipant', conversationId?: string | null, id: string, isMuted?: boolean | null, joinedAt?: any | null, role?: string | null, user: { __typename?: 'UserUserConversationParticipant', id: string, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null } | null } }> | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null } };

export type ConversationUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ConversationUpdatedSubscription = { __typename?: 'Subscription', conversationUpdated: { __typename?: 'ConversationPayload', action: string, conversation: { __typename?: 'UserConversation', id: string, title?: string | null, type: ConversationType, createdAt?: any | null, directHash?: string | null, rideId?: string | null, participants?: Array<{ __typename?: 'UserConversationParticipant', conversationId?: string | null, id: string, isMuted?: boolean | null, joinedAt?: any | null, role?: string | null, user: { __typename?: 'UserUserConversationParticipant', id: string, firstName?: string | null, lastName?: string | null, avatar?: { __typename?: 'UserPartialAvatar', id?: string | null, url?: string | null, type?: FileType | null, meta?: any | null, name?: string | null } | null } }> | null, _count?: { __typename?: 'PartialConversationCount', messages?: number | null, participants?: number | null } | null } } };

export type ParticipantUpdatedSubscriptionVariables = Exact<{
  conversationId: Scalars['String']['input'];
}>;


export type ParticipantUpdatedSubscription = { __typename?: 'Subscription', participantUpdated: { __typename?: 'ConversationParticipantPayload', action: string, conversationId: string, participant: { __typename?: 'ConversationParticipant', id: string, userId: string, user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null } } } };

export type DocumentFragment = { __typename?: 'UserDocument', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } };

export type FileFragmentFragment = { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string };

export type ImageFragment = { __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } };

export type MessageFragmentFragment = { __typename?: 'Message', id: string, content?: string | null, senderId: string, clientTempId?: string | null, parentMessageId?: string | null, edited: boolean, editedAt?: any | null, deleted: boolean, deletedAt?: any | null, createdAt: any, sentAt?: any | null, deliveredAt?: any | null, state: MessageState, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null }, replies?: Array<{ __typename?: 'Message', id: string, content?: string | null, senderId: string, createdAt: any, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null } }> | null };

export type MutationMessageFragmentFragment = { __typename?: 'Message', id: string, content?: string | null, senderId: string, clientTempId?: string | null, parentMessageId?: string | null, createdAt: any, sentAt?: any | null, state: MessageState, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null } };

export type SubscriptionMessageFragmentFragment = { __typename?: 'Message', id: string, content?: string | null, senderId: string, clientTempId?: string | null, parentMessageId?: string | null, edited: boolean, editedAt?: any | null, deleted: boolean, deletedAt?: any | null, createdAt: any, sentAt?: any | null, deliveredAt?: any | null, state: MessageState, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null }, replies?: Array<{ __typename?: 'Message', id: string, content?: string | null, senderId: string, createdAt: any, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null } }> | null };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: string, content?: string | null, senderId: string, clientTempId?: string | null, parentMessageId?: string | null, createdAt: any, sentAt?: any | null, state: MessageState, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null } } };

export type EditMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type EditMessageMutation = { __typename?: 'Mutation', editMessage: { __typename?: 'Message', id: string, content?: string | null, edited: boolean, editedAt?: any | null } };

export type MarkMessageDeliveredMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
}>;


export type MarkMessageDeliveredMutation = { __typename?: 'Mutation', markMessageAsDelivered: { __typename?: 'Message', id: string, deliveredAt?: any | null, state: MessageState } };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String']['input'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'Message', id: string, deleted: boolean, deletedAt?: any | null } };

export type GetMessagesQueryVariables = Exact<{
  conversationId?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, content?: string | null, senderId: string, clientTempId?: string | null, parentMessageId?: string | null, edited: boolean, editedAt?: any | null, deleted: boolean, deletedAt?: any | null, createdAt: any, sentAt?: any | null, deliveredAt?: any | null, state: MessageState, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null }, replies?: Array<{ __typename?: 'Message', id: string, content?: string | null, senderId: string, createdAt: any, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null } }> | null }> };

export type MessageReceivedSubscriptionVariables = Exact<{
  conversationId?: InputMaybe<Scalars['String']['input']>;
  rideId?: InputMaybe<Scalars['String']['input']>;
}>;


export type MessageReceivedSubscription = { __typename?: 'Subscription', messageReceived: { __typename?: 'MessagePayload', type: string, message: { __typename?: 'Message', id: string, content?: string | null, senderId: string, clientTempId?: string | null, parentMessageId?: string | null, edited: boolean, editedAt?: any | null, deleted: boolean, deletedAt?: any | null, createdAt: any, sentAt?: any | null, deliveredAt?: any | null, state: MessageState, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null }, replies?: Array<{ __typename?: 'Message', id: string, content?: string | null, senderId: string, createdAt: any, sender: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null } }> | null } } };

export type PresignedUrlFragment = { __typename?: 'PresignedUrl', key: string, url: string, expiresIn: number };

export type CreateBatchPresignedUrlsMutationVariables = Exact<{
  files: Array<FileMetaInput> | FileMetaInput;
  type: FileType;
}>;


export type CreateBatchPresignedUrlsMutation = { __typename?: 'Mutation', createBatchPresignedUrls: Array<{ __typename?: 'PresignedUrl', key: string, url: string, expiresIn: number }> };

export type CompleteUploadBulkMutationVariables = Exact<{
  keys: Array<Scalars['String']['input']> | Scalars['String']['input'];
  type: FileType;
}>;


export type CompleteUploadBulkMutation = { __typename?: 'Mutation', completeUploadBulk: Array<{ __typename?: 'CompleteUploadOutput', key: string, size?: number | null, etag?: string | null, contentType?: string | null }> };

export type UserFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null };

export type UserMessageFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, avatar?: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type UsersQueryVariables = Exact<{
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum> | UserScalarFieldEnum>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: FileType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: FileType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null }> };

export const ConversationBasicFragmentDoc = gql`
    fragment ConversationBasic on UserConversation {
  id
  title
  type
  createdAt
  directHash
  rideId
  _count {
    messages
    participants
  }
}
    `;
export const ParticipantAvatarFragmentDoc = gql`
    fragment ParticipantAvatar on UserPartialAvatar {
  id
  url
  type
  meta
  name
}
    `;
export const ConversationWithParticipantsFragmentDoc = gql`
    fragment ConversationWithParticipants on UserConversation {
  ...ConversationBasic
  participants {
    conversationId
    id
    isMuted
    joinedAt
    role
    user {
      id
      firstName
      lastName
      avatar {
        ...ParticipantAvatar
      }
    }
  }
}
    ${ConversationBasicFragmentDoc}
${ParticipantAvatarFragmentDoc}`;
export const FileFragmentFragmentDoc = gql`
    fragment FileFragment on File {
  id
  meta
  name
  url
  type
  status
  size
  originalName
}
    `;
export const DocumentFragmentDoc = gql`
    fragment Document on UserDocument {
  id
  updatedAt
  file {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export const UserMessageFragmentFragmentDoc = gql`
    fragment userMessageFragment on User {
  id
  firstName
  lastName
  email
  phone
  username
  avatar {
    id
    url
    type
    meta
    name
  }
}
    `;
export const MessageFragmentFragmentDoc = gql`
    fragment messageFragment on Message {
  id
  content
  senderId
  clientTempId
  parentMessageId
  edited
  editedAt
  deleted
  deletedAt
  createdAt
  sentAt
  deliveredAt
  state
  sender {
    ...userMessageFragment
  }
  replies {
    id
    content
    senderId
    createdAt
    sender {
      ...userMessageFragment
    }
  }
}
    ${UserMessageFragmentFragmentDoc}`;
export const MutationMessageFragmentFragmentDoc = gql`
    fragment mutationMessageFragment on Message {
  id
  content
  senderId
  clientTempId
  parentMessageId
  createdAt
  sentAt
  state
  sender {
    ...userMessageFragment
  }
}
    ${UserMessageFragmentFragmentDoc}`;
export const SubscriptionMessageFragmentFragmentDoc = gql`
    fragment subscriptionMessageFragment on Message {
  id
  content
  senderId
  clientTempId
  parentMessageId
  edited
  editedAt
  deleted
  deletedAt
  createdAt
  sentAt
  deliveredAt
  state
  sender {
    ...userMessageFragment
  }
  replies {
    id
    content
    senderId
    createdAt
    sender {
      ...userMessageFragment
    }
  }
}
    ${UserMessageFragmentFragmentDoc}`;
export const PresignedUrlFragmentDoc = gql`
    fragment PresignedUrl on PresignedUrl {
  key
  url
  expiresIn
}
    `;
export const ImageFragmentDoc = gql`
    fragment Image on UserImage {
  id
  updatedAt
  file {
    ...FileFragment
  }
}
    ${FileFragmentFragmentDoc}`;
export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  firstName
  lastName
  email
  phone
  username
  UserImage {
    ...Image
  }
  UserDocument {
    id
    fileId
    createdAt
    file {
      id
      url
      type
      meta
      name
    }
  }
  Role {
    id
    name
  }
}
    ${ImageFragmentDoc}`;
export const RegisterUserDocument = gql`
    mutation RegisterUser($data: RegisterInput!) {
  register(data: $data) {
    id
    firstName
    lastName
    email
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    user {
      id
      email
      firstName
      lastName
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $sessionToken: String!) {
  resetPassword(newPassword: $newPassword, sessionToken: $sessionToken)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      sessionToken: // value for 'sessionToken'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    resetLink
    email
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const CreateConversationDocument = gql`
    mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    ...ConversationWithParticipants
  }
}
    ${ConversationWithParticipantsFragmentDoc}`;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const UpdateConversationDocument = gql`
    mutation UpdateConversation($conversationId: String!, $input: UpdateConversationInput!) {
  updateConversation(conversationId: $conversationId, input: $input) {
    ...ConversationWithParticipants
  }
}
    ${ConversationWithParticipantsFragmentDoc}`;
export type UpdateConversationMutationFn = Apollo.MutationFunction<UpdateConversationMutation, UpdateConversationMutationVariables>;

/**
 * __useUpdateConversationMutation__
 *
 * To run a mutation, you first call `useUpdateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConversationMutation, { data, loading, error }] = useUpdateConversationMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateConversationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConversationMutation, UpdateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConversationMutation, UpdateConversationMutationVariables>(UpdateConversationDocument, options);
      }
export type UpdateConversationMutationHookResult = ReturnType<typeof useUpdateConversationMutation>;
export type UpdateConversationMutationResult = Apollo.MutationResult<UpdateConversationMutation>;
export type UpdateConversationMutationOptions = Apollo.BaseMutationOptions<UpdateConversationMutation, UpdateConversationMutationVariables>;
export const DeleteConversationDocument = gql`
    mutation DeleteConversation($conversationId: String!) {
  deleteConversation(conversationId: $conversationId) {
    id
    title
  }
}
    `;
export type DeleteConversationMutationFn = Apollo.MutationFunction<DeleteConversationMutation, DeleteConversationMutationVariables>;

/**
 * __useDeleteConversationMutation__
 *
 * To run a mutation, you first call `useDeleteConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteConversationMutation, { data, loading, error }] = useDeleteConversationMutation({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useDeleteConversationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteConversationMutation, DeleteConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteConversationMutation, DeleteConversationMutationVariables>(DeleteConversationDocument, options);
      }
export type DeleteConversationMutationHookResult = ReturnType<typeof useDeleteConversationMutation>;
export type DeleteConversationMutationResult = Apollo.MutationResult<DeleteConversationMutation>;
export type DeleteConversationMutationOptions = Apollo.BaseMutationOptions<DeleteConversationMutation, DeleteConversationMutationVariables>;
export const AddParticipantDocument = gql`
    mutation AddParticipant($input: AddParticipantInput!) {
  addParticipant(input: $input) {
    id
    userId
    user {
      id
      firstName
      lastName
    }
    conversationId
  }
}
    `;
export type AddParticipantMutationFn = Apollo.MutationFunction<AddParticipantMutation, AddParticipantMutationVariables>;

/**
 * __useAddParticipantMutation__
 *
 * To run a mutation, you first call `useAddParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addParticipantMutation, { data, loading, error }] = useAddParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddParticipantMutation(baseOptions?: Apollo.MutationHookOptions<AddParticipantMutation, AddParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddParticipantMutation, AddParticipantMutationVariables>(AddParticipantDocument, options);
      }
export type AddParticipantMutationHookResult = ReturnType<typeof useAddParticipantMutation>;
export type AddParticipantMutationResult = Apollo.MutationResult<AddParticipantMutation>;
export type AddParticipantMutationOptions = Apollo.BaseMutationOptions<AddParticipantMutation, AddParticipantMutationVariables>;
export const RemoveParticipantDocument = gql`
    mutation RemoveParticipant($input: RemoveParticipantInput!) {
  removeParticipant(input: $input) {
    id
    userId
    user {
      id
      firstName
      lastName
    }
    conversationId
  }
}
    `;
export type RemoveParticipantMutationFn = Apollo.MutationFunction<RemoveParticipantMutation, RemoveParticipantMutationVariables>;

/**
 * __useRemoveParticipantMutation__
 *
 * To run a mutation, you first call `useRemoveParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeParticipantMutation, { data, loading, error }] = useRemoveParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveParticipantMutation, RemoveParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveParticipantMutation, RemoveParticipantMutationVariables>(RemoveParticipantDocument, options);
      }
export type RemoveParticipantMutationHookResult = ReturnType<typeof useRemoveParticipantMutation>;
export type RemoveParticipantMutationResult = Apollo.MutationResult<RemoveParticipantMutation>;
export type RemoveParticipantMutationOptions = Apollo.BaseMutationOptions<RemoveParticipantMutation, RemoveParticipantMutationVariables>;
export const GetUserConversationsDocument = gql`
    query GetUserConversations($limit: Int, $cursor: String) {
  userConversations(limit: $limit, cursor: $cursor) {
    conversations {
      ...ConversationWithParticipants
    }
    hasNextPage
    cursor
  }
}
    ${ConversationWithParticipantsFragmentDoc}`;

/**
 * __useGetUserConversationsQuery__
 *
 * To run a query within a React component, call `useGetUserConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserConversationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetUserConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserConversationsQuery, GetUserConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserConversationsQuery, GetUserConversationsQueryVariables>(GetUserConversationsDocument, options);
      }
export function useGetUserConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserConversationsQuery, GetUserConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserConversationsQuery, GetUserConversationsQueryVariables>(GetUserConversationsDocument, options);
        }
export function useGetUserConversationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserConversationsQuery, GetUserConversationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserConversationsQuery, GetUserConversationsQueryVariables>(GetUserConversationsDocument, options);
        }
export type GetUserConversationsQueryHookResult = ReturnType<typeof useGetUserConversationsQuery>;
export type GetUserConversationsLazyQueryHookResult = ReturnType<typeof useGetUserConversationsLazyQuery>;
export type GetUserConversationsSuspenseQueryHookResult = ReturnType<typeof useGetUserConversationsSuspenseQuery>;
export type GetUserConversationsQueryResult = Apollo.QueryResult<GetUserConversationsQuery, GetUserConversationsQueryVariables>;
export const GetConversationByIdDocument = gql`
    query GetConversationById($id: String!) {
  conversation(id: $id) {
    ...ConversationWithParticipants
  }
}
    ${ConversationWithParticipantsFragmentDoc}`;

/**
 * __useGetConversationByIdQuery__
 *
 * To run a query within a React component, call `useGetConversationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetConversationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables> & ({ variables: GetConversationByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
      }
export function useGetConversationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
        }
export function useGetConversationByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
        }
export type GetConversationByIdQueryHookResult = ReturnType<typeof useGetConversationByIdQuery>;
export type GetConversationByIdLazyQueryHookResult = ReturnType<typeof useGetConversationByIdLazyQuery>;
export type GetConversationByIdSuspenseQueryHookResult = ReturnType<typeof useGetConversationByIdSuspenseQuery>;
export type GetConversationByIdQueryResult = Apollo.QueryResult<GetConversationByIdQuery, GetConversationByIdQueryVariables>;
export const ConversationUpdatedDocument = gql`
    subscription ConversationUpdated {
  conversationUpdated {
    conversation {
      ...ConversationWithParticipants
    }
    action
  }
}
    ${ConversationWithParticipantsFragmentDoc}`;

/**
 * __useConversationUpdatedSubscription__
 *
 * To run a query within a React component, call `useConversationUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useConversationUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>(ConversationUpdatedDocument, options);
      }
export type ConversationUpdatedSubscriptionHookResult = ReturnType<typeof useConversationUpdatedSubscription>;
export type ConversationUpdatedSubscriptionResult = Apollo.SubscriptionResult<ConversationUpdatedSubscription>;
export const ParticipantUpdatedDocument = gql`
    subscription ParticipantUpdated($conversationId: String!) {
  participantUpdated(conversationId: $conversationId) {
    participant {
      id
      userId
      user {
        id
        firstName
        lastName
      }
    }
    action
    conversationId
  }
}
    `;

/**
 * __useParticipantUpdatedSubscription__
 *
 * To run a query within a React component, call `useParticipantUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useParticipantUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantUpdatedSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useParticipantUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ParticipantUpdatedSubscription, ParticipantUpdatedSubscriptionVariables> & ({ variables: ParticipantUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ParticipantUpdatedSubscription, ParticipantUpdatedSubscriptionVariables>(ParticipantUpdatedDocument, options);
      }
export type ParticipantUpdatedSubscriptionHookResult = ReturnType<typeof useParticipantUpdatedSubscription>;
export type ParticipantUpdatedSubscriptionResult = Apollo.SubscriptionResult<ParticipantUpdatedSubscription>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
    ...mutationMessageFragment
  }
}
    ${MutationMessageFragmentFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($messageId: String!, $content: String!) {
  editMessage(messageId: $messageId, content: $content) {
    id
    content
    edited
    editedAt
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const MarkMessageDeliveredDocument = gql`
    mutation MarkMessageDelivered($messageId: String!) {
  markMessageAsDelivered(messageId: $messageId) {
    id
    deliveredAt
    state
  }
}
    `;
export type MarkMessageDeliveredMutationFn = Apollo.MutationFunction<MarkMessageDeliveredMutation, MarkMessageDeliveredMutationVariables>;

/**
 * __useMarkMessageDeliveredMutation__
 *
 * To run a mutation, you first call `useMarkMessageDeliveredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkMessageDeliveredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markMessageDeliveredMutation, { data, loading, error }] = useMarkMessageDeliveredMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useMarkMessageDeliveredMutation(baseOptions?: Apollo.MutationHookOptions<MarkMessageDeliveredMutation, MarkMessageDeliveredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkMessageDeliveredMutation, MarkMessageDeliveredMutationVariables>(MarkMessageDeliveredDocument, options);
      }
export type MarkMessageDeliveredMutationHookResult = ReturnType<typeof useMarkMessageDeliveredMutation>;
export type MarkMessageDeliveredMutationResult = Apollo.MutationResult<MarkMessageDeliveredMutation>;
export type MarkMessageDeliveredMutationOptions = Apollo.BaseMutationOptions<MarkMessageDeliveredMutation, MarkMessageDeliveredMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId) {
    id
    deleted
    deletedAt
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($conversationId: String, $rideId: String, $cursor: String, $limit: Float) {
  messages(
    conversationId: $conversationId
    rideId: $rideId
    cursor: $cursor
    limit: $limit
  ) {
    ...messageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      rideId: // value for 'rideId'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export function useGetMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesSuspenseQueryHookResult = ReturnType<typeof useGetMessagesSuspenseQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const MessageReceivedDocument = gql`
    subscription MessageReceived($conversationId: String, $rideId: String) {
  messageReceived(conversationId: $conversationId, rideId: $rideId) {
    message {
      ...subscriptionMessageFragment
    }
    type
  }
}
    ${SubscriptionMessageFragmentFragmentDoc}`;

/**
 * __useMessageReceivedSubscription__
 *
 * To run a query within a React component, call `useMessageReceivedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageReceivedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageReceivedSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *      rideId: // value for 'rideId'
 *   },
 * });
 */
export function useMessageReceivedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageReceivedSubscription, MessageReceivedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageReceivedSubscription, MessageReceivedSubscriptionVariables>(MessageReceivedDocument, options);
      }
export type MessageReceivedSubscriptionHookResult = ReturnType<typeof useMessageReceivedSubscription>;
export type MessageReceivedSubscriptionResult = Apollo.SubscriptionResult<MessageReceivedSubscription>;
export const CreateBatchPresignedUrlsDocument = gql`
    mutation createBatchPresignedUrls($files: [FileMetaInput!]!, $type: FileType!) {
  createBatchPresignedUrls(files: $files, type: $type) {
    ...PresignedUrl
  }
}
    ${PresignedUrlFragmentDoc}`;
export type CreateBatchPresignedUrlsMutationFn = Apollo.MutationFunction<CreateBatchPresignedUrlsMutation, CreateBatchPresignedUrlsMutationVariables>;

/**
 * __useCreateBatchPresignedUrlsMutation__
 *
 * To run a mutation, you first call `useCreateBatchPresignedUrlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBatchPresignedUrlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBatchPresignedUrlsMutation, { data, loading, error }] = useCreateBatchPresignedUrlsMutation({
 *   variables: {
 *      files: // value for 'files'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateBatchPresignedUrlsMutation(baseOptions?: Apollo.MutationHookOptions<CreateBatchPresignedUrlsMutation, CreateBatchPresignedUrlsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBatchPresignedUrlsMutation, CreateBatchPresignedUrlsMutationVariables>(CreateBatchPresignedUrlsDocument, options);
      }
export type CreateBatchPresignedUrlsMutationHookResult = ReturnType<typeof useCreateBatchPresignedUrlsMutation>;
export type CreateBatchPresignedUrlsMutationResult = Apollo.MutationResult<CreateBatchPresignedUrlsMutation>;
export type CreateBatchPresignedUrlsMutationOptions = Apollo.BaseMutationOptions<CreateBatchPresignedUrlsMutation, CreateBatchPresignedUrlsMutationVariables>;
export const CompleteUploadBulkDocument = gql`
    mutation completeUploadBulk($keys: [String!]!, $type: FileType!) {
  completeUploadBulk(keys: $keys, type: $type) {
    key
    size
    etag
    contentType
  }
}
    `;
export type CompleteUploadBulkMutationFn = Apollo.MutationFunction<CompleteUploadBulkMutation, CompleteUploadBulkMutationVariables>;

/**
 * __useCompleteUploadBulkMutation__
 *
 * To run a mutation, you first call `useCompleteUploadBulkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteUploadBulkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeUploadBulkMutation, { data, loading, error }] = useCompleteUploadBulkMutation({
 *   variables: {
 *      keys: // value for 'keys'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCompleteUploadBulkMutation(baseOptions?: Apollo.MutationHookOptions<CompleteUploadBulkMutation, CompleteUploadBulkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteUploadBulkMutation, CompleteUploadBulkMutationVariables>(CompleteUploadBulkDocument, options);
      }
export type CompleteUploadBulkMutationHookResult = ReturnType<typeof useCompleteUploadBulkMutation>;
export type CompleteUploadBulkMutationResult = Apollo.MutationResult<CompleteUploadBulkMutation>;
export type CompleteUploadBulkMutationOptions = Apollo.BaseMutationOptions<CompleteUploadBulkMutation, CompleteUploadBulkMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: UserCreateInput!) {
  createUser(input: $input) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetUserDocument = gql`
    query getUser($id: String!) {
  user(id: $id) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query users($cursor: UserWhereUniqueInput, $distinct: [UserScalarFieldEnum!], $orderBy: [UserOrderByWithRelationInput!], $skip: Int, $take: Int, $where: UserWhereInput) {
  users(
    cursor: $cursor
    distinct: $distinct
    orderBy: $orderBy
    skip: $skip
    take: $take
    where: $where
  ) {
    ...userFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      distinct: // value for 'distinct'
 *      orderBy: // value for 'orderBy'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;