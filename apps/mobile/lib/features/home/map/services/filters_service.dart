import '../data/local/filters_local_data_source.dart';
import '../models/filter_model.dart';

class FiltersService {
  final FiltersLocalDataSource _ds;
  FiltersService(this._ds);

  Future<FilterModel> get() => _ds.getFilters();
  Future<void> save(FilterModel f) => _ds.saveFilters(f);
  FilterModel defaults() => FilterModel.defaults();
}
