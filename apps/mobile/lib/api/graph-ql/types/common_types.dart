import 'package:json_annotation/json_annotation.dart';

part 'common_types.g.dart';

@JsonSerializable()
class PaginationArgs {
  final int? take;
  final int? skip;
  final String? cursor;

  PaginationArgs({this.take, this.skip, this.cursor});

  factory PaginationArgs.fromJson(Map<String, dynamic> json) =>
      _$PaginationArgsFromJson(json);
  Map<String, dynamic> toJson() => _$PaginationArgsToJson(this);
}

@JsonSerializable()
class WhereInput {
  final Map<String, dynamic>? where;

  WhereInput({this.where});

  factory WhereInput.fromJson(Map<String, dynamic> json) =>
      _$WhereInputFromJson(json);
  Map<String, dynamic> toJson() => _$WhereInputToJson(this);
}

@JsonSerializable()
class OrderByInput {
  final Map<String, dynamic>? orderBy;

  OrderByInput({this.orderBy});

  factory OrderByInput.fromJson(Map<String, dynamic> json) =>
      _$OrderByInputFromJson(json);
  Map<String, dynamic> toJson() => _$OrderByInputToJson(this);
}

enum Role {
  @JsonValue('ADMIN')
  admin,
  @JsonValue('USER')
  user,
  @JsonValue('DRIVER')
  driver,
}

enum VehicleTypeEnum {
  @JsonValue('CAR')
  car,
  @JsonValue('MOTORCYCLE')
  motorcycle,
  @JsonValue('TRUCK')
  truck,
  @JsonValue('BUS')
  bus,
  @JsonValue('VAN')
  van,
  @JsonValue('OTHER')
  other,
}
