// User type definitions
import 'package:json_annotation/json_annotation.dart';

part 'user_types.g.dart';

@JsonSerializable()
class User {
  final String id;
  final String email;
  final String? firstName;
  final String? lastName;
  final String? phoneNumber;
  final String? profileImageUrl;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? role;
  final bool? isActive;
  final bool? isVerified;
  final UserPreference? preference;
  final List<DriverVehicle>? vehicles;

  User({
    required this.id,
    required this.email,
    this.firstName,
    this.lastName,
    this.phoneNumber,
    this.profileImageUrl,
    required this.createdAt,
    required this.updatedAt,
    this.role,
    this.isActive,
    this.isVerified,
    this.preference,
    this.vehicles,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

@JsonSerializable()
class UserPreference {
  final String id;
  final String userId;
  final String? language;
  final String? theme;
  final bool? notificationsEnabled;
  final bool? locationEnabled;
  final Map<String, dynamic>? settings;
  final DateTime createdAt;
  final DateTime updatedAt;

  UserPreference({
    required this.id,
    required this.userId,
    this.language,
    this.theme,
    this.notificationsEnabled,
    this.locationEnabled,
    this.settings,
    required this.createdAt,
    required this.updatedAt,
  });

  factory UserPreference.fromJson(Map<String, dynamic> json) => 
      _$UserPreferenceFromJson(json);
  Map<String, dynamic> toJson() => _$UserPreferenceToJson(this);
}

@JsonSerializable()
class DriverVehicle {
  final String id;
  final String userId;
  final String? vehicleType;
  final String? brand;
  final String? model;
  final String? licensePlate;
  final String? color;
  final int? year;
  final String? registrationNumber;
  final DateTime createdAt;
  final DateTime updatedAt;

  DriverVehicle({
    required this.id,
    required this.userId,
    this.vehicleType,
    this.brand,
    this.model,
    this.licensePlate,
    this.color,
    this.year,
    this.registrationNumber,
    required this.createdAt,
    required this.updatedAt,
  });

  factory DriverVehicle.fromJson(Map<String, dynamic> json) => 
      _$DriverVehicleFromJson(json);
  Map<String, dynamic> toJson() => _$DriverVehicleToJson(this);
}
