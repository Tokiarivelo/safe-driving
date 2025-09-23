import 'package:shared_preferences/shared_preferences.dart';
import 'package:safe_driving/core/constants/constants.dart';

class FilterModel {
  final double radiusKm;
  final String? vehicleType;
  final int? passengers;
  final bool? babySeat;
  final String? lang;
  final bool? animals;

  const FilterModel({
    required this.radiusKm,
    this.vehicleType,
    this.passengers,
    this.babySeat,
    this.lang,
    this.animals,
  });

  factory FilterModel.defaults() => const FilterModel(radiusKm: 5);

  FilterModel copyWith({
    double? radiusKm,
    String? vehicleType,
    int? passengers,
    bool? babySeat,
    String? lang,
    bool? animals,
  }) {
    return FilterModel(
      radiusKm: radiusKm ?? this.radiusKm,
      vehicleType: vehicleType ?? this.vehicleType,
      passengers: passengers ?? this.passengers,
      babySeat: babySeat ?? this.babySeat,
      lang: lang ?? this.lang,
      animals: animals ?? this.animals,
    );
  }

  Map<String, dynamic> toMap() => {
        'radiusKm': radiusKm,
        'vehicleType': vehicleType,
        'passengers': passengers,
        'babySeat': babySeat,
        'lang': lang,
        'animals': animals,
      }..removeWhere((k, v) => v == null);

  static Future<FilterModel> fromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getBool(filtersSavedV7) ?? false;
    if (!saved) return FilterModel.defaults();
    final r = prefs.getDouble(filtersRadiusKm) ?? 5;
    final vt = prefs.getString(filtersVehicleType);
    final p = prefs.getInt(filtersPassengers);
    final b = prefs.getBool(filtersBabySeat);
    final l = prefs.getString(filtersLang);
    final a = prefs.getBool(filtersAnimals);
    return FilterModel(
      radiusKm: r,
      vehicleType: vt,
      passengers: p,
      babySeat: b,
      lang: l,
      animals: a,
    );
  }

  static Future<void> toPrefs(FilterModel f) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(filtersSavedV7, true);
    await prefs.setDouble(filtersRadiusKm, f.radiusKm);
    if (f.vehicleType != null) {
      await prefs.setString(filtersVehicleType, f.vehicleType!);
    } else {
      await prefs.remove(filtersVehicleType);
    }
    if (f.passengers != null) {
      await prefs.setInt(filtersPassengers, f.passengers!);
    } else {
      await prefs.remove(filtersPassengers);
    }
    if (f.babySeat != null) {
      await prefs.setBool(filtersBabySeat, f.babySeat!);
    } else {
      await prefs.remove(filtersBabySeat);
    }
    if (f.lang != null) {
      await prefs.setString(filtersLang, f.lang!);
    } else {
      await prefs.remove(filtersLang);
    }
    if (f.animals != null) {
      await prefs.setBool(filtersAnimals, f.animals!);
    } else {
      await prefs.remove(filtersAnimals);
    }
  }
}