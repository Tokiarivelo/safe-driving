// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'common_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaginationArgs _$PaginationArgsFromJson(Map<String, dynamic> json) =>
    PaginationArgs(
      take: (json['take'] as num?)?.toInt(),
      skip: (json['skip'] as num?)?.toInt(),
      cursor: json['cursor'] as String?,
    );

Map<String, dynamic> _$PaginationArgsToJson(PaginationArgs instance) =>
    <String, dynamic>{
      'take': instance.take,
      'skip': instance.skip,
      'cursor': instance.cursor,
    };

WhereInput _$WhereInputFromJson(Map<String, dynamic> json) => WhereInput(
      where: json['where'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$WhereInputToJson(WhereInput instance) =>
    <String, dynamic>{
      'where': instance.where,
    };

OrderByInput _$OrderByInputFromJson(Map<String, dynamic> json) => OrderByInput(
      orderBy: json['orderBy'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$OrderByInputToJson(OrderByInput instance) =>
    <String, dynamic>{
      'orderBy': instance.orderBy,
    };
