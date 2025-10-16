import 'dart:async';
import 'dart:ui';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import 'message_conversation_manager.dart';
import 'message_state_manager.dart';

class MessageManager {
  final List<dynamic> _messages = [];
  final Map<String, List<dynamic>> _messagesByConversation = {};
  final Map<String, List<dynamic>> _conversationMessages = {};
  StreamSubscription<Map<String, dynamic>?>? _messageSubscription;

  List<dynamic> get messages => _messages;

  List<dynamic> getFilteredMessages(String searchQuery, int selectedTab) {
    var filtered = _messages;

    if (searchQuery.isNotEmpty) {
      filtered = filtered
          .where(
            (message) => message['content'].toLowerCase().contains(
              searchQuery.toLowerCase(),
            ),
          )
          .toList();
    }

    switch (selectedTab) {
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

  Future<void> loadMessages(
    String conversationId,
    MessageService messageService,
    VoidCallback notifyListeners,
  ) async {
    if (_messagesByConversation.containsKey(conversationId)) {
      _messages.clear();
      _messages.addAll(_messagesByConversation[conversationId]!);
      notifyListeners();
    }

    try {
      final fetched = await messageService.getMessages(conversationId);

      if (fetched != null && fetched.isNotEmpty) {
        final ordered = List.from(fetched);
        final current = _messagesByConversation[conversationId];
        if (current == null || current.length != ordered.length) {
          _messagesByConversation[conversationId] = ordered;
          _messages.clear();
          _messages.addAll(ordered);
          notifyListeners();
        }
      }
    } catch (e) {
      print('Erreur lors du chargement des messages : $e');
    }
  }

  Future<void> loadMessagesForConversation(
    String conversationId,
    MessageService messageService,
    MessageConversationManager conversationManager,
    MessageStateManager stateManager,
    VoidCallback notifyListeners,
  ) async {
    if (_conversationMessages.containsKey(conversationId)) {
      _messages.clear();
      _messages.addAll(_conversationMessages[conversationId]!);
      notifyListeners();
      return;
    }

    stateManager.setLoading(true, notifyListeners);
    try {
      final messages = await messageService.getMessages(conversationId);
      if (messages != null) {
        final orderedMessages = List.from(messages.reversed);

        _conversationMessages[conversationId] = orderedMessages;
        _messages.clear();
        _messages.addAll(orderedMessages);

        if (orderedMessages.isNotEmpty) {
          final lastMessage = orderedMessages.last;
          print(
            'Dernier message (le plus récent): "${lastMessage['content']}" à ${lastMessage['createdAt']}',
          );
          print(
            'Premier message (le plus ancien): "${orderedMessages.first['content']}" à ${orderedMessages.first['createdAt']}',
          );
        }

        print(
          '${orderedMessages.length} messages chargés pour $conversationId',
        );
        print(
          'Premier message (ancien): ${orderedMessages.first['createdAt']}',
        );
        print('Dernier message (récent): ${orderedMessages.last['createdAt']}');
      }
      notifyListeners();
    } catch (e) {
      print('Erreur loadMessagesForConversation: $e');
    } finally {
      stateManager.setLoading(false, notifyListeners);
    }
  }

  List<dynamic> getMessagesForDisplay(String conversationId) {
    final messages = _conversationMessages[conversationId] ?? [];
    return List.from(messages);
  }

  List<dynamic> getMessagesFor(String conversationId) {
    return _messagesByConversation[conversationId] ?? [];
  }

  Future<void> sendMessage({
    required String conversationId,
    required String content,
    required MessageService messageService,
    required String? currentUserId,
    required VoidCallback notifyListeners,
  }) async {
    try {
      final String effectiveUserId =
          currentUserId ?? 'c27b034e-241d-46a4-bfc2-4d8f226d0e63';
      final tempMessage = {
        'id': 'temp-${DateTime.now().millisecondsSinceEpoch}',
        'conversationId': conversationId,
        'senderId': effectiveUserId,
        'content': content,
        'createdAt': DateTime.now().toIso8601String(),
        'sender': {'id': effectiveUserId, 'firstName': 'Moi', 'lastName': ''},
      };

      final messages = _messagesByConversation[conversationId] ?? [];
      messages.add(tempMessage);
      _messagesByConversation[conversationId] = messages;
      _messages.clear();
      _messages.addAll(messages);
      notifyListeners();

      final sentMessage = await messageService.sendMessage(
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
      _messages.clear();
      _messages.addAll(messages);
      notifyListeners();
    } catch (e) {
      print('Erreur envoi message: $e');
    }
  }

  void listenToNewMessages(
    String conversationId,
    MessageService messageService,
    VoidCallback notifyListeners,
  ) {
    _messageSubscription?.cancel();

    _messageSubscription = messageService
        .subscribeToMessages(conversationId)
        .listen((newMessage) {
          if (newMessage == null) return;

          final list = _messagesByConversation[conversationId] ?? [];
          final exists = list.any((msg) => msg['id'] == newMessage['id']);

          if (!exists) {
            list.add(newMessage);
            _messagesByConversation[conversationId] = list;
            _messages.clear();
            _messages.addAll(list);
            notifyListeners();
            print('Message ajouté automatiquement depuis la subscription.');
          }
        });
  }

  void dispose() {
    _messageSubscription?.cancel();
  }
}
