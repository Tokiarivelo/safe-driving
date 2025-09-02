// GENERATED CODE - DO NOT MODIFY BY HAND

part of 's3_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PresignedUrl _$PresignedUrlFromJson(Map<String, dynamic> json) => PresignedUrl(
      key: json['key'] as String,
      url: json['url'] as String,
      fileName: json['fileName'] as String?,
    );

Map<String, dynamic> _$PresignedUrlToJson(PresignedUrl instance) =>
    <String, dynamic>{
      'key': instance.key,
      'url': instance.url,
      'fileName': instance.fileName,
    };

CompleteUploadOutput _$CompleteUploadOutputFromJson(
        Map<String, dynamic> json) =>
    CompleteUploadOutput(
      key: json['key'] as String,
      url: json['url'] as String,
      success: json['success'] as bool,
      error: json['error'] as String?,
    );

Map<String, dynamic> _$CompleteUploadOutputToJson(
        CompleteUploadOutput instance) =>
    <String, dynamic>{
      'key': instance.key,
      'url': instance.url,
      'success': instance.success,
      'error': instance.error,
    };

FileMetaInput _$FileMetaInputFromJson(Map<String, dynamic> json) =>
    FileMetaInput(
      fileName: json['fileName'] as String,
      contentType: json['contentType'] as String,
      size: (json['size'] as num?)?.toInt(),
    );

Map<String, dynamic> _$FileMetaInputToJson(FileMetaInput instance) =>
    <String, dynamic>{
      'fileName': instance.fileName,
      'contentType': instance.contentType,
      'size': instance.size,
    };
