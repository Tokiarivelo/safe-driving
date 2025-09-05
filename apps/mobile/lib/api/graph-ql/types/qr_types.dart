// QR code type definitions
import 'package:json_annotation/json_annotation.dart';

part 'qr_types.g.dart';

enum QrType {
  @JsonValue('png')
  png,
  @JsonValue('svg')
  svg,
}

@JsonSerializable()
class QrCodeResponse {
  final String dataUrl;
  final String? userId;
  final String? type;

  QrCodeResponse({
    required this.dataUrl,
    this.userId,
    this.type,
  });

  factory QrCodeResponse.fromJson(Map<String, dynamic> json) => 
      _$QrCodeResponseFromJson(json);
  Map<String, dynamic> toJson() => _$QrCodeResponseToJson(this);
}
