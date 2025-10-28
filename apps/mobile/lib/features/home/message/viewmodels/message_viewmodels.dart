import 'dart:async';

import 'package:flutter/material.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';

class MessageViewmodels with ChangeNotifier {
  final ConversationService _conversationService;
  final MessageService _messageService;
  ConversationService get conversationService => _conversationService;
  StreamSubscription<Map<String, dynamic>?>? _messageSubscription;

  List<dynamic> _conversations = [];
  List<dynamic> _messages = [];
  bool _isLoading = false;
  int _selectedTab = 0;
  String _searchQuery = '';

  MessageViewmodels({
    required ConversationService conversationService,
    required MessageService messageService,
  }) : _conversationService = conversationService,
       _messageService = messageService;

  List<dynamic> get conversations => _conversations;
  List<dynamic> get messages => _messages;
  bool get isLoading => _isLoading;
  int get selectedTab => _selectedTab;
  String get searchQuery => _searchQuery;

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

  // Future<void> loadConversations() async {
  //   _setLoading(true);
  //   try {
  //     _conversations = await _conversationService.getMyConversations();

  //     notifyListeners();
  //   } catch (e) {
  //     print('Erreur chargement conversations: $e');
  //   } finally {
  //     _setLoading(false);
  //   }
  // }

  Future<void> loadConversations() async {
    _setLoading(true);
    try {
      print('🔄 Début du chargement des conversations...');

      // DEBUG: Vérifier la configuration GraphQL
      await _conversationService.debugGraphQLSetup();

      // Essayer d'abord la version simple
      final conversations = await _conversationService
          .getMyConversationsSimple();

      if (conversations.isEmpty) {
        print(
          'ℹ️ Aucune conversation avec la requête simple, essai complet...',
        );
        final fullConversations = await _conversationService
            .getMyConversations();
        _conversations = fullConversations;
      } else {
        _conversations = conversations;
      }

      print('✅ ${_conversations.length} conversations chargées');
      notifyListeners();
    } catch (e) {
      print('❌ Erreur chargement conversations: $e');
      _conversations = [];
      notifyListeners();
    } finally {
      _setLoading(false);
    }
  }

  // Future<void> loadConversations() async {
  //   _setLoading(true);
  //   try {
  //     print('🔄 Début du chargement des conversations...');

  //     // Essayer d'abord la version simple
  //     final conversations = await _conversationService.getMyConversations();

  //     if (conversations.isEmpty) {
  //       print(
  //         'ℹ️ Aucune conversation avec la requête simple, essai complet...',
  //       );
  //       final fullConversations = await _conversationService
  //           .getMyConversations();
  //       _conversations = fullConversations;
  //     } else {
  //       _conversations = conversations;
  //     }

  //     print('✅ ${_conversations.length} conversations chargées');
  //     notifyListeners();
  //   } catch (e) {
  //     print('❌ Erreur chargement conversations: $e');
  //     _conversations = []; // Assurer que la liste est vide en cas d'erreur
  //     notifyListeners();
  //   } finally {
  //     _setLoading(false);
  //   }
  // }

  Future<void> loadMessages(String conversationId) async {
    if (_messagesByConversation.containsKey(conversationId)) {
      _messages = _messagesByConversation[conversationId]!;
      notifyListeners();
    }

    try {
      final fetched = await _messageService.getMessages(conversationId);

      if (fetched != null && fetched.isNotEmpty) {
        final ordered = fetched.reversed.toList();
        final current = _messagesByConversation[conversationId];
        if (current == null || current.length != ordered.length) {
          _messagesByConversation[conversationId] = ordered;
          _messages = ordered;
          notifyListeners();
        }
      }
    } catch (e) {
      print('Erreur lors du chargement des messages : $e');
    }
  }

  Future<String> loadCurrentUserId() async {
    try {
      final session = ServiceLocator.instance.get<SessionService>();
      await session.loadUserId();
      final userId = session.userId;
      if (userId == null) {
        print('❌ Aucun utilisateur connecté trouvé');
        return '';
      }
      print('✅ Utilisateur connecté: $userId');
      return userId;
    } catch (e) {
      print('❌ Erreur lors du chargement de l\'utilisateur: $e');
      return '';
    }
  }

  Future<void> sendMessage({
    required String conversationId,
    required String content,
  }) async {
    try {
      final String currentUserId = 'c27b034e-241d-46a4-bfc2-4d8f226d0e63';
      final tempMessage = {
        'id': 'temp-${DateTime.now().millisecondsSinceEpoch}',
        'conversationId': conversationId,
        'senderId': currentUserId,
        'content': content,
        'createdAt': DateTime.now().toIso8601String(),
        'sender': {'id': currentUserId, 'firstName': 'Moi', 'lastName': ''},
      };
      final messages = _messagesByConversation[conversationId] ?? [];
      messages.add(tempMessage);
      _messagesByConversation[conversationId] = messages;
      _messages = List.from(messages);
      notifyListeners();
      final sentMessage = await _messageService.sendMessage(
        content: content,
        conversationId: conversationId,
      );
      final index = messages.indexWhere((m) => m['id'] == tempMessage['id']);
      if (index != -1) {
        messages[index] = sentMessage;
      } else {
        messages.add(sentMessage);
      }

      _messagesByConversation[conversationId] = messages;
      _messages = List.from(messages);
      notifyListeners();
    } catch (e) {
      print('Erreur envoi message: $e');
    }
  }

  @override
  void dispose() {
    _messageSubscription?.cancel();
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

  void listenToNewMessages(String conversationId) {
    _messageSubscription?.cancel();

    _messageSubscription = _messageService
        .subscribeToMessages(conversationId)
        .listen((newMessage) {
          if (newMessage == null) return;

          final list = _messagesByConversation[conversationId] ?? [];
          final exists = list.any((msg) => msg['id'] == newMessage['id']);

          if (!exists) {
            list.add(newMessage);
            _messagesByConversation[conversationId] = list;
            _messages = List.from(list);
            notifyListeners();
            print('Message ajouté automatiquement depuis la subscription.');
          }
        });
  }
}
