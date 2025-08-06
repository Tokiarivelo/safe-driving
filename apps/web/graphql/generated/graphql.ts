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
  Upload: { input: any; output: any; }
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
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

export type DriverIdCards = {
  __typename?: 'DriverIDCards';
  id: Scalars['String']['output'];
  recto_url?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['String']['output'];
  verso_url?: Maybe<Scalars['String']['output']>;
};

export type DriverIdCardsCountAggregate = {
  __typename?: 'DriverIDCardsCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  recto_url: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  verso_url: Scalars['Int']['output'];
};

export type DriverIdCardsCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  recto_url?: InputMaybe<Scalars['String']['input']>;
  verso_url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverIdCardsCreateManyUserInputEnvelope = {
  data: Array<DriverIdCardsCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DriverIdCardsCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<DriverIdCardsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverIdCardsCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<DriverIdCardsCreateWithoutUserInput>>;
  createMany?: InputMaybe<DriverIdCardsCreateManyUserInputEnvelope>;
};

export type DriverIdCardsCreateOrConnectWithoutUserInput = {
  create: DriverIdCardsCreateWithoutUserInput;
  where: DriverIdCardsWhereUniqueInput;
};

export type DriverIdCardsCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  recto_url?: InputMaybe<Scalars['String']['input']>;
  verso_url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverIdCardsListRelationFilter = {
  every?: InputMaybe<DriverIdCardsWhereInput>;
  none?: InputMaybe<DriverIdCardsWhereInput>;
  some?: InputMaybe<DriverIdCardsWhereInput>;
};

export type DriverIdCardsMaxAggregate = {
  __typename?: 'DriverIDCardsMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  recto_url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  verso_url?: Maybe<Scalars['String']['output']>;
};

export type DriverIdCardsMinAggregate = {
  __typename?: 'DriverIDCardsMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  recto_url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  verso_url?: Maybe<Scalars['String']['output']>;
};

export type DriverIdCardsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DriverIdCardsWhereInput = {
  AND?: InputMaybe<Array<DriverIdCardsWhereInput>>;
  NOT?: InputMaybe<Array<DriverIdCardsWhereInput>>;
  OR?: InputMaybe<Array<DriverIdCardsWhereInput>>;
  id?: InputMaybe<StringFilter>;
  recto_url?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
  verso_url?: InputMaybe<StringNullableFilter>;
};

export type DriverIdCardsWhereUniqueInput = {
  AND?: InputMaybe<Array<DriverIdCardsWhereInput>>;
  NOT?: InputMaybe<Array<DriverIdCardsWhereInput>>;
  OR?: InputMaybe<Array<DriverIdCardsWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  recto_url?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<Scalars['String']['input']>;
  verso_url?: InputMaybe<StringNullableFilter>;
};

