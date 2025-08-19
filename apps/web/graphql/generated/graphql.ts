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
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type CompleteUploadOutput = {
  __typename?: 'CompleteUploadOutput';
  contentType?: Maybe<Scalars['String']['output']>;
  etag?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  size?: Maybe<Scalars['Int']['output']>;
};

export type CreateDriverVehicleInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Float']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  uploadDocuments?: InputMaybe<Array<UploadedFileRefInput>>;
  uploadImages?: InputMaybe<Array<UploadedFileRefInput>>;
  vehicleTypeId: Scalars['String']['input'];
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

export type DriverVehicle = {
  __typename?: 'DriverVehicle';
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

export type DriverVehicleCreateWithoutTypeInput = {
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

export type DriverVehicleUpdateWithoutTypeInput = {
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
  NOT?: InputMaybe<Array<DriverVehicleWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleWhereInput>>;
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
  NOT?: InputMaybe<Array<DriverVehicleWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleWhereInput>>;
  VehicleDocument?: InputMaybe<VehicleDocumentListRelationFilter>;
  VehicleImage?: InputMaybe<VehicleImageListRelationFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<StringNullableFilter>;
  place?: InputMaybe<IntFilter>;
  registrationNumber?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<VehicleTypeScalarRelationFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  vehicleTypeId?: InputMaybe<StringFilter>;
};

export type EnumImageTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ImageType>;
};

export type EnumImageTypeFilter = {
  equals?: InputMaybe<ImageType>;
  in?: InputMaybe<Array<ImageType>>;
  not?: InputMaybe<NestedEnumImageTypeFilter>;
  notIn?: InputMaybe<Array<ImageType>>;
};

export type File = {
  __typename?: 'File';
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
  type: ImageType;
  url?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type FileAvgAggregate = {
  __typename?: 'FileAvgAggregate';
  size?: Maybe<Scalars['Float']['output']>;
};

export type FileCount = {
  __typename?: 'FileCount';
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
  type: ImageType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
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

export type FileCreateOrConnectWithoutUserDocumentInput = {
  create: FileCreateWithoutUserDocumentInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutUserImageInput = {
  create: FileCreateWithoutUserImageInput;
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

export type FileCreateWithoutUserDocumentInput = {
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
  type: ImageType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutUserImageInput = {
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
  type: ImageType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutVehicleDocumentInput = {
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
  type: ImageType;
  url?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type FileCreateWithoutVehicleImageInput = {
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
  type: ImageType;
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
  type?: Maybe<ImageType>;
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
  type?: Maybe<ImageType>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type FileOrderByWithRelationInput = {
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

export type FileUpdateInput = {
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
  type?: InputMaybe<EnumImageTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
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

export type FileUpdateToOneWithWhereWithoutUserDocumentInput = {
  data: FileUpdateWithoutUserDocumentInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutUserImageInput = {
  data: FileUpdateWithoutUserImageInput;
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

export type FileUpdateWithoutUserDocumentInput = {
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
  type?: InputMaybe<EnumImageTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutUserImageInput = {
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
  type?: InputMaybe<EnumImageTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutVehicleDocumentInput = {
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
  type?: InputMaybe<EnumImageTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutVehicleImageInput = {
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
  type?: InputMaybe<EnumImageTypeFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  userId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type FileUploadResult = {
  __typename?: 'FileUploadResult';
  url: Scalars['String']['output'];
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
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
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
  type?: InputMaybe<EnumImageTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type FileWhereUniqueInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
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
  type?: InputMaybe<EnumImageTypeFilter>;
  url?: InputMaybe<StringNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ForgotPasswordOutput = {
  __typename?: 'ForgotPasswordOutput';
  email: Scalars['String']['output'];
  resetLink: Scalars['String']['output'];
};

export enum ImageType {
  LANDING = 'LANDING',
  PROFILE = 'PROFILE',
  USER = 'USER',
  VEHICLE = 'VEHICLE'
}

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

export type Mutation = {
  __typename?: 'Mutation';
  completeUploadBulk: Array<CompleteUploadOutput>;
  createBatchPresignedUrls: Array<PresignedUrl>;
  createDriverVehicle: UserPreference;
  createFile: File;
  createUser: User;
  createVehicleType: VehicleType;
  deleteFilesByUserId: Array<File>;
  deleteObject: Scalars['Boolean']['output'];
  deleteVehicleType: VehicleType;
  forgotPassword: ForgotPasswordOutput;
  getPresignedUrl: Scalars['String']['output'];
  login?: Maybe<LoginOutput>;
  logout: Scalars['Boolean']['output'];
  register: User;
  resetPassword: Scalars['Boolean']['output'];
  updateFile: File;
  uploadFile: FileUploadResult;
  upsertUserPreference: UserPreference;
};


export type MutationCompleteUploadBulkArgs = {
  keys: Array<Scalars['String']['input']>;
  type: ImageType;
};


export type MutationCreateBatchPresignedUrlsArgs = {
  files: Array<FileMetaInput>;
  type: ImageType;
};


export type MutationCreateDriverVehicleArgs = {
  input: CreateDriverVehicleInput;
  vehicleId: Scalars['String']['input'];
};


export type MutationCreateFileArgs = {
  input: FileCreateInput;
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationCreateVehicleTypeArgs = {
  input: VehicleTypeCreateInput;
};


export type MutationDeleteObjectArgs = {
  key: Scalars['String']['input'];
};


export type MutationDeleteVehicleTypeArgs = {
  id: Scalars['String']['input'];
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


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  sessionToken: Scalars['String']['input'];
};


export type MutationUpdateFileArgs = {
  id: Scalars['String']['input'];
  input: FileUpdateInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpsertUserPreferenceArgs = {
  input: UserPreferenceUpsertInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
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

export type NestedEnumImageTypeFilter = {
  equals?: InputMaybe<ImageType>;
  in?: InputMaybe<Array<ImageType>>;
  not?: InputMaybe<NestedEnumImageTypeFilter>;
  notIn?: InputMaybe<Array<ImageType>>;
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

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
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

export type PresignedUrl = {
  __typename?: 'PresignedUrl';
  expiresIn: Scalars['Float']['output'];
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  VehicleType: VehicleType;
  file: File;
  files: Array<File>;
  listObjects: Array<Scalars['String']['output']>;
  me: User;
  user: User;
  userPreference?: Maybe<UserPreference>;
  users: Array<User>;
  usersForAdmin: Array<User>;
  vehicleTypes: Array<VehicleType>;
  vehicles?: Maybe<Array<DriverVehicle>>;
};


export type QueryVehicleTypeArgs = {
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


export type QueryListObjectsArgs = {
  bucket: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
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

export type UploadedFileRefInput = {
  key: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  Role?: Maybe<Array<Role>>;
  UserDocument?: Maybe<Array<UserDocument>>;
  UserImage?: Maybe<Array<UserImage>>;
  UserPreference?: Maybe<UserPreference>;
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  tokens?: Maybe<Array<RefreshToken>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  vehicles?: Maybe<Array<DriverVehicle>>;
};

export type UserCount = {
  __typename?: 'UserCount';
  Role: Scalars['Int']['output'];
  UserDocument: Scalars['Int']['output'];
  UserImage: Scalars['Int']['output'];
  tokens: Scalars['Int']['output'];
  vehicles: Scalars['Int']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  firstName: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isVerified: Scalars['Int']['output'];
  lastName: Scalars['Int']['output'];
  password: Scalars['Int']['output'];
  phone: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  username: Scalars['Int']['output'];
};

export type UserCreateInput = {
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
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
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
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

export type UserCreateWithoutUserDocumentInput = {
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
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
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUserImageInput = {
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserPreference?: InputMaybe<UserPreferenceCreateNestedOneWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutUserPreferenceInput = {
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  UserDocument?: InputMaybe<UserDocumentCreateNestedManyWithoutUserInput>;
  UserImage?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserCreateWithoutVehiclesInput = {
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
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
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserDocument = {
  __typename?: 'UserDocument';
  User: User;
  createdAt: Scalars['DateTime']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['String']['output'];
};

export type UserDocumentCountAggregate = {
  __typename?: 'UserDocumentCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserDocumentCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type UserDocumentCreateManyFileInputEnvelope = {
  data: Array<UserDocumentCreateManyFileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserDocumentCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserDocumentCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file: FileCreateNestedOneWithoutUserDocumentInput;
  id?: InputMaybe<Scalars['String']['input']>;
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
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserDocumentMinAggregate = {
  __typename?: 'UserDocumentMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
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
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserDocumentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserDocumentUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  file?: InputMaybe<FileUpdateOneRequiredWithoutUserDocumentNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserDocumentWhereUniqueInput = {
  AND?: InputMaybe<Array<UserDocumentWhereInput>>;
  NOT?: InputMaybe<Array<UserDocumentWhereInput>>;
  OR?: InputMaybe<Array<UserDocumentWhereInput>>;
  User?: InputMaybe<UserScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserOrderByWithRelationInput = {
  Role?: InputMaybe<RoleOrderByRelationAggregateInput>;
  UserDocument?: InputMaybe<UserDocumentOrderByRelationAggregateInput>;
  UserImage?: InputMaybe<UserImageOrderByRelationAggregateInput>;
  UserPreference?: InputMaybe<UserPreferenceOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isVerified?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrderInput>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrderInput>;
  tokens?: InputMaybe<RefreshTokenOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrderInput>;
  username?: InputMaybe<SortOrderInput>;
  vehicles?: InputMaybe<DriverVehicleOrderByRelationAggregateInput>;
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
  CREATEDAT = 'createdAt',
  EMAIL = 'email',
  FIRSTNAME = 'firstName',
  ID = 'id',
  ISVERIFIED = 'isVerified',
  LASTNAME = 'lastName',
  PASSWORD = 'password',
  PHONE = 'phone',
  UPDATEDAT = 'updatedAt',
  USERNAME = 'username'
}

export type UserScalarRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
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

export type UserUpdateWithoutUserDocumentInput = {
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
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
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutUserImageInput = {
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserPreference?: InputMaybe<UserPreferenceUpdateOneWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutUserPreferenceInput = {
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
  UserDocument?: InputMaybe<UserDocumentUpdateManyWithoutUserNestedInput>;
  UserImage?: InputMaybe<UserImageUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  firstName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  isVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  lastName?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  phone?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  vehicles?: InputMaybe<DriverVehicleUpdateManyWithoutUserNestedInput>;
};

export type UserUpdateWithoutVehiclesInput = {
  Role?: InputMaybe<RoleUpdateManyWithoutUsersNestedInput>;
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
  tokens?: InputMaybe<RefreshTokenUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
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

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Role?: InputMaybe<RoleListRelationFilter>;
  UserDocument?: InputMaybe<UserDocumentListRelationFilter>;
  UserImage?: InputMaybe<UserImageListRelationFilter>;
  UserPreference?: InputMaybe<UserPreferenceNullableScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  isVerified?: InputMaybe<BoolFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  tokens?: InputMaybe<RefreshTokenListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  username?: InputMaybe<StringNullableFilter>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Role?: InputMaybe<RoleListRelationFilter>;
  UserDocument?: InputMaybe<UserDocumentListRelationFilter>;
  UserImage?: InputMaybe<UserImageListRelationFilter>;
  UserPreference?: InputMaybe<UserPreferenceNullableScalarRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<BoolFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  tokens?: InputMaybe<RefreshTokenListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type VehicleDocument = {
  __typename?: 'VehicleDocument';
  DriverVehicle?: Maybe<DriverVehicle>;
  createdAt: Scalars['DateTime']['output'];
  driverVehicleId: Scalars['String']['output'];
  file: File;
  fileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleDocumentCountAggregate = {
  __typename?: 'VehicleDocumentCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  driverVehicleId: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type VehicleDocumentCreateManyDriverVehicleInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleDocumentCreateManyDriverVehicleInputEnvelope = {
  data: Array<VehicleDocumentCreateManyDriverVehicleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VehicleDocumentCreateManyFileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  driverVehicleId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
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
  file: FileCreateNestedOneWithoutVehicleDocumentInput;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type VehicleDocumentCreateWithoutFileInput = {
  DriverVehicle?: InputMaybe<DriverVehicleCreateNestedOneWithoutVehicleDocumentInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
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
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type VehicleDocumentMinAggregate = {
  __typename?: 'VehicleDocumentMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  driverVehicleId?: Maybe<Scalars['String']['output']>;
  fileId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
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
  driverVehicleId?: InputMaybe<StringFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleDocumentUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  file?: InputMaybe<FileUpdateOneRequiredWithoutVehicleDocumentNestedInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type VehicleDocumentUpdateWithoutFileInput = {
  DriverVehicle?: InputMaybe<DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  driverVehicleId?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VehicleDocumentWhereUniqueInput = {
  AND?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  DriverVehicle?: InputMaybe<DriverVehicleNullableScalarRelationFilter>;
  NOT?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  OR?: InputMaybe<Array<VehicleDocumentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  driverVehicleId?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileScalarRelationFilter>;
  fileId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
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

export type DocumentFragment = { __typename?: 'UserDocument', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string } };

export type FileFragmentFragment = { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string };

export type ImageFragment = { __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string } };

export type PresignedUrlFragment = { __typename?: 'PresignedUrl', key: string, url: string, expiresIn: number };

export type CreateBatchPresignedUrlsMutationVariables = Exact<{
  files: Array<FileMetaInput> | FileMetaInput;
  type: ImageType;
}>;


export type CreateBatchPresignedUrlsMutation = { __typename?: 'Mutation', createBatchPresignedUrls: Array<{ __typename?: 'PresignedUrl', key: string, url: string, expiresIn: number }> };

export type CompleteUploadBulkMutationVariables = Exact<{
  keys: Array<Scalars['String']['input']> | Scalars['String']['input'];
  type: ImageType;
}>;


export type CompleteUploadBulkMutation = { __typename?: 'Mutation', completeUploadBulk: Array<{ __typename?: 'CompleteUploadOutput', key: string, size?: number | null, etag?: string | null, contentType?: string | null }> };

export type UserFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: ImageType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null };

export type CreateUserMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: ImageType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: ImageType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, UserImage?: Array<{ __typename?: 'UserImage', id: string, updatedAt?: any | null, file: { __typename?: 'File', id: string, meta?: any | null, name?: string | null, url?: string | null, type: ImageType, status: string, size?: number | null, originalName: string } }> | null, UserDocument?: Array<{ __typename?: 'UserDocument', id: string, fileId: string, createdAt: any, file: { __typename?: 'File', id: string, url?: string | null, type: ImageType, meta?: any | null, name?: string | null } }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

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
export const CreateBatchPresignedUrlsDocument = gql`
    mutation createBatchPresignedUrls($files: [FileMetaInput!]!, $type: ImageType!) {
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
    mutation completeUploadBulk($keys: [String!]!, $type: ImageType!) {
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