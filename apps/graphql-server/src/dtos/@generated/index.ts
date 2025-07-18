import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum VehicleTypeScalarFieldEnum {
    id = "id",
    name = "name"
}

export enum UserImageScalarFieldEnum {
    id = "id",
    url = "url",
    type = "type",
    userId = "userId"
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
registerEnumType(NullsOrder, { name: 'NullsOrder', description: undefined })
registerEnumType(QueryMode, { name: 'QueryMode', description: undefined })
registerEnumType(SortOrder, { name: 'SortOrder', description: undefined })
registerEnumType(TransactionIsolationLevel, { name: 'TransactionIsolationLevel', description: undefined })
registerEnumType(RefreshTokenScalarFieldEnum, { name: 'RefreshTokenScalarFieldEnum', description: undefined })
registerEnumType(RoleScalarFieldEnum, { name: 'RoleScalarFieldEnum', description: undefined })
registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
registerEnumType(UserImageScalarFieldEnum, { name: 'UserImageScalarFieldEnum', description: undefined })
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
    @Field(() => String, {nullable:false})
    username!: string;
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
export class UserCreateOrConnectWithoutVehiclesInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
    @Field(() => UserCreateWithoutVehiclesInput, {nullable:false})
    @Type(() => UserCreateWithoutVehiclesInput)
    create!: InstanceType<typeof UserCreateWithoutVehiclesInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => UserImageCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageCreateNestedManyWithoutUserInput>;
    @Field(() => RoleCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutUserInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:false})
    isVerified!: boolean;
    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;
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
    @Field(() => RefreshTokenOrderByRelationAggregateInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenOrderByRelationAggregateInput>;
    @Field(() => UserImageOrderByRelationAggregateInput, {nullable:true})
    images?: InstanceType<typeof UserImageOrderByRelationAggregateInput>;
    @Field(() => RoleOrderByRelationAggregateInput, {nullable:true})
    Role?: InstanceType<typeof RoleOrderByRelationAggregateInput>;
    @Field(() => DriverVehicleOrderByRelationAggregateInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleOrderByRelationAggregateInput>;
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
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    username?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    password?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeWithAggregatesFilter>;
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
    @Field(() => StringFilter, {nullable:true})
    username?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    password?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {nullable:true})
    isVerified?: boolean;
    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
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
    @Field(() => String, {nullable:false})
    username!: string;
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
    @Field(() => UserImageUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedCreateNestedManyWithoutUserInput>;
    @Field(() => RoleUncheckedCreateNestedManyWithoutUsersInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedCreateNestedManyWithoutUsersInput>;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutUserInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUncheckedUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUncheckedUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUncheckedUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
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
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isVerified?: InstanceType<typeof BoolFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFieldUpdateOperationsInput>;
    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenUpdateManyWithoutUserNestedInput>;
    @Field(() => UserImageUpdateManyWithoutUserNestedInput, {nullable:true})
    images?: InstanceType<typeof UserImageUpdateManyWithoutUserNestedInput>;
    @Field(() => RoleUpdateManyWithoutUsersNestedInput, {nullable:true})
    Role?: InstanceType<typeof RoleUpdateManyWithoutUsersNestedInput>;
    @Field(() => DriverVehicleUpdateManyWithoutUserNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutUserNestedInput>;
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
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => RefreshTokenListRelationFilter, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenListRelationFilter>;
    @Field(() => UserImageListRelationFilter, {nullable:true})
    images?: InstanceType<typeof UserImageListRelationFilter>;
    @Field(() => RoleListRelationFilter, {nullable:true})
    Role?: InstanceType<typeof RoleListRelationFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
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
    @Field(() => StringFilter, {nullable:true})
    username?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    password?: InstanceType<typeof StringFilter>;
    @Field(() => BoolFilter, {nullable:true})
    isVerified?: InstanceType<typeof BoolFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: InstanceType<typeof DateTimeFilter>;
    @Field(() => RefreshTokenListRelationFilter, {nullable:true})
    tokens?: InstanceType<typeof RefreshTokenListRelationFilter>;
    @Field(() => UserImageListRelationFilter, {nullable:true})
    images?: InstanceType<typeof UserImageListRelationFilter>;
    @Field(() => RoleListRelationFilter, {nullable:true})
    Role?: InstanceType<typeof RoleListRelationFilter>;
    @Field(() => DriverVehicleListRelationFilter, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleListRelationFilter>;
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
    @Field(() => String, {nullable:false})
    username!: string;
    @Field(() => String, {nullable:false})
    password!: string;
    @Field(() => Boolean, {defaultValue:false,nullable:false})
    isVerified!: boolean;
    @Field(() => Date, {nullable:false})
    createdAt!: Date;
    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
    @Field(() => [RefreshToken], {nullable:true})
    tokens?: Array<RefreshToken>;
    @Field(() => [UserImage], {nullable:true})
    images?: Array<UserImage>;
    @Field(() => [Role], {nullable:true})
    Role?: Array<Role>;
    @Field(() => [DriverVehicle], {nullable:true})
    vehicles?: Array<DriverVehicle>;
    @Field(() => UserCount, {nullable:false})
    _count?: InstanceType<typeof UserCount>;
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
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
    @Field(() => Boolean, {nullable:true})
    _all?: true;
}

@ObjectType()
export class UserImageCountAggregate {
    @Field(() => Int, {nullable:false})
    id!: number;
    @Field(() => Int, {nullable:false})
    url!: number;
    @Field(() => Int, {nullable:false})
    type!: number;
    @Field(() => Int, {nullable:false})
    userId!: number;
    @Field(() => Int, {nullable:false})
    _all!: number;
}

@InputType()
export class UserImageCountOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
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
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
}

@InputType()
export class UserImageCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
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
export class UserImageCreateOrConnectWithoutUserInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageCreateWithoutUserInput, {nullable:false})
    @Type(() => UserImageCreateWithoutUserInput)
    create!: InstanceType<typeof UserImageCreateWithoutUserInput>;
}

@InputType()
export class UserImageCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
}

