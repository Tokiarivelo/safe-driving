// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'qr_types.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

QrCodeResponse _$QrCodeResponseFromJson(Map<String, dynamic> json) =>
    QrCodeResponse(
      dataUrl: json['dataUrl'] as String,
      userId: json['userId'] as String?,
      type: json['type'] as String?,
    );

Map<String, dynamic> _$QrCodeResponseToJson(QrCodeResponse instance) =>
    <String, dynamic>{
      'dataUrl': instance.dataUrl,
      'userId': instance.userId,
      'type': instance.type,
    };
