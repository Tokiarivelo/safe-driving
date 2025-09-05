// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vehicle_type_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

VehicleType _$VehicleTypeFromJson(Map<String, dynamic> json) => VehicleType(
      id: json['id'] as String,
      name: json['name'] as String,
      icon: json['icon'] as String?,
      description: json['description'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$VehicleTypeToJson(VehicleType instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'icon': instance.icon,
      'description': instance.description,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

VehicleTypeCreateInput _$VehicleTypeCreateInputFromJson(
        Map<String, dynamic> json) =>
    VehicleTypeCreateInput(
      name: json['name'] as String,
      icon: json['icon'] as String?,
      description: json['description'] as String?,
    );

Map<String, dynamic> _$VehicleTypeCreateInputToJson(
        VehicleTypeCreateInput instance) =>
    <String, dynamic>{
      'name': instance.name,
      'icon': instance.icon,
      'description': instance.description,
    };

VehicleTypeUpdateInput _$VehicleTypeUpdateInputFromJson(
        Map<String, dynamic> json) =>
    VehicleTypeUpdateInput(
      name: json['name'] as String?,
      icon: json['icon'] as String?,
      description: json['description'] as String?,
    );

Map<String, dynamic> _$VehicleTypeUpdateInputToJson(
        VehicleTypeUpdateInput instance) =>
    <String, dynamic>{
      'name': instance.name,
      'icon': instance.icon,
      'description': instance.description,
    };

VehicleTypeWhereInput _$VehicleTypeWhereInputFromJson(
        Map<String, dynamic> json) =>
    VehicleTypeWhereInput(
      id: json['id'] as String?,
      name: json['name'] as String?,
    );

Map<String, dynamic> _$VehicleTypeWhereInputToJson(
        VehicleTypeWhereInput instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
    };
