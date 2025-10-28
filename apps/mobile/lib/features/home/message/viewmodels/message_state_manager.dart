import 'dart:ui';
import 'package:shared_preferences/shared_preferences.dart';

class MessageStateManager {
  String? currentUserId;
  bool _isLoading = false;
  bool _userIdLoaded = false;
  int _selectedTab = 0;
  String _searchQuery = '';

  bool get isLoading => _isLoading;
  int get selectedTab => _selectedTab;
  String get searchQuery => _searchQuery;
  bool get userIdLoaded => _userIdLoaded;

  Future<void> loadUserId(VoidCallback notifyListeners) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      currentUserId = prefs.getString('userId');
      _userIdLoaded = true;
      print('UserID chargé depuis SharedPreferences: $currentUserId');
      notifyListeners();
    } catch (e) {
      print('Erreur chargement UserID: $e');
      _userIdLoaded = true;
      notifyListeners();
    }
  }

  void setLoading(bool loading, VoidCallback notifyListeners) {
    _isLoading = loading;
    notifyListeners();
  }

  void selectTab(int index, VoidCallback notifyListeners) {
    _selectedTab = index;
    notifyListeners();
  }

  void searchMessages(String query, VoidCallback notifyListeners) {
    _searchQuery = query;
    notifyListeners();
  }

  void markAsRead(VoidCallback notifyListeners) {
    notifyListeners();
  }
}
