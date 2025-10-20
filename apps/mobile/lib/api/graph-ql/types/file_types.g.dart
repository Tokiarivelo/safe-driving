// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'file_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

File _$FileFromJson(Map<String, dynamic> json) => File(
  id: json['id'] as String,
  userId: json['userId'] as String,
  fileName: json['fileName'] as String,
  fileUrl: json['fileUrl'] as String,
  fileType: json['fileType'] as String?,
  fileSize: (json['fileSize'] as num?)?.toInt(),
  mimeType: json['mimeType'] as String?,
  metadata: json['metadata'] as Map<String, dynamic>?,
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$FileToJson(File instance) => <String, dynamic>{
  'id': instance.id,
  'userId': instance.userId,
  'fileName': instance.fileName,
  'fileUrl': instance.fileUrl,
  'fileType': instance.fileType,
  'fileSize': instance.fileSize,
  'mimeType': instance.mimeType,
  'metadata': instance.metadata,
  'createdAt': instance.createdAt.toIso8601String(),
  'updatedAt': instance.updatedAt.toIso8601String(),
};

FileCreateInput _$FileCreateInputFromJson(Map<String, dynamic> json) =>
    FileCreateInput(
      userId: json['userId'] as String,
      fileName: json['fileName'] as String,
      fileUrl: json['fileUrl'] as String,
      fileType: json['fileType'] as String?,
      fileSize: (json['fileSize'] as num?)?.toInt(),
      mimeType: json['mimeType'] as String?,
      metadata: json['metadata'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$FileCreateInputToJson(FileCreateInput instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'fileName': instance.fileName,
      'fileUrl': instance.fileUrl,
      'fileType': instance.fileType,
      'fileSize': instance.fileSize,
      'mimeType': instance.mimeType,
      'metadata': instance.metadata,
    };

FileUpdateInput _$FileUpdateInputFromJson(Map<String, dynamic> json) =>
    FileUpdateInput(
      fileName: json['fileName'] as String?,
      fileUrl: json['fileUrl'] as String?,
      fileType: json['fileType'] as String?,
      fileSize: (json['fileSize'] as num?)?.toInt(),
      mimeType: json['mimeType'] as String?,
      metadata: json['metadata'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$FileUpdateInputToJson(FileUpdateInput instance) =>
    <String, dynamic>{
      'fileName': instance.fileName,
      'fileUrl': instance.fileUrl,
      'fileType': instance.fileType,
      'fileSize': instance.fileSize,
      'mimeType': instance.mimeType,
      'metadata': instance.metadata,
    };
