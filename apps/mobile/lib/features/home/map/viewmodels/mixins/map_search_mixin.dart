import 'dart:async';
import '../../repositories/map_repository.dart';
import 'package:latlong2/latlong.dart';
import '../../models/location_models.dart';
import 'package:flutter/material.dart';

mixin MapSearchMixin {
  late final MapRepository repository;
  final TextEditingController searchController = TextEditingController();
  final TextEditingController destinationController = TextEditingController();
  bool isLoading = false;
  String? errorMessage;
  LatLng center = const LatLng(-18.8792, 47.5079);
  List<LatLng> markers = [];
  List<LatLng>? routePolyline;
  RouteGeometry? route;
  Timer? _debounce;
  void notifyListeners();

  void onStartChanged(String _) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      searchStart();
    });
  }

  Future<void> searchStart() async {
    final query = searchController.text.trim();
    if (query.isEmpty) return;
    isLoading = true;
    notifyListeners();
    try {
      final res = await repository.searchAddress(query);
      if (res != null) {
        center = LatLng(res.lat, res.lng);
        markers = [center, ...markers];
      }
    } catch (e) {
      errorMessage = e.toString();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  void clear() {
    markers = [];
    routePolyline = null;
    route = null;
    notifyListeners();
  }

  Future<void> searchDestination() async {
    final start = searchController.text.trim();
    final dest = destinationController.text.trim();
    if (dest.isEmpty) return;
    isLoading = true;
    notifyListeners();
    try {
      LatLngPoint? startPoint;
      if (start.isEmpty) {
        final s = markers.isNotEmpty ? markers.first : center;
        startPoint = LatLngPoint(s.latitude, s.longitude);
      } else {
        final startRes = await repository.searchAddress(start);
        if (startRes != null) {
          startPoint = LatLngPoint(startRes.lat, startRes.lng);
        }
      }
      final destRes = await repository.searchAddress(dest);
      if (destRes != null) {
        final destPoint = LatLngPoint(destRes.lat, destRes.lng);
        if (startPoint != null) {
          route = await repository.getRoute(startPoint, destPoint);
          routePolyline = route?.points
              .map((p) => LatLng(p.lat, p.lng))
              .toList();
        }
        center = LatLng(destRes.lat, destRes.lng);
        markers = [center];
      }
    } catch (e) {
      errorMessage = e.toString();
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
