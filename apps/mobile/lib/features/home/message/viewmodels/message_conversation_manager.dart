import 'dart:ui';

import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import 'message_state_manager.dart';

class MessageConversationManager {
  final List<dynamic> _conversations = [];
  final Map<String, dynamic> _lastMessages = {};
  final Map<String, bool> _conversationsLoading = {};

  List<dynamic> get conversations => _conversations;

  Future<void> loadConversations(
    ConversationService conversationService,
    MessageStateManager stateManager,
    VoidCallback notifyListeners,
  ) async {
    stateManager.setLoading(true, notifyListeners);
    try {
      _conversations.clear();
      _conversations.addAll(await conversationService.getConversations() ?? []);

      _debugLastMessages();

      notifyListeners();
    } catch (e) {
      print('Erreur loadConversations: $e');
    } finally {
      stateManager.setLoading(false, notifyListeners);
    }
  }

  Future<void> loadConversationsWithLastMessages(
    ConversationService conversationService,
    MessageService messageService,
    MessageStateManager stateManager,
    VoidCallback notifyListeners,
  ) async {
    stateManager.setLoading(true, notifyListeners);
    try {
      _conversations.clear();
      _conversations.addAll(await conversationService.getConversations() ?? []);
      print('${_conversations.length} conversations chargées');

      await _loadLastMessagesForAllConversations(messageService);

      notifyListeners();
    } catch (e) {
      print('Erreur loadConversationsWithLastMessages: $e');
    } finally {
      stateManager.setLoading(false, notifyListeners);
    }
  }

  Future<void> _loadLastMessagesForAllConversations(
    MessageService messageService,
  ) async {
    final futures = <Future>[];

    for (var conversation in _conversations) {
      final conversationId = conversation['id'];
      futures.add(
        _loadLastMessageForConversation(conversationId, messageService),
      );
    }

    await Future.wait(futures, eagerError: false);
  }

  Future<void> _loadLastMessageForConversation(
    String conversationId,
    MessageService messageService,
  ) async {
    try {
      _conversationsLoading[conversationId] = true;

      final messages = await messageService.getMessages(conversationId);
      if (messages != null && messages.isNotEmpty) {
        final lastMessage = messages.first;
        _lastMessages[conversationId] = lastMessage;

        print(
          'Dernier message (récent) pour $conversationId: "${lastMessage['content']}" à ${lastMessage['createdAt']}',
        );
      } else {
        _lastMessages[conversationId] = null;
        print('Aucun message pour $conversationId');
      }
    } catch (e) {
      print('Erreur chargement dernier message $conversationId: $e');
      _lastMessages[conversationId] = null;
    } finally {
      _conversationsLoading[conversationId] = false;
    }
  }

  dynamic getLastMessageForConversation(String conversationId) {
    return _lastMessages[conversationId];
  }

  bool isConversationLoading(String conversationId) {
    return _conversationsLoading[conversationId] ?? false;
  }

  Future<void> refreshConversation(
    String conversationId,
    MessageService messageService,
    VoidCallback notifyListeners,
  ) async {
    await _loadLastMessageForConversation(conversationId, messageService);
    notifyListeners();
  }

  void _debugLastMessages() {
    print('=== DEBUG LAST MESSAGES ===');
    for (int i = 0; i < _conversations.length; i++) {
      final conv = _conversations[i];
      print('Conversation $i:');
      print('  ID: ${conv['id']}');
      print('  LastMessage: ${conv['lastMessage']}');
      print('  Has messages array: ${conv['messages'] != null}');
      if (conv['messages'] != null) {
        print('  Messages count: ${(conv['messages'] as List).length}');
        if ((conv['messages'] as List).isNotEmpty) {
          print(
            '  Last message content: ${(conv['messages'] as List).last['content']}',
          );
        }
      }
    }
    print('=== FIN DEBUG ===');
  }
}
