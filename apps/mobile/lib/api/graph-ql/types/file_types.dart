// File type definitions
import 'package:json_annotation/json_annotation.dart';

part 'file_types.g.dart';

@JsonSerializable()
class File {
  final String id;
  final String userId;
  final String fileName;
  final String fileUrl;
  final String? fileType;
  final int? fileSize;
  final String? mimeType;
  final Map<String, dynamic>? metadata;
  final DateTime createdAt;
  final DateTime updatedAt;

  File({
    required this.id,
    required this.userId,
    required this.fileName,
    required this.fileUrl,
    this.fileType,
    this.fileSize,
    this.mimeType,
    this.metadata,
    required this.createdAt,
    required this.updatedAt,
  });

  factory File.fromJson(Map<String, dynamic> json) => _$FileFromJson(json);
  Map<String, dynamic> toJson() => _$FileToJson(this);
}

@JsonSerializable()
class FileCreateInput {
  final String userId;
  final String fileName;
  final String fileUrl;
  final String? fileType;
  final int? fileSize;
  final String? mimeType;
  final Map<String, dynamic>? metadata;

  FileCreateInput({
    required this.userId,
    required this.fileName,
    required this.fileUrl,
    this.fileType,
    this.fileSize,
    this.mimeType,
    this.metadata,
  });

  factory FileCreateInput.fromJson(Map<String, dynamic> json) =>
      _$FileCreateInputFromJson(json);
  Map<String, dynamic> toJson() => _$FileCreateInputToJson(this);
}

@JsonSerializable()
class FileUpdateInput {
  final String? fileName;
  final String? fileUrl;
  final String? fileType;
  final int? fileSize;
  final String? mimeType;
  final Map<String, dynamic>? metadata;

  FileUpdateInput({
    this.fileName,
    this.fileUrl,
    this.fileType,
    this.fileSize,
    this.mimeType,
    this.metadata,
  });

  factory FileUpdateInput.fromJson(Map<String, dynamic> json) =>
      _$FileUpdateInputFromJson(json);
  Map<String, dynamic> toJson() => _$FileUpdateInputToJson(this);
}
