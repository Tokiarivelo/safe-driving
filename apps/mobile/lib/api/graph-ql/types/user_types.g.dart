// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
  id: json['id'] as String,
  email: json['email'] as String,
  firstName: json['firstName'] as String?,
  lastName: json['lastName'] as String?,
  phoneNumber: json['phoneNumber'] as String?,
  profileImageUrl: json['profileImageUrl'] as String?,
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
  role: json['role'] as String?,
  isActive: json['isActive'] as bool?,
  isVerified: json['isVerified'] as bool?,
  preference: json['preference'] == null
      ? null
      : UserPreference.fromJson(json['preference'] as Map<String, dynamic>),
  vehicles: (json['vehicles'] as List<dynamic>?)
      ?.map((e) => DriverVehicle.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
  'id': instance.id,
  'email': instance.email,
  'firstName': instance.firstName,
  'lastName': instance.lastName,
  'phoneNumber': instance.phoneNumber,
  'profileImageUrl': instance.profileImageUrl,
  'createdAt': instance.createdAt.toIso8601String(),
  'updatedAt': instance.updatedAt.toIso8601String(),
  'role': instance.role,
  'isActive': instance.isActive,
  'isVerified': instance.isVerified,
  'preference': instance.preference,
  'vehicles': instance.vehicles,
};

UserPreference _$UserPreferenceFromJson(Map<String, dynamic> json) =>
    UserPreference(
      id: json['id'] as String,
      userId: json['userId'] as String,
      language: json['language'] as String?,
      theme: json['theme'] as String?,
      notificationsEnabled: json['notificationsEnabled'] as bool?,
      locationEnabled: json['locationEnabled'] as bool?,
      settings: json['settings'] as Map<String, dynamic>?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$UserPreferenceToJson(UserPreference instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'language': instance.language,
      'theme': instance.theme,
      'notificationsEnabled': instance.notificationsEnabled,
      'locationEnabled': instance.locationEnabled,
      'settings': instance.settings,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

DriverVehicle _$DriverVehicleFromJson(Map<String, dynamic> json) =>
    DriverVehicle(
      id: json['id'] as String,
      userId: json['userId'] as String,
      vehicleType: json['vehicleType'] as String?,
      brand: json['brand'] as String?,
      model: json['model'] as String?,
      licensePlate: json['licensePlate'] as String?,
      color: json['color'] as String?,
      year: (json['year'] as num?)?.toInt(),
      registrationNumber: json['registrationNumber'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$DriverVehicleToJson(DriverVehicle instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userId': instance.userId,
      'vehicleType': instance.vehicleType,
      'brand': instance.brand,
      'model': instance.model,
      'licensePlate': instance.licensePlate,
      'color': instance.color,
      'year': instance.year,
      'registrationNumber': instance.registrationNumber,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };
