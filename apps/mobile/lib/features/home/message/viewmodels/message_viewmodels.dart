import 'dart:async';

import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import 'package:safe_driving/features/home/message/service/local_reaction_service.dart';

class MessageViewmodels with ChangeNotifier {
  final ConversationService _conversationService;
  final MessageService _messageService;
  final LocalReactionService _reactionService;

  ConversationService get conversationService => _conversationService;

  List<dynamic> _conversations = [];
  List<dynamic> _messages = [];
  bool _isLoading = false;
  int _selectedTab = 0;
  String _searchQuery = '';
  String? currentUserId;
  List<dynamic> _searchResults = [];
  bool _isSearching = false;
  String _currentSearchQuery = '';
  Timer? _searchDebounceTimer;

  MessageViewmodels({
    required ConversationService conversationService,
    required MessageService messageService,
    required LocalReactionService reactionService,
  }) : _conversationService = conversationService,
       _messageService = messageService,
       _reactionService = reactionService;

  List<dynamic> get conversations => _conversations;
  List<dynamic> get messages => _messages;
  bool get isLoading => _isLoading;
  int get selectedTab => _selectedTab;
  List<dynamic> get searchResults => _searchResults;
  bool get isSearching => _isSearching;
  String get currentSearchQuery => _currentSearchQuery;

  String get searchQuery => _searchQuery;

  // === MÉTHODES POUR LES RÉACTIONS ===
  List<Map<String, dynamic>> getReactionsForMessage(String messageId) {
    return _reactionService.getReactionsForMessage(messageId);
  }

  void toggleReaction({required String messageId, required String emoji}) {
    _reactionService.toggleReaction(messageId: messageId, emoji: emoji);
    notifyListeners();
  }

  Future<void> initializeReactions() async {
    print('Initialisation des réactions...');
  }

  void setCurrentUserId(String id) {
    currentUserId = id;
    _reactionService.setCurrentUserId(id);
    notifyListeners();
  }

  void addReaction({required String messageId, required String emoji}) {
    _reactionService.addReaction(messageId: messageId, emoji: emoji);
    notifyListeners();
  }

  void removeReaction(String reactionId, String messageId) {
    _reactionService.removeReaction(reactionId, messageId);
    notifyListeners();
  }

  Map<String, dynamic>? findUserReaction(String messageId, String emoji) {
    return _reactionService.findUserReaction(messageId, emoji);
  }

  Map<String, int> getReactionStats(String messageId) {
    return _reactionService.getReactionStats(messageId);
  }

  List<dynamic> get filteredMessages {
    var filtered = _messages;

    if (_searchQuery.isNotEmpty) {
      filtered = filtered
          .where(
            (message) => message['content'].toLowerCase().contains(
              _searchQuery.toLowerCase(),
            ),
          )
          .toList();
    }

    switch (_selectedTab) {
      case 1: // Non lus
        filtered = filtered
            .where((message) => message['readAt'] == null)
            .toList();
        break;
      case 2: // Lus
        filtered = filtered
            .where((message) => message['readAt'] != null)
            .toList();
        break;
      case 3: // Archivés
        break;
    }

    return filtered;
  }

  Map<String, List<dynamic>> _messagesByConversation = {};

  List<dynamic> getMessagesFor(String conversationId) =>
      _messagesByConversation[conversationId] ?? [];

  Future<void> loadConversations() async {
    _setLoading(true);
    try {
      _conversations = await _conversationService.getConversations() ?? [];
      notifyListeners();
    } catch (e) {
      print('Erreur chargement conversations: $e');
    } finally {
      _setLoading(false);
    }
  }

  Future<void> loadMessages({required String conversationId}) async {
    _setLoading(true);
    try {
      print('loadMessages appelé pour: $conversationId');
      final fetched = await _messageService.getMessages(conversationId);
      print('Messages récupérés du service: ${fetched?.length}');

      if (fetched != null) {
        for (var msg in fetched) {
          print('   - ${msg['content']} (id: ${msg['id']})');
        }
      }

      _messagesByConversation[conversationId] = fetched ?? [];
      print(
        'Messages stockés: ${_messagesByConversation[conversationId]?.length}',
      );
      notifyListeners();
    } catch (e) {
      print('Erreur chargement messages: $e');
    } finally {
      _setLoading(false);
    }
  }

  Map<String, dynamic> _mapMessage(dynamic rawMessage) {
    return {
      'id': rawMessage['id'],
      'conversationId': rawMessage['conversationId'],
      'content': rawMessage['content'],
      'createdAt': rawMessage['createdAt'],
      'sender': {
        'id': rawMessage['sender']['id'],
        'firstName': rawMessage['sender']['firstName'],
        'lastName': rawMessage['sender']['lastName'],
        'email': rawMessage['sender']['email'],
      },
    };
  }

