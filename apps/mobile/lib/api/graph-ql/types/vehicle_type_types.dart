import 'package:json_annotation/json_annotation.dart';

part 'vehicle_type_types.g.dart';

@JsonSerializable()
class VehicleType {
  final String id;
  final String name;
  final String? icon;
  final String? description;
  final DateTime createdAt;
  final DateTime updatedAt;

  VehicleType({
    required this.id,
    required this.name,
    this.icon,
    this.description,
    required this.createdAt,
    required this.updatedAt,
  });

  factory VehicleType.fromJson(Map<String, dynamic> json) =>
      _$VehicleTypeFromJson(json);
  Map<String, dynamic> toJson() => _$VehicleTypeToJson(this);
}

@JsonSerializable()
class VehicleTypeCreateInput {
  final String name;
  final String? icon;
  final String? description;

  VehicleTypeCreateInput({required this.name, this.icon, this.description});

  factory VehicleTypeCreateInput.fromJson(Map<String, dynamic> json) =>
      _$VehicleTypeCreateInputFromJson(json);
  Map<String, dynamic> toJson() => _$VehicleTypeCreateInputToJson(this);
}

@JsonSerializable()
class VehicleTypeUpdateInput {
  final String? name;
  final String? icon;
  final String? description;

  VehicleTypeUpdateInput({this.name, this.icon, this.description});

  factory VehicleTypeUpdateInput.fromJson(Map<String, dynamic> json) =>
      _$VehicleTypeUpdateInputFromJson(json);
  Map<String, dynamic> toJson() => _$VehicleTypeUpdateInputToJson(this);
}

@JsonSerializable()
class VehicleTypeWhereInput {
  final String? id;
  final String? name;

  VehicleTypeWhereInput({this.id, this.name});

  factory VehicleTypeWhereInput.fromJson(Map<String, dynamic> json) =>
      _$VehicleTypeWhereInputFromJson(json);
  Map<String, dynamic> toJson() => _$VehicleTypeWhereInputToJson(this);
}
