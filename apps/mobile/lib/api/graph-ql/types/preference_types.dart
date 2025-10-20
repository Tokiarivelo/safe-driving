// Preference type definitions
import 'package:json_annotation/json_annotation.dart';

part 'preference_types.g.dart';

@JsonSerializable()
class UserPreferenceUpsertInput {
  final String? language;
  final String? theme;
  final bool? notificationsEnabled;
  final bool? locationEnabled;
  final Map<String, dynamic>? settings;

  UserPreferenceUpsertInput({
    this.language,
    this.theme,
    this.notificationsEnabled,
    this.locationEnabled,
    this.settings,
  });

  factory UserPreferenceUpsertInput.fromJson(Map<String, dynamic> json) =>
      _$UserPreferenceUpsertInputFromJson(json);
  Map<String, dynamic> toJson() => _$UserPreferenceUpsertInputToJson(this);
}
