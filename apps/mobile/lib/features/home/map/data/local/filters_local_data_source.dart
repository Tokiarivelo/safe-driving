import 'package:shared_preferences/shared_preferences.dart';
import 'package:safe_driving/core/constants/constants.dart';
import '../../models/filter_model.dart';

class FiltersLocalDataSource {
  Future<FilterModel> getFilters() async {
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

  Future<void> saveFilters(FilterModel f) async {
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
