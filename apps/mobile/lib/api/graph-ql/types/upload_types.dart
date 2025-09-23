// Upload type definitions
import 'package:json_annotation/json_annotation.dart';

part 'upload_types.g.dart';

@JsonSerializable()
class FileUploadResult {
  final String url;

  FileUploadResult({required this.url});

  factory FileUploadResult.fromJson(Map<String, dynamic> json) =>
      _$FileUploadResultFromJson(json);
  Map<String, dynamic> toJson() => _$FileUploadResultToJson(this);
}

// Ces classes sont maintenant définies dans s3_types.dart
// pour éviter les conflits d'export

enum ImageType {
  @JsonValue('PROFILE')
  profile,
  @JsonValue('DOCUMENT')
  document,
  @JsonValue('VEHICLE')
  vehicle,
  @JsonValue('LICENSE')
  license,
  @JsonValue('OTHER')
  other,
}