  List<dynamic> getMessagesForConversation(String conversationId) {
    final messages = _messagesByConversation[conversationId] ?? [];
    print('getMessagesForConversation:');
    print('Conversation: $conversationId');
    print('Messages trouvés: ${messages.length}');
    print('Toutes les conversations: ${_messagesByConversation.keys}');

    if (messages.isNotEmpty) {
      for (var msg in messages) {
        print('     - ${msg['content']} (sender: ${msg['sender']?['id']})');
      }
    }

    return messages;
  }

  Future<void> sendMessage({
    required String conversationId,
    required String content,
  }) async {
    if (content.trim().isEmpty) return;

    try {
      final sentMessage = await _messageService.sendMessage(
        content: content,
        conversationId: conversationId,
      );

      if (sentMessage != null) {
        final mapped = _mapMessage(sentMessage);
        final messages = _messagesByConversation[conversationId] ?? [];
        messages.add(mapped);
        _messagesByConversation[conversationId] = messages;
        notifyListeners();
      }
    } catch (e) {
      print('Erreur envoi message: $e');
    }
  }

  Future<void> deleteConversation(String conversationId) async {
    try {
      final success = await _conversationService.deleteConversation(
        conversationId,
      );

      if (success) {
        _conversations.removeWhere((conv) => conv['id'] == conversationId);
        _messagesByConversation.remove(conversationId);
        notifyListeners();

        print('Conversation supprimée localement: $conversationId');
      }
    } catch (e) {
      print('Erreur suppression conversation: $e');
    }
  }

  Future<void> archiveConversation(String conversationId) async {
    try {
      final success = await _conversationService.archiveConversation(
        conversationId,
      );

      if (success) {
        final conversation = _conversations.firstWhere(
          (conv) => conv['id'] == conversationId,
          orElse: () => {},
        );

        if (conversation.isNotEmpty) {
          conversation['isArchived'] = true;
          notifyListeners();
          print('Conversation archivée: $conversationId');
        }
      }
    } catch (e) {
      print('Erreur archivage conversation: $e');
    }
  }

  Future<void> updateConversationTitle(
    String conversationId,
    String newTitle,
  ) async {
    try {
      final updated = await _conversationService.updateConversation(
        conversationId: conversationId,
        input: {'title': newTitle},
      );

      if (updated != null) {
        final conversation = _conversations.firstWhere(
          (conv) => conv['id'] == conversationId,
          orElse: () => {},
        );

        if (conversation.isNotEmpty) {
          conversation['title'] = newTitle;
          notifyListeners();
          print('Titre mis à jour: $newTitle');
        }
      }
    } catch (e) {
      print('Erreur update titre: $e');
    }
  }

  Future<void> editMessage({
    required String conversationId,
    required String messageId,
    required String newContent,
  }) async {
    try {
      print('Modification message: $messageId');

      final editedMessage = await _messageService.editMessage(
        messageId: messageId,
        content: newContent,
      );

      if (editedMessage != null) {
        // Met à jour le message localement
        final messages = _messagesByConversation[conversationId] ?? [];
        final messageIndex = messages.indexWhere(
          (msg) => msg['id'] == messageId,
        );

        if (messageIndex != -1) {
          messages[messageIndex] = {
            ...messages[messageIndex],
            'content': newContent,
            'edited': true,
            'editedAt': DateTime.now().toIso8601String(),
          };

          _messagesByConversation[conversationId] = messages;
          notifyListeners();
          print('Message modifié localement');
        }
      }
    } catch (e) {
      print('Erreur modification message: $e');
    }
  }

  Future<void> deleteMessage({
    required String conversationId,
    required String messageId,
  }) async {
    try {
      print('Suppression message: $messageId');

      final success = await _messageService.deleteMessage(messageId);

      if (success) {
        final messages = _messagesByConversation[conversationId] ?? [];
        messages.removeWhere((msg) => msg['id'] == messageId);

        _messagesByConversation[conversationId] = messages;
        notifyListeners();
        print('Message supprimé localement');
      }
    } catch (e) {
      print('Erreur suppression message: $e');
    }
  }

  // Méthode de recherche conversationnelle
  // Future<void> searchConversations(String query) async {
  //   if (query.isEmpty) {
  //     _isSearching = false;
  //     _searchResults.clear();
  //     _currentSearchQuery = '';
  //     notifyListeners();
  //     return;
  //   }

  //   _isSearching = true;
  //   _currentSearchQuery = query;
  //   notifyListeners();

