import '../../services/filters_service.dart';
import '../../models/filter_model.dart';

mixin MapFiltersMixin {
  late final FiltersService filtersService;
  late FilterModel filters;
  void notifyListeners();
  Future<void> onFiltersChanged();

  Future<void> loadFilters() async {
    filters = await filtersService.get();
    notifyListeners();
  }

  Future<void> applyFilters(FilterModel f) async {
    filters = f;
    await filtersService.save(f);
    await onFiltersChanged();
    notifyListeners();
  }

  Future<void> resetFilters() async {
    filters = filtersService.defaults();
    await filtersService.save(filters);
    await onFiltersChanged();
    notifyListeners();
  }
}
