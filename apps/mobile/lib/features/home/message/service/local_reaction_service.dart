import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class LocalReactionService with ChangeNotifier {
  final Map<String, List<Map<String, dynamic>>> _reactions = {};
  String _currentUserId = 'local_user_1';

  static const String _storageKey = 'message_reactions';

  LocalReactionService() {
    _loadReactionsFromStorage();
  }

  List<Map<String, dynamic>> getReactionsForMessage(String messageId) {
    return _reactions[messageId] ?? [];
  }

  Future<void> _loadReactionsFromStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final storedData = prefs.getString(_storageKey);

      if (storedData != null) {
        final Map<String, dynamic> decoded = json.decode(storedData);
        _reactions.clear();

        decoded.forEach((messageId, reactionsList) {
          if (reactionsList is List) {
            _reactions[messageId] = reactionsList.cast<Map<String, dynamic>>();
          }
        });

        notifyListeners();
        print(
          'Réactions chargées depuis le stockage: ${_reactions.length} messages avec réactions',
        );
      }
    } catch (e) {
      print('Erreur chargement réactions: $e');
    }
  }

  Future<void> _saveReactionsToStorage() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final encoded = json.encode(_reactions);
      await prefs.setString(_storageKey, encoded);
      print(
        'Réactions sauvegardées: ${_reactions.length} messages avec réactions',
      );
    } catch (e) {
      print('Erreur sauvegarde réactions: $e');
    }
  }

  void toggleReaction({required String messageId, required String emoji}) {
    final existingReaction = findUserReaction(messageId, emoji);

    if (existingReaction != null) {
      removeReaction(existingReaction['id'], messageId);
    } else {
      addReaction(messageId: messageId, emoji: emoji);
    }
    _saveReactionsToStorage();
  }

  void addReaction({required String messageId, required String emoji}) {
    removeUserReaction(messageId, emoji);
    final reaction = {
      'id': 'local_${DateTime.now().millisecondsSinceEpoch}',
      'emoji': emoji,
      'userId': _currentUserId,
      'messageId': messageId,
      'createdAt': DateTime.now().toIso8601String(),
      'user': {'id': _currentUserId, 'firstName': 'Vous', 'lastName': ''},
    };

    if (!_reactions.containsKey(messageId)) {
      _reactions[messageId] = [];
    }

    _reactions[messageId]!.add(reaction);
    notifyListeners();
    _saveReactionsToStorage();
  }

  void removeReaction(String reactionId, String messageId) {
    if (_reactions.containsKey(messageId)) {
      _reactions[messageId]!.removeWhere(
        (reaction) => reaction['id'] == reactionId,
      );
      notifyListeners();
      _saveReactionsToStorage();
    }
  }

  void removeUserReaction(String messageId, String emoji) {
    if (_reactions.containsKey(messageId)) {
      _reactions[messageId]!.removeWhere(
        (reaction) =>
            reaction['userId'] == _currentUserId && reaction['emoji'] == emoji,
      );
    }
  }

  Map<String, dynamic>? findUserReaction(String messageId, String emoji) {
    if (!_reactions.containsKey(messageId)) return null;

    final reactions = _reactions[messageId]!;
    for (final reaction in reactions) {
      if (reaction['userId'] == _currentUserId && reaction['emoji'] == emoji) {
        return reaction;
      }
    }
    return null;
  }

  void setCurrentUserId(String userId) {
    _currentUserId = userId;
  }

  Map<String, int> getReactionStats(String messageId) {
    final reactions = getReactionsForMessage(messageId);
    final stats = <String, int>{};

    for (final reaction in reactions) {
      final emoji = reaction['emoji'];
      stats[emoji] = (stats[emoji] ?? 0) + 1;
    }

    return stats;
  }

  Future<void> clearAllReactions() async {
    _reactions.clear();
    notifyListeners();
    await _saveReactionsToStorage();
  }

  Future<void> clearReactionsForMessage(String messageId) async {
    _reactions.remove(messageId);
    notifyListeners();
    await _saveReactionsToStorage();
  }
}
