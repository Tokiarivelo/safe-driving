import 'package:json_annotation/json_annotation.dart';

part 'vehicle_types.g.dart';

@JsonSerializable()
class CreateDriverVehicleInput {
  final String? vehicleType;
  final String? brand;
  final String? model;
  final String? licensePlate;
  final String? color;
  final int? year;
  final String? registrationNumber;

  CreateDriverVehicleInput({
    this.vehicleType,
    this.brand,
    this.model,
    this.licensePlate,
    this.color,
    this.year,
    this.registrationNumber,
  });

  factory CreateDriverVehicleInput.fromJson(Map<String, dynamic> json) =>
      _$CreateDriverVehicleInputFromJson(json);
  Map<String, dynamic> toJson() => _$CreateDriverVehicleInputToJson(this);
}

@JsonSerializable()
class UpdateDriverVehicleInput {
  final String? vehicleType;
  final String? brand;
  final String? model;
  final String? licensePlate;
  final String? color;
  final int? year;
  final String? registrationNumber;

  UpdateDriverVehicleInput({
    this.vehicleType,
    this.brand,
    this.model,
    this.licensePlate,
    this.color,
    this.year,
    this.registrationNumber,
  });

  factory UpdateDriverVehicleInput.fromJson(Map<String, dynamic> json) =>
      _$UpdateDriverVehicleInputFromJson(json);
  Map<String, dynamic> toJson() => _$UpdateDriverVehicleInputToJson(this);
}