@InputType()
export class UserImageCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
    @Field(() => UserCreateNestedOneWithoutImagesInput, {nullable:false})
    user!: InstanceType<typeof UserCreateNestedOneWithoutImagesInput>;
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
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
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
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
}

@ObjectType()
export class UserImageMaxAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
}

@InputType()
export class UserImageMaxOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
}

@InputType()
export class UserImageMinAggregateInput {
    @Field(() => Boolean, {nullable:true})
    id?: true;
    @Field(() => Boolean, {nullable:true})
    url?: true;
    @Field(() => Boolean, {nullable:true})
    type?: true;
    @Field(() => Boolean, {nullable:true})
    userId?: true;
}

@ObjectType()
export class UserImageMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:true})
    url?: string;
    @Field(() => String, {nullable:true})
    type?: string;
    @Field(() => String, {nullable:true})
    userId?: string;
}

@InputType()
export class UserImageMinOrderByAggregateInput {
    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
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
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
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
    url?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    type?: `${SortOrder}`;
    @Field(() => SortOrder, {nullable:true})
    userId?: `${SortOrder}`;
    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    user?: InstanceType<typeof UserOrderByWithRelationInput>;
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
    url?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    type?: InstanceType<typeof StringWithAggregatesFilter>;
    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: InstanceType<typeof StringWithAggregatesFilter>;
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
    url?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    type?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
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
export class UserImageUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
}

@InputType()
export class UserImageUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
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
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
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
export class UserImageUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => UserImageWhereUniqueInput, {nullable:false})
    @Type(() => UserImageWhereUniqueInput)
    where!: Prisma.AtLeast<UserImageWhereUniqueInput, 'id'>;
    @Field(() => UserImageUpdateWithoutUserInput, {nullable:false})
    @Type(() => UserImageUpdateWithoutUserInput)
    data!: InstanceType<typeof UserImageUpdateWithoutUserInput>;
}

@InputType()
export class UserImageUpdateWithoutUserInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class UserImageUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    url?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    type?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => UserUpdateOneRequiredWithoutImagesNestedInput, {nullable:true})
    user?: InstanceType<typeof UserUpdateOneRequiredWithoutImagesNestedInput>;
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
    url?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    type?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
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
    url?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    type?: InstanceType<typeof StringFilter>;
    @Field(() => StringFilter, {nullable:true})
    userId?: InstanceType<typeof StringFilter>;
    @Field(() => UserScalarRelationFilter, {nullable:true})
    user?: InstanceType<typeof UserScalarRelationFilter>;
}

@ObjectType()
export class UserImage {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    url!: string;
    @Field(() => String, {nullable:false})
    type!: string;
    @Field(() => String, {nullable:false})
    userId!: string;
    @Field(() => User, {nullable:false})
    user?: InstanceType<typeof User>;
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
}

@InputType()
export class VehicleTypeCreateManyInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
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
export class VehicleTypeCreateOrConnectWithoutVehiclesInput {
    @Field(() => VehicleTypeWhereUniqueInput, {nullable:false})
    @Type(() => VehicleTypeWhereUniqueInput)
    where!: Prisma.AtLeast<VehicleTypeWhereUniqueInput, 'id' | 'name'>;
    @Field(() => VehicleTypeCreateWithoutVehiclesInput, {nullable:false})
    @Type(() => VehicleTypeCreateWithoutVehiclesInput)
    create!: InstanceType<typeof VehicleTypeCreateWithoutVehiclesInput>;
}

@InputType()
export class VehicleTypeCreateWithoutVehiclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class VehicleTypeCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleCreateNestedManyWithoutTypeInput>;
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
export class VehicleTypeUncheckedCreateWithoutVehiclesInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
}

@InputType()
export class VehicleTypeUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => DriverVehicleUncheckedCreateNestedManyWithoutTypeInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedCreateNestedManyWithoutTypeInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateManyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateWithoutVehiclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleTypeUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUncheckedUpdateManyWithoutTypeNestedInput>;
}

@InputType()
export class VehicleTypeUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
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
export class VehicleTypeUpdateWithoutVehiclesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
}

@InputType()
export class VehicleTypeUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: InstanceType<typeof StringFieldUpdateOperationsInput>;
    @Field(() => DriverVehicleUpdateManyWithoutTypeNestedInput, {nullable:true})
    vehicles?: InstanceType<typeof DriverVehicleUpdateManyWithoutTypeNestedInput>;
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
}

@ObjectType()
export class VehicleType {
    @Field(() => String, {nullable:false})
    id!: string;
    @Field(() => String, {nullable:false})
    name!: string;
    @Field(() => [DriverVehicle], {nullable:true})
    vehicles?: Array<DriverVehicle>;
    @Field(() => VehicleTypeCount, {nullable:false})
    _count?: InstanceType<typeof VehicleTypeCount>;
}