export type DriverLicense = {
  __typename?: 'DriverLicense';
  id: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type DriverLicenseCountAggregate = {
  __typename?: 'DriverLicenseCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type DriverLicenseCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverLicenseCreateManyUserInputEnvelope = {
  data: Array<DriverLicenseCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DriverLicenseCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<DriverLicenseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverLicenseCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<DriverLicenseCreateWithoutUserInput>>;
  createMany?: InputMaybe<DriverLicenseCreateManyUserInputEnvelope>;
};

export type DriverLicenseCreateOrConnectWithoutUserInput = {
  create: DriverLicenseCreateWithoutUserInput;
  where: DriverLicenseWhereUniqueInput;
};

export type DriverLicenseCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverLicenseListRelationFilter = {
  every?: InputMaybe<DriverLicenseWhereInput>;
  none?: InputMaybe<DriverLicenseWhereInput>;
  some?: InputMaybe<DriverLicenseWhereInput>;
};

export type DriverLicenseMaxAggregate = {
  __typename?: 'DriverLicenseMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type DriverLicenseMinAggregate = {
  __typename?: 'DriverLicenseMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type DriverLicenseOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DriverLicenseWhereInput = {
  AND?: InputMaybe<Array<DriverLicenseWhereInput>>;
  NOT?: InputMaybe<Array<DriverLicenseWhereInput>>;
  OR?: InputMaybe<Array<DriverLicenseWhereInput>>;
  id?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type DriverLicenseWhereUniqueInput = {
  AND?: InputMaybe<Array<DriverLicenseWhereInput>>;
  NOT?: InputMaybe<Array<DriverLicenseWhereInput>>;
  OR?: InputMaybe<Array<DriverLicenseWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type DriverRegistrationInput = {
  driverLicenseImage: Scalars['Upload']['input'];
  idCardImages: Scalars['Upload']['input'];
  vehicle: VehicleInput;
};

export type DriverVehicle = {
  __typename?: 'DriverVehicle';
  DriverVehicleImg?: Maybe<Array<DriverVehicleImg>>;
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
  DriverVehicleImg: Scalars['Int']['output'];
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

export type DriverVehicleCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<DriverVehicleWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverVehicleCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<DriverVehicleCreateWithoutUserInput>>;
  createMany?: InputMaybe<DriverVehicleCreateManyUserInputEnvelope>;
};

export type DriverVehicleCreateOrConnectWithoutUserInput = {
  create: DriverVehicleCreateWithoutUserInput;
  where: DriverVehicleWhereUniqueInput;
};

export type DriverVehicleCreateWithoutUserInput = {
  DriverVehicleImg?: InputMaybe<DriverVehicleImgCreateNestedManyWithoutVehicleInput>;
  brand?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['Int']['input'];
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  type: VehicleTypeCreateNestedOneWithoutVehiclesInput;
};

export type DriverVehicleImg = {
  __typename?: 'DriverVehicleImg';
  category?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  vehicle: DriverVehicle;
  vehicleId: Scalars['String']['output'];
};

export type DriverVehicleImgCountAggregate = {
  __typename?: 'DriverVehicleImgCountAggregate';
  _all: Scalars['Int']['output'];
  category: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
  vehicleId: Scalars['Int']['output'];
};

export type DriverVehicleImgCreateManyVehicleInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverVehicleImgCreateManyVehicleInputEnvelope = {
  data: Array<DriverVehicleImgCreateManyVehicleInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DriverVehicleImgCreateNestedManyWithoutVehicleInput = {
  connect?: InputMaybe<Array<DriverVehicleImgWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DriverVehicleImgCreateOrConnectWithoutVehicleInput>>;
  create?: InputMaybe<Array<DriverVehicleImgCreateWithoutVehicleInput>>;
  createMany?: InputMaybe<DriverVehicleImgCreateManyVehicleInputEnvelope>;
};

export type DriverVehicleImgCreateOrConnectWithoutVehicleInput = {
  create: DriverVehicleImgCreateWithoutVehicleInput;
  where: DriverVehicleImgWhereUniqueInput;
};

export type DriverVehicleImgCreateWithoutVehicleInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DriverVehicleImgListRelationFilter = {
  every?: InputMaybe<DriverVehicleImgWhereInput>;
  none?: InputMaybe<DriverVehicleImgWhereInput>;
  some?: InputMaybe<DriverVehicleImgWhereInput>;
};

export type DriverVehicleImgMaxAggregate = {
  __typename?: 'DriverVehicleImgMaxAggregate';
  category?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type DriverVehicleImgMinAggregate = {
  __typename?: 'DriverVehicleImgMinAggregate';
  category?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type DriverVehicleImgWhereInput = {
  AND?: InputMaybe<Array<DriverVehicleImgWhereInput>>;
  NOT?: InputMaybe<Array<DriverVehicleImgWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleImgWhereInput>>;
  category?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
  vehicle?: InputMaybe<DriverVehicleScalarRelationFilter>;
  vehicleId?: InputMaybe<StringFilter>;
};

export type DriverVehicleImgWhereUniqueInput = {
  AND?: InputMaybe<Array<DriverVehicleImgWhereInput>>;
  NOT?: InputMaybe<Array<DriverVehicleImgWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleImgWhereInput>>;
  category?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<StringNullableFilter>;
  vehicle?: InputMaybe<DriverVehicleScalarRelationFilter>;
  vehicleId?: InputMaybe<StringFilter>;
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

export type DriverVehicleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DriverVehicleScalarRelationFilter = {
  is?: InputMaybe<DriverVehicleWhereInput>;
  isNot?: InputMaybe<DriverVehicleWhereInput>;
};

export type DriverVehicleSumAggregate = {
  __typename?: 'DriverVehicleSumAggregate';
  place?: Maybe<Scalars['Int']['output']>;
};

export type DriverVehicleWhereInput = {
  AND?: InputMaybe<Array<DriverVehicleWhereInput>>;
  DriverVehicleImg?: InputMaybe<DriverVehicleImgListRelationFilter>;
  NOT?: InputMaybe<Array<DriverVehicleWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleWhereInput>>;
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
  DriverVehicleImg?: InputMaybe<DriverVehicleImgListRelationFilter>;
  NOT?: InputMaybe<Array<DriverVehicleWhereInput>>;
  OR?: InputMaybe<Array<DriverVehicleWhereInput>>;
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

export type ForgotPasswordOutput = {
  __typename?: 'ForgotPasswordOutput';
  email: Scalars['String']['output'];
  resetLink: Scalars['String']['output'];
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
  createUser: User;
  forgotPassword: ForgotPasswordOutput;
  login?: Maybe<LoginOutput>;
  logout: Scalars['Boolean']['output'];
  register: User;
  resetPassword: Scalars['Boolean']['output'];
};


export type MutationCreateUserArgs = {
  input: UserRegistrationInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
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

export enum NullsOrder {
  FIRST = 'first',
  LAST = 'last'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  user: User;
  users: Array<User>;
  usersForAdmin: Array<User>;
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

export type User = {
  __typename?: 'User';
  DriverIDCards?: Maybe<Array<DriverIdCards>>;
  DriverLicense?: Maybe<Array<DriverLicense>>;
  Role?: Maybe<Array<Role>>;
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  images?: Maybe<Array<UserImage>>;
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
  DriverIDCards: Scalars['Int']['output'];
  DriverLicense: Scalars['Int']['output'];
  Role: Scalars['Int']['output'];
  images: Scalars['Int']['output'];
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
  DriverIDCards?: InputMaybe<DriverIdCardsCreateNestedManyWithoutUserInput>;
  DriverLicense?: InputMaybe<DriverLicenseCreateNestedManyWithoutUserInput>;
  Role?: InputMaybe<RoleCreateNestedManyWithoutUsersInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<UserImageCreateNestedManyWithoutUserInput>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  tokens?: InputMaybe<RefreshTokenCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleCreateNestedManyWithoutUserInput>;
};

export type UserImage = {
  __typename?: 'UserImage';
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type UserImageCountAggregate = {
  __typename?: 'UserImageCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserImageCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type UserImageCreateManyUserInputEnvelope = {
  data: Array<UserImageCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserImageCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserImageCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserImageCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserImageCreateManyUserInputEnvelope>;
};

export type UserImageCreateOrConnectWithoutUserInput = {
  create: UserImageCreateWithoutUserInput;
  where: UserImageWhereUniqueInput;
};

export type UserImageCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type UserImageListRelationFilter = {
  every?: InputMaybe<UserImageWhereInput>;
  none?: InputMaybe<UserImageWhereInput>;
  some?: InputMaybe<UserImageWhereInput>;
};

export type UserImageMaxAggregate = {
  __typename?: 'UserImageMaxAggregate';
  id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserImageMinAggregate = {
  __typename?: 'UserImageMinAggregate';
  id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserImageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserImageWhereInput = {
  AND?: InputMaybe<Array<UserImageWhereInput>>;
  NOT?: InputMaybe<Array<UserImageWhereInput>>;
  OR?: InputMaybe<Array<UserImageWhereInput>>;
  id?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserImageWhereUniqueInput = {
  AND?: InputMaybe<Array<UserImageWhereInput>>;
  NOT?: InputMaybe<Array<UserImageWhereInput>>;
  OR?: InputMaybe<Array<UserImageWhereInput>>;
  id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
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
  DriverIDCards?: InputMaybe<DriverIdCardsOrderByRelationAggregateInput>;
  DriverLicense?: InputMaybe<DriverLicenseOrderByRelationAggregateInput>;
  Role?: InputMaybe<RoleOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<UserImageOrderByRelationAggregateInput>;
  isVerified?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrderInput>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrderInput>;
  tokens?: InputMaybe<RefreshTokenOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrderInput>;
  username?: InputMaybe<SortOrderInput>;
  vehicles?: InputMaybe<DriverVehicleOrderByRelationAggregateInput>;
};

export type UserRegistrationInput = {
  driver: DriverRegistrationInput;
  user: UserCreateInput;
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

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  DriverIDCards?: InputMaybe<DriverIdCardsListRelationFilter>;
  DriverLicense?: InputMaybe<DriverLicenseListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Role?: InputMaybe<RoleListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<UserImageListRelationFilter>;
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
  DriverIDCards?: InputMaybe<DriverIdCardsListRelationFilter>;
  DriverLicense?: InputMaybe<DriverLicenseListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Role?: InputMaybe<RoleListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<UserImageListRelationFilter>;
  isVerified?: InputMaybe<BoolFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  tokens?: InputMaybe<RefreshTokenListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  username?: InputMaybe<Scalars['String']['input']>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type VehicleInput = {
  assuranceImages: Array<Scalars['Upload']['input']>;
  brand: Scalars['String']['input'];
  model: Scalars['String']['input'];
  place: Scalars['Int']['input'];
  registrationImages: Array<Scalars['Upload']['input']>;
  registrationNumber: Scalars['String']['input'];
  vehicleImages: Array<Scalars['Upload']['input']>;
  vehicleType: Scalars['String']['input'];
};

export type VehicleType = {
  __typename?: 'VehicleType';
  _count: VehicleTypeCount;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  vehicles?: Maybe<Array<DriverVehicle>>;
};

export type VehicleTypeCount = {
  __typename?: 'VehicleTypeCount';
  vehicles: Scalars['Int']['output'];
};

export type VehicleTypeCountAggregate = {
  __typename?: 'VehicleTypeCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type VehicleTypeCreateNestedOneWithoutVehiclesInput = {
  connect?: InputMaybe<VehicleTypeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VehicleTypeCreateOrConnectWithoutVehiclesInput>;
  create?: InputMaybe<VehicleTypeCreateWithoutVehiclesInput>;
};

export type VehicleTypeCreateOrConnectWithoutVehiclesInput = {
  create: VehicleTypeCreateWithoutVehiclesInput;
  where: VehicleTypeWhereUniqueInput;
};

export type VehicleTypeCreateWithoutVehiclesInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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

export type VehicleTypeScalarRelationFilter = {
  is?: InputMaybe<VehicleTypeWhereInput>;
  isNot?: InputMaybe<VehicleTypeWhereInput>;
};

export type VehicleTypeWhereInput = {
  AND?: InputMaybe<Array<VehicleTypeWhereInput>>;
  NOT?: InputMaybe<Array<VehicleTypeWhereInput>>;
  OR?: InputMaybe<Array<VehicleTypeWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  vehicles?: InputMaybe<DriverVehicleListRelationFilter>;
};

export type VehicleTypeWhereUniqueInput = {
  AND?: InputMaybe<Array<VehicleTypeWhereInput>>;
  NOT?: InputMaybe<Array<VehicleTypeWhereInput>>;
  OR?: InputMaybe<Array<VehicleTypeWhereInput>>;
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

export type ImageFragment = { __typename?: 'UserImage', id: string, url: string, type: string };

export type UserFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, images?: Array<{ __typename?: 'UserImage', id: string, url: string, type: string }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null };

export type CreateUserMutationVariables = Exact<{
  input: UserRegistrationInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, images?: Array<{ __typename?: 'UserImage', id: string, url: string, type: string }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, images?: Array<{ __typename?: 'UserImage', id: string, url: string, type: string }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, email: string, phone?: string | null, username?: string | null, images?: Array<{ __typename?: 'UserImage', id: string, url: string, type: string }> | null, Role?: Array<{ __typename?: 'Role', id: string, name: string }> | null } };

export const ImageFragmentDoc = gql`
    fragment Image on UserImage {
  id
  url
  type
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  firstName
  lastName
  email
  phone
  username
  images {
    ...Image
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
export const CreateUserDocument = gql`
    mutation createUser($input: UserRegistrationInput!) {
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