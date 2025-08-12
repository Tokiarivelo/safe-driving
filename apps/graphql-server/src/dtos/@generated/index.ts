import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { InputType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

export enum VehicleTypeScalarFieldEnum {
    id = "id",
    name = "name"
}

export enum UserPreferenceScalarFieldEnum {
    id = "id",
    userId = "userId",
    activateLocation = "activateLocation",
    activateNotifications = "activateNotifications",
    language = "language",
    theme = "theme",
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

export enum ImageType {
    USER = "USER",
    PROFILE = "PROFILE",
    VEHICULE = "VEHICULE"
}

export enum ImageScalarFieldEnum {
    id = "id",
    url = "url",
    type = "type",
    name = "name",
    userId = "userId",
    driverVehicleId = "driverVehicleId"
}

export enum DriverVehicleImgScalarFieldEnum {
    id = "id",
    vehicleId = "vehicleId",
    category = "category",
    url = "url"
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

export enum DocumentScalarFieldEnum {
    id = "id",
    uniqueId = "uniqueId",
    userId = "userId",
    url = "url",
    type = "type",
    createdAt = "createdAt",
    driverVehicleId = "driverVehicleId"
}

registerEnumType(DocumentScalarFieldEnum, { name: 'DocumentScalarFieldEnum', description: undefined })
registerEnumType(DriverVehicleScalarFieldEnum, { name: 'DriverVehicleScalarFieldEnum', description: undefined })
registerEnumType(DriverVehicleImgScalarFieldEnum, { name: 'DriverVehicleImgScalarFieldEnum', description: undefined })
registerEnumType(ImageScalarFieldEnum, { name: 'ImageScalarFieldEnum', description: undefined })
registerEnumType(ImageType, { name: 'ImageType', description: undefined })
registerEnumType(NullsOrder, { name: 'NullsOrder', description: undefined })
registerEnumType(QueryMode, { name: 'QueryMode', description: undefined })
registerEnumType(SortOrder, { name: 'SortOrder', description: undefined })
registerEnumType(TransactionIsolationLevel, { name: 'TransactionIsolationLevel', description: undefined })
registerEnumType(RefreshTokenScalarFieldEnum, { name: 'RefreshTokenScalarFieldEnum', description: undefined })
registerEnumType(RoleScalarFieldEnum, { name: 'RoleScalarFieldEnum', description: undefined })
registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
registerEnumType(UserPreferenceScalarFieldEnum, { name: 'UserPreferenceScalarFieldEnum', description: undefined })
registerEnumType(VehicleTypeScalarFieldEnum, { name: 'VehicleTypeScalarFieldEnum', description: undefined })

@ObjectType()
export class AggregateDocument {
    @Field(() => DocumentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof DocumentCountAggregate>;
    @Field(() => DocumentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof DocumentMinAggregate>;
    @Field(() => DocumentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof DocumentMaxAggregate>;
}

@ArgsType()
export class CreateManyDocumentArgs {
    @Field(() => [DocumentCreateManyInput], {nullable:false})
    @Type(() => DocumentCreateManyInput)
    data!: Array<DocumentCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneDocumentArgs {
    @Field(() => DocumentCreateInput, {nullable:false})
    @Type(() => DocumentCreateInput)
    data!: InstanceType<typeof DocumentCreateInput>;
}

@ArgsType()
export class DeleteManyDocumentArgs {
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneDocumentArgs {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
}

@ArgsType()
export class DocumentAggregateArgs {
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => [DocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithRelationInput>;
    @Field(() => DocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => DocumentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DocumentCountAggregateInput>;
    @Field(() => DocumentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DocumentMinAggregateInput>;
    @Field(() => DocumentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DocumentMaxAggregateInput>;
}

@InputType()
export class DocumentCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    uniqueId?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class DocumentCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    uniqueId!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    url!: number;
    @Field(() => Int, {nullable:false})
    type!: number;
    @Field(() => Int, {nullable:false})
    createdAt!: number;
    @Field(() => Int, {nullable:false})
    driverVehicleId!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class DocumentCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    uniqueId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class DocumentCreateManyDriverVehicleInputEnvelope {
    @Field(() => [DocumentCreateManyDriverVehicleInput], {nullable:false})
    @Type(() => DocumentCreateManyDriverVehicleInput)
    data!: Array<DocumentCreateManyDriverVehicleInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class DocumentCreateManyDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class DocumentCreateManyUserInputEnvelope {
    @Field(() => [DocumentCreateManyUserInput], {nullable:false})
    @Type(() => DocumentCreateManyUserInput)
    data!: Array<DocumentCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class DocumentCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class DocumentCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class DocumentCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [DocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateWithoutDriverVehicleInput)
    create?: Array<DocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [DocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
}

@InputType()
export class DocumentCreateNestedManyWithoutUserInput {
    @Field(() => [DocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateWithoutUserInput)
    create?: Array<DocumentCreateWithoutUserInput>;
    @Field(() => [DocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutUserInput>;
    @Field(() => DocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyUserInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
}

@InputType()
export class DocumentCreateOrConnectWithoutDriverVehicleInput {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => DocumentCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof DocumentCreateWithoutDriverVehicleInput>;
}

@InputType()
export class DocumentCreateOrConnectWithoutUserInput {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentCreateWithoutUserInput, {nullable:false})
    @Type(() => DocumentCreateWithoutUserInput)
    create!: InstanceType<typeof DocumentCreateWithoutUserInput>;
}

@InputType()
export class DocumentCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutDocumentsInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutDocumentsInput>;
}

@InputType()
export class DocumentCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => DriverVehicleCreateNestedOneWithoutDocumentsInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutDocumentsInput>;
}

@InputType()
export class DocumentCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutDocumentsInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutDocumentsInput>;
    @Field(() => DriverVehicleCreateNestedOneWithoutDocumentsInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutDocumentsInput>;
}

@ArgsType()
export class DocumentGroupByArgs {
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => [DocumentOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithAggregationInput>;
    @Field(() => [DocumentScalarFieldEnum], {nullable:false})
    by!: Array<`${DocumentScalarFieldEnum}`>;
    @Field(() => DocumentScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof DocumentScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => DocumentCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DocumentCountAggregateInput>;
    @Field(() => DocumentMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DocumentMinAggregateInput>;
    @Field(() => DocumentMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DocumentMaxAggregateInput>;
}

@ObjectType()
export class DocumentGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => DocumentCountAggregate, {nullable:true})
    _count?: InstanceType<typeof DocumentCountAggregate>;
    @Field(() => DocumentMinAggregate, {nullable:true})
    _min?: InstanceType<typeof DocumentMinAggregate>;
    @Field(() => DocumentMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof DocumentMaxAggregate>;
}

@InputType()
export class DocumentListRelationFilter {
    @Field(() => DocumentWhereInput, {nullable:true})
    every?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => DocumentWhereInput, {nullable:true})
    some?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => DocumentWhereInput, {nullable:true})
    none?: InstanceType<typeof DocumentWhereInput>;
}

@InputType()
export class DocumentMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    uniqueId?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
}

@ObjectType()
export class DocumentMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    uniqueId?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class DocumentMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    uniqueId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class DocumentMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    uniqueId?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
}

@ObjectType()
export class DocumentMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    uniqueId?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class DocumentMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    uniqueId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class DocumentOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class DocumentOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    uniqueId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    url?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    type?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof SortOrderInput>;
    @Field(() => DocumentCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DocumentCountOrderByAggregateInput>;
    @Field(() => DocumentMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DocumentMaxOrderByAggregateInput>;
    @Field(() => DocumentMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DocumentMinOrderByAggregateInput>;
}

@InputType()
export class DocumentOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    uniqueId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    url?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    type?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    @Field(() => DriverVehicleOrderByWithRelationInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleOrderByWithRelationInput>;
}

@InputType()
export class DocumentScalarWhereWithAggregatesInput {
    @Field(() => [DocumentScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<DocumentScalarWhereWithAggregatesInput>;
    @Field(() => [DocumentScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<DocumentScalarWhereWithAggregatesInput>;
    @Field(() => [DocumentScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<DocumentScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    uniqueId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    type?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableWithAggregatesFilter>;
}

@InputType()
export class DocumentScalarWhereInput {
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    AND?: Array<DocumentScalarWhereInput>;
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    OR?: Array<DocumentScalarWhereInput>;
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    NOT?: Array<DocumentScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    uniqueId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    type?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
}

@InputType()
export class DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [DocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateWithoutDriverVehicleInput)
    create?: Array<DocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [DocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
}

@InputType()
export class DocumentUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [DocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateWithoutUserInput)
    create?: Array<DocumentCreateWithoutUserInput>;
    @Field(() => [DocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutUserInput>;
    @Field(() => DocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyUserInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
}

@InputType()
export class DocumentUncheckedCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}

@InputType()
export class DocumentUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class DocumentUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [DocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateWithoutDriverVehicleInput)
    create?: Array<DocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [DocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [DocumentUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<DocumentUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    @Type(() => DocumentScalarWhereInput)
    deleteMany?: Array<DocumentScalarWhereInput>;
}

@InputType()
export class DocumentUncheckedUpdateManyWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [DocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateWithoutUserInput)
    create?: Array<DocumentCreateWithoutUserInput>;
    @Field(() => [DocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutUserInput>;
    @Field(() => [DocumentUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DocumentUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<DocumentUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => DocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyUserInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DocumentUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<DocumentUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [DocumentUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => DocumentUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<DocumentUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    @Type(() => DocumentScalarWhereInput)
    deleteMany?: Array<DocumentScalarWhereInput>;
}

@InputType()
export class DocumentUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUncheckedUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUniqueIdUserIdCompoundUniqueInput {
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
}

@InputType()
export class DocumentUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class DocumentUpdateManyWithWhereWithoutDriverVehicleInput {
    @Field(() => DocumentScalarWhereInput, {nullable:false})
    @Type(() => DocumentScalarWhereInput)
    where!: InstanceType<typeof DocumentScalarWhereInput>;
    @Field(() => DocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => DocumentUpdateManyMutationInput)
    data!: InstanceType<typeof DocumentUpdateManyMutationInput>;
}

@InputType()
export class DocumentUpdateManyWithWhereWithoutUserInput {
    @Field(() => DocumentScalarWhereInput, {nullable:false})
    @Type(() => DocumentScalarWhereInput)
    where!: InstanceType<typeof DocumentScalarWhereInput>;
    @Field(() => DocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => DocumentUpdateManyMutationInput)
    data!: InstanceType<typeof DocumentUpdateManyMutationInput>;
}

@InputType()
export class DocumentUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [DocumentCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateWithoutDriverVehicleInput)
    create?: Array<DocumentCreateWithoutDriverVehicleInput>;
    @Field(() => [DocumentCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [DocumentUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => DocumentUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<DocumentUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    @Type(() => DocumentScalarWhereInput)
    deleteMany?: Array<DocumentScalarWhereInput>;
}

@InputType()
export class DocumentUpdateManyWithoutUserNestedInput {
    @Field(() => [DocumentCreateWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateWithoutUserInput)
    create?: Array<DocumentCreateWithoutUserInput>;
    @Field(() => [DocumentCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => DocumentCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<DocumentCreateOrConnectWithoutUserInput>;
    @Field(() => [DocumentUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DocumentUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<DocumentUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => DocumentCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => DocumentCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof DocumentCreateManyUserInputEnvelope>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentWhereUniqueInput], {nullable:true})
    @Type(() => DocumentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>>;
    @Field(() => [DocumentUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => DocumentUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<DocumentUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [DocumentUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => DocumentUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<DocumentUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [DocumentScalarWhereInput], {nullable:true})
    @Type(() => DocumentScalarWhereInput)
    deleteMany?: Array<DocumentScalarWhereInput>;
}

@InputType()
export class DocumentUpdateWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => DocumentUpdateWithoutDriverVehicleInput)
    data!: InstanceType<typeof DocumentUpdateWithoutDriverVehicleInput>;
}

@InputType()
export class DocumentUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentUpdateWithoutUserInput, {nullable:false})
    @Type(() => DocumentUpdateWithoutUserInput)
    data!: InstanceType<typeof DocumentUpdateWithoutUserInput>;
}

@InputType()
export class DocumentUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutDocumentsNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutDocumentsNestedInput>;
}

@InputType()
export class DocumentUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateOneWithoutDocumentsNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutDocumentsNestedInput>;
}

@InputType()
export class DocumentUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uniqueId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutDocumentsNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutDocumentsNestedInput>;
    @Field(() => DriverVehicleUpdateOneWithoutDocumentsNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutDocumentsNestedInput>;
}

@InputType()
export class DocumentUpsertWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => DocumentUpdateWithoutDriverVehicleInput)
    update!: InstanceType<typeof DocumentUpdateWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => DocumentCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof DocumentCreateWithoutDriverVehicleInput>;
}

@InputType()
export class DocumentUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentUpdateWithoutUserInput, {nullable:false})
    @Type(() => DocumentUpdateWithoutUserInput)
    update!: InstanceType<typeof DocumentUpdateWithoutUserInput>;
    @Field(() => DocumentCreateWithoutUserInput, {nullable:false})
    @Type(() => DocumentCreateWithoutUserInput)
    create!: InstanceType<typeof DocumentCreateWithoutUserInput>;
}

@InputType()
export class DocumentWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => DocumentUniqueIdUserIdCompoundUniqueInput, {nullable:true})
    uniqueId_userId?: InstanceType<typeof DocumentUniqueIdUserIdCompoundUniqueInput>;
    @Field(() => [DocumentWhereInput], {nullable:true})
    AND?: Array<DocumentWhereInput>;
    @Field(() => [DocumentWhereInput], {nullable:true})
    OR?: Array<DocumentWhereInput>;
    @Field(() => [DocumentWhereInput], {nullable:true})
    NOT?: Array<DocumentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    uniqueId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    type?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@InputType()
export class DocumentWhereInput {
    @Field(() => [DocumentWhereInput], {nullable:true})
    AND?: Array<DocumentWhereInput>;
    @Field(() => [DocumentWhereInput], {nullable:true})
    OR?: Array<DocumentWhereInput>;
    @Field(() => [DocumentWhereInput], {nullable:true})
    NOT?: Array<DocumentWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    uniqueId?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    type?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@ObjectType()
export class Document {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    uniqueId!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    url!: string | null;
    @Field(() => String, {nullable:true})
    type!: string | null;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => String, {nullable:true})
    driverVehicleId!: string | null;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
    @Field(() => DriverVehicle, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicle> | null;
}

@ArgsType()
export class FindFirstDocumentOrThrowArgs {
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => [DocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithRelationInput>;
    @Field(() => DocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstDocumentArgs {
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => [DocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithRelationInput>;
    @Field(() => DocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyDocumentArgs {
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => [DocumentOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DocumentOrderByWithRelationInput>;
    @Field(() => DocumentWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DocumentScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DocumentScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueDocumentOrThrowArgs {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
}

@ArgsType()
export class FindUniqueDocumentArgs {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
}

@ArgsType()
export class UpdateManyDocumentArgs {
    @Field(() => DocumentUpdateManyMutationInput, {nullable:false})
    @Type(() => DocumentUpdateManyMutationInput)
    data!: InstanceType<typeof DocumentUpdateManyMutationInput>;
    @Field(() => DocumentWhereInput, {nullable:true})
    @Type(() => DocumentWhereInput)
    where?: InstanceType<typeof DocumentWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneDocumentArgs {
    @Field(() => DocumentUpdateInput, {nullable:false})
    @Type(() => DocumentUpdateInput)
    data!: InstanceType<typeof DocumentUpdateInput>;
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
}

@ArgsType()
export class UpsertOneDocumentArgs {
    @Field(() => DocumentWhereUniqueInput, {nullable:false})
    @Type(() => DocumentWhereUniqueInput)
    where!: Prisma.AtLeast<DocumentWhereUniqueInput, 'id' | 'uniqueId_userId'>;
    @Field(() => DocumentCreateInput, {nullable:false})
    @Type(() => DocumentCreateInput)
    create!: InstanceType<typeof DocumentCreateInput>;
    @Field(() => DocumentUpdateInput, {nullable:false})
    @Type(() => DocumentUpdateInput)
    update!: InstanceType<typeof DocumentUpdateInput>;
}

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
    images?: number;
    @Field(() => Int, {nullable:false})
    documents?: number;
    @Field(() => Int, {nullable:false})
    DriverVehicleImg?: number;
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
export class DriverVehicleCreateNestedOneWithoutDocumentsInput {
    @Field(() => DriverVehicleCreateWithoutDocumentsInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutDocumentsInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutDocumentsInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutDocumentsInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutDocumentsInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutDocumentsInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@InputType()
export class DriverVehicleCreateNestedOneWithoutDriverVehicleImgInput {
    @Field(() => DriverVehicleCreateWithoutDriverVehicleImgInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutDriverVehicleImgInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@InputType()
export class DriverVehicleCreateNestedOneWithoutImagesInput {
    @Field(() => DriverVehicleCreateWithoutImagesInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutImagesInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutImagesInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutImagesInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutImagesInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutImagesInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutDocumentsInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutDocumentsInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutDocumentsInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutDocumentsInput>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutDriverVehicleImgInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutDriverVehicleImgInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutDriverVehicleImgInput>;
}

@InputType()
export class DriverVehicleCreateOrConnectWithoutImagesInput {
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleCreateWithoutImagesInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutImagesInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutImagesInput>;
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
export class DriverVehicleCreateWithoutDocumentsInput {
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
    @Field(() => ImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgCreateNestedManyWithoutVehicleInput>;
}

@InputType()
export class DriverVehicleCreateWithoutDriverVehicleImgInput {
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
    @Field(() => ImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleCreateWithoutImagesInput {
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
    @Field(() => DocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageOrderByRelationAggregateInput, {nullable:true})
    images?: InstanceType<typeof ImageOrderByRelationAggregateInput>;
    @Field(() => DocumentOrderByRelationAggregateInput, {nullable:true})
    documents?: InstanceType<typeof DocumentOrderByRelationAggregateInput>;
    @Field(() => DriverVehicleImgOrderByRelationAggregateInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgOrderByRelationAggregateInput>;
}

@InputType()
export class DriverVehicleScalarRelationFilter {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    is?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    isNot?: InstanceType<typeof DriverVehicleWhereInput>;
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
export class DriverVehicleUncheckedCreateWithoutDocumentsInput {
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedCreateWithoutDriverVehicleImgInput {
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
}

@InputType()
export class DriverVehicleUncheckedCreateWithoutImagesInput {
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
    @Field(() => DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutDriverVehicleInput>;
    @Field(() => DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput>;
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
export class DriverVehicleUncheckedUpdateWithoutDocumentsInput {
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
    @Field(() => ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateWithoutDriverVehicleImgInput {
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
    @Field(() => ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUncheckedUpdateWithoutImagesInput {
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
    @Field(() => DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput>;
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
export class DriverVehicleUpdateOneRequiredWithoutDriverVehicleImgNestedInput {
    @Field(() => DriverVehicleCreateWithoutDriverVehicleImgInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutDriverVehicleImgInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleUpsertWithoutDriverVehicleImgInput, {nullable:true})
    @Type(() => DriverVehicleUpsertWithoutDriverVehicleImgInput)
    upsert?: InstanceType<typeof DriverVehicleUpsertWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateToOneWithWhereWithoutDriverVehicleImgInput, {nullable:true})
    @Type(() => DriverVehicleUpdateToOneWithWhereWithoutDriverVehicleImgInput)
    update?: InstanceType<typeof DriverVehicleUpdateToOneWithWhereWithoutDriverVehicleImgInput>;
}

@InputType()
export class DriverVehicleUpdateOneWithoutDocumentsNestedInput {
    @Field(() => DriverVehicleCreateWithoutDocumentsInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutDocumentsInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutDocumentsInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutDocumentsInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutDocumentsInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutDocumentsInput>;
    @Field(() => DriverVehicleUpsertWithoutDocumentsInput, {nullable:true})
    @Type(() => DriverVehicleUpsertWithoutDocumentsInput)
    upsert?: InstanceType<typeof DriverVehicleUpsertWithoutDocumentsInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    disconnect?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    delete?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateToOneWithWhereWithoutDocumentsInput, {nullable:true})
    @Type(() => DriverVehicleUpdateToOneWithWhereWithoutDocumentsInput)
    update?: InstanceType<typeof DriverVehicleUpdateToOneWithWhereWithoutDocumentsInput>;
}

@InputType()
export class DriverVehicleUpdateOneWithoutImagesNestedInput {
    @Field(() => DriverVehicleCreateWithoutImagesInput, {nullable:true})
    @Type(() => DriverVehicleCreateWithoutImagesInput)
    create?: InstanceType<typeof DriverVehicleCreateWithoutImagesInput>;
    @Field(() => DriverVehicleCreateOrConnectWithoutImagesInput, {nullable:true})
    @Type(() => DriverVehicleCreateOrConnectWithoutImagesInput)
    connectOrCreate?: InstanceType<typeof DriverVehicleCreateOrConnectWithoutImagesInput>;
    @Field(() => DriverVehicleUpsertWithoutImagesInput, {nullable:true})
    @Type(() => DriverVehicleUpsertWithoutImagesInput)
    upsert?: InstanceType<typeof DriverVehicleUpsertWithoutImagesInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    disconnect?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    delete?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleWhereUniqueInput, {nullable:true})
    @Type(() => DriverVehicleWhereUniqueInput)
    connect?: Prisma.AtLeast<DriverVehicleWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleUpdateToOneWithWhereWithoutImagesInput, {nullable:true})
    @Type(() => DriverVehicleUpdateToOneWithWhereWithoutImagesInput)
    update?: InstanceType<typeof DriverVehicleUpdateToOneWithWhereWithoutImagesInput>;
}

@InputType()
export class DriverVehicleUpdateToOneWithWhereWithoutDocumentsInput {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleUpdateWithoutDocumentsInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutDocumentsInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutDocumentsInput>;
}

@InputType()
export class DriverVehicleUpdateToOneWithWhereWithoutDriverVehicleImgInput {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleUpdateWithoutDriverVehicleImgInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutDriverVehicleImgInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutDriverVehicleImgInput>;
}

@InputType()
export class DriverVehicleUpdateToOneWithWhereWithoutImagesInput {
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
    @Field(() => DriverVehicleUpdateWithoutImagesInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutImagesInput)
    data!: InstanceType<typeof DriverVehicleUpdateWithoutImagesInput>;
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
export class DriverVehicleUpdateWithoutDocumentsInput {
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
    @Field(() => ImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUpdateManyWithoutVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateWithoutDriverVehicleImgInput {
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
    @Field(() => ImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUpdateManyWithoutDriverVehicleNestedInput>;
}

@InputType()
export class DriverVehicleUpdateWithoutImagesInput {
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
    @Field(() => DocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUpdateManyWithoutVehicleNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUpdateManyWithoutVehicleNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUpdateManyWithoutVehicleNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DocumentUpdateManyWithoutDriverVehicleNestedInput, {nullable:true})
    documents?: InstanceType<typeof DocumentUpdateManyWithoutDriverVehicleNestedInput>;
    @Field(() => DriverVehicleImgUpdateManyWithoutVehicleNestedInput, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgUpdateManyWithoutVehicleNestedInput>;
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
export class DriverVehicleUpsertWithoutDocumentsInput {
    @Field(() => DriverVehicleUpdateWithoutDocumentsInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutDocumentsInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutDocumentsInput>;
    @Field(() => DriverVehicleCreateWithoutDocumentsInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutDocumentsInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutDocumentsInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
}

@InputType()
export class DriverVehicleUpsertWithoutDriverVehicleImgInput {
    @Field(() => DriverVehicleUpdateWithoutDriverVehicleImgInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutDriverVehicleImgInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleCreateWithoutDriverVehicleImgInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutDriverVehicleImgInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutDriverVehicleImgInput>;
    @Field(() => DriverVehicleWhereInput, {nullable:true})
    @Type(() => DriverVehicleWhereInput)
    where?: InstanceType<typeof DriverVehicleWhereInput>;
}

@InputType()
export class DriverVehicleUpsertWithoutImagesInput {
    @Field(() => DriverVehicleUpdateWithoutImagesInput, {nullable:false})
    @Type(() => DriverVehicleUpdateWithoutImagesInput)
    update!: InstanceType<typeof DriverVehicleUpdateWithoutImagesInput>;
    @Field(() => DriverVehicleCreateWithoutImagesInput, {nullable:false})
    @Type(() => DriverVehicleCreateWithoutImagesInput)
    create!: InstanceType<typeof DriverVehicleCreateWithoutImagesInput>;
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
    @Field(() => ImageListRelationFilter, {nullable:true})
    images?: InstanceType<typeof ImageListRelationFilter>;
    @Field(() => DocumentListRelationFilter, {nullable:true})
    documents?: InstanceType<typeof DocumentListRelationFilter>;
    @Field(() => DriverVehicleImgListRelationFilter, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgListRelationFilter>;
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
    @Field(() => ImageListRelationFilter, {nullable:true})
    images?: InstanceType<typeof ImageListRelationFilter>;
    @Field(() => DocumentListRelationFilter, {nullable:true})
    documents?: InstanceType<typeof DocumentListRelationFilter>;
    @Field(() => DriverVehicleImgListRelationFilter, {nullable:true})
    DriverVehicleImg?: InstanceType<typeof DriverVehicleImgListRelationFilter>;
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
    @Field(() => [Image], {nullable:true})
    images?: Array<Image>;
    @Field(() => [Document], {nullable:true})
    documents?: Array<Document>;
    @Field(() => [DriverVehicleImg], {nullable:true})
    DriverVehicleImg?: Array<DriverVehicleImg>;
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
export class AggregateDriverVehicleImg {
    @Field(() => DriverVehicleImgCountAggregate, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleImgCountAggregate>;
    @Field(() => DriverVehicleImgMinAggregate, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleImgMinAggregate>;
    @Field(() => DriverVehicleImgMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleImgMaxAggregate>;
}

@ArgsType()
export class CreateManyDriverVehicleImgArgs {
    @Field(() => [DriverVehicleImgCreateManyInput], {nullable:false})
    @Type(() => DriverVehicleImgCreateManyInput)
    data!: Array<DriverVehicleImgCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgCreateInput, {nullable:false})
    @Type(() => DriverVehicleImgCreateInput)
    data!: InstanceType<typeof DriverVehicleImgCreateInput>;
}

@ArgsType()
export class DeleteManyDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
}

@ArgsType()
export class DriverVehicleImgAggregateArgs {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleImgOrderByWithRelationInput>;
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => DriverVehicleImgCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleImgCountAggregateInput>;
    @Field(() => DriverVehicleImgMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleImgMinAggregateInput>;
    @Field(() => DriverVehicleImgMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleImgMaxAggregateInput>;
}

@InputType()
export class DriverVehicleImgCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    vehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    category?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class DriverVehicleImgCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    vehicleId!: number;
    @Field(() => Int, {nullable:false})
    category!: number;
    @Field(() => Int, {nullable:false})
    url!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class DriverVehicleImgCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    category?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleImgCreateManyVehicleInputEnvelope {
    @Field(() => [DriverVehicleImgCreateManyVehicleInput], {nullable:false})
    @Type(() => DriverVehicleImgCreateManyVehicleInput)
    data!: Array<DriverVehicleImgCreateManyVehicleInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class DriverVehicleImgCreateManyVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    vehicleId!: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgCreateNestedManyWithoutVehicleInput {
    @Field(() => [DriverVehicleImgCreateWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateWithoutVehicleInput)
    create?: Array<DriverVehicleImgCreateWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgCreateOrConnectWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateOrConnectWithoutVehicleInput)
    connectOrCreate?: Array<DriverVehicleImgCreateOrConnectWithoutVehicleInput>;
    @Field(() => DriverVehicleImgCreateManyVehicleInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleImgCreateManyVehicleInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleImgCreateManyVehicleInputEnvelope>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
}

@InputType()
export class DriverVehicleImgCreateOrConnectWithoutVehicleInput {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleImgCreateWithoutVehicleInput, {nullable:false})
    @Type(() => DriverVehicleImgCreateWithoutVehicleInput)
    create!: InstanceType<typeof DriverVehicleImgCreateWithoutVehicleInput>;
}

@InputType()
export class DriverVehicleImgCreateWithoutVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => DriverVehicleCreateNestedOneWithoutDriverVehicleImgInput, {nullable:false})
    vehicle!: InstanceType<typeof DriverVehicleCreateNestedOneWithoutDriverVehicleImgInput>;
}

@ArgsType()
export class DriverVehicleImgGroupByArgs {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<DriverVehicleImgOrderByWithAggregationInput>;
    @Field(() => [DriverVehicleImgScalarFieldEnum], {nullable:false})
    by!: Array<`${DriverVehicleImgScalarFieldEnum}`>;
    @Field(() => DriverVehicleImgScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof DriverVehicleImgScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => DriverVehicleImgCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleImgCountAggregateInput>;
    @Field(() => DriverVehicleImgMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleImgMinAggregateInput>;
    @Field(() => DriverVehicleImgMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleImgMaxAggregateInput>;
}

@ObjectType()
export class DriverVehicleImgGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    vehicleId!: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => DriverVehicleImgCountAggregate, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleImgCountAggregate>;
    @Field(() => DriverVehicleImgMinAggregate, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleImgMinAggregate>;
    @Field(() => DriverVehicleImgMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleImgMaxAggregate>;
}

@InputType()
export class DriverVehicleImgListRelationFilter {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    every?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    some?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    none?: InstanceType<typeof DriverVehicleImgWhereInput>;
}

@InputType()
export class DriverVehicleImgMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    vehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    category?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
}

@ObjectType()
export class DriverVehicleImgMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    vehicleId?: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    category?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleImgMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    vehicleId?: true;
    @Field(() => Boolean, {nullable:true})
    category?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
}

@ObjectType()
export class DriverVehicleImgMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    vehicleId?: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    category?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleImgOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class DriverVehicleImgOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    category?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    url?: InstanceType<typeof SortOrderInput>;
    @Field(() => DriverVehicleImgCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof DriverVehicleImgCountOrderByAggregateInput>;
    @Field(() => DriverVehicleImgMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof DriverVehicleImgMaxOrderByAggregateInput>;
    @Field(() => DriverVehicleImgMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof DriverVehicleImgMinOrderByAggregateInput>;
}

@InputType()
export class DriverVehicleImgOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    vehicleId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    category?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    url?: InstanceType<typeof SortOrderInput>;
    @Field(() => DriverVehicleOrderByWithRelationInput, {nullable:true})
    vehicle?: InstanceType<typeof DriverVehicleOrderByWithRelationInput>;
}

@InputType()
export class DriverVehicleImgScalarWhereWithAggregatesInput {
    @Field(() => [DriverVehicleImgScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<DriverVehicleImgScalarWhereWithAggregatesInput>;
    @Field(() => [DriverVehicleImgScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<DriverVehicleImgScalarWhereWithAggregatesInput>;
    @Field(() => [DriverVehicleImgScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<DriverVehicleImgScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    vehicleId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    category?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableWithAggregatesFilter>;
}

@InputType()
export class DriverVehicleImgScalarWhereInput {
    @Field(() => [DriverVehicleImgScalarWhereInput], {nullable:true})
    AND?: Array<DriverVehicleImgScalarWhereInput>;
    @Field(() => [DriverVehicleImgScalarWhereInput], {nullable:true})
    OR?: Array<DriverVehicleImgScalarWhereInput>;
    @Field(() => [DriverVehicleImgScalarWhereInput], {nullable:true})
    NOT?: Array<DriverVehicleImgScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    vehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    category?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
}

@InputType()
export class DriverVehicleImgUncheckedCreateNestedManyWithoutVehicleInput {
    @Field(() => [DriverVehicleImgCreateWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateWithoutVehicleInput)
    create?: Array<DriverVehicleImgCreateWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgCreateOrConnectWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateOrConnectWithoutVehicleInput)
    connectOrCreate?: Array<DriverVehicleImgCreateOrConnectWithoutVehicleInput>;
    @Field(() => DriverVehicleImgCreateManyVehicleInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleImgCreateManyVehicleInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleImgCreateManyVehicleInputEnvelope>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
}

@InputType()
export class DriverVehicleImgUncheckedCreateWithoutVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    vehicleId!: string;
    @Field(() => String, {nullable:true})
    category?: string;
    @Field(() => String, {nullable:true})
    url?: string;
}

@InputType()
export class DriverVehicleImgUncheckedUpdateManyWithoutVehicleNestedInput {
    @Field(() => [DriverVehicleImgCreateWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateWithoutVehicleInput)
    create?: Array<DriverVehicleImgCreateWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgCreateOrConnectWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateOrConnectWithoutVehicleInput)
    connectOrCreate?: Array<DriverVehicleImgCreateOrConnectWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput)
    upsert?: Array<DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput>;
    @Field(() => DriverVehicleImgCreateManyVehicleInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleImgCreateManyVehicleInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleImgCreateManyVehicleInputEnvelope>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput)
    update?: Array<DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput)
    updateMany?: Array<DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgScalarWhereInput], {nullable:true})
    @Type(() => DriverVehicleImgScalarWhereInput)
    deleteMany?: Array<DriverVehicleImgScalarWhereInput>;
}

@InputType()
export class DriverVehicleImgUncheckedUpdateManyWithoutVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleImgUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleImgUncheckedUpdateWithoutVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleImgUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    vehicleId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleImgUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput {
    @Field(() => DriverVehicleImgScalarWhereInput, {nullable:false})
    @Type(() => DriverVehicleImgScalarWhereInput)
    where!: InstanceType<typeof DriverVehicleImgScalarWhereInput>;
    @Field(() => DriverVehicleImgUpdateManyMutationInput, {nullable:false})
    @Type(() => DriverVehicleImgUpdateManyMutationInput)
    data!: InstanceType<typeof DriverVehicleImgUpdateManyMutationInput>;
}

@InputType()
export class DriverVehicleImgUpdateManyWithoutVehicleNestedInput {
    @Field(() => [DriverVehicleImgCreateWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateWithoutVehicleInput)
    create?: Array<DriverVehicleImgCreateWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgCreateOrConnectWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgCreateOrConnectWithoutVehicleInput)
    connectOrCreate?: Array<DriverVehicleImgCreateOrConnectWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput)
    upsert?: Array<DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput>;
    @Field(() => DriverVehicleImgCreateManyVehicleInputEnvelope, {nullable:true})
    @Type(() => DriverVehicleImgCreateManyVehicleInputEnvelope)
    createMany?: InstanceType<typeof DriverVehicleImgCreateManyVehicleInputEnvelope>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    set?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgWhereUniqueInput], {nullable:true})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>>;
    @Field(() => [DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput)
    update?: Array<DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput], {nullable:true})
    @Type(() => DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput)
    updateMany?: Array<DriverVehicleImgUpdateManyWithWhereWithoutVehicleInput>;
    @Field(() => [DriverVehicleImgScalarWhereInput], {nullable:true})
    @Type(() => DriverVehicleImgScalarWhereInput)
    deleteMany?: Array<DriverVehicleImgScalarWhereInput>;
}

@InputType()
export class DriverVehicleImgUpdateWithWhereUniqueWithoutVehicleInput {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleImgUpdateWithoutVehicleInput, {nullable:false})
    @Type(() => DriverVehicleImgUpdateWithoutVehicleInput)
    data!: InstanceType<typeof DriverVehicleImgUpdateWithoutVehicleInput>;
}

@InputType()
export class DriverVehicleImgUpdateWithoutVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class DriverVehicleImgUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    category?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateOneRequiredWithoutDriverVehicleImgNestedInput, {nullable:true})
    vehicle?: InstanceType<typeof DriverVehicleUpdateOneRequiredWithoutDriverVehicleImgNestedInput>;
}

@InputType()
export class DriverVehicleImgUpsertWithWhereUniqueWithoutVehicleInput {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleImgUpdateWithoutVehicleInput, {nullable:false})
    @Type(() => DriverVehicleImgUpdateWithoutVehicleInput)
    update!: InstanceType<typeof DriverVehicleImgUpdateWithoutVehicleInput>;
    @Field(() => DriverVehicleImgCreateWithoutVehicleInput, {nullable:false})
    @Type(() => DriverVehicleImgCreateWithoutVehicleInput)
    create!: InstanceType<typeof DriverVehicleImgCreateWithoutVehicleInput>;
}

@InputType()
export class DriverVehicleImgWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [DriverVehicleImgWhereInput], {nullable:true})
    AND?: Array<DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgWhereInput], {nullable:true})
    OR?: Array<DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgWhereInput], {nullable:true})
    NOT?: Array<DriverVehicleImgWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    vehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    category?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DriverVehicleScalarRelationFilter, {nullable:true})
    vehicle?: InstanceType<typeof DriverVehicleScalarRelationFilter>;
}

@InputType()
export class DriverVehicleImgWhereInput {
    @Field(() => [DriverVehicleImgWhereInput], {nullable:true})
    AND?: Array<DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgWhereInput], {nullable:true})
    OR?: Array<DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgWhereInput], {nullable:true})
    NOT?: Array<DriverVehicleImgWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    vehicleId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    category?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    url?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DriverVehicleScalarRelationFilter, {nullable:true})
    vehicle?: InstanceType<typeof DriverVehicleScalarRelationFilter>;
}

@ObjectType()
export class DriverVehicleImg {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    vehicleId!: string;
    @Field(() => String, {nullable:true})
    category!: string | null;
    @Field(() => String, {nullable:true})
    url!: string | null;
    @Field(() => DriverVehicle, {nullable:false})
    vehicle?: InstanceType<typeof DriverVehicle>;
}

@ArgsType()
export class FindFirstDriverVehicleImgOrThrowArgs {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleImgOrderByWithRelationInput>;
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DriverVehicleImgScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DriverVehicleImgScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleImgOrderByWithRelationInput>;
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DriverVehicleImgScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DriverVehicleImgScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => [DriverVehicleImgOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<DriverVehicleImgOrderByWithRelationInput>;
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [DriverVehicleImgScalarFieldEnum], {nullable:true})
    distinct?: Array<`${DriverVehicleImgScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueDriverVehicleImgOrThrowArgs {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpdateManyDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgUpdateManyMutationInput, {nullable:false})
    @Type(() => DriverVehicleImgUpdateManyMutationInput)
    data!: InstanceType<typeof DriverVehicleImgUpdateManyMutationInput>;
    @Field(() => DriverVehicleImgWhereInput, {nullable:true})
    @Type(() => DriverVehicleImgWhereInput)
    where?: InstanceType<typeof DriverVehicleImgWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgUpdateInput, {nullable:false})
    @Type(() => DriverVehicleImgUpdateInput)
    data!: InstanceType<typeof DriverVehicleImgUpdateInput>;
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneDriverVehicleImgArgs {
    @Field(() => DriverVehicleImgWhereUniqueInput, {nullable:false})
    @Type(() => DriverVehicleImgWhereUniqueInput)
    where!: Prisma.AtLeast<DriverVehicleImgWhereUniqueInput, 'id'>;
    @Field(() => DriverVehicleImgCreateInput, {nullable:false})
    @Type(() => DriverVehicleImgCreateInput)
    create!: InstanceType<typeof DriverVehicleImgCreateInput>;
    @Field(() => DriverVehicleImgUpdateInput, {nullable:false})
    @Type(() => DriverVehicleImgUpdateInput)
    update!: InstanceType<typeof DriverVehicleImgUpdateInput>;
}

@ObjectType()
export class AggregateImage {
    @Field(() => ImageCountAggregate, {nullable:true})
    _count?: InstanceType<typeof ImageCountAggregate>;
    @Field(() => ImageMinAggregate, {nullable:true})
    _min?: InstanceType<typeof ImageMinAggregate>;
    @Field(() => ImageMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof ImageMaxAggregate>;
}

@ArgsType()
export class CreateManyImageArgs {
    @Field(() => [ImageCreateManyInput], {nullable:false})
    @Type(() => ImageCreateManyInput)
    data!: Array<ImageCreateManyInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@ArgsType()
export class CreateOneImageArgs {
    @Field(() => ImageCreateInput, {nullable:false})
    @Type(() => ImageCreateInput)
    data!: InstanceType<typeof ImageCreateInput>;
}

@ArgsType()
export class DeleteManyImageArgs {
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class DeleteOneImageArgs {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindFirstImageOrThrowArgs {
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => [ImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ImageOrderByWithRelationInput>;
    @Field(() => ImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindFirstImageArgs {
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => [ImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ImageOrderByWithRelationInput>;
    @Field(() => ImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindManyImageArgs {
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => [ImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ImageOrderByWithRelationInput>;
    @Field(() => ImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => [ImageScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ImageScalarFieldEnum}`>;
}

@ArgsType()
export class FindUniqueImageOrThrowArgs {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class FindUniqueImageArgs {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class ImageAggregateArgs {
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => [ImageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ImageOrderByWithRelationInput>;
    @Field(() => ImageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => ImageCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ImageCountAggregateInput>;
    @Field(() => ImageMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ImageMinAggregateInput>;
    @Field(() => ImageMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ImageMaxAggregateInput>;
}

@InputType()
export class ImageCountAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
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
export class ImageCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    url!: number;
    @Field(() => Int, {nullable:false})
    type!: number;
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
export class ImageCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class ImageCreateManyDriverVehicleInputEnvelope {
    @Field(() => [ImageCreateManyDriverVehicleInput], {nullable:false})
    @Type(() => ImageCreateManyDriverVehicleInput)
    data!: Array<ImageCreateManyDriverVehicleInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class ImageCreateManyDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
}

@InputType()
export class ImageCreateManyUserInputEnvelope {
    @Field(() => [ImageCreateManyUserInput], {nullable:false})
    @Type(() => ImageCreateManyUserInput)
    data!: Array<ImageCreateManyUserInput>;
    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}

@InputType()
export class ImageCreateManyUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class ImageCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class ImageCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [ImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateWithoutDriverVehicleInput)
    create?: Array<ImageCreateWithoutDriverVehicleInput>;
    @Field(() => [ImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => ImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class ImageCreateNestedManyWithoutUserInput {
    @Field(() => [ImageCreateWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateWithoutUserInput)
    create?: Array<ImageCreateWithoutUserInput>;
    @Field(() => [ImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutUserInput>;
    @Field(() => ImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyUserInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class ImageCreateOrConnectWithoutDriverVehicleInput {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => ImageCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof ImageCreateWithoutDriverVehicleInput>;
}

@InputType()
export class ImageCreateOrConnectWithoutUserInput {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageCreateWithoutUserInput, {nullable:false})
    @Type(() => ImageCreateWithoutUserInput)
    create!: InstanceType<typeof ImageCreateWithoutUserInput>;
}

@InputType()
export class ImageCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => UserCreateNestedOneWithoutImagesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutImagesInput>;
}

@InputType()
export class ImageCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => DriverVehicleCreateNestedOneWithoutImagesInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutImagesInput>;
}

@InputType()
export class ImageCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => UserCreateNestedOneWithoutImagesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutImagesInput>;
    @Field(() => DriverVehicleCreateNestedOneWithoutImagesInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleCreateNestedOneWithoutImagesInput>;
}

@ArgsType()
export class ImageGroupByArgs {
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => [ImageOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<ImageOrderByWithAggregationInput>;
    @Field(() => [ImageScalarFieldEnum], {nullable:false})
    by!: Array<`${ImageScalarFieldEnum}`>;
    @Field(() => ImageScalarWhereWithAggregatesInput, {nullable:true})
    having?: InstanceType<typeof ImageScalarWhereWithAggregatesInput>;
    @Field(() => Int, {nullable:true})
    take?: number;
    @Field(() => Int, {nullable:true})
    skip?: number;
    @Field(() => ImageCountAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ImageCountAggregateInput>;
    @Field(() => ImageMinAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ImageMinAggregateInput>;
    @Field(() => ImageMaxAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ImageMaxAggregateInput>;
}

@ObjectType()
export class ImageGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
    @Field(() => ImageCountAggregate, {nullable:true})
    _count?: InstanceType<typeof ImageCountAggregate>;
    @Field(() => ImageMinAggregate, {nullable:true})
    _min?: InstanceType<typeof ImageMinAggregate>;
    @Field(() => ImageMaxAggregate, {nullable:true})
    _max?: InstanceType<typeof ImageMaxAggregate>;
}

@InputType()
export class ImageListRelationFilter {
    @Field(() => ImageWhereInput, {nullable:true})
    every?: InstanceType<typeof ImageWhereInput>;
    @Field(() => ImageWhereInput, {nullable:true})
    some?: InstanceType<typeof ImageWhereInput>;
    @Field(() => ImageWhereInput, {nullable:true})
    none?: InstanceType<typeof ImageWhereInput>;
}

@InputType()
export class ImageMaxAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
}

@ObjectType()
export class ImageMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:true})
    type?: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class ImageMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class ImageMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    name?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    driverVehicleId?: true;
}

@ObjectType()
export class ImageMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => ImageType, {nullable:true})
    type?: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class ImageMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    driverVehicleId?: `${SortOrder}`;
}

@InputType()
export class ImageOrderByRelationAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    _count?: `${SortOrder}`;
}

@InputType()
export class ImageOrderByWithAggregationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    name?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof SortOrderInput>;
    @Field(() => ImageCountOrderByAggregateInput, {nullable:true})
    _count?: InstanceType<typeof ImageCountOrderByAggregateInput>;
    @Field(() => ImageMaxOrderByAggregateInput, {nullable:true})
    _max?: InstanceType<typeof ImageMaxOrderByAggregateInput>;
    @Field(() => ImageMinOrderByAggregateInput, {nullable:true})
    _min?: InstanceType<typeof ImageMinOrderByAggregateInput>;
}

@InputType()
export class ImageOrderByWithRelationInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    name?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    @Field(() => DriverVehicleOrderByWithRelationInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleOrderByWithRelationInput>;
}

@InputType()
export class ImageScalarWhereWithAggregatesInput {
    @Field(() => [ImageScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ImageScalarWhereWithAggregatesInput>;
    @Field(() => [ImageScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ImageScalarWhereWithAggregatesInput>;
    @Field(() => [ImageScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ImageScalarWhereWithAggregatesInput>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    url?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => EnumImageTypeWithAggregatesFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableWithAggregatesFilter>;
}

@InputType()
export class ImageScalarWhereInput {
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    AND?: Array<ImageScalarWhereInput>;
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    OR?: Array<ImageScalarWhereInput>;
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    NOT?: Array<ImageScalarWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    url?: InstanceType<typeof StringFilter>;
    @Field(() => EnumImageTypeFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
}

@InputType()
export class ImageUncheckedCreateNestedManyWithoutDriverVehicleInput {
    @Field(() => [ImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateWithoutDriverVehicleInput)
    create?: Array<ImageCreateWithoutDriverVehicleInput>;
    @Field(() => [ImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => ImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class ImageUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [ImageCreateWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateWithoutUserInput)
    create?: Array<ImageCreateWithoutUserInput>;
    @Field(() => [ImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutUserInput>;
    @Field(() => ImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyUserInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
}

@InputType()
export class ImageUncheckedCreateWithoutDriverVehicleInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
}

@InputType()
export class ImageUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class ImageUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId?: string;
}

@InputType()
export class ImageUncheckedUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [ImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateWithoutDriverVehicleInput)
    create?: Array<ImageCreateWithoutDriverVehicleInput>;
    @Field(() => [ImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [ImageUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<ImageUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => ImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<ImageUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [ImageUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<ImageUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    @Type(() => ImageScalarWhereInput)
    deleteMany?: Array<ImageScalarWhereInput>;
}

@InputType()
export class ImageUncheckedUpdateManyWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUncheckedUpdateManyWithoutUserNestedInput {
    @Field(() => [ImageCreateWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateWithoutUserInput)
    create?: Array<ImageCreateWithoutUserInput>;
    @Field(() => [ImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutUserInput>;
    @Field(() => [ImageUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ImageUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<ImageUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => ImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyUserInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ImageUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<ImageUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [ImageUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => ImageUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<ImageUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    @Type(() => ImageScalarWhereInput)
    deleteMany?: Array<ImageScalarWhereInput>;
}

@InputType()
export class ImageUncheckedUpdateManyWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUncheckedUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    driverVehicleId?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
}

@InputType()
export class ImageUpdateManyWithWhereWithoutDriverVehicleInput {
    @Field(() => ImageScalarWhereInput, {nullable:false})
    @Type(() => ImageScalarWhereInput)
    where!: InstanceType<typeof ImageScalarWhereInput>;
    @Field(() => ImageUpdateManyMutationInput, {nullable:false})
    @Type(() => ImageUpdateManyMutationInput)
    data!: InstanceType<typeof ImageUpdateManyMutationInput>;
}

@InputType()
export class ImageUpdateManyWithWhereWithoutUserInput {
    @Field(() => ImageScalarWhereInput, {nullable:false})
    @Type(() => ImageScalarWhereInput)
    where!: InstanceType<typeof ImageScalarWhereInput>;
    @Field(() => ImageUpdateManyMutationInput, {nullable:false})
    @Type(() => ImageUpdateManyMutationInput)
    data!: InstanceType<typeof ImageUpdateManyMutationInput>;
}

@InputType()
export class ImageUpdateManyWithoutDriverVehicleNestedInput {
    @Field(() => [ImageCreateWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateWithoutDriverVehicleInput)
    create?: Array<ImageCreateWithoutDriverVehicleInput>;
    @Field(() => [ImageCreateOrConnectWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutDriverVehicleInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutDriverVehicleInput>;
    @Field(() => [ImageUpsertWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageUpsertWithWhereUniqueWithoutDriverVehicleInput)
    upsert?: Array<ImageUpsertWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => ImageCreateManyDriverVehicleInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyDriverVehicleInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyDriverVehicleInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageUpdateWithWhereUniqueWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageUpdateWithWhereUniqueWithoutDriverVehicleInput)
    update?: Array<ImageUpdateWithWhereUniqueWithoutDriverVehicleInput>;
    @Field(() => [ImageUpdateManyWithWhereWithoutDriverVehicleInput], {nullable:true})
    @Type(() => ImageUpdateManyWithWhereWithoutDriverVehicleInput)
    updateMany?: Array<ImageUpdateManyWithWhereWithoutDriverVehicleInput>;
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    @Type(() => ImageScalarWhereInput)
    deleteMany?: Array<ImageScalarWhereInput>;
}

@InputType()
export class ImageUpdateManyWithoutUserNestedInput {
    @Field(() => [ImageCreateWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateWithoutUserInput)
    create?: Array<ImageCreateWithoutUserInput>;
    @Field(() => [ImageCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => ImageCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<ImageCreateOrConnectWithoutUserInput>;
    @Field(() => [ImageUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ImageUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<ImageUpsertWithWhereUniqueWithoutUserInput>;
    @Field(() => ImageCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => ImageCreateManyUserInputEnvelope)
    createMany?: InstanceType<typeof ImageCreateManyUserInputEnvelope>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageWhereUniqueInput], {nullable:true})
    @Type(() => ImageWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ImageWhereUniqueInput, 'id'>>;
    @Field(() => [ImageUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => ImageUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<ImageUpdateWithWhereUniqueWithoutUserInput>;
    @Field(() => [ImageUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => ImageUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<ImageUpdateManyWithWhereWithoutUserInput>;
    @Field(() => [ImageScalarWhereInput], {nullable:true})
    @Type(() => ImageScalarWhereInput)
    deleteMany?: Array<ImageScalarWhereInput>;
}

@InputType()
export class ImageUpdateWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => ImageUpdateWithoutDriverVehicleInput)
    data!: InstanceType<typeof ImageUpdateWithoutDriverVehicleInput>;
}

@InputType()
export class ImageUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageUpdateWithoutUserInput, {nullable:false})
    @Type(() => ImageUpdateWithoutUserInput)
    data!: InstanceType<typeof ImageUpdateWithoutUserInput>;
}

@InputType()
export class ImageUpdateWithoutDriverVehicleInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutImagesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutImagesNestedInput>;
}

@InputType()
export class ImageUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateOneWithoutImagesNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutImagesNestedInput>;
}

@InputType()
export class ImageUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => EnumImageTypeFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutImagesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutImagesNestedInput>;
    @Field(() => DriverVehicleUpdateOneWithoutImagesNestedInput, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleUpdateOneWithoutImagesNestedInput>;
}

@InputType()
export class ImageUpsertWithWhereUniqueWithoutDriverVehicleInput {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageUpdateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => ImageUpdateWithoutDriverVehicleInput)
    update!: InstanceType<typeof ImageUpdateWithoutDriverVehicleInput>;
    @Field(() => ImageCreateWithoutDriverVehicleInput, {nullable:false})
    @Type(() => ImageCreateWithoutDriverVehicleInput)
    create!: InstanceType<typeof ImageCreateWithoutDriverVehicleInput>;
}

@InputType()
export class ImageUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageUpdateWithoutUserInput, {nullable:false})
    @Type(() => ImageUpdateWithoutUserInput)
    update!: InstanceType<typeof ImageUpdateWithoutUserInput>;
    @Field(() => ImageCreateWithoutUserInput, {nullable:false})
    @Type(() => ImageCreateWithoutUserInput)
    create!: InstanceType<typeof ImageCreateWithoutUserInput>;
}

@InputType()
export class ImageWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => [ImageWhereInput], {nullable:true})
    AND?: Array<ImageWhereInput>;
    @Field(() => [ImageWhereInput], {nullable:true})
    OR?: Array<ImageWhereInput>;
    @Field(() => [ImageWhereInput], {nullable:true})
    NOT?: Array<ImageWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    url?: InstanceType<typeof StringFilter>;
    @Field(() => EnumImageTypeFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@InputType()
export class ImageWhereInput {
    @Field(() => [ImageWhereInput], {nullable:true})
    AND?: Array<ImageWhereInput>;
    @Field(() => [ImageWhereInput], {nullable:true})
    OR?: Array<ImageWhereInput>;
    @Field(() => [ImageWhereInput], {nullable:true})
    NOT?: Array<ImageWhereInput>;
    @Field(() => StringFilter, {nullable:true})
    id?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    url?: InstanceType<typeof StringFilter>;
    @Field(() => EnumImageTypeFilter, {nullable:true})
    type?: InstanceType<typeof EnumImageTypeFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    name?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    driverVehicleId?: InstanceType<typeof StringNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => DriverVehicleNullableScalarRelationFilter, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicleNullableScalarRelationFilter>;
}

@ObjectType()
export class Image {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => ImageType, {nullable:false})
    type!: `${ImageType}`;
    @Field(() => String, {nullable:true})
    name!: string | null;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => String, {nullable:true})
    driverVehicleId!: string | null;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
    @Field(() => DriverVehicle, {nullable:true})
    DriverVehicle?: InstanceType<typeof DriverVehicle> | null;
}

@ArgsType()
export class UpdateManyImageArgs {
    @Field(() => ImageUpdateManyMutationInput, {nullable:false})
    @Type(() => ImageUpdateManyMutationInput)
    data!: InstanceType<typeof ImageUpdateManyMutationInput>;
    @Field(() => ImageWhereInput, {nullable:true})
    @Type(() => ImageWhereInput)
    where?: InstanceType<typeof ImageWhereInput>;
    @Field(() => Int, {nullable:true})
    limit?: number;
}

@ArgsType()
export class UpdateOneImageArgs {
    @Field(() => ImageUpdateInput, {nullable:false})
    @Type(() => ImageUpdateInput)
    data!: InstanceType<typeof ImageUpdateInput>;
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
}

@ArgsType()
export class UpsertOneImageArgs {
    @Field(() => ImageWhereUniqueInput, {nullable:false})
    @Type(() => ImageWhereUniqueInput)
    where!: Prisma.AtLeast<ImageWhereUniqueInput, 'id'>;
    @Field(() => ImageCreateInput, {nullable:false})
    @Type(() => ImageCreateInput)
    create!: InstanceType<typeof ImageCreateInput>;
    @Field(() => ImageUpdateInput, {nullable:false})
    @Type(() => ImageUpdateInput)
    update!: InstanceType<typeof ImageUpdateInput>;
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
    images?: number;
    @Field(() => Int, {nullable:false})
    Role?: number;
    @Field(() => Int, {nullable:false})
    vehicles?: number;
    @Field(() => Int, {nullable:false})
    Documents?: number;
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
export class UserCreateNestedOneWithoutDocumentsInput {
    @Field(() => UserCreateWithoutDocumentsInput, {nullable:true})
    @Type(() => UserCreateWithoutDocumentsInput)
    create?: InstanceType<typeof UserCreateWithoutDocumentsInput>;
    @Field(() => UserCreateOrConnectWithoutDocumentsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDocumentsInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutDocumentsInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}

@InputType()
export class UserCreateNestedOneWithoutImagesInput {
    @Field(() => UserCreateWithoutImagesInput, {nullable:true})
    @Type(() => UserCreateWithoutImagesInput)
    create?: InstanceType<typeof UserCreateWithoutImagesInput>;
    @Field(() => UserCreateOrConnectWithoutImagesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutImagesInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutImagesInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
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
export class UserCreateOrConnectWithoutDocumentsInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutDocumentsInput, {nullable:false})
    @Type(() => UserCreateWithoutDocumentsInput)
    create!: InstanceType<typeof UserCreateWithoutDocumentsInput>;
}

@InputType()
export class UserCreateOrConnectWithoutImagesInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutImagesInput, {nullable:false})
    @Type(() => UserCreateWithoutImagesInput)
    create!: InstanceType<typeof UserCreateWithoutImagesInput>;
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
export class UserCreateWithoutDocumentsInput {
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
    @Field(() => ImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
}

@InputType()
export class UserCreateWithoutImagesInput {
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
    @Field(() => DocumentCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutUserInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => DocumentCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageOrderByRelationAggregateInput, {nullable:true})
    images?: InstanceType<typeof ImageOrderByRelationAggregateInput>;
    @Field(() => RoleOrderByRelationAggregateInput, {nullable:true})
    Role?: InstanceType<typeof RoleOrderByRelationAggregateInput>;
    @Field(() => DriverVehicleOrderByRelationAggregateInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleOrderByRelationAggregateInput>;
    @Field(() => UserPreferenceOrderByWithRelationInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceOrderByWithRelationInput>;
    @Field(() => DocumentOrderByRelationAggregateInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentOrderByRelationAggregateInput>;
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
export class UserUncheckedCreateWithoutDocumentsInput {
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
}

@InputType()
export class UserUncheckedCreateWithoutImagesInput {
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
    @Field(() => DocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => ImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
    @Field(() => DocumentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedCreateNestedManyWithoutUserInput>;
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
export class UserUncheckedUpdateWithoutDocumentsInput {
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
    @Field(() => ImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
}

@InputType()
export class UserUncheckedUpdateWithoutImagesInput {
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
    @Field(() => DocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUncheckedUpdateManyWithoutUserNestedInput>;
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
export class UserUpdateOneRequiredWithoutDocumentsNestedInput {
    @Field(() => UserCreateWithoutDocumentsInput, {nullable:true})
    @Type(() => UserCreateWithoutDocumentsInput)
    create?: InstanceType<typeof UserCreateWithoutDocumentsInput>;
    @Field(() => UserCreateOrConnectWithoutDocumentsInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutDocumentsInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutDocumentsInput>;
    @Field(() => UserUpsertWithoutDocumentsInput, {nullable:true})
    @Type(() => UserUpsertWithoutDocumentsInput)
    upsert?: InstanceType<typeof UserUpsertWithoutDocumentsInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutDocumentsInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutDocumentsInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutDocumentsInput>;
}

@InputType()
export class UserUpdateOneRequiredWithoutImagesNestedInput {
    @Field(() => UserCreateWithoutImagesInput, {nullable:true})
    @Type(() => UserCreateWithoutImagesInput)
    create?: InstanceType<typeof UserCreateWithoutImagesInput>;
    @Field(() => UserCreateOrConnectWithoutImagesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutImagesInput)
    connectOrCreate?: InstanceType<typeof UserCreateOrConnectWithoutImagesInput>;
    @Field(() => UserUpsertWithoutImagesInput, {nullable:true})
    @Type(() => UserUpsertWithoutImagesInput)
    upsert?: InstanceType<typeof UserUpsertWithoutImagesInput>;
    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserUpdateToOneWithWhereWithoutImagesInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutImagesInput)
    update?: InstanceType<typeof UserUpdateToOneWithWhereWithoutImagesInput>;
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
export class UserUpdateToOneWithWhereWithoutDocumentsInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutDocumentsInput, {nullable:false})
    @Type(() => UserUpdateWithoutDocumentsInput)
    data!: InstanceType<typeof UserUpdateWithoutDocumentsInput>;
}

@InputType()
export class UserUpdateToOneWithWhereWithoutImagesInput {
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
    @Field(() => UserUpdateWithoutImagesInput, {nullable:false})
    @Type(() => UserUpdateWithoutImagesInput)
    data!: InstanceType<typeof UserUpdateWithoutImagesInput>;
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
export class UserUpdateWithoutDocumentsInput {
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
    @Field(() => ImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
}

@InputType()
export class UserUpdateWithoutImagesInput {
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
    @Field(() => DocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutUserNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => DocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUpdateManyWithoutUserNestedInput>;
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
    @Field(() => ImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof ImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
    @Field(() => UserPreferenceUpdateOneWithoutUserNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateOneWithoutUserNestedInput>;
    @Field(() => DocumentUpdateManyWithoutUserNestedInput, {nullable:true})
    Documents?: InstanceType<typeof DocumentUpdateManyWithoutUserNestedInput>;
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
export class UserUpsertWithoutDocumentsInput {
    @Field(() => UserUpdateWithoutDocumentsInput, {nullable:false})
    @Type(() => UserUpdateWithoutDocumentsInput)
    update!: InstanceType<typeof UserUpdateWithoutDocumentsInput>;
    @Field(() => UserCreateWithoutDocumentsInput, {nullable:false})
    @Type(() => UserCreateWithoutDocumentsInput)
    create!: InstanceType<typeof UserCreateWithoutDocumentsInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
}

@InputType()
export class UserUpsertWithoutImagesInput {
    @Field(() => UserUpdateWithoutImagesInput, {nullable:false})
    @Type(() => UserUpdateWithoutImagesInput)
    update!: InstanceType<typeof UserUpdateWithoutImagesInput>;
    @Field(() => UserCreateWithoutImagesInput, {nullable:false})
    @Type(() => UserCreateWithoutImagesInput)
    create!: InstanceType<typeof UserCreateWithoutImagesInput>;
    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: InstanceType<typeof UserWhereInput>;
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
    @Field(() => ImageListRelationFilter, {nullable:true})
    images?: InstanceType<typeof ImageListRelationFilter>;
    @Field(() => RoleListRelationFilter, {nullable:true})
    Role?: InstanceType<typeof RoleListRelationFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
    @Field(() => UserPreferenceNullableScalarRelationFilter, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceNullableScalarRelationFilter>;
    @Field(() => DocumentListRelationFilter, {nullable:true})
    Documents?: InstanceType<typeof DocumentListRelationFilter>;
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
    @Field(() => ImageListRelationFilter, {nullable:true})
    images?: InstanceType<typeof ImageListRelationFilter>;
    @Field(() => RoleListRelationFilter, {nullable:true})
    Role?: InstanceType<typeof RoleListRelationFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
    @Field(() => UserPreferenceNullableScalarRelationFilter, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceNullableScalarRelationFilter>;
    @Field(() => DocumentListRelationFilter, {nullable:true})
    Documents?: InstanceType<typeof DocumentListRelationFilter>;
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
    @Field(() => [Image], {nullable:true})
    images?: Array<Image>;
    @Field(() => [Role], {nullable:true})
    Role?: Array<Role>;
    @Field(() => [DriverVehicle], {nullable:true})
    vehicles?: Array<DriverVehicle>;
    @Field(() => UserPreference, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreference> | null;
    @Field(() => [Document], {nullable:true})
    Documents?: Array<Document>;
    @Field(() => UserCount, {nullable:false})
    _count?: InstanceType<typeof UserCount>;
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
    language?: true;
    @Field(() => Boolean, {nullable:true})
    theme?: true;
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
    language!: number;
    @Field(() => Int, {nullable:false})
    theme!: number;
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
    language?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    theme?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;
}

@ObjectType()
export class UserPreferenceCount {
    @Field(() => Int, {nullable:false})
    preferedVehicules?: number;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}

@InputType()
export class UserPreferenceCreateNestedManyWithoutPreferedVehiculesInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedVehiculesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput>;
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
export class UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceCreateWithoutPreferedVehiculesInput, {nullable:false})
    @Type(() => UserPreferenceCreateWithoutPreferedVehiculesInput)
    create!: InstanceType<typeof UserPreferenceCreateWithoutPreferedVehiculesInput>;
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
export class UserPreferenceCreateWithoutPreferedVehiculesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleTypeCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeCreateNestedManyWithoutUserPreferenceInput>;
}

@InputType()
export class UserPreferenceCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserCreateNestedOneWithoutUserPreferenceInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutUserPreferenceInput>;
    @Field(() => VehicleTypeCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeCreateNestedManyWithoutUserPreferenceInput>;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
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
    language?: true;
    @Field(() => Boolean, {nullable:true})
    theme?: true;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
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
    language?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    theme?: `${SortOrder}`;
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
    language?: true;
    @Field(() => Boolean, {nullable:true})
    theme?: true;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
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
    language?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    theme?: `${SortOrder}`;
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
    @Field(() => SortOrderInput, {nullable:true})
    language?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    theme?: InstanceType<typeof SortOrderInput>;
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
    @Field(() => SortOrderInput, {nullable:true})
    language?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrderInput, {nullable:true})
    theme?: InstanceType<typeof SortOrderInput>;
    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;
    @Field(() => SortOrderInput, {nullable:true})
    updatedAt?: InstanceType<typeof SortOrderInput>;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
    @Field(() => VehicleTypeOrderByRelationAggregateInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeOrderByRelationAggregateInput>;
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
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableWithAggregatesFilter>;
    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableWithAggregatesFilter>;
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
    @Field(() => StringNullableFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
}

@InputType()
export class UserPreferenceUncheckedCreateNestedManyWithoutPreferedVehiculesInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedVehiculesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput>;
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
export class UserPreferenceUncheckedCreateWithoutPreferedVehiculesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => Boolean, {nullable:true})
    activateLocation?: boolean;
    @Field(() => Boolean, {nullable:true})
    activateNotifications?: boolean;
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput>;
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
    @Field(() => String, {nullable:true})
    language?: string;
    @Field(() => String, {nullable:true})
    theme?: string;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeUncheckedCreateNestedManyWithoutUserPreferenceInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateManyWithoutPreferedVehiculesNestedInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedVehiculesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput)
    upsert?: Array<UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput>;
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
    @Field(() => [UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput)
    update?: Array<UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput)
    updateMany?: Array<UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceScalarWhereInput], {nullable:true})
    @Type(() => UserPreferenceScalarWhereInput)
    deleteMany?: Array<UserPreferenceScalarWhereInput>;
}

@InputType()
export class UserPreferenceUncheckedUpdateManyWithoutPreferedVehiculesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
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
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
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
export class UserPreferenceUncheckedUpdateWithoutPreferedVehiculesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
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
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput>;
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
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeUncheckedUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
}

@InputType()
export class UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput {
    @Field(() => UserPreferenceScalarWhereInput, {nullable:false})
    @Type(() => UserPreferenceScalarWhereInput)
    where!: InstanceType<typeof UserPreferenceScalarWhereInput>;
    @Field(() => UserPreferenceUpdateManyMutationInput, {nullable:false})
    @Type(() => UserPreferenceUpdateManyMutationInput)
    data!: InstanceType<typeof UserPreferenceUpdateManyMutationInput>;
}

@InputType()
export class UserPreferenceUpdateManyWithoutPreferedVehiculesNestedInput {
    @Field(() => [UserPreferenceCreateWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateWithoutPreferedVehiculesInput)
    create?: Array<UserPreferenceCreateWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput)
    connectOrCreate?: Array<UserPreferenceCreateOrConnectWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput)
    upsert?: Array<UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput>;
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
    @Field(() => [UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput)
    update?: Array<UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput>;
    @Field(() => [UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput], {nullable:true})
    @Type(() => UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput)
    updateMany?: Array<UserPreferenceUpdateManyWithWhereWithoutPreferedVehiculesInput>;
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
export class UserPreferenceUpdateWithWhereUniqueWithoutPreferedVehiculesInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceUpdateWithoutPreferedVehiculesInput, {nullable:false})
    @Type(() => UserPreferenceUpdateWithoutPreferedVehiculesInput)
    data!: InstanceType<typeof UserPreferenceUpdateWithoutPreferedVehiculesInput>;
}

@InputType()
export class UserPreferenceUpdateWithoutPreferedVehiculesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
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
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => VehicleTypeUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateLocation?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    activateNotifications?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    language?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    theme?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => NullableDateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof NullableDateTimeFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutUserPreferenceNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutUserPreferenceNestedInput>;
    @Field(() => VehicleTypeUpdateManyWithoutUserPreferenceNestedInput, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeUpdateManyWithoutUserPreferenceNestedInput>;
}

@InputType()
export class UserPreferenceUpsertWithWhereUniqueWithoutPreferedVehiculesInput {
    @Field(() => UserPreferenceWhereUniqueInput, {nullable:false})
    @Type(() => UserPreferenceWhereUniqueInput)
    where!: Prisma.AtLeast<UserPreferenceWhereUniqueInput, 'id' | 'userId'>;
    @Field(() => UserPreferenceUpdateWithoutPreferedVehiculesInput, {nullable:false})
    @Type(() => UserPreferenceUpdateWithoutPreferedVehiculesInput)
    update!: InstanceType<typeof UserPreferenceUpdateWithoutPreferedVehiculesInput>;
    @Field(() => UserPreferenceCreateWithoutPreferedVehiculesInput, {nullable:false})
    @Type(() => UserPreferenceCreateWithoutPreferedVehiculesInput)
    create!: InstanceType<typeof UserPreferenceCreateWithoutPreferedVehiculesInput>;
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
    @Field(() => StringNullableFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => VehicleTypeListRelationFilter, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeListRelationFilter>;
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
    @Field(() => StringNullableFilter, {nullable:true})
    language?: InstanceType<typeof StringNullableFilter>;
    @Field(() => StringNullableFilter, {nullable:true})
    theme?: InstanceType<typeof StringNullableFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeNullableFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeNullableFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
    @Field(() => VehicleTypeListRelationFilter, {nullable:true})
    preferedVehicules?: InstanceType<typeof VehicleTypeListRelationFilter>;
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
    @Field(() => String, {defaultValue:'fr',nullable:true})
    language!: string | null;
    @Field(() => String, {defaultValue:'light',nullable:true})
    theme!: string | null;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
    @Field(() => [VehicleType], {nullable:true})
    preferedVehicules?: Array<VehicleType>;
    @Field(() => UserPreferenceCount, {nullable:false})
    _count?: InstanceType<typeof UserPreferenceCount>;
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
    @Field(() => UserPreferenceCreateNestedManyWithoutPreferedVehiculesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedManyWithoutPreferedVehiculesInput>;
}

@InputType()
export class VehicleTypeCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutTypeInput>;
    @Field(() => UserPreferenceCreateNestedManyWithoutPreferedVehiculesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceCreateNestedManyWithoutPreferedVehiculesInput>;
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
    @Field(() => UserPreferenceUncheckedCreateNestedManyWithoutPreferedVehiculesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedManyWithoutPreferedVehiculesInput>;
}

@InputType()
export class VehicleTypeUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutTypeInput>;
    @Field(() => UserPreferenceUncheckedCreateNestedManyWithoutPreferedVehiculesInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedCreateNestedManyWithoutPreferedVehiculesInput>;
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
    @Field(() => UserPreferenceUncheckedUpdateManyWithoutPreferedVehiculesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateManyWithoutPreferedVehiculesNestedInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput>;
    @Field(() => UserPreferenceUncheckedUpdateManyWithoutPreferedVehiculesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUncheckedUpdateManyWithoutPreferedVehiculesNestedInput>;
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
    @Field(() => UserPreferenceUpdateManyWithoutPreferedVehiculesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateManyWithoutPreferedVehiculesNestedInput>;
}

@InputType()
export class VehicleTypeUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutTypeNestedInput>;
    @Field(() => UserPreferenceUpdateManyWithoutPreferedVehiculesNestedInput, {nullable:true})
    UserPreference?: InstanceType<typeof UserPreferenceUpdateManyWithoutPreferedVehiculesNestedInput>;
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
