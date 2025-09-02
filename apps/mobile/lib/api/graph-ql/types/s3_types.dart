// S3 type definitions
import 'package:json_annotation/json_annotation.dart';

part 's3_types.g.dart';

@JsonSerializable()
class PresignedUrl {
  final String key;
  final String url;
  final String? fileName;

  PresignedUrl({
    required this.key,
    required this.url,
    this.fileName,
  });

  factory PresignedUrl.fromJson(Map<String, dynamic> json) => 
      _$PresignedUrlFromJson(json);
  Map<String, dynamic> toJson() => _$PresignedUrlToJson(this);
}

@JsonSerializable()
class CompleteUploadOutput {
  final String key;
  final String url;
  final bool success;
  final String? error;

  CompleteUploadOutput({
    required this.key,
    required this.url,
    required this.success,
    this.error,
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

  FileMetaInput({
    required this.fileName,
    required this.contentType,
    this.size,
  });

  factory FileMetaInput.fromJson(Map<String, dynamic> json) => 
      _$FileMetaInputFromJson(json);
  Map<String, dynamic> toJson() => _$FileMetaInputToJson(this);
}
