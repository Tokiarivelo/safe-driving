import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';

class MessageViewmodels with ChangeNotifier {
  final ConversationService _conversationService;
  final MessageService _messageService;
  ConversationService get conversationService => _conversationService;

  List<dynamic> _conversations = [];
  List<dynamic> _messages = [];
  bool _isLoading = false;
  int _selectedTab = 0;
  String _searchQuery = '';
  String? currentUserId;
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
      print('🔄 loadMessages appelé pour: $conversationId');
      final fetched = await _messageService.getMessages(conversationId);
      print('📨 Messages récupérés du service: ${fetched?.length}');

      if (fetched != null) {
        for (var msg in fetched) {
          print('   - ${msg['content']} (id: ${msg['id']})');
        }
      }

      _messagesByConversation[conversationId] = fetched ?? [];
      print(
        '💾 Messages stockés: ${_messagesByConversation[conversationId]?.length}',
      );
      notifyListeners();
    } catch (e) {
      print('❌ Erreur chargement messages: $e');
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
    print('📂 getMessagesForConversation:');
    print('   Conversation: $conversationId');
    print('   Messages trouvés: ${messages.length}');
    print('   Toutes les conversations: ${_messagesByConversation.keys}');

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

  void setCurrentUserId(String id) {
    currentUserId = id;
    notifyListeners();
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