  //   try {
  //     // Simulation de recherche - à adapter avec votre logique métier
  //     await Future.delayed(Duration(milliseconds: 300));

  //     final results = _conversations.where((conversation) {
  //       final participants = (conversation['participants'] as List?) ?? [];
  //       final lastMessage =
  //           conversation['lastMessage'] ?? conversation['latestMessage'];

  //       // Recherche dans les noms des participants
  //       bool participantMatch = participants.any((participant) {
  //         final user = participant['user'];
  //         if (user != null) {
  //           final fullName =
  //               '${user['firstName'] ?? ''} ${user['lastName'] ?? ''}'
  //                   .toLowerCase();
  //           return fullName.contains(query.toLowerCase());
  //         }
  //         return false;
  //       });

  //       // Recherche dans le dernier message
  //       bool messageMatch = false;
  //       if (lastMessage != null && lastMessage['content'] != null) {
  //         messageMatch = lastMessage['content']
  //             .toString()
  //             .toLowerCase()
  //             .contains(query.toLowerCase());
  //       }

  //       // Recherche dans le titre de la conversation
  //       bool titleMatch =
  //           conversation['title']?.toString().toLowerCase().contains(
  //             query.toLowerCase(),
  //           ) ??
  //           false;

  //       return participantMatch || messageMatch || titleMatch;
  //     }).toList();

  //     _searchResults = results;
  //   } catch (e) {
  //     print('Erreur recherche conversationnelle: $e');
  //     _searchResults = [];
  //   } finally {
  //     _isSearching = false;
  //     notifyListeners();
  //   }
  // }

  // // Méthode pour annuler la recherche
  // void cancelSearch() {
  //   _isSearching = false;
  //   _searchResults.clear();
  //   _currentSearchQuery = '';
  //   notifyListeners();
  // }

  // Méthode de recherche avec debounce
  void searchConversations(String query) {
    print('🔍 Recherche lancée: "$query"');

    // Annule le timer précédent
    _searchDebounceTimer?.cancel();

    if (query.isEmpty) {
      print('❌ Query vide - annulation recherche');
      _isSearching = false;
      _searchResults.clear();
      _currentSearchQuery = '';
      notifyListeners();
      return;
    }

    _isSearching = true;
    _currentSearchQuery = query;
    notifyListeners(); // Important: notifier immédiatement pour l'UI

    // Debounce de 300ms
    _searchDebounceTimer = Timer(Duration(milliseconds: 300), () {
      print('⏰ Timer déclenché - recherche effective');
      _performSearch(query);
    });
  }

  void _performSearch(String query) {
    try {
      print('🎯 Début recherche pour: "$query"');
      print('📊 Conversations disponibles: ${_conversations.length}');

      final results = _conversations.where((conversation) {
        final participants = (conversation['participants'] as List?) ?? [];
        final lastMessage =
            conversation['lastMessage'] ?? conversation['latestMessage'];

        // Recherche dans les noms des participants
        bool participantMatch = false;
        for (var participant in participants) {
          if (participant is Map && participant['user'] != null) {
            final user = participant['user'];
            final firstName = user['firstName']?.toString().toLowerCase() ?? '';
            final lastName = user['lastName']?.toString().toLowerCase() ?? '';

            if (firstName.contains(query.toLowerCase()) ||
                lastName.contains(query.toLowerCase()) ||
                '$firstName $lastName'.contains(query.toLowerCase())) {
              participantMatch = true;
              break;
            }
          }
        }

        // Recherche dans le dernier message
        bool messageMatch = false;
        if (lastMessage != null && lastMessage['content'] != null) {
          final content = lastMessage['content'].toString().toLowerCase();
          messageMatch = content.contains(query.toLowerCase());
        }

        // Recherche dans le titre
        bool titleMatch =
            conversation['title']?.toString().toLowerCase().contains(
              query.toLowerCase(),
            ) ??
            false;

        return participantMatch || messageMatch || titleMatch;
      }).toList();

      print('✅ Recherche terminée - ${results.length} résultats');
      _searchResults = results;
    } catch (e) {
      print('❌ Erreur recherche: $e');
      _searchResults = [];
    } finally {
      _isSearching = false;
      notifyListeners();
    }
  }

  void cancelSearch() {
    print('🗑️ Recherche annulée');
    _searchDebounceTimer?.cancel();
    _isSearching = false;
    _searchResults.clear();
    _currentSearchQuery = '';
    notifyListeners();
  }

  // Nettoyage
  @override
  void dispose() {
    _searchDebounceTimer?.cancel();
    super.dispose();
  }

  void selectTab(int index) {
    _selectedTab = index;
    notifyListeners();
  }

  void searchMessages(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void markAsRead(dynamic message) {
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }
}
