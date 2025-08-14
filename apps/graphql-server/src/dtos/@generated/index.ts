import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

export enum VehicleTypeScalarFieldEnum {
    id = "id",
    name = "name"
}

export enum VehicleImageScalarFieldEnum {
    id = "id",
    driverVehicleId = "driverVehicleId",
    fileId = "fileId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum VehicleDocumentScalarFieldEnum {
    id = "id",
    driverVehicleId = "driverVehicleId",
    fileId = "fileId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum UserPreferenceScalarFieldEnum {
    id = "id",
    userId = "userId",
    activateLocation = "activateLocation",
    activateNotifications = "activateNotifications",
    activateSmsNotifications = "activateSmsNotifications",
    activateEmailNotifications = "activateEmailNotifications",
    language = "language",
    theme = "theme",
    cguAccepted = "cguAccepted",
    privacyPolicyAccepted = "privacyPolicyAccepted",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum UserImageScalarFieldEnum {
    id = "id",
    userId = "userId",
    fileId = "fileId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum UserDocumentScalarFieldEnum {
    id = "id",
    userId = "userId",
    fileId = "fileId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum UserScalarFieldEnum {
    id = "id",
    email = "email",
    firstName = "firstName",
    lastName = "lastName",
    phone = "phone",
    username = "username",
    password = "password",
    isVerified = "isVerified",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}

export enum RoleScalarFieldEnum {
    id = "id",
    name = "name"
}

export enum RefreshTokenScalarFieldEnum {
    id = "id",
    token = "token",
    expiresAt = "expiresAt",
    userId = "userId",
    createdAt = "createdAt"
}

export enum TransactionIsolationLevel {
    ReadUncommitted = "ReadUncommitted",
    ReadCommitted = "ReadCommitted",
    RepeatableRead = "RepeatableRead",
    Serializable = "Serializable"
}

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export enum QueryMode {
    'default' = "default",
    insensitive = "insensitive"
}

export enum NullsOrder {
    first = "first",
    last = "last"
}

export enum NullableJsonNullValueInput {
    DbNull = "DbNull",
    JsonNull = "JsonNull"
}

export enum JsonNullValueFilter {
    DbNull = "DbNull",
    JsonNull = "JsonNull",
    AnyNull = "AnyNull"
}

export enum ImageType {
    USER = "USER",
    PROFILE = "PROFILE",
    VEHICLE = "VEHICLE",
    LANDING = "LANDING"
}

export enum FileScalarFieldEnum {
    id = "id",
    url = "url",
    type = "type",
    key = "key",
    originalName = "originalName",
    contentType = "contentType",
    size = "size",
    etag = "etag",
    status = "status",
    meta = "meta",
    name = "name",
    userId = "userId",
    driverVehicleId = "driverVehicleId"
}

export enum DriverVehicleScalarFieldEnum {
    id = "id",
    userId = "userId",
    brand = "brand",
    model = "model",
    registrationNumber = "registrationNumber",
    place = "place",
    vehicleTypeId = "vehicleTypeId"
}

registerEnumType(DriverVehicleScalarFieldEnum, { name: 'DriverVehicleScalarFieldEnum', description: undefined })
registerEnumType(FileScalarFieldEnum, { name: 'FileScalarFieldEnum', description: undefined })
registerEnumType(ImageType, { name: 'ImageType', description: undefined })
registerEnumType(JsonNullValueFilter, { name: 'JsonNullValueFilter', description: undefined })
registerEnumType(NullableJsonNullValueInput, { name: 'NullableJsonNullValueInput', description: undefined })
registerEnumType(NullsOrder, { name: 'NullsOrder', description: undefined })
registerEnumType(QueryMode, { name: 'QueryMode', description: undefined })
registerEnumType(SortOrder, { name: 'SortOrder', description: undefined })
registerEnumType(TransactionIsolationLevel, { name: 'TransactionIsolationLevel', description: undefined })
registerEnumType(RefreshTokenScalarFieldEnum, { name: 'RefreshTokenScalarFieldEnum', description: undefined })
registerEnumType(RoleScalarFieldEnum, { name: 'RoleScalarFieldEnum', description: undefined })
registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
registerEnumType(UserDocumentScalarFieldEnum, { name: 'UserDocumentScalarFieldEnum', description: undefined })
registerEnumType(UserImageScalarFieldEnum, { name: 'UserImageScalarFieldEnum', description: undefined })
registerEnumType(UserPreferenceScalarFieldEnum, { name: 'UserPreferenceScalarFieldEnum', description: undefined })
registerEnumType(VehicleDocumentScalarFieldEnum, { name: 'VehicleDocumentScalarFieldEnum', description: undefined })
registerEnumType(VehicleImageScalarFieldEnum, { name: 'VehicleImageScalarFieldEnum', description: undefined })
registerEnumType(VehicleTypeScalarFieldEnum, { name: 'VehicleTypeScalarFieldEnum', description: undefined })

@ObjectType()
export class AggregateDriverVehicle {
    @Field(() => DriverVehicleCountAggregate, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleCountAggregate>;
    @Field(() => DriverVehicleAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof DriverVehicleAvgAggregate>;
    @Field(() => DriverVehicleSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof DriverVehicleSumAggregate>;
    @Field(() => DriverVehicleMinAggregate, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleMinAggregate>;
    @Field(() => DriverVehicleMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleMaxAggregate>;
}

@ArgsType()
export class CreateManyDriverVehicleArgs {
    @Field(() => [DriverVehicleCreateManyInput], {nullable:false})
    @Type(() => DriverVehicleCreateManyInput)
    data!: Array<DriverVehicleCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneDriverVehicleArgs {
    @Field(() => DriverVehicleCreateInput, {nullable:false})
    @Type(() => DriverVehicleCreateInput)
    data!: InstanceType<typeof DriverVehicleCreateInput>;
}

@ArgsType()
export class DeleteManyDriverVehicleArgs {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneDriverVehicleArgs {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@ArgsType()
export class DriverVehicleAggregateArgs {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleOrderByWithRelationInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => DriverVehicleCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleCountAggregateInput>;
    @Field(() => DriverVehicleAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof DriverVehicleAvgAggregateInput>;
    @Field(() => DriverVehicleSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof DriverVehicleSumAggregateInput>;
    @Field(() => DriverVehicleMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleMinAggregateInput>;
    @Field(() => DriverVehicleMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleMaxAggregateInput>;
}

@InputType()
export class DriverVehicleAvgAggregateInput {
    @Field(() => Boolean, {nullable:true})
    place?: true;
}

@ObjectType()
export class DriverVehicleAvgAggregate {
    @Field(() => Float, {nullable:true})
    place?: number;
}

@InputType()
export class DriverVehicleAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    brand?: true;
    @Field(() => Boolean, {nullable:true})
    model?: true;
    @Field(() => Boolean, {nullable:true})
    registrationNumber?: true;
    @Field(() => Boolean, {nullable:true})
    place?: true;
    @Field(() => Boolean, {nullable:true})
    vehicleTypeId?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class DriverVehicleCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    brand!: number;
    @Field(() => Int, {nullable:false})
    model!: number;
    @Field(() => Int, {nullable:false})
    registrationNumber!: number;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => Int, {nullable:false})
    vehicleTypeId!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class DriverVehicleCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    brand?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    model?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    registrationNumber?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleTypeId?: `${SortOrder}`;
}

@ObjectType()
export class DriverVehicleCount {
    @Field(() => Int, {nullable:false})
    VehicleImage?: number;
    @Field(() => Int, {nullable:false})
    VehicleDocument?: number;
}

@InputType()
export class DriverVehicleCreateManyTypeInputEnvelope {
    @Field(() => [DriverVehicleCreateManyTypeInput], {nullable:false})
    @Type(() => DriverVehicleCreateManyTypeInput)
    data!: Array<DriverVehicleCreateManyTypeInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class DriverVehicleCreateManyTypeInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
}

@InputType()
export class DriverVehicleCreateManyUserInputEnvelope {
    @Field(() => [DriverVehicleCreateManyUserInput], {nullable:false})
    @Type(() => DriverVehicleCreateManyUserInput)
    data!: Array<DriverVehicleCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class DriverVehicleCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
}

@InputType()
export class DriverVehicleCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
}

@InputType()
export class DriverVehicleCreateNestedManyWithoutTypeInput {
    @Field(() => [DriverVehicleCreateWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutTypeInput)
    create?: Array<DriverVehicleCreateWithoutTypeInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutTypeInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutTypeInput>;
    @Field(() => DriverVehicleCreateManyTypeInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyTypeInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyTypeInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
}

@InputType()
export class DriverVehicleCreateNestedManyWithoutUserInput {
    @Field(() => [DriverVehicleCreateWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutUserInput)
    create?: Array<DriverVehicleCreateWithoutUserInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutUserInput>;
    @Field(() => DriverVehicleCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyUserInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
}

@InputType()
export class DriverVehicleCreateNestedOneWithoutVehicleDocumentInput {
    @Field(() => DriverVehicleCreateWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutVehicleDocumentInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutVehicleDocumentInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@InputType()
export class DriverVehicleCreateNestedOneWithoutVehicleImageInput {
    @Field(() => DriverVehicleCreateWithoutVehicleImageInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutVehicleImageInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutVehicleImageInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutVehicleImageInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutVehicleImageInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutVehicleImageInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutTypeInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutTypeInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutTypeInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutTypeInput>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutUserInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutUserInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutUserInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutUserInput>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutVehicleDocumentInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutVehicleDocumentInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutVehicleDocumentInput>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutVehicleImageInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutVehicleImageInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutVehicleImageInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutVehicleImageInput>;
}

@InputType()
export class DriverVehicleCreateWithoutTypeInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => UserCreateNestedOneWithoutVehiclesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => VehicleTypeCreateNestedOneWithoutVehiclesInput, {nullable:false})
    type!: InstanceType<typeof VehicleTypeCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleCreateWithoutVehicleDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => UserCreateNestedOneWithoutVehiclesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleTypeCreateNestedOneWithoutVehiclesInput, {nullable:false})
    type!: InstanceType<typeof VehicleTypeCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleCreateWithoutVehicleImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => UserCreateNestedOneWithoutVehiclesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleTypeCreateNestedOneWithoutVehiclesInput, {nullable:false})
    type!: InstanceType<typeof VehicleTypeCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => UserCreateNestedOneWithoutVehiclesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleTypeCreateNestedOneWithoutVehiclesInput, {nullable:false})
    type!: InstanceType<typeof VehicleTypeCreateNestedOneWithoutVehiclesInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutDriverVehicleInput>;
}

@ArgsType()
export class DriverVehicleGroupByArgs {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<DriverVehicleOrderByWithAggregationInput>;
    @Field(() => [DriverVehicleScalarFieldEnum], {nullable:false})
    by!: Array<`${DriverVehicleScalarFieldEnum}`>;
    @Field(() => DriverVehicleScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof DriverVehicleScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => DriverVehicleCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleCountAggregateInput>;
    @Field(() => DriverVehicleAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof DriverVehicleAvgAggregateInput>;
    @Field(() => DriverVehicleSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof DriverVehicleSumAggregateInput>;
    @Field(() => DriverVehicleMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleMinAggregateInput>;
    @Field(() => DriverVehicleMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleMaxAggregateInput>;
}

@ObjectType()
export class DriverVehicleGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
    @Field(() => DriverVehicleCountAggregate, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleCountAggregate>;
    @Field(() => DriverVehicleAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof DriverVehicleAvgAggregate>;
    @Field(() => DriverVehicleSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof DriverVehicleSumAggregate>;
    @Field(() => DriverVehicleMinAggregate, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleMinAggregate>;
    @Field(() => DriverVehicleMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleMaxAggregate>;
}

@InputType()
export class DriverVehicleListRelationFilter {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    every?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    some?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    none?: InstanceType<typeof DriverVehicleWhereInput>;
}

@InputType()
export class DriverVehicleMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    brand?: true;
    @Field(() => Boolean, {nullable:true})
    model?: true;
    @Field(() => Boolean, {nullable:true})
    registrationNumber?: true;
    @Field(() => Boolean, {nullable:true})
    place?: true;
    @Field(() => Boolean, {nullable:true})
    vehicleTypeId?: true;
}

@ObjectType()
export class DriverVehicleMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:true})
    place?: number;
    @Field(() => String, {nullable:true})
    vehicleTypeId?: string;
}

@InputType()
export class DriverVehicleMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    brand?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    model?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    registrationNumber?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleTypeId?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    brand?: true;
    @Field(() => Boolean, {nullable:true})
    model?: true;
    @Field(() => Boolean, {nullable:true})
    registrationNumber?: true;
    @Field(() => Boolean, {nullable:true})
    place?: true;
    @Field(() => Boolean, {nullable:true})
    vehicleTypeId?: true;
}

@ObjectType()
export class DriverVehicleMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:true})
    place?: number;
    @Field(() => String, {nullable:true})
    vehicleTypeId?: string;
}

@InputType()
export class DriverVehicleMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    brand?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    model?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    registrationNumber?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleTypeId?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleNullableScalarRelationFilter {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    is?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    isNot?: InstanceType<typeof DriverVehicleWhereInput>;
}

@InputType()
export class DriverVehicleOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    brand?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    model?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    registrationNumber?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleTypeId?: `${SortOrder}`;
    @Field(() => DriverVehicleCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleCountOrderByAggregateInput>;
    @Field(() => DriverVehicleAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof DriverVehicleAvgOrderByAggregateInput>;
    @Field(() => DriverVehicleMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleMaxOrderByAggregateInput>;
    @Field(() => DriverVehicleMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleMinOrderByAggregateInput>;
    @Field(() => DriverVehicleSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof DriverVehicleSumOrderByAggregateInput>;
}

@InputType()
export class DriverVehicleOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    brand?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    model?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    registrationNumber?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleTypeId?: `${SortOrder}`;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    @Field(() => VehicleTypeOrderByWithRelationInput, {nullable:true})
    type?: InstanceType<typeof VehicleTypeOrderByWithRelationInput>;
    @Field(() => VehicleImageOrderByRelationAggregateInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageOrderByRelationAggregateInput>;
    @Field(() => VehicleDocumentOrderByRelationAggregateInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentOrderByRelationAggregateInput>;
}

@InputType()
export class DriverVehicleScalarWhereWithAggregatesInput {
    @Field(() => [DriverVehicleScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<DriverVehicleScalarWhereWithAggregatesInput>;
    @Field(() => [DriverVehicleScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<DriverVehicleScalarWhereWithAggregatesInput>;
    @Field(() => [DriverVehicleScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<DriverVehicleScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    brand?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    model?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    registrationNumber?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => IntWithAggregatesFilter, {nullable:true})
    place?: InstanceType<typeof IntWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class DriverVehicleScalarWhereInput {
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    AND?: Array<DriverVehicleScalarWhereInput>;
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    OR?: Array<DriverVehicleScalarWhereInput>;
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    NOT?: Array<DriverVehicleScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    brand?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    model?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    registrationNumber?: InstanceType<typeof StringNullableFilter>;
    @Field(() => IntFilter, {nullable:true})
    place?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFilter>;
}

@InputType()
export class DriverVehicleSumAggregateInput {
    @Field(() => Boolean, {nullable:true})
    place?: true;
}

@ObjectType()
export class DriverVehicleSumAggregate {
    @Field(() => Int, {nullable:true})
    place?: number;
}

@InputType()
export class DriverVehicleSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    place?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleUncheckedCreateNestedManyWithoutTypeInput {
    @Field(() => [DriverVehicleCreateWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutTypeInput)
    create?: Array<DriverVehicleCreateWithoutTypeInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutTypeInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutTypeInput>;
    @Field(() => DriverVehicleCreateManyTypeInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyTypeInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyTypeInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
}

@InputType()
export class DriverVehicleUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [DriverVehicleCreateWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutUserInput)
    create?: Array<DriverVehicleCreateWithoutUserInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutUserInput>;
    @Field(() => DriverVehicleCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyUserInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
}

@InputType()
export class DriverVehicleUncheckedCreateWithoutTypeInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedCreateWithoutVehicleDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedCreateWithoutVehicleImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand?: string;
    @Field(() => String, {nullable:true})
    model?: string;
    @Field(() => String, {nullable:true})
    registrationNumber?: string;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput {
    @Field(() => [DriverVehicleCreateWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutTypeInput)
    create?: Array<DriverVehicleCreateWithoutTypeInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutTypeInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutTypeInput>;
    @Field(() => [DriverVehicleUpsertWithWhereUniqueWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleUpsertWithWhereUniqueWithoutTypeInput)
    upsert?: Array<DriverVehicleUpsertWithWhereUniqueWithoutTypeInput>;
    @Field(() => DriverVehicleCreateManyTypeInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyTypeInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyTypeInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleUpdateWithWhereUniqueWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleUpdateWithWhereUniqueWithoutTypeInput)
    update?: Array<DriverVehicleUpdateWithWhereUniqueWithoutTypeInput>;
    @Field(() => [DriverVehicleUpdateManyWithWhereWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleUpdateManyWithWhereWithoutTypeInput)
    updateMany?: Array<DriverVehicleUpdateManyWithWhereWithoutTypeInput>;
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    @Type(() => DriverVehicleScalarWhereInput)
    deleteMany?: Array<DriverVehicleScalarWhereInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateManyWithoutTypeInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [DriverVehicleCreateWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutUserInput)
    create?: Array<DriverVehicleCreateWithoutUserInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutUserInput>;
    @Field(() => [DriverVehicleUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<DriverVehicleUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => DriverVehicleCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyUserInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<DriverVehicleUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [DriverVehicleUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<DriverVehicleUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    @Type(() => DriverVehicleScalarWhereInput)
    deleteMany?: Array<DriverVehicleScalarWhereInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateWithoutTypeInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateWithoutVehicleDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateWithoutVehicleImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleUpdateManyWithWhereWithoutTypeInput {
    @Field(() => DriverVehicleScalarWhereInput, {nullable:false})
    @Type(() => DriverVehicleScalarWhereInput)
    where!: InstanceType<typeof DriverVehicleScalarWhereInput>;
    @Field(() => DriverVehicleUpdateManyMutationInput, {nullable:false})
    @Type(() => DriverVehicleUpdateManyMutationInput)
    data!: InstanceType<typeof DriverVehicleUpdateManyMutationInput>;
}

@InputType()
export class DriverVehicleUpdateManyWithWhereWithoutUserInput {
    @Field(() => DriverVehicleScalarWhereInput, {nullable:false})
    @Type(() => DriverVehicleScalarWhereInput)
    where!: InstanceType<typeof DriverVehicleScalarWhereInput>;
    @Field(() => DriverVehicleUpdateManyMutationInput, {nullable:false})
    @Type(() => DriverVehicleUpdateManyMutationInput)
    data!: InstanceType<typeof DriverVehicleUpdateManyMutationInput>;
}

@InputType()
export class DriverVehicleUpdateManyWithoutTypeNestedInput {
    @Field(() => [DriverVehicleCreateWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutTypeInput)
    create?: Array<DriverVehicleCreateWithoutTypeInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutTypeInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutTypeInput>;
    @Field(() => [DriverVehicleUpsertWithWhereUniqueWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleUpsertWithWhereUniqueWithoutTypeInput)
    upsert?: Array<DriverVehicleUpsertWithWhereUniqueWithoutTypeInput>;
    @Field(() => DriverVehicleCreateManyTypeInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyTypeInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyTypeInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleUpdateWithWhereUniqueWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleUpdateWithWhereUniqueWithoutTypeInput)
    update?: Array<DriverVehicleUpdateWithWhereUniqueWithoutTypeInput>;
    @Field(() => [DriverVehicleUpdateManyWithWhereWithoutTypeInput], {nullable:true})
    @Type(() => DriverVehicleUpdateManyWithWhereWithoutTypeInput)
    updateMany?: Array<DriverVehicleUpdateManyWithWhereWithoutTypeInput>;
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    @Type(() => DriverVehicleScalarWhereInput)
    deleteMany?: Array<DriverVehicleScalarWhereInput>;
}

@InputType()
export class DriverVehicleUpdateManyWithoutUserNestedInput {
    @Field(() => [DriverVehicleCreateWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateWithoutUserInput)
    create?: Array<DriverVehicleCreateWithoutUserInput>;
    @Field(() => [DriverVehicleCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DriverVehicleCreateOrConnectWithoutUserInput>;
    @Field(() => [DriverVehicleUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<DriverVehicleUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => DriverVehicleCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleCreateManyUserInputEnvelope>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<DriverVehicleUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [DriverVehicleUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => DriverVehicleUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<DriverVehicleUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [DriverVehicleScalarWhereInput], {nullable:true})
    @Type(() => DriverVehicleScalarWhereInput)
    deleteMany?: Array<DriverVehicleScalarWhereInput>;
}

@InputType()
export class DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput {
    @Field(() => DriverVehicleCreateWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutVehicleDocumentInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutVehicleDocumentInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleUpsertWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => DriverVehicleUpsertWithoutVehicleDocumentInput)
    upsert?: InstanceType<typeof DriverVehicleUpsertWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    disconnect?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    delete?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateToOneWithWhereWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => DriverVehicleUpdateToOneWithWhereWithoutVehicleDocumentInput)
    update?: InstanceType<typeof DriverVehicleUpdateToOneWithWhereWithoutVehicleDocumentInput>;
}

@InputType()
export class DriverVehicleUpdateOneWithoutVehicleImageNestedInput {
    @Field(() => DriverVehicleCreateWithoutVehicleImageInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutVehicleImageInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutVehicleImageInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutVehicleImageInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutVehicleImageInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutVehicleImageInput>;
    @Field(() => DriverVehicleUpsertWithoutVehicleImageInput, {nullable:true})
    @Type(() => DriverVehicleUpsertWithoutVehicleImageInput)
    upsert?: InstanceType<typeof DriverVehicleUpsertWithoutVehicleImageInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    disconnect?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    delete?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateToOneWithWhereWithoutVehicleImageInput, {nullable:true})
    @Type(() => DriverVehicleUpdateToOneWithWhereWithoutVehicleImageInput)
    update?: InstanceType<typeof DriverVehicleUpdateToOneWithWhereWithoutVehicleImageInput>;
}

@InputType()
export class DriverVehicleUpdateToOneWithWhereWithoutVehicleDocumentInput {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleUpdateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutVehicleDocumentInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutVehicleDocumentInput>;
}

@InputType()
export class DriverVehicleUpdateToOneWithWhereWithoutVehicleImageInput {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleUpdateWithoutVehicleImageInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutVehicleImageInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutVehicleImageInput>;
}

@InputType()
export class DriverVehicleUpdateWithWhereUniqueWithoutTypeInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateWithoutTypeInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutTypeInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutTypeInput>;
}

@InputType()
export class DriverVehicleUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateWithoutUserInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutUserInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutUserInput>;
}

@InputType()
export class DriverVehicleUpdateWithoutTypeInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    type?: InstanceType<typeof VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateWithoutVehicleDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    type?: InstanceType<typeof VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateWithoutVehicleImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    type?: InstanceType<typeof VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    brand?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    model?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    registrationNumber?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    place?: InstanceType<typeof IntFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput, {nullable:true})
    type?: InstanceType<typeof VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpsertWithWhereUniqueWithoutTypeInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateWithoutTypeInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutTypeInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutTypeInput>;
    @Field(() => DriverVehicleCreateWithoutTypeInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutTypeInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutTypeInput>;
}

@InputType()
export class DriverVehicleUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateWithoutUserInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutUserInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutUserInput>;
    @Field(() => DriverVehicleCreateWithoutUserInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutUserInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutUserInput>;
}

@InputType()
export class DriverVehicleUpsertWithoutVehicleDocumentInput {
    @Field(() => DriverVehicleUpdateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutVehicleDocumentInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleCreateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutVehicleDocumentInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
}

@InputType()
export class DriverVehicleUpsertWithoutVehicleImageInput {
    @Field(() => DriverVehicleUpdateWithoutVehicleImageInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutVehicleImageInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutVehicleImageInput>;
    @Field(() => DriverVehicleCreateWithoutVehicleImageInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutVehicleImageInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutVehicleImageInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
}

@InputType()
export class DriverVehicleWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [DriverVehicleWhereInput], {nullable:true})
    AND?: Array<DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleWhereInput], {nullable:true})
    OR?: Array<DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleWhereInput], {nullable:true})
    NOT?: Array<DriverVehicleWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    brand?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    model?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    registrationNumber?: InstanceType<typeof StringNullableFilter>;
    @Field(() => IntFilter, {nullable:true})
    place?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => VehicleTypeScalarRelationFilter, {nullable:true})
    type?: InstanceType<typeof VehicleTypeScalarRelationFilter>;
    @Field(() => VehicleImageListRelationFilter, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageListRelationFilter>;
    @Field(() => VehicleDocumentListRelationFilter, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentListRelationFilter>;
}

@InputType()
export class DriverVehicleWhereInput {
    @Field(() => [DriverVehicleWhereInput], {nullable:true})
    AND?: Array<DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleWhereInput], {nullable:true})
    OR?: Array<DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleWhereInput], {nullable:true})
    NOT?: Array<DriverVehicleWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    brand?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    model?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    registrationNumber?: InstanceType<typeof StringNullableFilter>;
    @Field(() => IntFilter, {nullable:true})
    place?: InstanceType<typeof IntFilter>;
    @Field(() => StringFilter, {nullable:true})
    vehicleTypeId?: InstanceType<typeof StringFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => VehicleTypeScalarRelationFilter, {nullable:true})
    type?: InstanceType<typeof VehicleTypeScalarRelationFilter>;
    @Field(() => VehicleImageListRelationFilter, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageListRelationFilter>;
    @Field(() => VehicleDocumentListRelationFilter, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentListRelationFilter>;
}

@ObjectType()
export class DriverVehicle {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    brand!: string | null;
    @Field(() => String, {nullable:true})
    model!: string | null;
    @Field(() => String, {nullable:true})
    registrationNumber!: string | null;
    @Field(() => Int, {nullable:false})
    place!: number;
    @Field(() => String, {nullable:false})
    vehicleTypeId!: string;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
    @Field(() => VehicleType, {nullable:false})
    type?: InstanceType<typeof VehicleType>;
    @Field(() => [VehicleImage], {nullable:true})
    VehicleImage?: Array<VehicleImage>;
    @Field(() => [VehicleDocument], {nullable:true})
    VehicleDocument?: Array<VehicleDocument>;
    @Field(() => DriverVehicleCount, {nullable:false})
    _count?: InstanceType<typeof DriverVehicleCount>;
}

@ArgsType()
export class FindFirstDriverVehicleOrThrowArgs {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleOrderByWithRelationInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DriverVehicleScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DriverVehicleScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstDriverVehicleArgs {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleOrderByWithRelationInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DriverVehicleScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DriverVehicleScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyDriverVehicleArgs {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => [DriverVehicleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleOrderByWithRelationInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DriverVehicleScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DriverVehicleScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueDriverVehicleOrThrowArgs {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueDriverVehicleArgs {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyDriverVehicleArgs {
    @Field(() => DriverVehicleUpdateManyMutationInput, {nullable:false})
    @Type(() => DriverVehicleUpdateManyMutationInput)
    data!: InstanceType<typeof DriverVehicleUpdateManyMutationInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneDriverVehicleArgs {
    @Field(() => DriverVehicleUpdateInput, {nullable:false})
    @Type(() => DriverVehicleUpdateInput)
    data!: InstanceType<typeof DriverVehicleUpdateInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneDriverVehicleArgs {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateInput, {nullable:false})
    @Type(() => DriverVehicleCreateInput)
    create!: InstanceType<typeof DriverVehicleCreateInput>;
    @Field(() => DriverVehicleUpdateInput, {nullable:false})
    @Type(() => DriverVehicleUpdateInput)
    update!: InstanceType<typeof DriverVehicleUpdateInput>;
}

@ObjectType()
export class AggregateFile {
    @Field(() => FileCountAggregate, {nullable:true})
    _count?: InstanceType<typeof FileCountAggregate>;
    @Field(() => FileAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof FileAvgAggregate>;
    @Field(() => FileSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof FileSumAggregate>;
    @Field(() => FileMinAggregate, {nullable:true})
    _min?: InstanceType<typeof FileMinAggregate>;
    @Field(() => FileMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof FileMaxAggregate>;
}

@ArgsType()
export class CreateManyFileArgs {
    @Field(() => [FileCreateManyInput], {nullable:false})
    @Type(() => FileCreateManyInput)
    data!: Array<FileCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneFileArgs {
    @Field(() => FileCreateInput, {nullable:false})
    @Type(() => FileCreateInput)
    data!: InstanceType<typeof FileCreateInput>;
}

@ArgsType()
export class DeleteManyFileArgs {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneFileArgs {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@ArgsType()
export class FileAggregateArgs {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => [FileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<FileOrderByWithRelationInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => FileCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof FileCountAggregateInput>;
    @Field(() => FileAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof FileAvgAggregateInput>;
    @Field(() => FileSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof FileSumAggregateInput>;
    @Field(() => FileMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof FileMinAggregateInput>;
    @Field(() => FileMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof FileMaxAggregateInput>;
}

@InputType()
export class FileAvgAggregateInput {
    @Field(() => Boolean, {nullable:true})
    size?: true;
}

@ObjectType()
export class FileAvgAggregate {
    @Field(() => Float, {nullable:true})
    size?: number;
}

@InputType()
export class FileAvgOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;
}

@InputType()
export class FileCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    key?: true;
    @Field(() => Boolean, {nullable:true})
    originalName?: true;
    @Field(() => Boolean, {nullable:true})
    contentType?: true;
    @Field(() => Boolean, {nullable:true})
    size?: true;
    @Field(() => Boolean, {nullable:true})
    etag?: true;
    @Field(() => Boolean, {nullable:true})
    status?: true;
    @Field(() => Boolean, {nullable:true})
    meta?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class FileCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    url!: number;
    @Field(() => Int, {nullable:false})
    type!: number;
    @Field(() => Int, {nullable:false})
    key!: number;
    @Field(() => Int, {nullable:false})
    originalName!: number;
    @Field(() => Int, {nullable:false})
    contentType!: number;
    @Field(() => Int, {nullable:false})
    size!: number;
    @Field(() => Int, {nullable:false})
    etag!: number;
    @Field(() => Int, {nullable:false})
    status!: number;
    @Field(() => Int, {nullable:false})
    meta!: number;
    @Field(() => Int, {nullable:false})
    name!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    driverVehicleId!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class FileCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    key?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    originalName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    contentType?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    etag?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    meta?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@ObjectType()
export class FileCount {
    @Field(() => Int, {nullable:false})
    UserImage?: number;
    @Field(() => Int, {nullable:false})
    UserDocument?: number;
    @Field(() => Int, {nullable:false})
    VehicleImage?: number;
    @Field(() => Int, {nullable:false})
    VehicleDocument?: number;
}

@InputType()
export class FileCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class FileCreateNestedOneWithoutUserDocumentInput {
    @Field(() => FileCreateWithoutUserDocumentInput, {nullable:true})
    @Type(() => FileCreateWithoutUserDocumentInput)
    create?: InstanceType<typeof FileCreateWithoutUserDocumentInput>;
    @Field(() => FileCreateOrConnectWithoutUserDocumentInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutUserDocumentInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutUserDocumentInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@InputType()
export class FileCreateNestedOneWithoutUserImageInput {
    @Field(() => FileCreateWithoutUserImageInput, {nullable:true})
    @Type(() => FileCreateWithoutUserImageInput)
    create?: InstanceType<typeof FileCreateWithoutUserImageInput>;
    @Field(() => FileCreateOrConnectWithoutUserImageInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutUserImageInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutUserImageInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@InputType()
export class FileCreateNestedOneWithoutVehicleDocumentInput {
    @Field(() => FileCreateWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => FileCreateWithoutVehicleDocumentInput)
    create?: InstanceType<typeof FileCreateWithoutVehicleDocumentInput>;
    @Field(() => FileCreateOrConnectWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutVehicleDocumentInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutVehicleDocumentInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@InputType()
export class FileCreateNestedOneWithoutVehicleImageInput {
    @Field(() => FileCreateWithoutVehicleImageInput, {nullable:true})
    @Type(() => FileCreateWithoutVehicleImageInput)
    create?: InstanceType<typeof FileCreateWithoutVehicleImageInput>;
    @Field(() => FileCreateOrConnectWithoutVehicleImageInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutVehicleImageInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutVehicleImageInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@InputType()
export class FileCreateOrConnectWithoutUserDocumentInput {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileCreateWithoutUserDocumentInput, {nullable:false})
    @Type(() => FileCreateWithoutUserDocumentInput)
    create!: InstanceType<typeof FileCreateWithoutUserDocumentInput>;
}

@InputType()
export class FileCreateOrConnectWithoutUserImageInput {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileCreateWithoutUserImageInput, {nullable:false})
    @Type(() => FileCreateWithoutUserImageInput)
    create!: InstanceType<typeof FileCreateWithoutUserImageInput>;
}

@InputType()
export class FileCreateOrConnectWithoutVehicleDocumentInput {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileCreateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => FileCreateWithoutVehicleDocumentInput)
    create!: InstanceType<typeof FileCreateWithoutVehicleDocumentInput>;
}

@InputType()
export class FileCreateOrConnectWithoutVehicleImageInput {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileCreateWithoutVehicleImageInput, {nullable:false})
    @Type(() => FileCreateWithoutVehicleImageInput)
    create!: InstanceType<typeof FileCreateWithoutVehicleImageInput>;
}

@InputType()
export class FileCreateWithoutUserDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileCreateWithoutUserImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileCreateWithoutVehicleDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutFileInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileCreateWithoutVehicleImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutFileInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutFileInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentCreateNestedManyWithoutFileInput>;
}

@ArgsType()
export class FileGroupByArgs {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => [FileOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<FileOrderByWithAggregationInput>;
    @Field(() => [FileScalarFieldEnum], {nullable:false})
    by!: Array<`${FileScalarFieldEnum}`>;
    @Field(() => FileScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof FileScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => FileCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof FileCountAggregateInput>;
    @Field(() => FileAvgAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof FileAvgAggregateInput>;
    @Field(() => FileSumAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof FileSumAggregateInput>;
    @Field(() => FileMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof FileMinAggregateInput>;
    @Field(() => FileMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof FileMaxAggregateInput>;
}

@ObjectType()
export class FileGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:false})
    status!: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => FileCountAggregate, {nullable:true})
    _count?: InstanceType<typeof FileCountAggregate>;
    @Field(() => FileAvgAggregate, {nullable:true})
    _avg?: InstanceType<typeof FileAvgAggregate>;
    @Field(() => FileSumAggregate, {nullable:true})
    _sum?: InstanceType<typeof FileSumAggregate>;
    @Field(() => FileMinAggregate, {nullable:true})
    _min?: InstanceType<typeof FileMinAggregate>;
    @Field(() => FileMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof FileMaxAggregate>;
}

@InputType()
export class FileMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    key?: true;
    @Field(() => Boolean, {nullable:true})
    originalName?: true;
    @Field(() => Boolean, {nullable:true})
    contentType?: true;
    @Field(() => Boolean, {nullable:true})
    size?: true;
    @Field(() => Boolean, {nullable:true})
    etag?: true;
    @Field(() => Boolean, {nullable:true})
    status?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
}

@ObjectType()
export class FileMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:true})
    type?: `${ImageType}`;
    @Field(() => String, {nullable:true})
    key?: string;
    @Field(() => String, {nullable:true})
    originalName?: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class FileMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    key?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    originalName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    contentType?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    etag?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class FileMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    key?: true;
    @Field(() => Boolean, {nullable:true})
    originalName?: true;
    @Field(() => Boolean, {nullable:true})
    contentType?: true;
    @Field(() => Boolean, {nullable:true})
    size?: true;
    @Field(() => Boolean, {nullable:true})
    etag?: true;
    @Field(() => Boolean, {nullable:true})
    status?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
}

@ObjectType()
export class FileMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:true})
    type?: `${ImageType}`;
    @Field(() => String, {nullable:true})
    key?: string;
    @Field(() => String, {nullable:true})
    originalName?: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class FileMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    key?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    originalName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    contentType?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    etag?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class FileOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    url?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    key?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    originalName?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    contentType?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    size?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    etag?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    meta?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    name?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof SortOrderInput>;
    @Field(() => FileCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof FileCountOrderByAggregateInput>;
    @Field(() => FileAvgOrderByAggregateInput, {nullable:true})
    _avg?: InstanceType<typeof FileAvgOrderByAggregateInput>;
    @Field(() => FileMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof FileMaxOrderByAggregateInput>;
    @Field(() => FileMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof FileMinOrderByAggregateInput>;
    @Field(() => FileSumOrderByAggregateInput, {nullable:true})
    _sum?: InstanceType<typeof FileSumOrderByAggregateInput>;
}

@InputType()
export class FileOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    url?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    key?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    originalName?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    contentType?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    size?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    etag?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    status?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    meta?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    name?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserImageOrderByRelationAggregateInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageOrderByRelationAggregateInput>;
    @Field(() => UserDocumentOrderByRelationAggregateInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentOrderByRelationAggregateInput>;
    @Field(() => VehicleImageOrderByRelationAggregateInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageOrderByRelationAggregateInput>;
    @Field(() => VehicleDocumentOrderByRelationAggregateInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentOrderByRelationAggregateInput>;
}

@InputType()
export class FileScalarRelationFilter {
    @Field(() => FileWhereInput, {nullable:true})
    is?: InstanceType<typeof FileWhereInput>;
    @Field(() => FileWhereInput, {nullable:true})
    isNot?: InstanceType<typeof FileWhereInput>;
}

@InputType()
export class FileScalarWhereWithAggregatesInput {
    @Field(() => [FileScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<FileScalarWhereWithAggregatesInput>;
    @Field(() => [FileScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<FileScalarWhereWithAggregatesInput>;
    @Field(() => [FileScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<FileScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => EnumImageTypeWithAggregatesFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    key?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    originalName?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    contentType?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    size?: InstanceType<typeof IntNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    etag?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    status?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => JsonNullableWithAggregatesFilter, {nullable:true})
    meta?: InstanceType<typeof JsonNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableWithAggregatesFilter>;
}

@InputType()
export class FileSumAggregateInput {
    @Field(() => Boolean, {nullable:true})
    size?: true;
}

@ObjectType()
export class FileSumAggregate {
    @Field(() => Int, {nullable:true})
    size?: number;
}

@InputType()
export class FileSumOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;
}

@InputType()
export class FileUncheckedCreateWithoutUserDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileUncheckedCreateWithoutUserImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileUncheckedCreateWithoutVehicleDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileUncheckedCreateWithoutVehicleImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType?: string;
    @Field(() => Int, {nullable:true})
    size?: number;
    @Field(() => String, {nullable:true})
    etag?: string;
    @Field(() => String, {nullable:true})
    status?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleImageUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedCreateNestedManyWithoutFileInput>;
    @Field(() => VehicleDocumentUncheckedCreateNestedManyWithoutFileInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedCreateNestedManyWithoutFileInput>;
}

@InputType()
export class FileUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class FileUncheckedUpdateWithoutUserDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUncheckedUpdateWithoutUserImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUncheckedUpdateWithoutVehicleDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUncheckedUpdateWithoutVehicleImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUncheckedUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class FileUpdateOneRequiredWithoutUserDocumentNestedInput {
    @Field(() => FileCreateWithoutUserDocumentInput, {nullable:true})
    @Type(() => FileCreateWithoutUserDocumentInput)
    create?: InstanceType<typeof FileCreateWithoutUserDocumentInput>;
    @Field(() => FileCreateOrConnectWithoutUserDocumentInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutUserDocumentInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutUserDocumentInput>;
    @Field(() => FileUpsertWithoutUserDocumentInput, {nullable:true})
    @Type(() => FileUpsertWithoutUserDocumentInput)
    upsert?: InstanceType<typeof FileUpsertWithoutUserDocumentInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileUpdateToOneWithWhereWithoutUserDocumentInput, {nullable:true})
    @Type(() => FileUpdateToOneWithWhereWithoutUserDocumentInput)
    update?: InstanceType<typeof FileUpdateToOneWithWhereWithoutUserDocumentInput>;
}

@InputType()
export class FileUpdateOneRequiredWithoutUserImageNestedInput {
    @Field(() => FileCreateWithoutUserImageInput, {nullable:true})
    @Type(() => FileCreateWithoutUserImageInput)
    create?: InstanceType<typeof FileCreateWithoutUserImageInput>;
    @Field(() => FileCreateOrConnectWithoutUserImageInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutUserImageInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutUserImageInput>;
    @Field(() => FileUpsertWithoutUserImageInput, {nullable:true})
    @Type(() => FileUpsertWithoutUserImageInput)
    upsert?: InstanceType<typeof FileUpsertWithoutUserImageInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileUpdateToOneWithWhereWithoutUserImageInput, {nullable:true})
    @Type(() => FileUpdateToOneWithWhereWithoutUserImageInput)
    update?: InstanceType<typeof FileUpdateToOneWithWhereWithoutUserImageInput>;
}

@InputType()
export class FileUpdateOneRequiredWithoutVehicleDocumentNestedInput {
    @Field(() => FileCreateWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => FileCreateWithoutVehicleDocumentInput)
    create?: InstanceType<typeof FileCreateWithoutVehicleDocumentInput>;
    @Field(() => FileCreateOrConnectWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutVehicleDocumentInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutVehicleDocumentInput>;
    @Field(() => FileUpsertWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => FileUpsertWithoutVehicleDocumentInput)
    upsert?: InstanceType<typeof FileUpsertWithoutVehicleDocumentInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileUpdateToOneWithWhereWithoutVehicleDocumentInput, {nullable:true})
    @Type(() => FileUpdateToOneWithWhereWithoutVehicleDocumentInput)
    update?: InstanceType<typeof FileUpdateToOneWithWhereWithoutVehicleDocumentInput>;
}

@InputType()
export class FileUpdateOneRequiredWithoutVehicleImageNestedInput {
    @Field(() => FileCreateWithoutVehicleImageInput, {nullable:true})
    @Type(() => FileCreateWithoutVehicleImageInput)
    create?: InstanceType<typeof FileCreateWithoutVehicleImageInput>;
    @Field(() => FileCreateOrConnectWithoutVehicleImageInput, {nullable:true})
    @Type(() => FileCreateOrConnectWithoutVehicleImageInput)
    connectOrCreate?: InstanceType<typeof FileCreateOrConnectWithoutVehicleImageInput>;
    @Field(() => FileUpsertWithoutVehicleImageInput, {nullable:true})
    @Type(() => FileUpsertWithoutVehicleImageInput)
    upsert?: InstanceType<typeof FileUpsertWithoutVehicleImageInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    @Type(() => FileWhereUniqueInput)
    connect?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileUpdateToOneWithWhereWithoutVehicleImageInput, {nullable:true})
    @Type(() => FileUpdateToOneWithWhereWithoutVehicleImageInput)
    update?: InstanceType<typeof FileUpdateToOneWithWhereWithoutVehicleImageInput>;
}

@InputType()
export class FileUpdateToOneWithWhereWithoutUserDocumentInput {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => FileUpdateWithoutUserDocumentInput, {nullable:false})
    @Type(() => FileUpdateWithoutUserDocumentInput)
    data!: InstanceType<typeof FileUpdateWithoutUserDocumentInput>;
}

@InputType()
export class FileUpdateToOneWithWhereWithoutUserImageInput {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => FileUpdateWithoutUserImageInput, {nullable:false})
    @Type(() => FileUpdateWithoutUserImageInput)
    data!: InstanceType<typeof FileUpdateWithoutUserImageInput>;
}

@InputType()
export class FileUpdateToOneWithWhereWithoutVehicleDocumentInput {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => FileUpdateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => FileUpdateWithoutVehicleDocumentInput)
    data!: InstanceType<typeof FileUpdateWithoutVehicleDocumentInput>;
}

@InputType()
export class FileUpdateToOneWithWhereWithoutVehicleImageInput {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => FileUpdateWithoutVehicleImageInput, {nullable:false})
    @Type(() => FileUpdateWithoutVehicleImageInput)
    data!: InstanceType<typeof FileUpdateWithoutVehicleImageInput>;
}

@InputType()
export class FileUpdateWithoutUserDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUpdateWithoutUserImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUpdateWithoutVehicleDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutFileNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUpdateWithoutVehicleImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutFileNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => GraphQLJSON, {nullable:true})
    meta?: any;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserImageUpdateManyWithoutFileNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutFileNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleImageUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageUpdateManyWithoutFileNestedInput>;
    @Field(() => VehicleDocumentUpdateManyWithoutFileNestedInput, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentUpdateManyWithoutFileNestedInput>;
}

@InputType()
export class FileUpsertWithoutUserDocumentInput {
    @Field(() => FileUpdateWithoutUserDocumentInput, {nullable:false})
    @Type(() => FileUpdateWithoutUserDocumentInput)
    update!: InstanceType<typeof FileUpdateWithoutUserDocumentInput>;
    @Field(() => FileCreateWithoutUserDocumentInput, {nullable:false})
    @Type(() => FileCreateWithoutUserDocumentInput)
    create!: InstanceType<typeof FileCreateWithoutUserDocumentInput>;
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
}

@InputType()
export class FileUpsertWithoutUserImageInput {
    @Field(() => FileUpdateWithoutUserImageInput, {nullable:false})
    @Type(() => FileUpdateWithoutUserImageInput)
    update!: InstanceType<typeof FileUpdateWithoutUserImageInput>;
    @Field(() => FileCreateWithoutUserImageInput, {nullable:false})
    @Type(() => FileCreateWithoutUserImageInput)
    create!: InstanceType<typeof FileCreateWithoutUserImageInput>;
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
}

@InputType()
export class FileUpsertWithoutVehicleDocumentInput {
    @Field(() => FileUpdateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => FileUpdateWithoutVehicleDocumentInput)
    update!: InstanceType<typeof FileUpdateWithoutVehicleDocumentInput>;
    @Field(() => FileCreateWithoutVehicleDocumentInput, {nullable:false})
    @Type(() => FileCreateWithoutVehicleDocumentInput)
    create!: InstanceType<typeof FileCreateWithoutVehicleDocumentInput>;
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
}

@InputType()
export class FileUpsertWithoutVehicleImageInput {
    @Field(() => FileUpdateWithoutVehicleImageInput, {nullable:false})
    @Type(() => FileUpdateWithoutVehicleImageInput)
    update!: InstanceType<typeof FileUpdateWithoutVehicleImageInput>;
    @Field(() => FileCreateWithoutVehicleImageInput, {nullable:false})
    @Type(() => FileCreateWithoutVehicleImageInput)
    create!: InstanceType<typeof FileCreateWithoutVehicleImageInput>;
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
}

@InputType()
export class FileWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    key?: string;
    @Field(() => [FileWhereInput], {nullable:true})
    AND?: Array<FileWhereInput>;
    @Field(() => [FileWhereInput], {nullable:true})
    OR?: Array<FileWhereInput>;
    @Field(() => [FileWhereInput], {nullable:true})
    NOT?: Array<FileWhereInput>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => EnumImageTypeFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFilter>;
    @Field(() => StringFilter, {nullable:true})
    originalName?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    contentType?: InstanceType<typeof StringNullableFilter>;
    @Field(() => IntNullableFilter, {nullable:true})
    size?: InstanceType<typeof IntNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    etag?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    status?: InstanceType<typeof StringFilter>;
    @Field(() => JsonNullableFilter, {nullable:true})
    meta?: InstanceType<typeof JsonNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
    @Field(() => UserImageListRelationFilter, {nullable:true})
    UserImage?: InstanceType<typeof UserImageListRelationFilter>;
    @Field(() => UserDocumentListRelationFilter, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentListRelationFilter>;
    @Field(() => VehicleImageListRelationFilter, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageListRelationFilter>;
    @Field(() => VehicleDocumentListRelationFilter, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentListRelationFilter>;
}

@InputType()
export class FileWhereInput {
    @Field(() => [FileWhereInput], {nullable:true})
    AND?: Array<FileWhereInput>;
    @Field(() => [FileWhereInput], {nullable:true})
    OR?: Array<FileWhereInput>;
    @Field(() => [FileWhereInput], {nullable:true})
    NOT?: Array<FileWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => EnumImageTypeFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFilter>;
    @Field(() => StringFilter, {nullable:true})
    key?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    originalName?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    contentType?: InstanceType<typeof StringNullableFilter>;
    @Field(() => IntNullableFilter, {nullable:true})
    size?: InstanceType<typeof IntNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    etag?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    status?: InstanceType<typeof StringFilter>;
    @Field(() => JsonNullableFilter, {nullable:true})
    meta?: InstanceType<typeof JsonNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
    @Field(() => UserImageListRelationFilter, {nullable:true})
    UserImage?: InstanceType<typeof UserImageListRelationFilter>;
    @Field(() => UserDocumentListRelationFilter, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentListRelationFilter>;
    @Field(() => VehicleImageListRelationFilter, {nullable:true})
    VehicleImage?: InstanceType<typeof VehicleImageListRelationFilter>;
    @Field(() => VehicleDocumentListRelationFilter, {nullable:true})
    VehicleDocument?: InstanceType<typeof VehicleDocumentListRelationFilter>;
}

@ObjectType()
export class File {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:true})
    url!: string | null;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:false})
    key!: string;
    @Field(() => String, {nullable:false})
    originalName!: string;
    @Field(() => String, {nullable:true})
    contentType!: string | null;
    @Field(() => Int, {nullable:true})
    size!: number | null;
    @Field(() => String, {nullable:true})
    etag!: string | null;
    @Field(() => String, {defaultValue:'pending',nullable:false})
    status!: string;
    @Field(() => GraphQLJSON, {nullable:true})
    meta!: any | null;
    @Field(() => String, {nullable:true})
    name!: string | null;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId!: string | null;
    @Field(() => [UserImage], {nullable:true})
    UserImage?: Array<UserImage>;
    @Field(() => [UserDocument], {nullable:true})
    UserDocument?: Array<UserDocument>;
    @Field(() => [VehicleImage], {nullable:true})
    VehicleImage?: Array<VehicleImage>;
    @Field(() => [VehicleDocument], {nullable:true})
    VehicleDocument?: Array<VehicleDocument>;
    @Field(() => FileCount, {nullable:false})
    _count?: InstanceType<typeof FileCount>;
}

@ArgsType()
export class FindFirstFileOrThrowArgs {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => [FileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<FileOrderByWithRelationInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [FileScalarFieldEnum], {nullable:true})
    distinct?: Array<`${FileScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstFileArgs {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => [FileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<FileOrderByWithRelationInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [FileScalarFieldEnum], {nullable:true})
    distinct?: Array<`${FileScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyFileArgs {
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => [FileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<FileOrderByWithRelationInput>;
    @Field(() => FileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [FileScalarFieldEnum], {nullable:true})
    distinct?: Array<`${FileScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueFileOrThrowArgs {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@ArgsType()
export class FindUniqueFileArgs {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@ArgsType()
export class UpdateManyFileArgs {
    @Field(() => FileUpdateManyMutationInput, {nullable:false})
    @Type(() => FileUpdateManyMutationInput)
    data!: InstanceType<typeof FileUpdateManyMutationInput>;
    @Field(() => FileWhereInput, {nullable:true})
    @Type(() => FileWhereInput)
    where?: InstanceType<typeof FileWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneFileArgs {
    @Field(() => FileUpdateInput, {nullable:false})
    @Type(() => FileUpdateInput)
    data!: InstanceType<typeof FileUpdateInput>;
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
}

@ArgsType()
export class UpsertOneFileArgs {
    @Field(() => FileWhereUniqueInput, {nullable:false})
    @Type(() => FileWhereUniqueInput)
    where!: Prisma.AtLeast<FileWhereUniqueInput, 'id' | 'key'>;
    @Field(() => FileCreateInput, {nullable:false})
    @Type(() => FileCreateInput)
    create!: InstanceType<typeof FileCreateInput>;
    @Field(() => FileUpdateInput, {nullable:false})
    @Type(() => FileUpdateInput)
    update!: InstanceType<typeof FileUpdateInput>;
}

@ObjectType()
export class AffectedRows {
    @Field(() => Int, {nullable:false})
    count!: number;
}

@InputType()
export class BoolFieldUpdateOperationsInput {
    @Field(() => Boolean, {nullable:true})
    set?: boolean;
}

@InputType()
export class BoolFilter {
    @Field(() => Boolean, {nullable:true})
    equals?: boolean;
    @Field(() => NestedBoolFilter, {nullable:true})
    not?: InstanceType<typeof NestedBoolFilter>;
}

@InputType()
export class BoolWithAggregatesFilter {
    @Field(() => Boolean, {nullable:true})
    equals?: boolean;
    @Field(() => NestedBoolWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedBoolWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedBoolFilter, {nullable:true})
    _min?: InstanceType<typeof NestedBoolFilter>;
    @Field(() => NestedBoolFilter, {nullable:true})
    _max?: InstanceType<typeof NestedBoolFilter>;
}

@InputType()
export class DateTimeFieldUpdateOperationsInput {
    @Field(() => Date, {nullable:true})
    set?: Date | string;
}

@InputType()
export class DateTimeFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class DateTimeNullableFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeNullableFilter>;
}

@InputType()
export class DateTimeNullableWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedDateTimeNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedDateTimeNullableFilter>;
    @Field(() => NestedDateTimeNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedDateTimeNullableFilter>;
}

@InputType()
export class DateTimeWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _min?: InstanceType<typeof NestedDateTimeFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _max?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class EnumImageTypeFieldUpdateOperationsInput {
    @Field(() => ImageType, {nullable:true})
    set?: `${ImageType}`;
}

@InputType()
export class EnumImageTypeFilter {
    @Field(() => ImageType, {nullable:true})
    equals?: `${ImageType}`;
    @Field(() => [ImageType], {nullable:true})
    in?: Array<`${ImageType}`>;
    @Field(() => [ImageType], {nullable:true})
    notIn?: Array<`${ImageType}`>;
    @Field(() => NestedEnumImageTypeFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumImageTypeFilter>;
}

@InputType()
export class EnumImageTypeWithAggregatesFilter {
    @Field(() => ImageType, {nullable:true})
    equals?: `${ImageType}`;
    @Field(() => [ImageType], {nullable:true})
    in?: Array<`${ImageType}`>;
    @Field(() => [ImageType], {nullable:true})
    notIn?: Array<`${ImageType}`>;
    @Field(() => NestedEnumImageTypeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumImageTypeWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedEnumImageTypeFilter, {nullable:true})
    _min?: InstanceType<typeof NestedEnumImageTypeFilter>;
    @Field(() => NestedEnumImageTypeFilter, {nullable:true})
    _max?: InstanceType<typeof NestedEnumImageTypeFilter>;
}

@InputType()
export class IntFieldUpdateOperationsInput {
    @Field(() => Int, {nullable:true})
    set?: number;
    @Field(() => Int, {nullable:true})
    increment?: number;
    @Field(() => Int, {nullable:true})
    decrement?: number;
    @Field(() => Int, {nullable:true})
    multiply?: number;
    @Field(() => Int, {nullable:true})
    divide?: number;
}

@InputType()
export class IntFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class IntNullableFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntNullableFilter>;
}

@InputType()
export class IntNullableWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedFloatNullableFilter, {nullable:true})
    _avg?: InstanceType<typeof NestedFloatNullableFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _sum?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedIntNullableFilter>;
}

@InputType()
export class IntWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedFloatFilter, {nullable:true})
    _avg?: InstanceType<typeof NestedFloatFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _sum?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _min?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _max?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class JsonNullableFilter {
    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;
    @Field(() => [String], {nullable:true})
    path?: Array<string>;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => String, {nullable:true})
    string_contains?: string;
    @Field(() => String, {nullable:true})
    string_starts_with?: string;
    @Field(() => String, {nullable:true})
    string_ends_with?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    array_starts_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_ends_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_contains?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;
}

@InputType()
export class JsonNullableWithAggregatesFilter {
    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;
    @Field(() => [String], {nullable:true})
    path?: Array<string>;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => String, {nullable:true})
    string_contains?: string;
    @Field(() => String, {nullable:true})
    string_starts_with?: string;
    @Field(() => String, {nullable:true})
    string_ends_with?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    array_starts_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_ends_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_contains?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedJsonNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedJsonNullableFilter>;
    @Field(() => NestedJsonNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedJsonNullableFilter>;
}

@InputType()
export class NestedBoolFilter {
    @Field(() => Boolean, {nullable:true})
    equals?: boolean;
    @Field(() => NestedBoolFilter, {nullable:true})
    not?: InstanceType<typeof NestedBoolFilter>;
}

@InputType()
export class NestedBoolWithAggregatesFilter {
    @Field(() => Boolean, {nullable:true})
    equals?: boolean;
    @Field(() => NestedBoolWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedBoolWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedBoolFilter, {nullable:true})
    _min?: InstanceType<typeof NestedBoolFilter>;
    @Field(() => NestedBoolFilter, {nullable:true})
    _max?: InstanceType<typeof NestedBoolFilter>;
}

@InputType()
export class NestedDateTimeFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class NestedDateTimeNullableFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeNullableFilter>;
}

@InputType()
export class NestedDateTimeNullableWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedDateTimeNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedDateTimeNullableFilter>;
    @Field(() => NestedDateTimeNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedDateTimeNullableFilter>;
}

@InputType()
export class NestedDateTimeWithAggregatesFilter {
    @Field(() => Date, {nullable:true})
    equals?: Date | string;
    @Field(() => [Date], {nullable:true})
    in?: Array<Date> | Array<string>;
    @Field(() => [Date], {nullable:true})
    notIn?: Array<Date> | Array<string>;
    @Field(() => Date, {nullable:true})
    lt?: Date | string;
    @Field(() => Date, {nullable:true})
    lte?: Date | string;
    @Field(() => Date, {nullable:true})
    gt?: Date | string;
    @Field(() => Date, {nullable:true})
    gte?: Date | string;
    @Field(() => NestedDateTimeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedDateTimeWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _min?: InstanceType<typeof NestedDateTimeFilter>;
    @Field(() => NestedDateTimeFilter, {nullable:true})
    _max?: InstanceType<typeof NestedDateTimeFilter>;
}

@InputType()
export class NestedEnumImageTypeFilter {
    @Field(() => ImageType, {nullable:true})
    equals?: `${ImageType}`;
    @Field(() => [ImageType], {nullable:true})
    in?: Array<`${ImageType}`>;
    @Field(() => [ImageType], {nullable:true})
    notIn?: Array<`${ImageType}`>;
    @Field(() => NestedEnumImageTypeFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumImageTypeFilter>;
}

@InputType()
export class NestedEnumImageTypeWithAggregatesFilter {
    @Field(() => ImageType, {nullable:true})
    equals?: `${ImageType}`;
    @Field(() => [ImageType], {nullable:true})
    in?: Array<`${ImageType}`>;
    @Field(() => [ImageType], {nullable:true})
    notIn?: Array<`${ImageType}`>;
    @Field(() => NestedEnumImageTypeWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedEnumImageTypeWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedEnumImageTypeFilter, {nullable:true})
    _min?: InstanceType<typeof NestedEnumImageTypeFilter>;
    @Field(() => NestedEnumImageTypeFilter, {nullable:true})
    _max?: InstanceType<typeof NestedEnumImageTypeFilter>;
}

@InputType()
export class NestedFloatFilter {
    @Field(() => Float, {nullable:true})
    equals?: number;
    @Field(() => [Float], {nullable:true})
    in?: Array<number>;
    @Field(() => [Float], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Float, {nullable:true})
    lt?: number;
    @Field(() => Float, {nullable:true})
    lte?: number;
    @Field(() => Float, {nullable:true})
    gt?: number;
    @Field(() => Float, {nullable:true})
    gte?: number;
    @Field(() => NestedFloatFilter, {nullable:true})
    not?: InstanceType<typeof NestedFloatFilter>;
}

@InputType()
export class NestedFloatNullableFilter {
    @Field(() => Float, {nullable:true})
    equals?: number;
    @Field(() => [Float], {nullable:true})
    in?: Array<number>;
    @Field(() => [Float], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Float, {nullable:true})
    lt?: number;
    @Field(() => Float, {nullable:true})
    lte?: number;
    @Field(() => Float, {nullable:true})
    gt?: number;
    @Field(() => Float, {nullable:true})
    gte?: number;
    @Field(() => NestedFloatNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedFloatNullableFilter>;
}

@InputType()
export class NestedIntFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class NestedIntNullableFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntNullableFilter>;
}

@InputType()
export class NestedIntNullableWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedFloatNullableFilter, {nullable:true})
    _avg?: InstanceType<typeof NestedFloatNullableFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _sum?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedIntNullableFilter>;
}

@InputType()
export class NestedIntWithAggregatesFilter {
    @Field(() => Int, {nullable:true})
    equals?: number;
    @Field(() => [Int], {nullable:true})
    in?: Array<number>;
    @Field(() => [Int], {nullable:true})
    notIn?: Array<number>;
    @Field(() => Int, {nullable:true})
    lt?: number;
    @Field(() => Int, {nullable:true})
    lte?: number;
    @Field(() => Int, {nullable:true})
    gt?: number;
    @Field(() => Int, {nullable:true})
    gte?: number;
    @Field(() => NestedIntWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedIntWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedFloatFilter, {nullable:true})
    _avg?: InstanceType<typeof NestedFloatFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _sum?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _min?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _max?: InstanceType<typeof NestedIntFilter>;
}

@InputType()
export class NestedJsonNullableFilter {
    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;
    @Field(() => [String], {nullable:true})
    path?: Array<string>;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => String, {nullable:true})
    string_contains?: string;
    @Field(() => String, {nullable:true})
    string_starts_with?: string;
    @Field(() => String, {nullable:true})
    string_ends_with?: string;
    @Field(() => GraphQLJSON, {nullable:true})
    array_starts_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_ends_with?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    array_contains?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    lte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gt?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    gte?: any;
    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;
}

@InputType()
export class NestedStringFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class NestedStringNullableFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class NestedStringNullableWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class NestedStringWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => NestedStringWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class NullableDateTimeFieldUpdateOperationsInput {
    @Field(() => Date, {nullable:true})
    set?: Date | string;
}

@InputType()
export class NullableIntFieldUpdateOperationsInput {
    @Field(() => Int, {nullable:true})
    set?: number;
    @Field(() => Int, {nullable:true})
    increment?: number;
    @Field(() => Int, {nullable:true})
    decrement?: number;
    @Field(() => Int, {nullable:true})
    multiply?: number;
    @Field(() => Int, {nullable:true})
    divide?: number;
}

@InputType()
export class NullableStringFieldUpdateOperationsInput {
    @Field(() => String, {nullable:true})
    set?: string;
}

@InputType()
export class SortOrderInput {
    @Field(() => SortOrder, {nullable:false})
    sort!: `${SortOrder}`;
    @Field(() => NullsOrder, {nullable:true})
    nulls?: `${NullsOrder}`;
}

@InputType()
export class StringFieldUpdateOperationsInput {
    @Field(() => String, {nullable:true})
    set?: string;
}

@InputType()
export class StringFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringFilter>;
}

@InputType()
export class StringNullableFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class StringNullableWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringNullableWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringNullableWithAggregatesFilter>;
    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringNullableFilter>;
    @Field(() => NestedStringNullableFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringNullableFilter>;
}

@InputType()
export class StringWithAggregatesFilter {
    @Field(() => String, {nullable:true})
    equals?: string;
    @Field(() => [String], {nullable:true})
    in?: Array<string>;
    @Field(() => [String], {nullable:true})
    notIn?: Array<string>;
    @Field(() => String, {nullable:true})
    lt?: string;
    @Field(() => String, {nullable:true})
    lte?: string;
    @Field(() => String, {nullable:true})
    gt?: string;
    @Field(() => String, {nullable:true})
    gte?: string;
    @Field(() => String, {nullable:true})
    contains?: string;
    @Field(() => String, {nullable:true})
    startsWith?: string;
    @Field(() => String, {nullable:true})
    endsWith?: string;
    @Field(() => QueryMode, {nullable:true})
    mode?: `${QueryMode}`;
    @Field(() => NestedStringWithAggregatesFilter, {nullable:true})
    not?: InstanceType<typeof NestedStringWithAggregatesFilter>;
    @Field(() => NestedIntFilter, {nullable:true})
    _count?: InstanceType<typeof NestedIntFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _min?: InstanceType<typeof NestedStringFilter>;
    @Field(() => NestedStringFilter, {nullable:true})
    _max?: InstanceType<typeof NestedStringFilter>;
}

@ObjectType()
export class AggregateRefreshToken {
    @Field(() => RefreshTokenCountAggregate, {nullable:true})
    _count?: InstanceType<typeof RefreshTokenCountAggregate>;
    @Field(() => RefreshTokenMinAggregate, {nullable:true})
    _min?: InstanceType<typeof RefreshTokenMinAggregate>;
    @Field(() => RefreshTokenMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof RefreshTokenMaxAggregate>;
}

@ArgsType()
export class CreateManyRefreshTokenArgs {
    @Field(() => [RefreshTokenCreateManyInput], {nullable:false})
    @Type(() => RefreshTokenCreateManyInput)
    data!: Array<RefreshTokenCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneRefreshTokenArgs {
    @Field(() => RefreshTokenCreateInput, {nullable:false})
    @Type(() => RefreshTokenCreateInput)
    data!: InstanceType<typeof RefreshTokenCreateInput>;
}

@ArgsType()
export class DeleteManyRefreshTokenArgs {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneRefreshTokenArgs {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
}

@ArgsType()
export class FindFirstRefreshTokenOrThrowArgs {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RefreshTokenOrderByWithRelationInput>;
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [RefreshTokenScalarFieldEnum], {nullable:true})
    distinct?: Array<`${RefreshTokenScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstRefreshTokenArgs {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RefreshTokenOrderByWithRelationInput>;
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [RefreshTokenScalarFieldEnum], {nullable:true})
    distinct?: Array<`${RefreshTokenScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyRefreshTokenArgs {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RefreshTokenOrderByWithRelationInput>;
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [RefreshTokenScalarFieldEnum], {nullable:true})
    distinct?: Array<`${RefreshTokenScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueRefreshTokenOrThrowArgs {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
}

@ArgsType()
export class FindUniqueRefreshTokenArgs {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
}

@ArgsType()
export class RefreshTokenAggregateArgs {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RefreshTokenOrderByWithRelationInput>;
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => RefreshTokenCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof RefreshTokenCountAggregateInput>;
    @Field(() => RefreshTokenMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof RefreshTokenMinAggregateInput>;
    @Field(() => RefreshTokenMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof RefreshTokenMaxAggregateInput>;
}

@InputType()
export class RefreshTokenCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    token?: true;
    @Field(() => Boolean, {nullable:true})
    expiresAt?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class RefreshTokenCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    token!: number;
    @Field(() => Int, {nullable:false})
    expiresAt!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class RefreshTokenCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    token?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    expiresAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
}

@InputType()
export class RefreshTokenCreateManyUserInputEnvelope {
    @Field(() => [RefreshTokenCreateManyUserInput], {nullable:false})
    @Type(() => RefreshTokenCreateManyUserInput)
    data!: Array<RefreshTokenCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class RefreshTokenCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenCreateNestedManyWithoutUserInput {
    @Field(() => [RefreshTokenCreateWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateWithoutUserInput)
    create?: Array<RefreshTokenCreateWithoutUserInput>;
    @Field(() => [RefreshTokenCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<RefreshTokenCreateOrConnectWithoutUserInput>;
    @Field(() => RefreshTokenCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => RefreshTokenCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof RefreshTokenCreateManyUserInputEnvelope>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
}

@InputType()
export class RefreshTokenCreateOrConnectWithoutUserInput {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => RefreshTokenCreateWithoutUserInput, {nullable:false})
    @Type(() => RefreshTokenCreateWithoutUserInput)
    create!: InstanceType<typeof RefreshTokenCreateWithoutUserInput>;
}

@InputType()
export class RefreshTokenCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutTokensInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutTokensInput>;
}

@ArgsType()
export class RefreshTokenGroupByArgs {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<RefreshTokenOrderByWithAggregationInput>;
    @Field(() => [RefreshTokenScalarFieldEnum], {nullable:false})
    by!: Array<`${RefreshTokenScalarFieldEnum}`>;
    @Field(() => RefreshTokenScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof RefreshTokenScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => RefreshTokenCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof RefreshTokenCountAggregateInput>;
    @Field(() => RefreshTokenMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof RefreshTokenMinAggregateInput>;
    @Field(() => RefreshTokenMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof RefreshTokenMaxAggregateInput>;
}

@ObjectType()
export class RefreshTokenGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => RefreshTokenCountAggregate, {nullable:true})
    _count?: InstanceType<typeof RefreshTokenCountAggregate>;
    @Field(() => RefreshTokenMinAggregate, {nullable:true})
    _min?: InstanceType<typeof RefreshTokenMinAggregate>;
    @Field(() => RefreshTokenMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof RefreshTokenMaxAggregate>;
}

@InputType()
export class RefreshTokenListRelationFilter {
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    every?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    some?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    none?: InstanceType<typeof RefreshTokenWhereInput>;
}

@InputType()
export class RefreshTokenMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    token?: true;
    @Field(() => Boolean, {nullable:true})
    expiresAt?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
}

@ObjectType()
export class RefreshTokenMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    token?: string;
    @Field(() => Date, {nullable:true})
    expiresAt?: Date | string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    token?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    expiresAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
}

@InputType()
export class RefreshTokenMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    token?: true;
    @Field(() => Boolean, {nullable:true})
    expiresAt?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
}

@ObjectType()
export class RefreshTokenMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    token?: string;
    @Field(() => Date, {nullable:true})
    expiresAt?: Date | string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    token?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    expiresAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
}

@InputType()
export class RefreshTokenOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class RefreshTokenOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    token?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    expiresAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => RefreshTokenCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof RefreshTokenCountOrderByAggregateInput>;
    @Field(() => RefreshTokenMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof RefreshTokenMaxOrderByAggregateInput>;
    @Field(() => RefreshTokenMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof RefreshTokenMinOrderByAggregateInput>;
}

@InputType()
export class RefreshTokenOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    token?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    expiresAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
}

@InputType()
export class RefreshTokenScalarWhereWithAggregatesInput {
    @Field(() => [RefreshTokenScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<RefreshTokenScalarWhereWithAggregatesInput>;
    @Field(() => [RefreshTokenScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<RefreshTokenScalarWhereWithAggregatesInput>;
    @Field(() => [RefreshTokenScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<RefreshTokenScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    token?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
}

@InputType()
export class RefreshTokenScalarWhereInput {
    @Field(() => [RefreshTokenScalarWhereInput], {nullable:true})
    AND?: Array<RefreshTokenScalarWhereInput>;
    @Field(() => [RefreshTokenScalarWhereInput], {nullable:true})
    OR?: Array<RefreshTokenScalarWhereInput>;
    @Field(() => [RefreshTokenScalarWhereInput], {nullable:true})
    NOT?: Array<RefreshTokenScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    token?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
}

@InputType()
export class RefreshTokenUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [RefreshTokenCreateWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateWithoutUserInput)
    create?: Array<RefreshTokenCreateWithoutUserInput>;
    @Field(() => [RefreshTokenCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<RefreshTokenCreateOrConnectWithoutUserInput>;
    @Field(() => RefreshTokenCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => RefreshTokenCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof RefreshTokenCreateManyUserInputEnvelope>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
}

@InputType()
export class RefreshTokenUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date | string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class RefreshTokenUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [RefreshTokenCreateWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateWithoutUserInput)
    create?: Array<RefreshTokenCreateWithoutUserInput>;
    @Field(() => [RefreshTokenCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<RefreshTokenCreateOrConnectWithoutUserInput>;
    @Field(() => [RefreshTokenUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<RefreshTokenUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => RefreshTokenCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => RefreshTokenCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof RefreshTokenCreateManyUserInputEnvelope>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    set?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<RefreshTokenUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [RefreshTokenUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<RefreshTokenUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [RefreshTokenScalarWhereInput], {nullable:true})
    @Type(() => RefreshTokenScalarWhereInput)
    deleteMany?: Array<RefreshTokenScalarWhereInput>;
}

@InputType()
export class RefreshTokenUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class RefreshTokenUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class RefreshTokenUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class RefreshTokenUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class RefreshTokenUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class RefreshTokenUpdateManyWithWhereWithoutUserInput {
    @Field(() => RefreshTokenScalarWhereInput, {nullable:false})
    @Type(() => RefreshTokenScalarWhereInput)
    where!: InstanceType<typeof RefreshTokenScalarWhereInput>;
    @Field(() => RefreshTokenUpdateManyMutationInput, {nullable:false})
    @Type(() => RefreshTokenUpdateManyMutationInput)
    data!: InstanceType<typeof RefreshTokenUpdateManyMutationInput>;
}

@InputType()
export class RefreshTokenUpdateManyWithoutUserNestedInput {
    @Field(() => [RefreshTokenCreateWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateWithoutUserInput)
    create?: Array<RefreshTokenCreateWithoutUserInput>;
    @Field(() => [RefreshTokenCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<RefreshTokenCreateOrConnectWithoutUserInput>;
    @Field(() => [RefreshTokenUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<RefreshTokenUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => RefreshTokenCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => RefreshTokenCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof RefreshTokenCreateManyUserInputEnvelope>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    set?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenWhereUniqueInput], {nullable:true})
    @Type(() => RefreshTokenWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>>;
    @Field(() => [RefreshTokenUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<RefreshTokenUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [RefreshTokenUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => RefreshTokenUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<RefreshTokenUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [RefreshTokenScalarWhereInput], {nullable:true})
    @Type(() => RefreshTokenScalarWhereInput)
    deleteMany?: Array<RefreshTokenScalarWhereInput>;
}

@InputType()
export class RefreshTokenUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => RefreshTokenUpdateWithoutUserInput, {nullable:false})
    @Type(() => RefreshTokenUpdateWithoutUserInput)
    data!: InstanceType<typeof RefreshTokenUpdateWithoutUserInput>;
}

@InputType()
export class RefreshTokenUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class RefreshTokenUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    token?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutTokensNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutTokensNestedInput>;
}

@InputType()
export class RefreshTokenUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => RefreshTokenUpdateWithoutUserInput, {nullable:false})
    @Type(() => RefreshTokenUpdateWithoutUserInput)
    update!: InstanceType<typeof RefreshTokenUpdateWithoutUserInput>;
    @Field(() => RefreshTokenCreateWithoutUserInput, {nullable:false})
    @Type(() => RefreshTokenCreateWithoutUserInput)
    create!: InstanceType<typeof RefreshTokenCreateWithoutUserInput>;
}

@InputType()
export class RefreshTokenWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    token?: string;
    @Field(() => [RefreshTokenWhereInput], {nullable:true})
    AND?: Array<RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenWhereInput], {nullable:true})
    OR?: Array<RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenWhereInput], {nullable:true})
    NOT?: Array<RefreshTokenWhereInput>;
    @Field(() => DateTimeFilter, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
}

@InputType()
export class RefreshTokenWhereInput {
    @Field(() => [RefreshTokenWhereInput], {nullable:true})
    AND?: Array<RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenWhereInput], {nullable:true})
    OR?: Array<RefreshTokenWhereInput>;
    @Field(() => [RefreshTokenWhereInput], {nullable:true})
    NOT?: Array<RefreshTokenWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    token?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    expiresAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
}

@ObjectType()
export class RefreshToken {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    token!: string;
    @Field(() => Date, {nullable:false})
    expiresAt!: Date;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
}

@ArgsType()
export class UpdateManyRefreshTokenArgs {
    @Field(() => RefreshTokenUpdateManyMutationInput, {nullable:false})
    @Type(() => RefreshTokenUpdateManyMutationInput)
    data!: InstanceType<typeof RefreshTokenUpdateManyMutationInput>;
    @Field(() => RefreshTokenWhereInput, {nullable:true})
    @Type(() => RefreshTokenWhereInput)
    where?: InstanceType<typeof RefreshTokenWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneRefreshTokenArgs {
    @Field(() => RefreshTokenUpdateInput, {nullable:false})
    @Type(() => RefreshTokenUpdateInput)
    data!: InstanceType<typeof RefreshTokenUpdateInput>;
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
}

@ArgsType()
export class UpsertOneRefreshTokenArgs {
    @Field(() => RefreshTokenWhereUniqueInput, {nullable:false})
    @Type(() => RefreshTokenWhereUniqueInput)
    where!: Prisma.AtLeast<RefreshTokenWhereUniqueInput, 'id' | 'token'>;
    @Field(() => RefreshTokenCreateInput, {nullable:false})
    @Type(() => RefreshTokenCreateInput)
    create!: InstanceType<typeof RefreshTokenCreateInput>;
    @Field(() => RefreshTokenUpdateInput, {nullable:false})
    @Type(() => RefreshTokenUpdateInput)
    update!: InstanceType<typeof RefreshTokenUpdateInput>;
}

@ObjectType()
export class AggregateRole {
    @Field(() => RoleCountAggregate, {nullable:true})
    _count?: InstanceType<typeof RoleCountAggregate>;
    @Field(() => RoleMinAggregate, {nullable:true})
    _min?: InstanceType<typeof RoleMinAggregate>;
    @Field(() => RoleMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof RoleMaxAggregate>;
}

@ArgsType()
export class CreateManyRoleArgs {
    @Field(() => [RoleCreateManyInput], {nullable:false})
    @Type(() => RoleCreateManyInput)
    data!: Array<RoleCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneRoleArgs {
    @Field(() => RoleCreateInput, {nullable:false})
    @Type(() => RoleCreateInput)
    data!: InstanceType<typeof RoleCreateInput>;
}

@ArgsType()
export class DeleteManyRoleArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneRoleArgs {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class FindFirstRoleOrThrowArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => [RoleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RoleOrderByWithRelationInput>;
    @Field(() => RoleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [RoleScalarFieldEnum], {nullable:true})
    distinct?: Array<`${RoleScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstRoleArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => [RoleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RoleOrderByWithRelationInput>;
    @Field(() => RoleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [RoleScalarFieldEnum], {nullable:true})
    distinct?: Array<`${RoleScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyRoleArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => [RoleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RoleOrderByWithRelationInput>;
    @Field(() => RoleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [RoleScalarFieldEnum], {nullable:true})
    distinct?: Array<`${RoleScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueRoleOrThrowArgs {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class FindUniqueRoleArgs {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class RoleAggregateArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => [RoleOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<RoleOrderByWithRelationInput>;
    @Field(() => RoleWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => RoleCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof RoleCountAggregateInput>;
    @Field(() => RoleMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof RoleMinAggregateInput>;
    @Field(() => RoleMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof RoleMaxAggregateInput>;
}

@InputType()
export class RoleCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class RoleCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    name!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class RoleCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@ObjectType()
export class RoleCount {
    @Field(() => Int, {nullable:false})
    users?: number;
}

@InputType()
export class RoleCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class RoleCreateNestedManyWithoutUsersInput {
    @Field(() => [RoleCreateWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateWithoutUsersInput)
    create?: Array<RoleCreateWithoutUsersInput>;
    @Field(() => [RoleCreateOrConnectWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateOrConnectWithoutUsersInput)
    connectOrCreate?: Array<RoleCreateOrConnectWithoutUsersInput>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
}

@InputType()
export class RoleCreateOrConnectWithoutUsersInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => RoleCreateWithoutUsersInput, {nullable:false})
    @Type(() => RoleCreateWithoutUsersInput)
    create!: InstanceType<typeof RoleCreateWithoutUsersInput>;
}

@InputType()
export class RoleCreateWithoutUsersInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class RoleCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => UserCreateNestedManyWithoutRoleInput, {nullable:true})
    users?: InstanceType<typeof UserCreateNestedManyWithoutRoleInput>;
}

@ArgsType()
export class RoleGroupByArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => [RoleOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<RoleOrderByWithAggregationInput>;
    @Field(() => [RoleScalarFieldEnum], {nullable:false})
    by!: Array<`${RoleScalarFieldEnum}`>;
    @Field(() => RoleScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof RoleScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => RoleCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof RoleCountAggregateInput>;
    @Field(() => RoleMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof RoleMinAggregateInput>;
    @Field(() => RoleMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof RoleMaxAggregateInput>;
}

@ObjectType()
export class RoleGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => RoleCountAggregate, {nullable:true})
    _count?: InstanceType<typeof RoleCountAggregate>;
    @Field(() => RoleMinAggregate, {nullable:true})
    _min?: InstanceType<typeof RoleMinAggregate>;
    @Field(() => RoleMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof RoleMaxAggregate>;
}

@InputType()
export class RoleListRelationFilter {
    @Field(() => RoleWhereInput, {nullable:true})
    every?: InstanceType<typeof RoleWhereInput>;
    @Field(() => RoleWhereInput, {nullable:true})
    some?: InstanceType<typeof RoleWhereInput>;
    @Field(() => RoleWhereInput, {nullable:true})
    none?: InstanceType<typeof RoleWhereInput>;
}

@InputType()
export class RoleMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
}

@ObjectType()
export class RoleMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
}

@InputType()
export class RoleMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class RoleMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
}

@ObjectType()
export class RoleMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
}

@InputType()
export class RoleMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class RoleOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class RoleOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => RoleCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof RoleCountOrderByAggregateInput>;
    @Field(() => RoleMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof RoleMaxOrderByAggregateInput>;
    @Field(() => RoleMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof RoleMinOrderByAggregateInput>;
}

@InputType()
export class RoleOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => UserOrderByRelationAggregateInput, {nullable:true})
    users?: InstanceType<typeof UserOrderByRelationAggregateInput>;
}

@InputType()
export class RoleScalarWhereWithAggregatesInput {
    @Field(() => [RoleScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<RoleScalarWhereWithAggregatesInput>;
    @Field(() => [RoleScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<RoleScalarWhereWithAggregatesInput>;
    @Field(() => [RoleScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<RoleScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class RoleScalarWhereInput {
    @Field(() => [RoleScalarWhereInput], {nullable:true})
    AND?: Array<RoleScalarWhereInput>;
    @Field(() => [RoleScalarWhereInput], {nullable:true})
    OR?: Array<RoleScalarWhereInput>;
    @Field(() => [RoleScalarWhereInput], {nullable:true})
    NOT?: Array<RoleScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
}

@InputType()
export class RoleUncheckedCreateNestedManyWithoutUsersInput {
    @Field(() => [RoleCreateWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateWithoutUsersInput)
    create?: Array<RoleCreateWithoutUsersInput>;
    @Field(() => [RoleCreateOrConnectWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateOrConnectWithoutUsersInput)
    connectOrCreate?: Array<RoleCreateOrConnectWithoutUsersInput>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
}

@InputType()
export class RoleUncheckedCreateWithoutUsersInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class RoleUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => UserUncheckedCreateNestedManyWithoutRoleInput, {nullable:true})
    users?: InstanceType<typeof UserUncheckedCreateNestedManyWithoutRoleInput>;
}

@InputType()
export class RoleUncheckedUpdateManyWithoutUsersNestedInput {
    @Field(() => [RoleCreateWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateWithoutUsersInput)
    create?: Array<RoleCreateWithoutUsersInput>;
    @Field(() => [RoleCreateOrConnectWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateOrConnectWithoutUsersInput)
    connectOrCreate?: Array<RoleCreateOrConnectWithoutUsersInput>;
    @Field(() => [RoleUpsertWithWhereUniqueWithoutUsersInput], {nullable:true})
    @Type(() => RoleUpsertWithWhereUniqueWithoutUsersInput)
    upsert?: Array<RoleUpsertWithWhereUniqueWithoutUsersInput>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    set?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleUpdateWithWhereUniqueWithoutUsersInput], {nullable:true})
    @Type(() => RoleUpdateWithWhereUniqueWithoutUsersInput)
    update?: Array<RoleUpdateWithWhereUniqueWithoutUsersInput>;
    @Field(() => [RoleUpdateManyWithWhereWithoutUsersInput], {nullable:true})
    @Type(() => RoleUpdateManyWithWhereWithoutUsersInput)
    updateMany?: Array<RoleUpdateManyWithWhereWithoutUsersInput>;
    @Field(() => [RoleScalarWhereInput], {nullable:true})
    @Type(() => RoleScalarWhereInput)
    deleteMany?: Array<RoleScalarWhereInput>;
}

@InputType()
export class RoleUncheckedUpdateManyWithoutUsersInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class RoleUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class RoleUncheckedUpdateWithoutUsersInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class RoleUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => UserUncheckedUpdateManyWithoutRoleNestedInput, {nullable:true})
    users?: InstanceType<typeof UserUncheckedUpdateManyWithoutRoleNestedInput>;
}

@InputType()
export class RoleUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class RoleUpdateManyWithWhereWithoutUsersInput {
    @Field(() => RoleScalarWhereInput, {nullable:false})
    @Type(() => RoleScalarWhereInput)
    where!: InstanceType<typeof RoleScalarWhereInput>;
    @Field(() => RoleUpdateManyMutationInput, {nullable:false})
    @Type(() => RoleUpdateManyMutationInput)
    data!: InstanceType<typeof RoleUpdateManyMutationInput>;
}

@InputType()
export class RoleUpdateManyWithoutUsersNestedInput {
    @Field(() => [RoleCreateWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateWithoutUsersInput)
    create?: Array<RoleCreateWithoutUsersInput>;
    @Field(() => [RoleCreateOrConnectWithoutUsersInput], {nullable:true})
    @Type(() => RoleCreateOrConnectWithoutUsersInput)
    connectOrCreate?: Array<RoleCreateOrConnectWithoutUsersInput>;
    @Field(() => [RoleUpsertWithWhereUniqueWithoutUsersInput], {nullable:true})
    @Type(() => RoleUpsertWithWhereUniqueWithoutUsersInput)
    upsert?: Array<RoleUpsertWithWhereUniqueWithoutUsersInput>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    set?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    @Type(() => RoleWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [RoleUpdateWithWhereUniqueWithoutUsersInput], {nullable:true})
    @Type(() => RoleUpdateWithWhereUniqueWithoutUsersInput)
    update?: Array<RoleUpdateWithWhereUniqueWithoutUsersInput>;
    @Field(() => [RoleUpdateManyWithWhereWithoutUsersInput], {nullable:true})
    @Type(() => RoleUpdateManyWithWhereWithoutUsersInput)
    updateMany?: Array<RoleUpdateManyWithWhereWithoutUsersInput>;
    @Field(() => [RoleScalarWhereInput], {nullable:true})
    @Type(() => RoleScalarWhereInput)
    deleteMany?: Array<RoleScalarWhereInput>;
}

@InputType()
export class RoleUpdateWithWhereUniqueWithoutUsersInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => RoleUpdateWithoutUsersInput, {nullable:false})
    @Type(() => RoleUpdateWithoutUsersInput)
    data!: InstanceType<typeof RoleUpdateWithoutUsersInput>;
}

@InputType()
export class RoleUpdateWithoutUsersInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class RoleUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => UserUpdateManyWithoutRoleNestedInput, {nullable:true})
    users?: InstanceType<typeof UserUpdateManyWithoutRoleNestedInput>;
}

@InputType()
export class RoleUpsertWithWhereUniqueWithoutUsersInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => RoleUpdateWithoutUsersInput, {nullable:false})
    @Type(() => RoleUpdateWithoutUsersInput)
    update!: InstanceType<typeof RoleUpdateWithoutUsersInput>;
    @Field(() => RoleCreateWithoutUsersInput, {nullable:false})
    @Type(() => RoleCreateWithoutUsersInput)
    create!: InstanceType<typeof RoleCreateWithoutUsersInput>;
}

@InputType()
export class RoleWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => [RoleWhereInput], {nullable:true})
    AND?: Array<RoleWhereInput>;
    @Field(() => [RoleWhereInput], {nullable:true})
    OR?: Array<RoleWhereInput>;
    @Field(() => [RoleWhereInput], {nullable:true})
    NOT?: Array<RoleWhereInput>;
    @Field(() => UserListRelationFilter, {nullable:true})
    users?: InstanceType<typeof UserListRelationFilter>;
}

@InputType()
export class RoleWhereInput {
    @Field(() => [RoleWhereInput], {nullable:true})
    AND?: Array<RoleWhereInput>;
    @Field(() => [RoleWhereInput], {nullable:true})
    OR?: Array<RoleWhereInput>;
    @Field(() => [RoleWhereInput], {nullable:true})
    NOT?: Array<RoleWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => UserListRelationFilter, {nullable:true})
    users?: InstanceType<typeof UserListRelationFilter>;
}

@ObjectType()
export class Role {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => [User], {nullable:true})
    users?: Array<User>;
    @Field(() => RoleCount, {nullable:false})
    _count?: InstanceType<typeof RoleCount>;
}

@ArgsType()
export class UpdateManyRoleArgs {
    @Field(() => RoleUpdateManyMutationInput, {nullable:false})
    @Type(() => RoleUpdateManyMutationInput)
    data!: InstanceType<typeof RoleUpdateManyMutationInput>;
    @Field(() => RoleWhereInput, {nullable:true})
    @Type(() => RoleWhereInput)
    where?: InstanceType<typeof RoleWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneRoleArgs {
    @Field(() => RoleUpdateInput, {nullable:false})
    @Type(() => RoleUpdateInput)
    data!: InstanceType<typeof RoleUpdateInput>;
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class UpsertOneRoleArgs {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    @Type(() => RoleWhereUniqueInput)
    where!: Prisma.AtLeast<RoleWhereUniqueInput, 'id' | 'name'>;
    @Field(() => RoleCreateInput, {nullable:false})
    @Type(() => RoleCreateInput)
    create!: InstanceType<typeof RoleCreateInput>;
    @Field(() => RoleUpdateInput, {nullable:false})
    @Type(() => RoleUpdateInput)
    update!: InstanceType<typeof RoleUpdateInput>;
}

@ObjectType()
export class AggregateUser {
    @Field(() => UserCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserCountAggregate>;
    @Field(() => UserMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserMinAggregate>;
    @Field(() => UserMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserMaxAggregate>;
}

@ArgsType()
export class CreateManyUserArgs {
    @Field(() => [UserCreateManyInput], {nullable:false})
    @Type(() => UserCreateManyInput)
    data!: Array<UserCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneUserArgs {
    @Field(() => UserCreateInput, {nullable:false})
    @Type(() => UserCreateInput)
    data!: InstanceType<typeof UserCreateInput>;
}

@ArgsType()
export class DeleteManyUserArgs {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneUserArgs {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@ArgsType()
export class FindFirstUserOrThrowArgs {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => [UserOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserOrderByWithRelationInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstUserArgs {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => [UserOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserOrderByWithRelationInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyUserArgs {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => [UserOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserOrderByWithRelationInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueUserOrThrowArgs {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@ArgsType()
export class FindUniqueUserArgs {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@ArgsType()
export class UpdateManyUserArgs {
    @Field(() => UserUpdateManyMutationInput, {nullable:false})
    @Type(() => UserUpdateManyMutationInput)
    data!: InstanceType<typeof UserUpdateManyMutationInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneUserArgs {
    @Field(() => UserUpdateInput, {nullable:false})
    @Type(() => UserUpdateInput)
    data!: InstanceType<typeof UserUpdateInput>;
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@ArgsType()
export class UpsertOneUserArgs {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateInput, {nullable:false})
    @Type(() => UserCreateInput)
    create!: InstanceType<typeof UserCreateInput>;
    @Field(() => UserUpdateInput, {nullable:false})
    @Type(() => UserUpdateInput)
    update!: InstanceType<typeof UserUpdateInput>;
}

@ArgsType()
export class UserAggregateArgs {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => [UserOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserOrderByWithRelationInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserCountAggregateInput>;
    @Field(() => UserMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserMinAggregateInput>;
    @Field(() => UserMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserMaxAggregateInput>;
}

@InputType()
export class UserCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    email?: true;
    @Field(() => Boolean, {nullable:true})
    firstName?: true;
    @Field(() => Boolean, {nullable:true})
    lastName?: true;
    @Field(() => Boolean, {nullable:true})
    phone?: true;
    @Field(() => Boolean, {nullable:true})
    username?: true;
    @Field(() => Boolean, {nullable:true})
    password?: true;
    @Field(() => Boolean, {nullable:true})
    isVerified?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class UserCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    email!: number;
    @Field(() => Int, {nullable:false})
    firstName!: number;
    @Field(() => Int, {nullable:false})
    lastName!: number;
    @Field(() => Int, {nullable:false})
    phone!: number;
    @Field(() => Int, {nullable:false})
    username!: number;
    @Field(() => Int, {nullable:false})
    password!: number;
    @Field(() => Int, {nullable:false})
    isVerified!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class UserCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    firstName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    lastName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    phone?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    username?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    password?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    isVerified?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@ObjectType()
export class UserCount {
    @Field(() => Int, {nullable:false})
    tokens?: number;
    @Field(() => Int, {nullable:false})
    Role?: number;
    @Field(() => Int, {nullable:false})
    vehicles?: number;
    @Field(() => Int, {nullable:false})
    UserImage?: number;
    @Field(() => Int, {nullable:false})
    UserDocument?: number;
}

@InputType()
export class UserCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserCreateNestedManyWithoutRoleInput {
    @Field(() => [UserCreateWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateWithoutRoleInput)
    create?: Array<UserCreateWithoutRoleInput>;
    @Field(() => [UserCreateOrConnectWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutRoleInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
}

@InputType()
export class UserCreateNestedOneWithoutTokensInput {
    @Field(() => UserCreateWithoutTokensInput, {nullable:true})
    @Type(() => UserCreateWithoutTokensInput)
    create?: InstanceType<typeof UserCreateWithoutTokensInput>;
    @Field(() => UserCreateOrConnectWithoutTokensInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutTokensInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutTokensInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@InputType()
export class UserCreateNestedOneWithoutUserDocumentInput {
    @Field(() => UserCreateWithoutUserDocumentInput, {nullable:true})
    @Type(() => UserCreateWithoutUserDocumentInput)
    create?: InstanceType<typeof UserCreateWithoutUserDocumentInput>;
    @Field(() => UserCreateOrConnectWithoutUserDocumentInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserDocumentInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutUserDocumentInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@InputType()
export class UserCreateNestedOneWithoutUserImageInput {
    @Field(() => UserCreateWithoutUserImageInput, {nullable:true})
    @Type(() => UserCreateWithoutUserImageInput)
    create?: InstanceType<typeof UserCreateWithoutUserImageInput>;
    @Field(() => UserCreateOrConnectWithoutUserImageInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserImageInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutUserImageInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@InputType()
export class UserCreateNestedOneWithoutUserPreferenceInput {
    @Field(() => UserCreateWithoutUserPreferenceInput, {nullable:true})
    @Type(() => UserCreateWithoutUserPreferenceInput)
    create?: InstanceType<typeof UserCreateWithoutUserPreferenceInput>;
    @Field(() => UserCreateOrConnectWithoutUserPreferenceInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserPreferenceInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutUserPreferenceInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@InputType()
export class UserCreateNestedOneWithoutVehiclesInput {
    @Field(() => UserCreateWithoutVehiclesInput, {nullable:true})
    @Type(() => UserCreateWithoutVehiclesInput)
    create?: InstanceType<typeof UserCreateWithoutVehiclesInput>;
    @Field(() => UserCreateOrConnectWithoutVehiclesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutVehiclesInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutVehiclesInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@InputType()
export class UserCreateOrConnectWithoutRoleInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutRoleInput, {nullable:false})
    @Type(() => UserCreateWithoutRoleInput)
    create!: InstanceType<typeof UserCreateWithoutRoleInput>;
}

@InputType()
export class UserCreateOrConnectWithoutTokensInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutTokensInput, {nullable:false})
    @Type(() => UserCreateWithoutTokensInput)
    create!: InstanceType<typeof UserCreateWithoutTokensInput>;
}

@InputType()
export class UserCreateOrConnectWithoutUserDocumentInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutUserDocumentInput, {nullable:false})
    @Type(() => UserCreateWithoutUserDocumentInput)
    create!: InstanceType<typeof UserCreateWithoutUserDocumentInput>;
}

@InputType()
export class UserCreateOrConnectWithoutUserImageInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutUserImageInput, {nullable:false})
    @Type(() => UserCreateWithoutUserImageInput)
    create!: InstanceType<typeof UserCreateWithoutUserImageInput>;
}

@InputType()
export class UserCreateOrConnectWithoutUserPreferenceInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => UserCreateWithoutUserPreferenceInput)
    create!: InstanceType<typeof UserCreateWithoutUserPreferenceInput>;
}

@InputType()
export class UserCreateOrConnectWithoutVehiclesInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutVehiclesInput, {nullable:false})
    @Type(() => UserCreateWithoutVehiclesInput)
    create!: InstanceType<typeof UserCreateWithoutVehiclesInput>;
}

@InputType()
export class UserCreateWithoutRoleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenCreateNestedManyWithoutUserInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserCreateWithoutTokensInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserCreateWithoutUserDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserCreateWithoutUserImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserCreateWithoutUserPreferenceInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserCreateWithoutVehiclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentCreateNestedManyWithoutUserInput>;
}

@ArgsType()
export class UserGroupByArgs {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => [UserOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserOrderByWithAggregationInput>;
    @Field(() => [UserScalarFieldEnum], {nullable:false})
    by!: Array<`${UserScalarFieldEnum}`>;
    @Field(() => UserScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof UserScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserCountAggregateInput>;
    @Field(() => UserMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserMinAggregateInput>;
    @Field(() => UserMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserMaxAggregateInput>;
}

@ObjectType()
export class UserGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:false})
    isVerified!: boolean;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserCountAggregate>;
    @Field(() => UserMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserMinAggregate>;
    @Field(() => UserMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserMaxAggregate>;
}

@InputType()
export class UserListRelationFilter {
    @Field(() => UserWhereInput, {nullable:true})
    every?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserWhereInput, {nullable:true})
    some?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserWhereInput, {nullable:true})
    none?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    email?: true;
    @Field(() => Boolean, {nullable:true})
    firstName?: true;
    @Field(() => Boolean, {nullable:true})
    lastName?: true;
    @Field(() => Boolean, {nullable:true})
    phone?: true;
    @Field(() => Boolean, {nullable:true})
    username?: true;
    @Field(() => Boolean, {nullable:true})
    password?: true;
    @Field(() => Boolean, {nullable:true})
    isVerified?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    email?: string;
    @Field(() => String, {nullable:true})
    firstName?: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:true})
    password?: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    firstName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    lastName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    phone?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    username?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    password?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    isVerified?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    email?: true;
    @Field(() => Boolean, {nullable:true})
    firstName?: true;
    @Field(() => Boolean, {nullable:true})
    lastName?: true;
    @Field(() => Boolean, {nullable:true})
    phone?: true;
    @Field(() => Boolean, {nullable:true})
    username?: true;
    @Field(() => Boolean, {nullable:true})
    password?: true;
    @Field(() => Boolean, {nullable:true})
    isVerified?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    email?: string;
    @Field(() => String, {nullable:true})
    firstName?: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:true})
    password?: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    firstName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    lastName?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    phone?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    username?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    password?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    isVerified?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class UserOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    firstName?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    lastName?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    phone?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    username?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    password?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    isVerified?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserCountOrderByAggregateInput>;
    @Field(() => UserMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserMaxOrderByAggregateInput>;
    @Field(() => UserMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserMinOrderByAggregateInput>;
}

@InputType()
export class UserOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    firstName?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    lastName?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    phone?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    username?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    password?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    isVerified?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => RefreshTokenOrderByRelationAggregateInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenOrderByRelationAggregateInput>;
    @Field(() => RoleOrderByRelationAggregateInput, {nullable:true})
    Role?: InstanceType<typeof RoleOrderByRelationAggregateInput>;
    @Field(() => DriverVehicleOrderByRelationAggregateInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleOrderByRelationAggregateInput>;
    @Field(() => UserPreferenceOrderByWithRelationInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceOrderByWithRelationInput>;
    @Field(() => UserImageOrderByRelationAggregateInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageOrderByRelationAggregateInput>;
    @Field(() => UserDocumentOrderByRelationAggregateInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentOrderByRelationAggregateInput>;
}

@InputType()
export class UserScalarRelationFilter {
    @Field(() => UserWhereInput, {nullable:true})
    is?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserWhereInput, {nullable:true})
    isNot?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserScalarWhereWithAggregatesInput {
    @Field(() => [UserScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserScalarWhereWithAggregatesInput>;
    @Field(() => [UserScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserScalarWhereWithAggregatesInput>;
    @Field(() => [UserScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    email?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    firstName?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    lastName?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    phone?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    username?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    password?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableWithAggregatesFilter>;
}

@InputType()
export class UserScalarWhereInput {
    @Field(() => [UserScalarWhereInput], {nullable:true})
    AND?: Array<UserScalarWhereInput>;
    @Field(() => [UserScalarWhereInput], {nullable:true})
    OR?: Array<UserScalarWhereInput>;
    @Field(() => [UserScalarWhereInput], {nullable:true})
    NOT?: Array<UserScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    email?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    firstName?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    lastName?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    phone?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    username?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    password?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class UserUncheckedCreateNestedManyWithoutRoleInput {
    @Field(() => [UserCreateWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateWithoutRoleInput)
    create?: Array<UserCreateWithoutRoleInput>;
    @Field(() => [UserCreateOrConnectWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutRoleInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
}

@InputType()
export class UserUncheckedCreateWithoutRoleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateWithoutTokensInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateWithoutUserDocumentInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateWithoutUserImageInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateWithoutUserPreferenceInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateWithoutVehiclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName?: string;
    @Field(() => String, {nullable:true})
    phone?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserDocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedCreateNestedManyWithoutUserInput>;
}

@InputType()
export class UserUncheckedUpdateManyWithoutRoleNestedInput {
    @Field(() => [UserCreateWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateWithoutRoleInput)
    create?: Array<UserCreateWithoutRoleInput>;
    @Field(() => [UserCreateOrConnectWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutRoleInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;
    @Field(() => [UserUpsertWithWhereUniqueWithoutRoleInput], {nullable:true})
    @Type(() => UserUpsertWithWhereUniqueWithoutRoleInput)
    upsert?: Array<UserUpsertWithWhereUniqueWithoutRoleInput>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserUpdateWithWhereUniqueWithoutRoleInput], {nullable:true})
    @Type(() => UserUpdateWithWhereUniqueWithoutRoleInput)
    update?: Array<UserUpdateWithWhereUniqueWithoutRoleInput>;
    @Field(() => [UserUpdateManyWithWhereWithoutRoleInput], {nullable:true})
    @Type(() => UserUpdateManyWithWhereWithoutRoleInput)
    updateMany?: Array<UserUpdateManyWithWhereWithoutRoleInput>;
    @Field(() => [UserScalarWhereInput], {nullable:true})
    @Type(() => UserScalarWhereInput)
    deleteMany?: Array<UserScalarWhereInput>;
}

@InputType()
export class UserUncheckedUpdateManyWithoutRoleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutRoleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutTokensInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutUserDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutUserImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutUserPreferenceInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutVehiclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUncheckedUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserUpdateManyWithWhereWithoutRoleInput {
    @Field(() => UserScalarWhereInput, {nullable:false})
    @Type(() => UserScalarWhereInput)
    where!: InstanceType<typeof UserScalarWhereInput>;
    @Field(() => UserUpdateManyMutationInput, {nullable:false})
    @Type(() => UserUpdateManyMutationInput)
    data!: InstanceType<typeof UserUpdateManyMutationInput>;
}

@InputType()
export class UserUpdateManyWithoutRoleNestedInput {
    @Field(() => [UserCreateWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateWithoutRoleInput)
    create?: Array<UserCreateWithoutRoleInput>;
    @Field(() => [UserCreateOrConnectWithoutRoleInput], {nullable:true})
    @Type(() => UserCreateOrConnectWithoutRoleInput)
    connectOrCreate?: Array<UserCreateOrConnectWithoutRoleInput>;
    @Field(() => [UserUpsertWithWhereUniqueWithoutRoleInput], {nullable:true})
    @Type(() => UserUpsertWithWhereUniqueWithoutRoleInput)
    upsert?: Array<UserUpsertWithWhereUniqueWithoutRoleInput>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserWhereUniqueInput], {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>>;
    @Field(() => [UserUpdateWithWhereUniqueWithoutRoleInput], {nullable:true})
    @Type(() => UserUpdateWithWhereUniqueWithoutRoleInput)
    update?: Array<UserUpdateWithWhereUniqueWithoutRoleInput>;
    @Field(() => [UserUpdateManyWithWhereWithoutRoleInput], {nullable:true})
    @Type(() => UserUpdateManyWithWhereWithoutRoleInput)
    updateMany?: Array<UserUpdateManyWithWhereWithoutRoleInput>;
    @Field(() => [UserScalarWhereInput], {nullable:true})
    @Type(() => UserScalarWhereInput)
    deleteMany?: Array<UserScalarWhereInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutTokensNestedInput {
    @Field(() => UserCreateWithoutTokensInput, {nullable:true})
    @Type(() => UserCreateWithoutTokensInput)
    create?: InstanceType<typeof UserCreateWithoutTokensInput>;
    @Field(() => UserCreateOrConnectWithoutTokensInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutTokensInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutTokensInput>;
    @Field(() => UserUpsertWithoutTokensInput, {nullable:true})
    @Type(() => UserUpsertWithoutTokensInput)
    upsert?: InstanceType<typeof UserUpsertWithoutTokensInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutTokensInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutTokensInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutTokensInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutUserDocumentNestedInput {
    @Field(() => UserCreateWithoutUserDocumentInput, {nullable:true})
    @Type(() => UserCreateWithoutUserDocumentInput)
    create?: InstanceType<typeof UserCreateWithoutUserDocumentInput>;
    @Field(() => UserCreateOrConnectWithoutUserDocumentInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserDocumentInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutUserDocumentInput>;
    @Field(() => UserUpsertWithoutUserDocumentInput, {nullable:true})
    @Type(() => UserUpsertWithoutUserDocumentInput)
    upsert?: InstanceType<typeof UserUpsertWithoutUserDocumentInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutUserDocumentInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUserDocumentInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutUserDocumentInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutUserImageNestedInput {
    @Field(() => UserCreateWithoutUserImageInput, {nullable:true})
    @Type(() => UserCreateWithoutUserImageInput)
    create?: InstanceType<typeof UserCreateWithoutUserImageInput>;
    @Field(() => UserCreateOrConnectWithoutUserImageInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserImageInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutUserImageInput>;
    @Field(() => UserUpsertWithoutUserImageInput, {nullable:true})
    @Type(() => UserUpsertWithoutUserImageInput)
    upsert?: InstanceType<typeof UserUpsertWithoutUserImageInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutUserImageInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUserImageInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutUserImageInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutUserPreferenceNestedInput {
    @Field(() => UserCreateWithoutUserPreferenceInput, {nullable:true})
    @Type(() => UserCreateWithoutUserPreferenceInput)
    create?: InstanceType<typeof UserCreateWithoutUserPreferenceInput>;
    @Field(() => UserCreateOrConnectWithoutUserPreferenceInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUserPreferenceInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutUserPreferenceInput>;
    @Field(() => UserUpsertWithoutUserPreferenceInput, {nullable:true})
    @Type(() => UserUpsertWithoutUserPreferenceInput)
    upsert?: InstanceType<typeof UserUpsertWithoutUserPreferenceInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutUserPreferenceInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUserPreferenceInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutUserPreferenceInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutVehiclesNestedInput {
    @Field(() => UserCreateWithoutVehiclesInput, {nullable:true})
    @Type(() => UserCreateWithoutVehiclesInput)
    create?: InstanceType<typeof UserCreateWithoutVehiclesInput>;
    @Field(() => UserCreateOrConnectWithoutVehiclesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutVehiclesInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutVehiclesInput>;
    @Field(() => UserUpsertWithoutVehiclesInput, {nullable:true})
    @Type(() => UserUpsertWithoutVehiclesInput)
    upsert?: InstanceType<typeof UserUpsertWithoutVehiclesInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutVehiclesInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutVehiclesInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutVehiclesInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutTokensInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutTokensInput, {nullable:false})
    @Type(() => UserUpdateWithoutTokensInput)
    data!: InstanceType<typeof UserUpdateWithoutTokensInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutUserDocumentInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutUserDocumentInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserDocumentInput)
    data!: InstanceType<typeof UserUpdateWithoutUserDocumentInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutUserImageInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutUserImageInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserImageInput)
    data!: InstanceType<typeof UserUpdateWithoutUserImageInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutUserPreferenceInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserPreferenceInput)
    data!: InstanceType<typeof UserUpdateWithoutUserPreferenceInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutVehiclesInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutVehiclesInput, {nullable:false})
    @Type(() => UserUpdateWithoutVehiclesInput)
    data!: InstanceType<typeof UserUpdateWithoutVehiclesInput>;
}

@InputType()
export class UserUpdateWithWhereUniqueWithoutRoleInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateWithoutRoleInput, {nullable:false})
    @Type(() => UserUpdateWithoutRoleInput)
    data!: InstanceType<typeof UserUpdateWithoutRoleInput>;
}

@InputType()
export class UserUpdateWithoutRoleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateWithoutTokensInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateWithoutUserDocumentInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateWithoutUserImageInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateWithoutUserPreferenceInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateWithoutVehiclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    firstName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    lastName?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    phone?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    UserImage?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => UserDocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentUpdateManyWithoutUserNestedInput>;
}

@InputType()
export class UserUpsertWithWhereUniqueWithoutRoleInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateWithoutRoleInput, {nullable:false})
    @Type(() => UserUpdateWithoutRoleInput)
    update!: InstanceType<typeof UserUpdateWithoutRoleInput>;
    @Field(() => UserCreateWithoutRoleInput, {nullable:false})
    @Type(() => UserCreateWithoutRoleInput)
    create!: InstanceType<typeof UserCreateWithoutRoleInput>;
}

@InputType()
export class UserUpsertWithoutTokensInput {
    @Field(() => UserUpdateWithoutTokensInput, {nullable:false})
    @Type(() => UserUpdateWithoutTokensInput)
    update!: InstanceType<typeof UserUpdateWithoutTokensInput>;
    @Field(() => UserCreateWithoutTokensInput, {nullable:false})
    @Type(() => UserCreateWithoutTokensInput)
    create!: InstanceType<typeof UserCreateWithoutTokensInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserUpsertWithoutUserDocumentInput {
    @Field(() => UserUpdateWithoutUserDocumentInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserDocumentInput)
    update!: InstanceType<typeof UserUpdateWithoutUserDocumentInput>;
    @Field(() => UserCreateWithoutUserDocumentInput, {nullable:false})
    @Type(() => UserCreateWithoutUserDocumentInput)
    create!: InstanceType<typeof UserCreateWithoutUserDocumentInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserUpsertWithoutUserImageInput {
    @Field(() => UserUpdateWithoutUserImageInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserImageInput)
    update!: InstanceType<typeof UserUpdateWithoutUserImageInput>;
    @Field(() => UserCreateWithoutUserImageInput, {nullable:false})
    @Type(() => UserCreateWithoutUserImageInput)
    create!: InstanceType<typeof UserCreateWithoutUserImageInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserUpsertWithoutUserPreferenceInput {
    @Field(() => UserUpdateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => UserUpdateWithoutUserPreferenceInput)
    update!: InstanceType<typeof UserUpdateWithoutUserPreferenceInput>;
    @Field(() => UserCreateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => UserCreateWithoutUserPreferenceInput)
    create!: InstanceType<typeof UserCreateWithoutUserPreferenceInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserUpsertWithoutVehiclesInput {
    @Field(() => UserUpdateWithoutVehiclesInput, {nullable:false})
    @Type(() => UserUpdateWithoutVehiclesInput)
    update!: InstanceType<typeof UserUpdateWithoutVehiclesInput>;
    @Field(() => UserCreateWithoutVehiclesInput, {nullable:false})
    @Type(() => UserCreateWithoutVehiclesInput)
    create!: InstanceType<typeof UserCreateWithoutVehiclesInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    email?: string;
    @Field(() => String, {nullable:true})
    username?: string;
    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    firstName?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    lastName?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    phone?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    password?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => RefreshTokenListRelationFilter, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenListRelationFilter>;
    @Field(() => RoleListRelationFilter, {nullable:true})
    Role?: InstanceType<typeof RoleListRelationFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
    @Field(() => UserPreferenceNullableScalarRelationFilter, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceNullableScalarRelationFilter>;
    @Field(() => UserImageListRelationFilter, {nullable:true})
    UserImage?: InstanceType<typeof UserImageListRelationFilter>;
    @Field(() => UserDocumentListRelationFilter, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentListRelationFilter>;
}

@InputType()
export class UserWhereInput {
    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;
    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    email?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    firstName?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    lastName?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    phone?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    username?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    password?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => RefreshTokenListRelationFilter, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenListRelationFilter>;
    @Field(() => RoleListRelationFilter, {nullable:true})
    Role?: InstanceType<typeof RoleListRelationFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
    @Field(() => UserPreferenceNullableScalarRelationFilter, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceNullableScalarRelationFilter>;
    @Field(() => UserImageListRelationFilter, {nullable:true})
    UserImage?: InstanceType<typeof UserImageListRelationFilter>;
    @Field(() => UserDocumentListRelationFilter, {nullable:true})
    UserDocument?: InstanceType<typeof UserDocumentListRelationFilter>;
}

@ObjectType()
export class User {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    email!: string;
    @Field(() => String, {nullable:false})
    firstName!: string;
    @Field(() => String, {nullable:true})
    lastName!: string | null;
    @Field(() => String, {nullable:true})
    phone!: string | null;
    @Field(() => String, {nullable:true})
    username!: string | null;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    isVerified!: boolean;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => [RefreshToken], {nullable:true})
    tokens?: Array<RefreshToken>;
    @Field(() => [Role], {nullable:true})
    Role?: Array<Role>;
    @Field(() => [DriverVehicle], {nullable:true})
    vehicles?: Array<DriverVehicle>;
    @Field(() => UserPreference, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreference> | null;
    @Field(() => [UserImage], {nullable:true})
    UserImage?: Array<UserImage>;
    @Field(() => [UserDocument], {nullable:true})
    UserDocument?: Array<UserDocument>;
    @Field(() => UserCount, {nullable:false})
    _count?: InstanceType<typeof UserCount>;
}

@ObjectType()
export class AggregateUserDocument {
    @Field(() => UserDocumentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserDocumentCountAggregate>;
    @Field(() => UserDocumentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserDocumentMinAggregate>;
    @Field(() => UserDocumentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserDocumentMaxAggregate>;
}

@ArgsType()
export class CreateManyUserDocumentArgs {
    @Field(() => [UserDocumentCreateManyInput], {nullable:false})
    @Type(() => UserDocumentCreateManyInput)
    data!: Array<UserDocumentCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneUserDocumentArgs {
    @Field(() => UserDocumentCreateInput, {nullable:false})
    @Type(() => UserDocumentCreateInput)
    data!: InstanceType<typeof UserDocumentCreateInput>;
}

@ArgsType()
export class DeleteManyUserDocumentArgs {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneUserDocumentArgs {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstUserDocumentOrThrowArgs {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => [UserDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserDocumentOrderByWithRelationInput>;
    @Field(() => UserDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserDocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserDocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstUserDocumentArgs {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => [UserDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserDocumentOrderByWithRelationInput>;
    @Field(() => UserDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserDocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserDocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyUserDocumentArgs {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => [UserDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserDocumentOrderByWithRelationInput>;
    @Field(() => UserDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserDocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserDocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueUserDocumentOrThrowArgs {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueUserDocumentArgs {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyUserDocumentArgs {
    @Field(() => UserDocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => UserDocumentUpdateManyMutationInput)
    data!: InstanceType<typeof UserDocumentUpdateManyMutationInput>;
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneUserDocumentArgs {
    @Field(() => UserDocumentUpdateInput, {nullable:false})
    @Type(() => UserDocumentUpdateInput)
    data!: InstanceType<typeof UserDocumentUpdateInput>;
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneUserDocumentArgs {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentCreateInput, {nullable:false})
    @Type(() => UserDocumentCreateInput)
    create!: InstanceType<typeof UserDocumentCreateInput>;
    @Field(() => UserDocumentUpdateInput, {nullable:false})
    @Type(() => UserDocumentUpdateInput)
    update!: InstanceType<typeof UserDocumentUpdateInput>;
}

@ArgsType()
export class UserDocumentAggregateArgs {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => [UserDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserDocumentOrderByWithRelationInput>;
    @Field(() => UserDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserDocumentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserDocumentCountAggregateInput>;
    @Field(() => UserDocumentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserDocumentMinAggregateInput>;
    @Field(() => UserDocumentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserDocumentMaxAggregateInput>;
}

@InputType()
export class UserDocumentCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class UserDocumentCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    fileId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class UserDocumentCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserDocumentCreateManyFileInputEnvelope {
    @Field(() => [UserDocumentCreateManyFileInput], {nullable:false})
    @Type(() => UserDocumentCreateManyFileInput)
    data!: Array<UserDocumentCreateManyFileInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class UserDocumentCreateManyFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentCreateManyUserInputEnvelope {
    @Field(() => [UserDocumentCreateManyUserInput], {nullable:false})
    @Type(() => UserDocumentCreateManyUserInput)
    data!: Array<UserDocumentCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class UserDocumentCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentCreateNestedManyWithoutFileInput {
    @Field(() => [UserDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutFileInput)
    create?: Array<UserDocumentCreateWithoutFileInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => UserDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyFileInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserDocumentCreateNestedManyWithoutUserInput {
    @Field(() => [UserDocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutUserInput)
    create?: Array<UserDocumentCreateWithoutUserInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutUserInput>;
    @Field(() => UserDocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyUserInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserDocumentCreateOrConnectWithoutFileInput {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentCreateWithoutFileInput, {nullable:false})
    @Type(() => UserDocumentCreateWithoutFileInput)
    create!: InstanceType<typeof UserDocumentCreateWithoutFileInput>;
}

@InputType()
export class UserDocumentCreateOrConnectWithoutUserInput {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentCreateWithoutUserInput, {nullable:false})
    @Type(() => UserDocumentCreateWithoutUserInput)
    create!: InstanceType<typeof UserDocumentCreateWithoutUserInput>;
}

@InputType()
export class UserDocumentCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutUserDocumentInput, {nullable:false})
    User!: InstanceType<typeof UserCreateNestedOneWithoutUserDocumentInput>;
}

@InputType()
export class UserDocumentCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutUserDocumentInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutUserDocumentInput>;
}

@InputType()
export class UserDocumentCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutUserDocumentInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutUserDocumentInput>;
    @Field(() => UserCreateNestedOneWithoutUserDocumentInput, {nullable:false})
    User!: InstanceType<typeof UserCreateNestedOneWithoutUserDocumentInput>;
}

@ArgsType()
export class UserDocumentGroupByArgs {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    @Type(() => UserDocumentWhereInput)
    where?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => [UserDocumentOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserDocumentOrderByWithAggregationInput>;
    @Field(() => [UserDocumentScalarFieldEnum], {nullable:false})
    by!: Array<`${UserDocumentScalarFieldEnum}`>;
    @Field(() => UserDocumentScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof UserDocumentScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserDocumentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserDocumentCountAggregateInput>;
    @Field(() => UserDocumentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserDocumentMinAggregateInput>;
    @Field(() => UserDocumentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserDocumentMaxAggregateInput>;
}

@ObjectType()
export class UserDocumentGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserDocumentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserDocumentCountAggregate>;
    @Field(() => UserDocumentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserDocumentMinAggregate>;
    @Field(() => UserDocumentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserDocumentMaxAggregate>;
}

@InputType()
export class UserDocumentListRelationFilter {
    @Field(() => UserDocumentWhereInput, {nullable:true})
    every?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => UserDocumentWhereInput, {nullable:true})
    some?: InstanceType<typeof UserDocumentWhereInput>;
    @Field(() => UserDocumentWhereInput, {nullable:true})
    none?: InstanceType<typeof UserDocumentWhereInput>;
}

@InputType()
export class UserDocumentMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserDocumentMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserDocumentMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserDocumentMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserDocumentOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class UserDocumentOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserDocumentCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserDocumentCountOrderByAggregateInput>;
    @Field(() => UserDocumentMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserDocumentMaxOrderByAggregateInput>;
    @Field(() => UserDocumentMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserDocumentMinOrderByAggregateInput>;
}

@InputType()
export class UserDocumentOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => FileOrderByWithRelationInput, {nullable:true})
    file?: InstanceType<typeof FileOrderByWithRelationInput>;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    User?: InstanceType<typeof UserOrderByWithRelationInput>;
}

@InputType()
export class UserDocumentScalarWhereWithAggregatesInput {
    @Field(() => [UserDocumentScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserDocumentScalarWhereWithAggregatesInput>;
    @Field(() => [UserDocumentScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserDocumentScalarWhereWithAggregatesInput>;
    @Field(() => [UserDocumentScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserDocumentScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    fileId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableWithAggregatesFilter>;
}

@InputType()
export class UserDocumentScalarWhereInput {
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    AND?: Array<UserDocumentScalarWhereInput>;
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    OR?: Array<UserDocumentScalarWhereInput>;
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    NOT?: Array<UserDocumentScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class UserDocumentUncheckedCreateNestedManyWithoutFileInput {
    @Field(() => [UserDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutFileInput)
    create?: Array<UserDocumentCreateWithoutFileInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => UserDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyFileInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserDocumentUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [UserDocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutUserInput)
    create?: Array<UserDocumentCreateWithoutUserInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutUserInput>;
    @Field(() => UserDocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyUserInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserDocumentUncheckedCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserDocumentUncheckedUpdateManyWithoutFileNestedInput {
    @Field(() => [UserDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutFileInput)
    create?: Array<UserDocumentCreateWithoutFileInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => [UserDocumentUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<UserDocumentUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => UserDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyFileInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<UserDocumentUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [UserDocumentUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<UserDocumentUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    @Type(() => UserDocumentScalarWhereInput)
    deleteMany?: Array<UserDocumentScalarWhereInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateManyWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [UserDocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutUserInput)
    create?: Array<UserDocumentCreateWithoutUserInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutUserInput>;
    @Field(() => [UserDocumentUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserDocumentUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => UserDocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyUserInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserDocumentUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [UserDocumentUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserDocumentUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    @Type(() => UserDocumentScalarWhereInput)
    deleteMany?: Array<UserDocumentScalarWhereInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserDocumentUpdateManyWithWhereWithoutFileInput {
    @Field(() => UserDocumentScalarWhereInput, {nullable:false})
    @Type(() => UserDocumentScalarWhereInput)
    where!: InstanceType<typeof UserDocumentScalarWhereInput>;
    @Field(() => UserDocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => UserDocumentUpdateManyMutationInput)
    data!: InstanceType<typeof UserDocumentUpdateManyMutationInput>;
}

@InputType()
export class UserDocumentUpdateManyWithWhereWithoutUserInput {
    @Field(() => UserDocumentScalarWhereInput, {nullable:false})
    @Type(() => UserDocumentScalarWhereInput)
    where!: InstanceType<typeof UserDocumentScalarWhereInput>;
    @Field(() => UserDocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => UserDocumentUpdateManyMutationInput)
    data!: InstanceType<typeof UserDocumentUpdateManyMutationInput>;
}

@InputType()
export class UserDocumentUpdateManyWithoutFileNestedInput {
    @Field(() => [UserDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutFileInput)
    create?: Array<UserDocumentCreateWithoutFileInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => [UserDocumentUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<UserDocumentUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => UserDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyFileInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<UserDocumentUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [UserDocumentUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => UserDocumentUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<UserDocumentUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    @Type(() => UserDocumentScalarWhereInput)
    deleteMany?: Array<UserDocumentScalarWhereInput>;
}

@InputType()
export class UserDocumentUpdateManyWithoutUserNestedInput {
    @Field(() => [UserDocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateWithoutUserInput)
    create?: Array<UserDocumentCreateWithoutUserInput>;
    @Field(() => [UserDocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserDocumentCreateOrConnectWithoutUserInput>;
    @Field(() => [UserDocumentUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserDocumentUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => UserDocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserDocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserDocumentCreateManyUserInputEnvelope>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentWhereUniqueInput], {nullable:true})
    @Type(() => UserDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [UserDocumentUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserDocumentUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [UserDocumentUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserDocumentUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserDocumentUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [UserDocumentScalarWhereInput], {nullable:true})
    @Type(() => UserDocumentScalarWhereInput)
    deleteMany?: Array<UserDocumentScalarWhereInput>;
}

@InputType()
export class UserDocumentUpdateWithWhereUniqueWithoutFileInput {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentUpdateWithoutFileInput, {nullable:false})
    @Type(() => UserDocumentUpdateWithoutFileInput)
    data!: InstanceType<typeof UserDocumentUpdateWithoutFileInput>;
}

@InputType()
export class UserDocumentUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserDocumentUpdateWithoutUserInput)
    data!: InstanceType<typeof UserDocumentUpdateWithoutUserInput>;
}

@InputType()
export class UserDocumentUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserDocumentNestedInput, {nullable:true})
    User?: InstanceType<typeof UserUpdateOneRequiredWithoutUserDocumentNestedInput>;
}

@InputType()
export class UserDocumentUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutUserDocumentNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutUserDocumentNestedInput>;
}

@InputType()
export class UserDocumentUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutUserDocumentNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutUserDocumentNestedInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserDocumentNestedInput, {nullable:true})
    User?: InstanceType<typeof UserUpdateOneRequiredWithoutUserDocumentNestedInput>;
}

@InputType()
export class UserDocumentUpsertWithWhereUniqueWithoutFileInput {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentUpdateWithoutFileInput, {nullable:false})
    @Type(() => UserDocumentUpdateWithoutFileInput)
    update!: InstanceType<typeof UserDocumentUpdateWithoutFileInput>;
    @Field(() => UserDocumentCreateWithoutFileInput, {nullable:false})
    @Type(() => UserDocumentCreateWithoutFileInput)
    create!: InstanceType<typeof UserDocumentCreateWithoutFileInput>;
}

@InputType()
export class UserDocumentUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => UserDocumentWhereUniqueInput, {nullable:false})
    @Type(() => UserDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<UserDocumentWhereUniqueInput, 'id'>;
    @Field(() => UserDocumentUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserDocumentUpdateWithoutUserInput)
    update!: InstanceType<typeof UserDocumentUpdateWithoutUserInput>;
    @Field(() => UserDocumentCreateWithoutUserInput, {nullable:false})
    @Type(() => UserDocumentCreateWithoutUserInput)
    create!: InstanceType<typeof UserDocumentCreateWithoutUserInput>;
}

@InputType()
export class UserDocumentWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [UserDocumentWhereInput], {nullable:true})
    AND?: Array<UserDocumentWhereInput>;
    @Field(() => [UserDocumentWhereInput], {nullable:true})
    OR?: Array<UserDocumentWhereInput>;
    @Field(() => [UserDocumentWhereInput], {nullable:true})
    NOT?: Array<UserDocumentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    User?: InstanceType<typeof UserScalarRelationFilter>;
}

@InputType()
export class UserDocumentWhereInput {
    @Field(() => [UserDocumentWhereInput], {nullable:true})
    AND?: Array<UserDocumentWhereInput>;
    @Field(() => [UserDocumentWhereInput], {nullable:true})
    OR?: Array<UserDocumentWhereInput>;
    @Field(() => [UserDocumentWhereInput], {nullable:true})
    NOT?: Array<UserDocumentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    User?: InstanceType<typeof UserScalarRelationFilter>;
}

@ObjectType()
export class UserDocument {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => File, {nullable:false})
    file?: InstanceType<typeof File>;
    @Field(() => User, {nullable:false})
    User?: InstanceType<typeof User>;
}

@ObjectType()
export class AggregateUserImage {
    @Field(() => UserImageCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserImageCountAggregate>;
    @Field(() => UserImageMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserImageMinAggregate>;
    @Field(() => UserImageMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserImageMaxAggregate>;
}

@ArgsType()
export class CreateManyUserImageArgs {
    @Field(() => [UserImageCreateManyInput], {nullable:false})
    @Type(() => UserImageCreateManyInput)
    data!: Array<UserImageCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneUserImageArgs {
    @Field(() => UserImageCreateInput, {nullable:false})
    @Type(() => UserImageCreateInput)
    data!: InstanceType<typeof UserImageCreateInput>;
}

@ArgsType()
export class DeleteManyUserImageArgs {
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneUserImageArgs {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstUserImageOrThrowArgs {
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => [UserImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserImageOrderByWithRelationInput>;
    @Field(() => UserImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstUserImageArgs {
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => [UserImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserImageOrderByWithRelationInput>;
    @Field(() => UserImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyUserImageArgs {
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => [UserImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserImageOrderByWithRelationInput>;
    @Field(() => UserImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueUserImageOrThrowArgs {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueUserImageArgs {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyUserImageArgs {
    @Field(() => UserImageUpdateManyMutationInput, {nullable:false})
    @Type(() => UserImageUpdateManyMutationInput)
    data!: InstanceType<typeof UserImageUpdateManyMutationInput>;
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneUserImageArgs {
    @Field(() => UserImageUpdateInput, {nullable:false})
    @Type(() => UserImageUpdateInput)
    data!: InstanceType<typeof UserImageUpdateInput>;
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneUserImageArgs {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageCreateInput, {nullable:false})
    @Type(() => UserImageCreateInput)
    create!: InstanceType<typeof UserImageCreateInput>;
    @Field(() => UserImageUpdateInput, {nullable:false})
    @Type(() => UserImageUpdateInput)
    update!: InstanceType<typeof UserImageUpdateInput>;
}

@ArgsType()
export class UserImageAggregateArgs {
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => [UserImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserImageOrderByWithRelationInput>;
    @Field(() => UserImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserImageCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserImageCountAggregateInput>;
    @Field(() => UserImageMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserImageMinAggregateInput>;
    @Field(() => UserImageMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserImageMaxAggregateInput>;
}

@InputType()
export class UserImageCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class UserImageCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    fileId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class UserImageCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserImageCreateManyFileInputEnvelope {
    @Field(() => [UserImageCreateManyFileInput], {nullable:false})
    @Type(() => UserImageCreateManyFileInput)
    data!: Array<UserImageCreateManyFileInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class UserImageCreateManyFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageCreateManyUserInputEnvelope {
    @Field(() => [UserImageCreateManyUserInput], {nullable:false})
    @Type(() => UserImageCreateManyUserInput)
    data!: Array<UserImageCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class UserImageCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageCreateNestedManyWithoutFileInput {
    @Field(() => [UserImageCreateWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateWithoutFileInput)
    create?: Array<UserImageCreateWithoutFileInput>;
    @Field(() => [UserImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutFileInput>;
    @Field(() => UserImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyFileInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserImageCreateNestedManyWithoutUserInput {
    @Field(() => [UserImageCreateWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateWithoutUserInput)
    create?: Array<UserImageCreateWithoutUserInput>;
    @Field(() => [UserImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutUserInput>;
    @Field(() => UserImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyUserInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserImageCreateOrConnectWithoutFileInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageCreateWithoutFileInput, {nullable:false})
    @Type(() => UserImageCreateWithoutFileInput)
    create!: InstanceType<typeof UserImageCreateWithoutFileInput>;
}

@InputType()
export class UserImageCreateOrConnectWithoutUserInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageCreateWithoutUserInput, {nullable:false})
    @Type(() => UserImageCreateWithoutUserInput)
    create!: InstanceType<typeof UserImageCreateWithoutUserInput>;
}

@InputType()
export class UserImageCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutUserImageInput, {nullable:false})
    User!: InstanceType<typeof UserCreateNestedOneWithoutUserImageInput>;
}

@InputType()
export class UserImageCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutUserImageInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutUserImageInput>;
}

@InputType()
export class UserImageCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutUserImageInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutUserImageInput>;
    @Field(() => UserCreateNestedOneWithoutUserImageInput, {nullable:false})
    User!: InstanceType<typeof UserCreateNestedOneWithoutUserImageInput>;
}

@ArgsType()
export class UserImageGroupByArgs {
    @Field(() => UserImageWhereInput, {nullable:true})
    @Type(() => UserImageWhereInput)
    where?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => [UserImageOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserImageOrderByWithAggregationInput>;
    @Field(() => [UserImageScalarFieldEnum], {nullable:false})
    by!: Array<`${UserImageScalarFieldEnum}`>;
    @Field(() => UserImageScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof UserImageScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserImageCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserImageCountAggregateInput>;
    @Field(() => UserImageMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserImageMinAggregateInput>;
    @Field(() => UserImageMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserImageMaxAggregateInput>;
}

@ObjectType()
export class UserImageGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserImageCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserImageCountAggregate>;
    @Field(() => UserImageMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserImageMinAggregate>;
    @Field(() => UserImageMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserImageMaxAggregate>;
}

@InputType()
export class UserImageListRelationFilter {
    @Field(() => UserImageWhereInput, {nullable:true})
    every?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => UserImageWhereInput, {nullable:true})
    some?: InstanceType<typeof UserImageWhereInput>;
    @Field(() => UserImageWhereInput, {nullable:true})
    none?: InstanceType<typeof UserImageWhereInput>;
}

@InputType()
export class UserImageMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserImageMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserImageMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserImageMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserImageOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class UserImageOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserImageCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserImageCountOrderByAggregateInput>;
    @Field(() => UserImageMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserImageMaxOrderByAggregateInput>;
    @Field(() => UserImageMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserImageMinOrderByAggregateInput>;
}

@InputType()
export class UserImageOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => FileOrderByWithRelationInput, {nullable:true})
    file?: InstanceType<typeof FileOrderByWithRelationInput>;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    User?: InstanceType<typeof UserOrderByWithRelationInput>;
}

@InputType()
export class UserImageScalarWhereWithAggregatesInput {
    @Field(() => [UserImageScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserImageScalarWhereWithAggregatesInput>;
    @Field(() => [UserImageScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserImageScalarWhereWithAggregatesInput>;
    @Field(() => [UserImageScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserImageScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    fileId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableWithAggregatesFilter>;
}

@InputType()
export class UserImageScalarWhereInput {
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    AND?: Array<UserImageScalarWhereInput>;
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    OR?: Array<UserImageScalarWhereInput>;
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    NOT?: Array<UserImageScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class UserImageUncheckedCreateNestedManyWithoutFileInput {
    @Field(() => [UserImageCreateWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateWithoutFileInput)
    create?: Array<UserImageCreateWithoutFileInput>;
    @Field(() => [UserImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutFileInput>;
    @Field(() => UserImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyFileInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserImageUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [UserImageCreateWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateWithoutUserInput)
    create?: Array<UserImageCreateWithoutUserInput>;
    @Field(() => [UserImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutUserInput>;
    @Field(() => UserImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyUserInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class UserImageUncheckedCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserImageUncheckedUpdateManyWithoutFileNestedInput {
    @Field(() => [UserImageCreateWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateWithoutFileInput)
    create?: Array<UserImageCreateWithoutFileInput>;
    @Field(() => [UserImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutFileInput>;
    @Field(() => [UserImageUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserImageUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<UserImageUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => UserImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyFileInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserImageUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<UserImageUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [UserImageUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => UserImageUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<UserImageUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    @Type(() => UserImageScalarWhereInput)
    deleteMany?: Array<UserImageScalarWhereInput>;
}

@InputType()
export class UserImageUncheckedUpdateManyWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [UserImageCreateWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateWithoutUserInput)
    create?: Array<UserImageCreateWithoutUserInput>;
    @Field(() => [UserImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutUserInput>;
    @Field(() => [UserImageUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserImageUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserImageUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => UserImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyUserInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserImageUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserImageUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [UserImageUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserImageUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserImageUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    @Type(() => UserImageScalarWhereInput)
    deleteMany?: Array<UserImageScalarWhereInput>;
}

@InputType()
export class UserImageUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUpdateManyWithWhereWithoutFileInput {
    @Field(() => UserImageScalarWhereInput, {nullable:false})
    @Type(() => UserImageScalarWhereInput)
    where!: InstanceType<typeof UserImageScalarWhereInput>;
    @Field(() => UserImageUpdateManyMutationInput, {nullable:false})
    @Type(() => UserImageUpdateManyMutationInput)
    data!: InstanceType<typeof UserImageUpdateManyMutationInput>;
}

@InputType()
export class UserImageUpdateManyWithWhereWithoutUserInput {
    @Field(() => UserImageScalarWhereInput, {nullable:false})
    @Type(() => UserImageScalarWhereInput)
    where!: InstanceType<typeof UserImageScalarWhereInput>;
    @Field(() => UserImageUpdateManyMutationInput, {nullable:false})
    @Type(() => UserImageUpdateManyMutationInput)
    data!: InstanceType<typeof UserImageUpdateManyMutationInput>;
}

@InputType()
export class UserImageUpdateManyWithoutFileNestedInput {
    @Field(() => [UserImageCreateWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateWithoutFileInput)
    create?: Array<UserImageCreateWithoutFileInput>;
    @Field(() => [UserImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutFileInput>;
    @Field(() => [UserImageUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserImageUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<UserImageUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => UserImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyFileInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => UserImageUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<UserImageUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [UserImageUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => UserImageUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<UserImageUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    @Type(() => UserImageScalarWhereInput)
    deleteMany?: Array<UserImageScalarWhereInput>;
}

@InputType()
export class UserImageUpdateManyWithoutUserNestedInput {
    @Field(() => [UserImageCreateWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateWithoutUserInput)
    create?: Array<UserImageCreateWithoutUserInput>;
    @Field(() => [UserImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => UserImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<UserImageCreateOrConnectWithoutUserInput>;
    @Field(() => [UserImageUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserImageUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<UserImageUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => UserImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => UserImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof UserImageCreateManyUserInputEnvelope>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageWhereUniqueInput], {nullable:true})
    @Type(() => UserImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>>;
    @Field(() => [UserImageUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => UserImageUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<UserImageUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [UserImageUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => UserImageUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<UserImageUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [UserImageScalarWhereInput], {nullable:true})
    @Type(() => UserImageScalarWhereInput)
    deleteMany?: Array<UserImageScalarWhereInput>;
}

@InputType()
export class UserImageUpdateWithWhereUniqueWithoutFileInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageUpdateWithoutFileInput, {nullable:false})
    @Type(() => UserImageUpdateWithoutFileInput)
    data!: InstanceType<typeof UserImageUpdateWithoutFileInput>;
}

@InputType()
export class UserImageUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserImageUpdateWithoutUserInput)
    data!: InstanceType<typeof UserImageUpdateWithoutUserInput>;
}

@InputType()
export class UserImageUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserImageNestedInput, {nullable:true})
    User?: InstanceType<typeof UserUpdateOneRequiredWithoutUserImageNestedInput>;
}

@InputType()
export class UserImageUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutUserImageNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutUserImageNestedInput>;
}

@InputType()
export class UserImageUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutUserImageNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutUserImageNestedInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserImageNestedInput, {nullable:true})
    User?: InstanceType<typeof UserUpdateOneRequiredWithoutUserImageNestedInput>;
}

@InputType()
export class UserImageUpsertWithWhereUniqueWithoutFileInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageUpdateWithoutFileInput, {nullable:false})
    @Type(() => UserImageUpdateWithoutFileInput)
    update!: InstanceType<typeof UserImageUpdateWithoutFileInput>;
    @Field(() => UserImageCreateWithoutFileInput, {nullable:false})
    @Type(() => UserImageCreateWithoutFileInput)
    create!: InstanceType<typeof UserImageCreateWithoutFileInput>;
}

@InputType()
export class UserImageUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserImageUpdateWithoutUserInput)
    update!: InstanceType<typeof UserImageUpdateWithoutUserInput>;
    @Field(() => UserImageCreateWithoutUserInput, {nullable:false})
    @Type(() => UserImageCreateWithoutUserInput)
    create!: InstanceType<typeof UserImageCreateWithoutUserInput>;
}

@InputType()
export class UserImageWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [UserImageWhereInput], {nullable:true})
    AND?: Array<UserImageWhereInput>;
    @Field(() => [UserImageWhereInput], {nullable:true})
    OR?: Array<UserImageWhereInput>;
    @Field(() => [UserImageWhereInput], {nullable:true})
    NOT?: Array<UserImageWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    User?: InstanceType<typeof UserScalarRelationFilter>;
}

@InputType()
export class UserImageWhereInput {
    @Field(() => [UserImageWhereInput], {nullable:true})
    AND?: Array<UserImageWhereInput>;
    @Field(() => [UserImageWhereInput], {nullable:true})
    OR?: Array<UserImageWhereInput>;
    @Field(() => [UserImageWhereInput], {nullable:true})
    NOT?: Array<UserImageWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    User?: InstanceType<typeof UserScalarRelationFilter>;
}

@ObjectType()
export class UserImage {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => File, {nullable:false})
    file?: InstanceType<typeof File>;
    @Field(() => User, {nullable:false})
    User?: InstanceType<typeof User>;
}

@ObjectType()
export class AggregateUserPreference {
    @Field(() => UserPreferenceCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserPreferenceCountAggregate>;
    @Field(() => UserPreferenceMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserPreferenceMinAggregate>;
    @Field(() => UserPreferenceMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserPreferenceMaxAggregate>;
}

@ArgsType()
export class CreateManyUserPreferenceArgs {
    @Field(() => [UserPreferenceCreateManyInput], {nullable:false})
    @Type(() => UserPreferenceCreateManyInput)
    data!: Array<UserPreferenceCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneUserPreferenceArgs {
    @Field(() => UserPreferenceCreateInput, {nullable:false})
    @Type(() => UserPreferenceCreateInput)
    data!: InstanceType<typeof UserPreferenceCreateInput>;
}

@ArgsType()
export class DeleteManyUserPreferenceArgs {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneUserPreferenceArgs {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
}

@ArgsType()
export class FindFirstUserPreferenceOrThrowArgs {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserPreferenceOrderByWithRelationInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserPreferenceScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserPreferenceScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstUserPreferenceArgs {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserPreferenceOrderByWithRelationInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserPreferenceScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserPreferenceScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyUserPreferenceArgs {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserPreferenceOrderByWithRelationInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [UserPreferenceScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UserPreferenceScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueUserPreferenceOrThrowArgs {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
}

@ArgsType()
export class FindUniqueUserPreferenceArgs {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
}

@ArgsType()
export class UpdateManyUserPreferenceArgs {
    @Field(() => UserPreferenceUpdateManyMutationInput, {nullable:false})
    @Type(() => UserPreferenceUpdateManyMutationInput)
    data!: InstanceType<typeof UserPreferenceUpdateManyMutationInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneUserPreferenceArgs {
    @Field(() => UserPreferenceUpdateInput, {nullable:false})
    @Type(() => UserPreferenceUpdateInput)
    data!: InstanceType<typeof UserPreferenceUpdateInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
}

@ArgsType()
export class UpsertOneUserPreferenceArgs {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceCreateInput, {nullable:false})
    @Type(() => UserPreferenceCreateInput)
    create!: InstanceType<typeof UserPreferenceCreateInput>;
    @Field(() => UserPreferenceUpdateInput, {nullable:false})
    @Type(() => UserPreferenceUpdateInput)
    update!: InstanceType<typeof UserPreferenceUpdateInput>;
}

@ArgsType()
export class UserPreferenceAggregateArgs {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserPreferenceOrderByWithRelationInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserPreferenceCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserPreferenceCountAggregateInput>;
    @Field(() => UserPreferenceMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserPreferenceMinAggregateInput>;
    @Field(() => UserPreferenceMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserPreferenceMaxAggregateInput>;
}

@InputType()
export class UserPreferenceCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: true;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    language?: true;
    @Field(() => Boolean, {nullable:true})
    theme?: true;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: true;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class UserPreferenceCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    activateLocation!: number;
    @Field(() => Int, {nullable:false})
    activateNotifications!: number;
    @Field(() => Int, {nullable:false})
    activateSmsNotifications!: number;
    @Field(() => Int, {nullable:false})
    activateEmailNotifications!: number;
    @Field(() => Int, {nullable:false})
    language!: number;
    @Field(() => Int, {nullable:false})
    theme!: number;
    @Field(() => Int, {nullable:false})
    cguAccepted!: number;
    @Field(() => Int, {nullable:false})
    privacyPolicyAccepted!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class UserPreferenceCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateLocation?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateSmsNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateEmailNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    language?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    theme?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    cguAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    privacyPolicyAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@ObjectType()
export class UserPreferenceCount {
    @Field(() => Int, {nullable:false})
    preferedvelicles?: number;
}

@InputType()
export class UserPreferenceCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserPreferenceCreateNestedManyWithoutPreferedveliclesInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedveliclesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedveliclesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
}

@InputType()
export class UserPreferenceCreateNestedOneWithoutUserInput {
    @Field(() => UserPreferenceCreateWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateWithoutUserInput)
    create?: InstanceType<typeof UserPreferenceCreateWithoutUserInput>;
    @Field(() => UserPreferenceCreateOrConnectWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutUserInput)
    connectOrCreate?: InstanceType<typeof UserPreferenceCreateOrConnectWithoutUserInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
}

@InputType()
export class UserPreferenceCreateOrConnectWithoutPreferedveliclesInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceCreateWithoutPreferedveliclesInput, {nullable:false})
    @Type(() => UserPreferenceCreateWithoutPreferedveliclesInput)
    create!: InstanceType<typeof UserPreferenceCreateWithoutPreferedveliclesInput>;
}

@InputType()
export class UserPreferenceCreateOrConnectWithoutUserInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceCreateWithoutUserInput, {nullable:false})
    @Type(() => UserPreferenceCreateWithoutUserInput)
    create!: InstanceType<typeof UserPreferenceCreateWithoutUserInput>;
}

@InputType()
export class UserPreferenceCreateWithoutPreferedveliclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutUserPreferenceInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutUserPreferenceInput>;
}

@InputType()
export class UserPreferenceCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleTypeCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeCreateNestedManyWithoutUserPreferenceInput>;
}

@InputType()
export class UserPreferenceCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutUserPreferenceInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutUserPreferenceInput>;
    @Field(() => VehicleTypeCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeCreateNestedManyWithoutUserPreferenceInput>;
}

@ArgsType()
export class UserPreferenceGroupByArgs {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<UserPreferenceOrderByWithAggregationInput>;
    @Field(() => [UserPreferenceScalarFieldEnum], {nullable:false})
    by!: Array<`${UserPreferenceScalarFieldEnum}`>;
    @Field(() => UserPreferenceScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof UserPreferenceScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => UserPreferenceCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserPreferenceCountAggregateInput>;
    @Field(() => UserPreferenceMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserPreferenceMinAggregateInput>;
    @Field(() => UserPreferenceMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserPreferenceMaxAggregateInput>;
}

@ObjectType()
export class UserPreferenceGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Boolean, {nullable:false})
    activateLocation!: boolean;
    @Field(() => Boolean, {nullable:false})
    activateNotifications!: boolean;
    @Field(() => Boolean, {nullable:false})
    activateSmsNotifications!: boolean;
    @Field(() => Boolean, {nullable:false})
    activateEmailNotifications!: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:false})
    cguAccepted!: boolean;
    @Field(() => Boolean, {nullable:false})
    privacyPolicyAccepted!: boolean;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserPreferenceCountAggregate, {nullable:true})
    _count?: InstanceType<typeof UserPreferenceCountAggregate>;
    @Field(() => UserPreferenceMinAggregate, {nullable:true})
    _min?: InstanceType<typeof UserPreferenceMinAggregate>;
    @Field(() => UserPreferenceMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof UserPreferenceMaxAggregate>;
}

@InputType()
export class UserPreferenceListRelationFilter {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    every?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    some?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    none?: InstanceType<typeof UserPreferenceWhereInput>;
}

@InputType()
export class UserPreferenceMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: true;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    language?: true;
    @Field(() => Boolean, {nullable:true})
    theme?: true;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: true;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserPreferenceMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserPreferenceMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateLocation?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateSmsNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateEmailNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    language?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    theme?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    cguAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    privacyPolicyAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserPreferenceMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: true;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: true;
    @Field(() => Boolean, {nullable:true})
    language?: true;
    @Field(() => Boolean, {nullable:true})
    theme?: true;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: true;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class UserPreferenceMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserPreferenceMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateLocation?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateSmsNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateEmailNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    language?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    theme?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    cguAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    privacyPolicyAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class UserPreferenceNullableScalarRelationFilter {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    is?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    isNot?: InstanceType<typeof UserPreferenceWhereInput>;
}

@InputType()
export class UserPreferenceOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class UserPreferenceOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateLocation?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateSmsNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateEmailNotifications?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    language?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    theme?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    cguAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    privacyPolicyAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserPreferenceCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof UserPreferenceCountOrderByAggregateInput>;
    @Field(() => UserPreferenceMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof UserPreferenceMaxOrderByAggregateInput>;
    @Field(() => UserPreferenceMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof UserPreferenceMinOrderByAggregateInput>;
}

@InputType()
export class UserPreferenceOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateLocation?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateSmsNotifications?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    activateEmailNotifications?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    language?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    theme?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    cguAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    privacyPolicyAccepted?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    @Field(() => VehicleTypeOrderByRelationAggregateInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeOrderByRelationAggregateInput>;
}

@InputType()
export class UserPreferenceScalarWhereWithAggregatesInput {
    @Field(() => [UserPreferenceScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UserPreferenceScalarWhereWithAggregatesInput>;
    @Field(() => [UserPreferenceScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UserPreferenceScalarWhereWithAggregatesInput>;
    @Field(() => [UserPreferenceScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UserPreferenceScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    activateLocation?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableWithAggregatesFilter>;
}

@InputType()
export class UserPreferenceScalarWhereInput {
    @Field(() => [UserPreferenceScalarWhereInput], {nullable:true})
    AND?: Array<UserPreferenceScalarWhereInput>;
    @Field(() => [UserPreferenceScalarWhereInput], {nullable:true})
    OR?: Array<UserPreferenceScalarWhereInput>;
    @Field(() => [UserPreferenceScalarWhereInput], {nullable:true})
    NOT?: Array<UserPreferenceScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableFilter>;
    @Field(() => BoolFilter, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class UserPreferenceUncheckedCreateNestedManyWithoutPreferedveliclesInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedveliclesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedveliclesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
}

@InputType()
export class UserPreferenceUncheckedCreateNestedOneWithoutUserInput {
    @Field(() => UserPreferenceCreateWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateWithoutUserInput)
    create?: InstanceType<typeof UserPreferenceCreateWithoutUserInput>;
    @Field(() => UserPreferenceCreateOrConnectWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutUserInput)
    connectOrCreate?: InstanceType<typeof UserPreferenceCreateOrConnectWithoutUserInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
}

@InputType()
export class UserPreferenceUncheckedCreateWithoutPreferedveliclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserPreferenceUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput>;
}

@InputType()
export class UserPreferenceUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateSmsNotifications?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateEmailNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Boolean, {nullable:true})
    cguAccepted?: boolean;
    @Field(() => Boolean, {nullable:true})
    privacyPolicyAccepted?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateManyWithoutPreferedveliclesNestedInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedveliclesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedveliclesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput)
    upsert?: Array<UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput)
    update?: Array<UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput)
    updateMany?: Array<UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceScalarWhereInput], {nullable:true})
    @Type(() => UserPreferenceScalarWhereInput)
    deleteMany?: Array<UserPreferenceScalarWhereInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateManyWithoutPreferedveliclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateOneWithoutUserNestedInput {
    @Field(() => UserPreferenceCreateWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateWithoutUserInput)
    create?: InstanceType<typeof UserPreferenceCreateWithoutUserInput>;
    @Field(() => UserPreferenceCreateOrConnectWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutUserInput)
    connectOrCreate?: InstanceType<typeof UserPreferenceCreateOrConnectWithoutUserInput>;
    @Field(() => UserPreferenceUpsertWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceUpsertWithoutUserInput)
    upsert?: InstanceType<typeof UserPreferenceUpsertWithoutUserInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    disconnect?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    delete?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceUpdateToOneWithWhereWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceUpdateToOneWithWhereWithoutUserInput)
    update?: InstanceType<typeof UserPreferenceUpdateToOneWithWhereWithoutUserInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateWithoutPreferedveliclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput {
    @Field(() => UserPreferenceScalarWhereInput, {nullable:false})
    @Type(() => UserPreferenceScalarWhereInput)
    where!: InstanceType<typeof UserPreferenceScalarWhereInput>;
    @Field(() => UserPreferenceUpdateManyMutationInput, {nullable:false})
    @Type(() => UserPreferenceUpdateManyMutationInput)
    data!: InstanceType<typeof UserPreferenceUpdateManyMutationInput>;
}

@InputType()
export class UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedveliclesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedveliclesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput)
    upsert?: Array<UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceWhereUniqueInput], {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>>;
    @Field(() => [UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput)
    update?: Array<UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput)
    updateMany?: Array<UserPreferenceUpdateManyWithWhereWithoutPreferedveliclesInput>;
    @Field(() => [UserPreferenceScalarWhereInput], {nullable:true})
    @Type(() => UserPreferenceScalarWhereInput)
    deleteMany?: Array<UserPreferenceScalarWhereInput>;
}

@InputType()
export class UserPreferenceUpdateOneWithoutUserNestedInput {
    @Field(() => UserPreferenceCreateWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateWithoutUserInput)
    create?: InstanceType<typeof UserPreferenceCreateWithoutUserInput>;
    @Field(() => UserPreferenceCreateOrConnectWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutUserInput)
    connectOrCreate?: InstanceType<typeof UserPreferenceCreateOrConnectWithoutUserInput>;
    @Field(() => UserPreferenceUpsertWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceUpsertWithoutUserInput)
    upsert?: InstanceType<typeof UserPreferenceUpsertWithoutUserInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    disconnect?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    delete?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:true})
    @Type(() => UserPreferenceWhereUniqueInput)
    connect?: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceUpdateToOneWithWhereWithoutUserInput, {nullable:true})
    @Type(() => UserPreferenceUpdateToOneWithWhereWithoutUserInput)
    update?: InstanceType<typeof UserPreferenceUpdateToOneWithWhereWithoutUserInput>;
}

@InputType()
export class UserPreferenceUpdateToOneWithWhereWithoutUserInput {
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
    @Field(() => UserPreferenceUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserPreferenceUpdateWithoutUserInput)
    data!: InstanceType<typeof UserPreferenceUpdateWithoutUserInput>;
}

@InputType()
export class UserPreferenceUpdateWithWhereUniqueWithoutPreferedveliclesInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceUpdateWithoutPreferedveliclesInput, {nullable:false})
    @Type(() => UserPreferenceUpdateWithoutPreferedveliclesInput)
    data!: InstanceType<typeof UserPreferenceUpdateWithoutPreferedveliclesInput>;
}

@InputType()
export class UserPreferenceUpdateWithoutPreferedveliclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserPreferenceNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserPreferenceNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutUserPreferenceNestedInput>;
    @Field(() => VehicleTypeUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpsertWithWhereUniqueWithoutPreferedveliclesInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceUpdateWithoutPreferedveliclesInput, {nullable:false})
    @Type(() => UserPreferenceUpdateWithoutPreferedveliclesInput)
    update!: InstanceType<typeof UserPreferenceUpdateWithoutPreferedveliclesInput>;
    @Field(() => UserPreferenceCreateWithoutPreferedveliclesInput, {nullable:false})
    @Type(() => UserPreferenceCreateWithoutPreferedveliclesInput)
    create!: InstanceType<typeof UserPreferenceCreateWithoutPreferedveliclesInput>;
}

@InputType()
export class UserPreferenceUpsertWithoutUserInput {
    @Field(() => UserPreferenceUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserPreferenceUpdateWithoutUserInput)
    update!: InstanceType<typeof UserPreferenceUpdateWithoutUserInput>;
    @Field(() => UserPreferenceCreateWithoutUserInput, {nullable:false})
    @Type(() => UserPreferenceCreateWithoutUserInput)
    create!: InstanceType<typeof UserPreferenceCreateWithoutUserInput>;
    @Field(() => UserPreferenceWhereInput, {nullable:true})
    @Type(() => UserPreferenceWhereInput)
    where?: InstanceType<typeof UserPreferenceWhereInput>;
}

@InputType()
export class UserPreferenceWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => [UserPreferenceWhereInput], {nullable:true})
    AND?: Array<UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceWhereInput], {nullable:true})
    OR?: Array<UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceWhereInput], {nullable:true})
    NOT?: Array<UserPreferenceWhereInput>;
    @Field(() => BoolFilter, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableFilter>;
    @Field(() => BoolFilter, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => VehicleTypeListRelationFilter, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeListRelationFilter>;
}

@InputType()
export class UserPreferenceWhereInput {
    @Field(() => [UserPreferenceWhereInput], {nullable:true})
    AND?: Array<UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceWhereInput], {nullable:true})
    OR?: Array<UserPreferenceWhereInput>;
    @Field(() => [UserPreferenceWhereInput], {nullable:true})
    NOT?: Array<UserPreferenceWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateSmsNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    activateEmailNotifications?: InstanceType<typeof BoolFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableFilter>;
    @Field(() => BoolFilter, {nullable:true})
    cguAccepted?: InstanceType<typeof BoolFilter>;
    @Field(() => BoolFilter, {nullable:true})
    privacyPolicyAccepted?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => VehicleTypeListRelationFilter, {nullable:true})
    preferedvelicles?: InstanceType<typeof VehicleTypeListRelationFilter>;
}

@ObjectType()
export class UserPreference {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    activateLocation!: boolean;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    activateNotifications!: boolean;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    activateSmsNotifications!: boolean;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    activateEmailNotifications!: boolean;
    @Field(() => String, {defaultValue:'fr',nullable:true})
    language!: string | null;
    @Field(() => String, {defaultValue:'light',nullable:true})
    theme!: string | null;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    cguAccepted!: boolean;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    privacyPolicyAccepted!: boolean;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
    @Field(() => [VehicleType], {nullable:true})
    preferedvelicles?: Array<VehicleType>;
    @Field(() => UserPreferenceCount, {nullable:false})
    _count?: InstanceType<typeof UserPreferenceCount>;
}

@ObjectType()
export class AggregateVehicleDocument {
    @Field(() => VehicleDocumentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof VehicleDocumentCountAggregate>;
    @Field(() => VehicleDocumentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof VehicleDocumentMinAggregate>;
    @Field(() => VehicleDocumentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof VehicleDocumentMaxAggregate>;
}

@ArgsType()
export class CreateManyVehicleDocumentArgs {
    @Field(() => [VehicleDocumentCreateManyInput], {nullable:false})
    @Type(() => VehicleDocumentCreateManyInput)
    data!: Array<VehicleDocumentCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneVehicleDocumentArgs {
    @Field(() => VehicleDocumentCreateInput, {nullable:false})
    @Type(() => VehicleDocumentCreateInput)
    data!: InstanceType<typeof VehicleDocumentCreateInput>;
}

@ArgsType()
export class DeleteManyVehicleDocumentArgs {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneVehicleDocumentArgs {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstVehicleDocumentOrThrowArgs {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleDocumentOrderByWithRelationInput>;
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleDocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleDocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstVehicleDocumentArgs {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleDocumentOrderByWithRelationInput>;
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleDocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleDocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyVehicleDocumentArgs {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleDocumentOrderByWithRelationInput>;
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleDocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleDocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueVehicleDocumentOrThrowArgs {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueVehicleDocumentArgs {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyVehicleDocumentArgs {
    @Field(() => VehicleDocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleDocumentUpdateManyMutationInput>;
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneVehicleDocumentArgs {
    @Field(() => VehicleDocumentUpdateInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateInput)
    data!: InstanceType<typeof VehicleDocumentUpdateInput>;
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneVehicleDocumentArgs {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentCreateInput, {nullable:false})
    @Type(() => VehicleDocumentCreateInput)
    create!: InstanceType<typeof VehicleDocumentCreateInput>;
    @Field(() => VehicleDocumentUpdateInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateInput)
    update!: InstanceType<typeof VehicleDocumentUpdateInput>;
}

@ArgsType()
export class VehicleDocumentAggregateArgs {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleDocumentOrderByWithRelationInput>;
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => VehicleDocumentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleDocumentCountAggregateInput>;
    @Field(() => VehicleDocumentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleDocumentMinAggregateInput>;
    @Field(() => VehicleDocumentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleDocumentMaxAggregateInput>;
}

@InputType()
export class VehicleDocumentCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class VehicleDocumentCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    driverVehicleId!: number;
    @Field(() => Int, {nullable:false})
    fileId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class VehicleDocumentCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class VehicleDocumentCreateManyDriverVehicleInputEnvelope {
    @Field(() => [VehicleDocumentCreateManyDriverVehicleInput], {nullable:false})
    @Type(() => VehicleDocumentCreateManyDriverVehicleInput)
    data!: Array<VehicleDocumentCreateManyDriverVehicleInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class VehicleDocumentCreateManyDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentCreateManyFileInputEnvelope {
    @Field(() => [VehicleDocumentCreateManyFileInput], {nullable:false})
    @Type(() => VehicleDocumentCreateManyFileInput)
    data!: Array<VehicleDocumentCreateManyFileInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class VehicleDocumentCreateManyFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [VehicleDocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutDriverVehicleInput)
    create?: Array<VehicleDocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleDocumentCreateNestedManyWithoutFileInput {
    @Field(() => [VehicleDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutFileInput)
    create?: Array<VehicleDocumentCreateWithoutFileInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => VehicleDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyFileInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleDocumentCreateOrConnectWithoutDriverVehicleInput {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleDocumentCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof VehicleDocumentCreateWithoutDriverVehicleInput>;
}

@InputType()
export class VehicleDocumentCreateOrConnectWithoutFileInput {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentCreateWithoutFileInput, {nullable:false})
    @Type(() => VehicleDocumentCreateWithoutFileInput)
    create!: InstanceType<typeof VehicleDocumentCreateWithoutFileInput>;
}

@InputType()
export class VehicleDocumentCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutVehicleDocumentInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutVehicleDocumentInput>;
}

@InputType()
export class VehicleDocumentCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => DriverVehicleCreateNestedOneWithoutVehicleDocumentInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutVehicleDocumentInput>;
}

@InputType()
export class VehicleDocumentCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutVehicleDocumentInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutVehicleDocumentInput>;
    @Field(() => DriverVehicleCreateNestedOneWithoutVehicleDocumentInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutVehicleDocumentInput>;
}

@ArgsType()
export class VehicleDocumentGroupByArgs {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    @Type(() => VehicleDocumentWhereInput)
    where?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<VehicleDocumentOrderByWithAggregationInput>;
    @Field(() => [VehicleDocumentScalarFieldEnum], {nullable:false})
    by!: Array<`${VehicleDocumentScalarFieldEnum}`>;
    @Field(() => VehicleDocumentScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof VehicleDocumentScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => VehicleDocumentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleDocumentCountAggregateInput>;
    @Field(() => VehicleDocumentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleDocumentMinAggregateInput>;
    @Field(() => VehicleDocumentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleDocumentMaxAggregateInput>;
}

@ObjectType()
export class VehicleDocumentGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleDocumentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof VehicleDocumentCountAggregate>;
    @Field(() => VehicleDocumentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof VehicleDocumentMinAggregate>;
    @Field(() => VehicleDocumentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof VehicleDocumentMaxAggregate>;
}

@InputType()
export class VehicleDocumentListRelationFilter {
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    every?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    some?: InstanceType<typeof VehicleDocumentWhereInput>;
    @Field(() => VehicleDocumentWhereInput, {nullable:true})
    none?: InstanceType<typeof VehicleDocumentWhereInput>;
}

@InputType()
export class VehicleDocumentMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class VehicleDocumentMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class VehicleDocumentMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class VehicleDocumentMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class VehicleDocumentOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class VehicleDocumentOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => VehicleDocumentCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleDocumentCountOrderByAggregateInput>;
    @Field(() => VehicleDocumentMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleDocumentMaxOrderByAggregateInput>;
    @Field(() => VehicleDocumentMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleDocumentMinOrderByAggregateInput>;
}

@InputType()
export class VehicleDocumentOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => FileOrderByWithRelationInput, {nullable:true})
    file?: InstanceType<typeof FileOrderByWithRelationInput>;
    @Field(() => DriverVehicleOrderByWithRelationInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleOrderByWithRelationInput>;
}

@InputType()
export class VehicleDocumentScalarWhereWithAggregatesInput {
    @Field(() => [VehicleDocumentScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<VehicleDocumentScalarWhereWithAggregatesInput>;
    @Field(() => [VehicleDocumentScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<VehicleDocumentScalarWhereWithAggregatesInput>;
    @Field(() => [VehicleDocumentScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<VehicleDocumentScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    fileId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableWithAggregatesFilter>;
}

@InputType()
export class VehicleDocumentScalarWhereInput {
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    AND?: Array<VehicleDocumentScalarWhereInput>;
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    OR?: Array<VehicleDocumentScalarWhereInput>;
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    NOT?: Array<VehicleDocumentScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class VehicleDocumentUncheckedCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [VehicleDocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutDriverVehicleInput)
    create?: Array<VehicleDocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleDocumentUncheckedCreateNestedManyWithoutFileInput {
    @Field(() => [VehicleDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutFileInput)
    create?: Array<VehicleDocumentCreateWithoutFileInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => VehicleDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyFileInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleDocumentUncheckedCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentUncheckedCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [VehicleDocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutDriverVehicleInput)
    create?: Array<VehicleDocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    @Type(() => VehicleDocumentScalarWhereInput)
    deleteMany?: Array<VehicleDocumentScalarWhereInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateManyWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateManyWithoutFileNestedInput {
    @Field(() => [VehicleDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutFileInput)
    create?: Array<VehicleDocumentCreateWithoutFileInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => [VehicleDocumentUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<VehicleDocumentUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => VehicleDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyFileInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<VehicleDocumentUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [VehicleDocumentUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<VehicleDocumentUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    @Type(() => VehicleDocumentScalarWhereInput)
    deleteMany?: Array<VehicleDocumentScalarWhereInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateManyWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput {
    @Field(() => VehicleDocumentScalarWhereInput, {nullable:false})
    @Type(() => VehicleDocumentScalarWhereInput)
    where!: InstanceType<typeof VehicleDocumentScalarWhereInput>;
    @Field(() => VehicleDocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleDocumentUpdateManyMutationInput>;
}

@InputType()
export class VehicleDocumentUpdateManyWithWhereWithoutFileInput {
    @Field(() => VehicleDocumentScalarWhereInput, {nullable:false})
    @Type(() => VehicleDocumentScalarWhereInput)
    where!: InstanceType<typeof VehicleDocumentScalarWhereInput>;
    @Field(() => VehicleDocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleDocumentUpdateManyMutationInput>;
}

@InputType()
export class VehicleDocumentUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [VehicleDocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutDriverVehicleInput)
    create?: Array<VehicleDocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<VehicleDocumentUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    @Type(() => VehicleDocumentScalarWhereInput)
    deleteMany?: Array<VehicleDocumentScalarWhereInput>;
}

@InputType()
export class VehicleDocumentUpdateManyWithoutFileNestedInput {
    @Field(() => [VehicleDocumentCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateWithoutFileInput)
    create?: Array<VehicleDocumentCreateWithoutFileInput>;
    @Field(() => [VehicleDocumentCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleDocumentCreateOrConnectWithoutFileInput>;
    @Field(() => [VehicleDocumentUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<VehicleDocumentUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => VehicleDocumentCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleDocumentCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleDocumentCreateManyFileInputEnvelope>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentWhereUniqueInput], {nullable:true})
    @Type(() => VehicleDocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleDocumentUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<VehicleDocumentUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [VehicleDocumentUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => VehicleDocumentUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<VehicleDocumentUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [VehicleDocumentScalarWhereInput], {nullable:true})
    @Type(() => VehicleDocumentScalarWhereInput)
    deleteMany?: Array<VehicleDocumentScalarWhereInput>;
}

@InputType()
export class VehicleDocumentUpdateWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateWithoutDriverVehicleInput)
    data!: InstanceType<typeof VehicleDocumentUpdateWithoutDriverVehicleInput>;
}

@InputType()
export class VehicleDocumentUpdateWithWhereUniqueWithoutFileInput {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentUpdateWithoutFileInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateWithoutFileInput)
    data!: InstanceType<typeof VehicleDocumentUpdateWithoutFileInput>;
}

@InputType()
export class VehicleDocumentUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutVehicleDocumentNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutVehicleDocumentNestedInput>;
}

@InputType()
export class VehicleDocumentUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput>;
}

@InputType()
export class VehicleDocumentUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutVehicleDocumentNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutVehicleDocumentNestedInput>;
    @Field(() => DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutVehicleDocumentNestedInput>;
}

@InputType()
export class VehicleDocumentUpsertWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateWithoutDriverVehicleInput)
    update!: InstanceType<typeof VehicleDocumentUpdateWithoutDriverVehicleInput>;
    @Field(() => VehicleDocumentCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleDocumentCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof VehicleDocumentCreateWithoutDriverVehicleInput>;
}

@InputType()
export class VehicleDocumentUpsertWithWhereUniqueWithoutFileInput {
    @Field(() => VehicleDocumentWhereUniqueInput, {nullable:false})
    @Type(() => VehicleDocumentWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleDocumentWhereUniqueInput, 'id'>;
    @Field(() => VehicleDocumentUpdateWithoutFileInput, {nullable:false})
    @Type(() => VehicleDocumentUpdateWithoutFileInput)
    update!: InstanceType<typeof VehicleDocumentUpdateWithoutFileInput>;
    @Field(() => VehicleDocumentCreateWithoutFileInput, {nullable:false})
    @Type(() => VehicleDocumentCreateWithoutFileInput)
    create!: InstanceType<typeof VehicleDocumentCreateWithoutFileInput>;
}

@InputType()
export class VehicleDocumentWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [VehicleDocumentWhereInput], {nullable:true})
    AND?: Array<VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentWhereInput], {nullable:true})
    OR?: Array<VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentWhereInput], {nullable:true})
    NOT?: Array<VehicleDocumentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@InputType()
export class VehicleDocumentWhereInput {
    @Field(() => [VehicleDocumentWhereInput], {nullable:true})
    AND?: Array<VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentWhereInput], {nullable:true})
    OR?: Array<VehicleDocumentWhereInput>;
    @Field(() => [VehicleDocumentWhereInput], {nullable:true})
    NOT?: Array<VehicleDocumentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@ObjectType()
export class VehicleDocument {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => File, {nullable:false})
    file?: InstanceType<typeof File>;
    @Field(() => DriverVehicle, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicle> | null;
}

@ObjectType()
export class AggregateVehicleImage {
    @Field(() => VehicleImageCountAggregate, {nullable:true})
    _count?: InstanceType<typeof VehicleImageCountAggregate>;
    @Field(() => VehicleImageMinAggregate, {nullable:true})
    _min?: InstanceType<typeof VehicleImageMinAggregate>;
    @Field(() => VehicleImageMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof VehicleImageMaxAggregate>;
}

@ArgsType()
export class CreateManyVehicleImageArgs {
    @Field(() => [VehicleImageCreateManyInput], {nullable:false})
    @Type(() => VehicleImageCreateManyInput)
    data!: Array<VehicleImageCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneVehicleImageArgs {
    @Field(() => VehicleImageCreateInput, {nullable:false})
    @Type(() => VehicleImageCreateInput)
    data!: InstanceType<typeof VehicleImageCreateInput>;
}

@ArgsType()
export class DeleteManyVehicleImageArgs {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneVehicleImageArgs {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstVehicleImageOrThrowArgs {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => [VehicleImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleImageOrderByWithRelationInput>;
    @Field(() => VehicleImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstVehicleImageArgs {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => [VehicleImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleImageOrderByWithRelationInput>;
    @Field(() => VehicleImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyVehicleImageArgs {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => [VehicleImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleImageOrderByWithRelationInput>;
    @Field(() => VehicleImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueVehicleImageOrThrowArgs {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueVehicleImageArgs {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyVehicleImageArgs {
    @Field(() => VehicleImageUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleImageUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleImageUpdateManyMutationInput>;
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneVehicleImageArgs {
    @Field(() => VehicleImageUpdateInput, {nullable:false})
    @Type(() => VehicleImageUpdateInput)
    data!: InstanceType<typeof VehicleImageUpdateInput>;
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneVehicleImageArgs {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageCreateInput, {nullable:false})
    @Type(() => VehicleImageCreateInput)
    create!: InstanceType<typeof VehicleImageCreateInput>;
    @Field(() => VehicleImageUpdateInput, {nullable:false})
    @Type(() => VehicleImageUpdateInput)
    update!: InstanceType<typeof VehicleImageUpdateInput>;
}

@ArgsType()
export class VehicleImageAggregateArgs {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => [VehicleImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleImageOrderByWithRelationInput>;
    @Field(() => VehicleImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => VehicleImageCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleImageCountAggregateInput>;
    @Field(() => VehicleImageMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleImageMinAggregateInput>;
    @Field(() => VehicleImageMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleImageMaxAggregateInput>;
}

@InputType()
export class VehicleImageCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class VehicleImageCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    driverVehicleId!: number;
    @Field(() => Int, {nullable:false})
    fileId!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    updatedAt!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class VehicleImageCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class VehicleImageCreateManyDriverVehicleInputEnvelope {
    @Field(() => [VehicleImageCreateManyDriverVehicleInput], {nullable:false})
    @Type(() => VehicleImageCreateManyDriverVehicleInput)
    data!: Array<VehicleImageCreateManyDriverVehicleInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class VehicleImageCreateManyDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageCreateManyFileInputEnvelope {
    @Field(() => [VehicleImageCreateManyFileInput], {nullable:false})
    @Type(() => VehicleImageCreateManyFileInput)
    data!: Array<VehicleImageCreateManyFileInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class VehicleImageCreateManyFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [VehicleImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutDriverVehicleInput)
    create?: Array<VehicleImageCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => VehicleImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleImageCreateNestedManyWithoutFileInput {
    @Field(() => [VehicleImageCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutFileInput)
    create?: Array<VehicleImageCreateWithoutFileInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutFileInput>;
    @Field(() => VehicleImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyFileInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleImageCreateOrConnectWithoutDriverVehicleInput {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleImageCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof VehicleImageCreateWithoutDriverVehicleInput>;
}

@InputType()
export class VehicleImageCreateOrConnectWithoutFileInput {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageCreateWithoutFileInput, {nullable:false})
    @Type(() => VehicleImageCreateWithoutFileInput)
    create!: InstanceType<typeof VehicleImageCreateWithoutFileInput>;
}

@InputType()
export class VehicleImageCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutVehicleImageInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutVehicleImageInput>;
}

@InputType()
export class VehicleImageCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => DriverVehicleCreateNestedOneWithoutVehicleImageInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutVehicleImageInput>;
}

@InputType()
export class VehicleImageCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => FileCreateNestedOneWithoutVehicleImageInput, {nullable:false})
    file!: InstanceType<typeof FileCreateNestedOneWithoutVehicleImageInput>;
    @Field(() => DriverVehicleCreateNestedOneWithoutVehicleImageInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutVehicleImageInput>;
}

@ArgsType()
export class VehicleImageGroupByArgs {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    @Type(() => VehicleImageWhereInput)
    where?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => [VehicleImageOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<VehicleImageOrderByWithAggregationInput>;
    @Field(() => [VehicleImageScalarFieldEnum], {nullable:false})
    by!: Array<`${VehicleImageScalarFieldEnum}`>;
    @Field(() => VehicleImageScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof VehicleImageScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => VehicleImageCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleImageCountAggregateInput>;
    @Field(() => VehicleImageMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleImageMinAggregateInput>;
    @Field(() => VehicleImageMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleImageMaxAggregateInput>;
}

@ObjectType()
export class VehicleImageGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleImageCountAggregate, {nullable:true})
    _count?: InstanceType<typeof VehicleImageCountAggregate>;
    @Field(() => VehicleImageMinAggregate, {nullable:true})
    _min?: InstanceType<typeof VehicleImageMinAggregate>;
    @Field(() => VehicleImageMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof VehicleImageMaxAggregate>;
}

@InputType()
export class VehicleImageListRelationFilter {
    @Field(() => VehicleImageWhereInput, {nullable:true})
    every?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => VehicleImageWhereInput, {nullable:true})
    some?: InstanceType<typeof VehicleImageWhereInput>;
    @Field(() => VehicleImageWhereInput, {nullable:true})
    none?: InstanceType<typeof VehicleImageWhereInput>;
}

@InputType()
export class VehicleImageMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class VehicleImageMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class VehicleImageMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    fileId?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    updatedAt?: true;
}

@ObjectType()
export class VehicleImageMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => String, {nullable:true})
    fileId?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@InputType()
export class VehicleImageOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class VehicleImageOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => VehicleImageCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleImageCountOrderByAggregateInput>;
    @Field(() => VehicleImageMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleImageMaxOrderByAggregateInput>;
    @Field(() => VehicleImageMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleImageMinOrderByAggregateInput>;
}

@InputType()
export class VehicleImageOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    fileId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => FileOrderByWithRelationInput, {nullable:true})
    file?: InstanceType<typeof FileOrderByWithRelationInput>;
    @Field(() => DriverVehicleOrderByWithRelationInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleOrderByWithRelationInput>;
}

@InputType()
export class VehicleImageScalarWhereWithAggregatesInput {
    @Field(() => [VehicleImageScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<VehicleImageScalarWhereWithAggregatesInput>;
    @Field(() => [VehicleImageScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<VehicleImageScalarWhereWithAggregatesInput>;
    @Field(() => [VehicleImageScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<VehicleImageScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    fileId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeNullableWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableWithAggregatesFilter>;
}

@InputType()
export class VehicleImageScalarWhereInput {
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    AND?: Array<VehicleImageScalarWhereInput>;
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    OR?: Array<VehicleImageScalarWhereInput>;
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    NOT?: Array<VehicleImageScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class VehicleImageUncheckedCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [VehicleImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutDriverVehicleInput)
    create?: Array<VehicleImageCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => VehicleImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleImageUncheckedCreateNestedManyWithoutFileInput {
    @Field(() => [VehicleImageCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutFileInput)
    create?: Array<VehicleImageCreateWithoutFileInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutFileInput>;
    @Field(() => VehicleImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyFileInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class VehicleImageUncheckedCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageUncheckedCreateWithoutFileInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class VehicleImageUncheckedUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [VehicleImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutDriverVehicleInput)
    create?: Array<VehicleImageCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => VehicleImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    @Type(() => VehicleImageScalarWhereInput)
    deleteMany?: Array<VehicleImageScalarWhereInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateManyWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateManyWithoutFileNestedInput {
    @Field(() => [VehicleImageCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutFileInput)
    create?: Array<VehicleImageCreateWithoutFileInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutFileInput>;
    @Field(() => [VehicleImageUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<VehicleImageUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => VehicleImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyFileInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<VehicleImageUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [VehicleImageUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<VehicleImageUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    @Type(() => VehicleImageScalarWhereInput)
    deleteMany?: Array<VehicleImageScalarWhereInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateManyWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    fileId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput {
    @Field(() => VehicleImageScalarWhereInput, {nullable:false})
    @Type(() => VehicleImageScalarWhereInput)
    where!: InstanceType<typeof VehicleImageScalarWhereInput>;
    @Field(() => VehicleImageUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleImageUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleImageUpdateManyMutationInput>;
}

@InputType()
export class VehicleImageUpdateManyWithWhereWithoutFileInput {
    @Field(() => VehicleImageScalarWhereInput, {nullable:false})
    @Type(() => VehicleImageScalarWhereInput)
    where!: InstanceType<typeof VehicleImageScalarWhereInput>;
    @Field(() => VehicleImageUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleImageUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleImageUpdateManyMutationInput>;
}

@InputType()
export class VehicleImageUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [VehicleImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutDriverVehicleInput)
    create?: Array<VehicleImageCreateWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => VehicleImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<VehicleImageUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    @Type(() => VehicleImageScalarWhereInput)
    deleteMany?: Array<VehicleImageScalarWhereInput>;
}

@InputType()
export class VehicleImageUpdateManyWithoutFileNestedInput {
    @Field(() => [VehicleImageCreateWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateWithoutFileInput)
    create?: Array<VehicleImageCreateWithoutFileInput>;
    @Field(() => [VehicleImageCreateOrConnectWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageCreateOrConnectWithoutFileInput)
    connectOrCreate?: Array<VehicleImageCreateOrConnectWithoutFileInput>;
    @Field(() => [VehicleImageUpsertWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageUpsertWithWhereUniqueWithoutFileInput)
    upsert?: Array<VehicleImageUpsertWithWhereUniqueWithoutFileInput>;
    @Field(() => VehicleImageCreateManyFileInputEnvelope, {nullable:true})
    @Type(() => VehicleImageCreateManyFileInputEnvelope)
    createMany?: InstanceType<typeof VehicleImageCreateManyFileInputEnvelope>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageWhereUniqueInput], {nullable:true})
    @Type(() => VehicleImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>>;
    @Field(() => [VehicleImageUpdateWithWhereUniqueWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageUpdateWithWhereUniqueWithoutFileInput)
    update?: Array<VehicleImageUpdateWithWhereUniqueWithoutFileInput>;
    @Field(() => [VehicleImageUpdateManyWithWhereWithoutFileInput], {nullable:true})
    @Type(() => VehicleImageUpdateManyWithWhereWithoutFileInput)
    updateMany?: Array<VehicleImageUpdateManyWithWhereWithoutFileInput>;
    @Field(() => [VehicleImageScalarWhereInput], {nullable:true})
    @Type(() => VehicleImageScalarWhereInput)
    deleteMany?: Array<VehicleImageScalarWhereInput>;
}

@InputType()
export class VehicleImageUpdateWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleImageUpdateWithoutDriverVehicleInput)
    data!: InstanceType<typeof VehicleImageUpdateWithoutDriverVehicleInput>;
}

@InputType()
export class VehicleImageUpdateWithWhereUniqueWithoutFileInput {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageUpdateWithoutFileInput, {nullable:false})
    @Type(() => VehicleImageUpdateWithoutFileInput)
    data!: InstanceType<typeof VehicleImageUpdateWithoutFileInput>;
}

@InputType()
export class VehicleImageUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutVehicleImageNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutVehicleImageNestedInput>;
}

@InputType()
export class VehicleImageUpdateWithoutFileInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateOneWithoutVehicleImageNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutVehicleImageNestedInput>;
}

@InputType()
export class VehicleImageUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => FileUpdateOneRequiredWithoutVehicleImageNestedInput, {nullable:true})
    file?: InstanceType<typeof FileUpdateOneRequiredWithoutVehicleImageNestedInput>;
    @Field(() => DriverVehicleUpdateOneWithoutVehicleImageNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutVehicleImageNestedInput>;
}

@InputType()
export class VehicleImageUpsertWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleImageUpdateWithoutDriverVehicleInput)
    update!: InstanceType<typeof VehicleImageUpdateWithoutDriverVehicleInput>;
    @Field(() => VehicleImageCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => VehicleImageCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof VehicleImageCreateWithoutDriverVehicleInput>;
}

@InputType()
export class VehicleImageUpsertWithWhereUniqueWithoutFileInput {
    @Field(() => VehicleImageWhereUniqueInput, {nullable:false})
    @Type(() => VehicleImageWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleImageWhereUniqueInput, 'id'>;
    @Field(() => VehicleImageUpdateWithoutFileInput, {nullable:false})
    @Type(() => VehicleImageUpdateWithoutFileInput)
    update!: InstanceType<typeof VehicleImageUpdateWithoutFileInput>;
    @Field(() => VehicleImageCreateWithoutFileInput, {nullable:false})
    @Type(() => VehicleImageCreateWithoutFileInput)
    create!: InstanceType<typeof VehicleImageCreateWithoutFileInput>;
}

@InputType()
export class VehicleImageWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [VehicleImageWhereInput], {nullable:true})
    AND?: Array<VehicleImageWhereInput>;
    @Field(() => [VehicleImageWhereInput], {nullable:true})
    OR?: Array<VehicleImageWhereInput>;
    @Field(() => [VehicleImageWhereInput], {nullable:true})
    NOT?: Array<VehicleImageWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@InputType()
export class VehicleImageWhereInput {
    @Field(() => [VehicleImageWhereInput], {nullable:true})
    AND?: Array<VehicleImageWhereInput>;
    @Field(() => [VehicleImageWhereInput], {nullable:true})
    OR?: Array<VehicleImageWhereInput>;
    @Field(() => [VehicleImageWhereInput], {nullable:true})
    NOT?: Array<VehicleImageWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    fileId?: InstanceType<typeof StringFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => FileScalarRelationFilter, {nullable:true})
    file?: InstanceType<typeof FileScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@ObjectType()
export class VehicleImage {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    driverVehicleId!: string;
    @Field(() => String, {nullable:false})
    fileId!: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => File, {nullable:false})
    file?: InstanceType<typeof File>;
    @Field(() => DriverVehicle, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicle> | null;
}

@ObjectType()
export class AggregateVehicleType {
    @Field(() => VehicleTypeCountAggregate, {nullable:true})
    _count?: InstanceType<typeof VehicleTypeCountAggregate>;
    @Field(() => VehicleTypeMinAggregate, {nullable:true})
    _min?: InstanceType<typeof VehicleTypeMinAggregate>;
    @Field(() => VehicleTypeMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof VehicleTypeMaxAggregate>;
}

@ArgsType()
export class CreateManyVehicleTypeArgs {
    @Field(() => [VehicleTypeCreateManyInput], {nullable:false})
    @Type(() => VehicleTypeCreateManyInput)
    data!: Array<VehicleTypeCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneVehicleTypeArgs {
    @Field(() => VehicleTypeCreateInput, {nullable:false})
    @Type(() => VehicleTypeCreateInput)
    data!: InstanceType<typeof VehicleTypeCreateInput>;
}

@ArgsType()
export class DeleteManyVehicleTypeArgs {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneVehicleTypeArgs {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class FindFirstVehicleTypeOrThrowArgs {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleTypeOrderByWithRelationInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleTypeScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleTypeScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstVehicleTypeArgs {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleTypeOrderByWithRelationInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleTypeScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleTypeScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyVehicleTypeArgs {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleTypeOrderByWithRelationInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [VehicleTypeScalarFieldEnum], {nullable:true})
    distinct?: Array<`${VehicleTypeScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueVehicleTypeOrThrowArgs {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class FindUniqueVehicleTypeArgs {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class UpdateManyVehicleTypeArgs {
    @Field(() => VehicleTypeUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleTypeUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleTypeUpdateManyMutationInput>;
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneVehicleTypeArgs {
    @Field(() => VehicleTypeUpdateInput, {nullable:false})
    @Type(() => VehicleTypeUpdateInput)
    data!: InstanceType<typeof VehicleTypeUpdateInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
}

@ArgsType()
export class UpsertOneVehicleTypeArgs {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeCreateInput, {nullable:false})
    @Type(() => VehicleTypeCreateInput)
    create!: InstanceType<typeof VehicleTypeCreateInput>;
    @Field(() => VehicleTypeUpdateInput, {nullable:false})
    @Type(() => VehicleTypeUpdateInput)
    update!: InstanceType<typeof VehicleTypeUpdateInput>;
}

@ArgsType()
export class VehicleTypeAggregateArgs {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<VehicleTypeOrderByWithRelationInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => VehicleTypeCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleTypeCountAggregateInput>;
    @Field(() => VehicleTypeMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleTypeMinAggregateInput>;
    @Field(() => VehicleTypeMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleTypeMaxAggregateInput>;
}

@InputType()
export class VehicleTypeCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class VehicleTypeCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    name!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class VehicleTypeCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@ObjectType()
export class VehicleTypeCount {
    @Field(() => Int, {nullable:false})
    vehicles?: number;
    @Field(() => Int, {nullable:false})
    UserPreference?: number;
}

@InputType()
export class VehicleTypeCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class VehicleTypeCreateNestedManyWithoutUserPreferenceInput {
    @Field(() => [VehicleTypeCreateWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateWithoutUserPreferenceInput)
    create?: Array<VehicleTypeCreateWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeCreateOrConnectWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateOrConnectWithoutUserPreferenceInput)
    connectOrCreate?: Array<VehicleTypeCreateOrConnectWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
}

@InputType()
export class VehicleTypeCreateNestedOneWithoutVehiclesInput {
    @Field(() => VehicleTypeCreateWithoutVehiclesInput, {nullable:true})
    @Type(() => VehicleTypeCreateWithoutVehiclesInput)
    create?: InstanceType<typeof VehicleTypeCreateWithoutVehiclesInput>;
    @Field(() => VehicleTypeCreateOrConnectWithoutVehiclesInput, {nullable:true})
    @Type(() => VehicleTypeCreateOrConnectWithoutVehiclesInput)
    connectOrCreate?: InstanceType<typeof VehicleTypeCreateOrConnectWithoutVehiclesInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    connect?: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
}

@InputType()
export class VehicleTypeCreateOrConnectWithoutUserPreferenceInput {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeCreateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => VehicleTypeCreateWithoutUserPreferenceInput)
    create!: InstanceType<typeof VehicleTypeCreateWithoutUserPreferenceInput>;
}

@InputType()
export class VehicleTypeCreateOrConnectWithoutVehiclesInput {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeCreateWithoutVehiclesInput, {nullable:false})
    @Type(() => VehicleTypeCreateWithoutVehiclesInput)
    create!: InstanceType<typeof VehicleTypeCreateWithoutVehiclesInput>;
}

@InputType()
export class VehicleTypeCreateWithoutUserPreferenceInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutTypeInput>;
}

@InputType()
export class VehicleTypeCreateWithoutVehiclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => UserPreferenceCreateNestedManyWithoutPreferedveliclesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedManyWithoutPreferedveliclesInput>;
}

@InputType()
export class VehicleTypeCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutTypeInput>;
    @Field(() => UserPreferenceCreateNestedManyWithoutPreferedveliclesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedManyWithoutPreferedveliclesInput>;
}

@ArgsType()
export class VehicleTypeGroupByArgs {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<VehicleTypeOrderByWithAggregationInput>;
    @Field(() => [VehicleTypeScalarFieldEnum], {nullable:false})
    by!: Array<`${VehicleTypeScalarFieldEnum}`>;
    @Field(() => VehicleTypeScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof VehicleTypeScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => VehicleTypeCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleTypeCountAggregateInput>;
    @Field(() => VehicleTypeMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleTypeMinAggregateInput>;
    @Field(() => VehicleTypeMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleTypeMaxAggregateInput>;
}

@ObjectType()
export class VehicleTypeGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => VehicleTypeCountAggregate, {nullable:true})
    _count?: InstanceType<typeof VehicleTypeCountAggregate>;
    @Field(() => VehicleTypeMinAggregate, {nullable:true})
    _min?: InstanceType<typeof VehicleTypeMinAggregate>;
    @Field(() => VehicleTypeMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof VehicleTypeMaxAggregate>;
}

@InputType()
export class VehicleTypeListRelationFilter {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    every?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    some?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    none?: InstanceType<typeof VehicleTypeWhereInput>;
}

@InputType()
export class VehicleTypeMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
}

@ObjectType()
export class VehicleTypeMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
}

@InputType()
export class VehicleTypeMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class VehicleTypeMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
}

@ObjectType()
export class VehicleTypeMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
}

@InputType()
export class VehicleTypeMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
}

@InputType()
export class VehicleTypeOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class VehicleTypeOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => VehicleTypeCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof VehicleTypeCountOrderByAggregateInput>;
    @Field(() => VehicleTypeMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof VehicleTypeMaxOrderByAggregateInput>;
    @Field(() => VehicleTypeMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof VehicleTypeMinOrderByAggregateInput>;
}

@InputType()
export class VehicleTypeOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => DriverVehicleOrderByRelationAggregateInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleOrderByRelationAggregateInput>;
    @Field(() => UserPreferenceOrderByRelationAggregateInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceOrderByRelationAggregateInput>;
}

@InputType()
export class VehicleTypeScalarRelationFilter {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    is?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    isNot?: InstanceType<typeof VehicleTypeWhereInput>;
}

@InputType()
export class VehicleTypeScalarWhereWithAggregatesInput {
    @Field(() => [VehicleTypeScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<VehicleTypeScalarWhereWithAggregatesInput>;
    @Field(() => [VehicleTypeScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<VehicleTypeScalarWhereWithAggregatesInput>;
    @Field(() => [VehicleTypeScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<VehicleTypeScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringWithAggregatesFilter>;
}

@InputType()
export class VehicleTypeScalarWhereInput {
    @Field(() => [VehicleTypeScalarWhereInput], {nullable:true})
    AND?: Array<VehicleTypeScalarWhereInput>;
    @Field(() => [VehicleTypeScalarWhereInput], {nullable:true})
    OR?: Array<VehicleTypeScalarWhereInput>;
    @Field(() => [VehicleTypeScalarWhereInput], {nullable:true})
    NOT?: Array<VehicleTypeScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
}

@InputType()
export class VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput {
    @Field(() => [VehicleTypeCreateWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateWithoutUserPreferenceInput)
    create?: Array<VehicleTypeCreateWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeCreateOrConnectWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateOrConnectWithoutUserPreferenceInput)
    connectOrCreate?: Array<VehicleTypeCreateOrConnectWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
}

@InputType()
export class VehicleTypeUncheckedCreateWithoutUserPreferenceInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutTypeInput>;
}

@InputType()
export class VehicleTypeUncheckedCreateWithoutVehiclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => UserPreferenceUncheckedCreateNestedManyWithoutPreferedveliclesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedManyWithoutPreferedveliclesInput>;
}

@InputType()
export class VehicleTypeUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutTypeInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedManyWithoutPreferedveliclesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedManyWithoutPreferedveliclesInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput {
    @Field(() => [VehicleTypeCreateWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateWithoutUserPreferenceInput)
    create?: Array<VehicleTypeCreateWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeCreateOrConnectWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateOrConnectWithoutUserPreferenceInput)
    connectOrCreate?: Array<VehicleTypeCreateOrConnectWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput)
    upsert?: Array<VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput)
    update?: Array<VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput)
    updateMany?: Array<VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeScalarWhereInput], {nullable:true})
    @Type(() => VehicleTypeScalarWhereInput)
    deleteMany?: Array<VehicleTypeScalarWhereInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateManyWithoutUserPreferenceInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateWithoutUserPreferenceInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateWithoutVehiclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => UserPreferenceUncheckedUpdateManyWithoutPreferedveliclesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateManyWithoutPreferedveliclesNestedInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateManyWithoutPreferedveliclesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateManyWithoutPreferedveliclesNestedInput>;
}

@InputType()
export class VehicleTypeUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput {
    @Field(() => VehicleTypeScalarWhereInput, {nullable:false})
    @Type(() => VehicleTypeScalarWhereInput)
    where!: InstanceType<typeof VehicleTypeScalarWhereInput>;
    @Field(() => VehicleTypeUpdateManyMutationInput, {nullable:false})
    @Type(() => VehicleTypeUpdateManyMutationInput)
    data!: InstanceType<typeof VehicleTypeUpdateManyMutationInput>;
}

@InputType()
export class VehicleTypeUpdateManyWithoutUserPreferenceNestedInput {
    @Field(() => [VehicleTypeCreateWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateWithoutUserPreferenceInput)
    create?: Array<VehicleTypeCreateWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeCreateOrConnectWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeCreateOrConnectWithoutUserPreferenceInput)
    connectOrCreate?: Array<VehicleTypeCreateOrConnectWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput)
    upsert?: Array<VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    set?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeWhereUniqueInput], {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>>;
    @Field(() => [VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput)
    update?: Array<VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput], {nullable:true})
    @Type(() => VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput)
    updateMany?: Array<VehicleTypeUpdateManyWithWhereWithoutUserPreferenceInput>;
    @Field(() => [VehicleTypeScalarWhereInput], {nullable:true})
    @Type(() => VehicleTypeScalarWhereInput)
    deleteMany?: Array<VehicleTypeScalarWhereInput>;
}

@InputType()
export class VehicleTypeUpdateOneRequiredWithoutVehiclesNestedInput {
    @Field(() => VehicleTypeCreateWithoutVehiclesInput, {nullable:true})
    @Type(() => VehicleTypeCreateWithoutVehiclesInput)
    create?: InstanceType<typeof VehicleTypeCreateWithoutVehiclesInput>;
    @Field(() => VehicleTypeCreateOrConnectWithoutVehiclesInput, {nullable:true})
    @Type(() => VehicleTypeCreateOrConnectWithoutVehiclesInput)
    connectOrCreate?: InstanceType<typeof VehicleTypeCreateOrConnectWithoutVehiclesInput>;
    @Field(() => VehicleTypeUpsertWithoutVehiclesInput, {nullable:true})
    @Type(() => VehicleTypeUpsertWithoutVehiclesInput)
    upsert?: InstanceType<typeof VehicleTypeUpsertWithoutVehiclesInput>;
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:true})
    @Type(() => VehicleTypeWhereUniqueInput)
    connect?: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeUpdateToOneWithWhereWithoutVehiclesInput, {nullable:true})
    @Type(() => VehicleTypeUpdateToOneWithWhereWithoutVehiclesInput)
    update?: InstanceType<typeof VehicleTypeUpdateToOneWithWhereWithoutVehiclesInput>;
}

@InputType()
export class VehicleTypeUpdateToOneWithWhereWithoutVehiclesInput {
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
    @Field(() => VehicleTypeUpdateWithoutVehiclesInput, {nullable:false})
    @Type(() => VehicleTypeUpdateWithoutVehiclesInput)
    data!: InstanceType<typeof VehicleTypeUpdateWithoutVehiclesInput>;
}

@InputType()
export class VehicleTypeUpdateWithWhereUniqueWithoutUserPreferenceInput {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeUpdateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => VehicleTypeUpdateWithoutUserPreferenceInput)
    data!: InstanceType<typeof VehicleTypeUpdateWithoutUserPreferenceInput>;
}

@InputType()
export class VehicleTypeUpdateWithoutUserPreferenceInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutTypeNestedInput>;
}

@InputType()
export class VehicleTypeUpdateWithoutVehiclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput>;
}

@InputType()
export class VehicleTypeUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutTypeNestedInput>;
    @Field(() => UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateManyWithoutPreferedveliclesNestedInput>;
}

@InputType()
export class VehicleTypeUpsertWithWhereUniqueWithoutUserPreferenceInput {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeUpdateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => VehicleTypeUpdateWithoutUserPreferenceInput)
    update!: InstanceType<typeof VehicleTypeUpdateWithoutUserPreferenceInput>;
    @Field(() => VehicleTypeCreateWithoutUserPreferenceInput, {nullable:false})
    @Type(() => VehicleTypeCreateWithoutUserPreferenceInput)
    create!: InstanceType<typeof VehicleTypeCreateWithoutUserPreferenceInput>;
}

@InputType()
export class VehicleTypeUpsertWithoutVehiclesInput {
    @Field(() => VehicleTypeUpdateWithoutVehiclesInput, {nullable:false})
    @Type(() => VehicleTypeUpdateWithoutVehiclesInput)
    update!: InstanceType<typeof VehicleTypeUpdateWithoutVehiclesInput>;
    @Field(() => VehicleTypeCreateWithoutVehiclesInput, {nullable:false})
    @Type(() => VehicleTypeCreateWithoutVehiclesInput)
    create!: InstanceType<typeof VehicleTypeCreateWithoutVehiclesInput>;
    @Field(() => VehicleTypeWhereInput, {nullable:true})
    @Type(() => VehicleTypeWhereInput)
    where?: InstanceType<typeof VehicleTypeWhereInput>;
}

@InputType()
export class VehicleTypeWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => [VehicleTypeWhereInput], {nullable:true})
    AND?: Array<VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeWhereInput], {nullable:true})
    OR?: Array<VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeWhereInput], {nullable:true})
    NOT?: Array<VehicleTypeWhereInput>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
    @Field(() => UserPreferenceListRelationFilter, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceListRelationFilter>;
}

@InputType()
export class VehicleTypeWhereInput {
    @Field(() => [VehicleTypeWhereInput], {nullable:true})
    AND?: Array<VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeWhereInput], {nullable:true})
    OR?: Array<VehicleTypeWhereInput>;
    @Field(() => [VehicleTypeWhereInput], {nullable:true})
    NOT?: Array<VehicleTypeWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    name?: InstanceType<typeof StringFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
    @Field(() => UserPreferenceListRelationFilter, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceListRelationFilter>;
}

@ObjectType()
export class VehicleType {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => [DriverVehicle], {nullable:true})
    vehicles?: Array<DriverVehicle>;
    @Field(() => [UserPreference], {nullable:true})
    UserPreference?: Array<UserPreference>;
    @Field(() => VehicleTypeCount, {nullable:false})
    _count?: InstanceType<typeof VehicleTypeCount>;
}
