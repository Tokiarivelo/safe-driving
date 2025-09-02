// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vehicle_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateDriverVehicleInput _$CreateDriverVehicleInputFromJson(
        Map<String, dynamic> json) =>
    CreateDriverVehicleInput(
      vehicleType: json['vehicleType'] as String?,
      brand: json['brand'] as String?,
      model: json['model'] as String?,
      licensePlate: json['licensePlate'] as String?,
      color: json['color'] as String?,
      year: (json['year'] as num?)?.toInt(),
      registrationNumber: json['registrationNumber'] as String?,
    );

Map<String, dynamic> _$CreateDriverVehicleInputToJson(
        CreateDriverVehicleInput instance) =>
    <String, dynamic>{
      'vehicleType': instance.vehicleType,
      'brand': instance.brand,
      'model': instance.model,
      'licensePlate': instance.licensePlate,
      'color': instance.color,
      'year': instance.year,
      'registrationNumber': instance.registrationNumber,
    };

UpdateDriverVehicleInput _$UpdateDriverVehicleInputFromJson(
        Map<String, dynamic> json) =>
    UpdateDriverVehicleInput(
      vehicleType: json['vehicleType'] as String?,
      brand: json['brand'] as String?,
      model: json['model'] as String?,
      licensePlate: json['licensePlate'] as String?,
      color: json['color'] as String?,
      year: (json['year'] as num?)?.toInt(),
      registrationNumber: json['registrationNumber'] as String?,
    );

Map<String, dynamic> _$UpdateDriverVehicleInputToJson(
        UpdateDriverVehicleInput instance) =>
    <String, dynamic>{
      'vehicleType': instance.vehicleType,
      'brand': instance.brand,
      'model': instance.model,
      'licensePlate': instance.licensePlate,
      'color': instance.color,
      'year': instance.year,
      'registrationNumber': instance.registrationNumber,
    };
