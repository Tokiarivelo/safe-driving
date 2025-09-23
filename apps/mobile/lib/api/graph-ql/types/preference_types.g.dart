// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'preference_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserPreferenceUpsertInput _$UserPreferenceUpsertInputFromJson(
  Map<String, dynamic> json,
) => UserPreferenceUpsertInput(
  language: json['language'] as String?,
  theme: json['theme'] as String?,
  notificationsEnabled: json['notificationsEnabled'] as bool?,
  locationEnabled: json['locationEnabled'] as bool?,
  settings: json['settings'] as Map<String, dynamic>?,
);

Map<String, dynamic> _$UserPreferenceUpsertInputToJson(
  UserPreferenceUpsertInput instance,
) => <String, dynamic>{
  'language': instance.language,
  'theme': instance.theme,
  'notificationsEnabled': instance.notificationsEnabled,
  'locationEnabled': instance.locationEnabled,
  'settings': instance.settings,
};
