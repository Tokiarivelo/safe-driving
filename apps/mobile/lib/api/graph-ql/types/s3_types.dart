// S3 type definitions
import 'package:json_annotation/json_annotation.dart';

part 's3_types.g.dart';

@JsonSerializable()
class PresignedUrl {
  final String key;
  final String url;
  final double expiresIn;

  PresignedUrl({required this.key, required this.url, required this.expiresIn});

  factory PresignedUrl.fromJson(Map<String, dynamic> json) =>
      _$PresignedUrlFromJson(json);
  Map<String, dynamic> toJson() => _$PresignedUrlToJson(this);
}

@JsonSerializable()
class CompleteUploadOutput {
  final String key;
  final String? contentType;
  final String? etag;
  final int? size;

  CompleteUploadOutput({
    required this.key,
    this.contentType,
    this.etag,
    this.size,
  });

  factory CompleteUploadOutput.fromJson(Map<String, dynamic> json) =>
      _$CompleteUploadOutputFromJson(json);
  Map<String, dynamic> toJson() => _$CompleteUploadOutputToJson(this);
}

@JsonSerializable()
class FileMetaInput {
  final String fileName;
  final String contentType;
  final int? size;

  FileMetaInput({required this.fileName, required this.contentType, this.size});

  factory FileMetaInput.fromJson(Map<String, dynamic> json) =>
      _$FileMetaInputFromJson(json);
  Map<String, dynamic> toJson() => _$FileMetaInputToJson(this);
}
