import 'dart:async';
import 'dart:ui';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'message_conversation_manager.dart';
import 'message_state_manager.dart';

class MessageManager {
  final List<dynamic> _messages = [];
  final Map<String, List<dynamic>> _messagesByConversation = {};
  final Map<String, List<dynamic>> _conversationMessages = {};
  final Map<String, bool> _conversationReadStatus = {};
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

  void markConversationAsRead(
    String conversationId,
    VoidCallback notifyListeners,
  ) {
    _conversationReadStatus[conversationId] = true;
    final messages = _conversationMessages[conversationId] ?? [];
    for (var message in messages) {
      if (message is Map<String, dynamic>) {
        message['isRead'] = true;
      }
    }
    notifyListeners();
  }

  void toggleConversationReadStatus(
    String conversationId,
    VoidCallback notifyListeners,
  ) {
    final messages = _conversationMessages[conversationId] ?? [];
    if (messages.isNotEmpty) {
      final firstMessage = messages.first;
      if (firstMessage is Map<String, dynamic>) {
        final currentStatus = firstMessage['isArchived'] ?? false;
        for (var message in messages) {
          if (message is Map<String, dynamic>) {
            message['isArchived'] = !currentStatus;
          }
        }
      }
    }
    notifyListeners();
  }

  bool hasUnreadMessages(String conversationId) {
    final messages = _conversationMessages[conversationId] ?? [];
    return messages.any(
      (message) =>
          message is Map<String, dynamic> &&
          (message['readAt'] == null) &&
          message['senderId'] != _getCurrentUserId(),
    );
  }

  String? _getCurrentUserId() {
    final sessionService = ServiceLocator.instance.get<SessionService>();
    return sessionService.userId;
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

  List<dynamic> getFilteredConversations(
    List<dynamic> allConversations,
    int selectedTab,
    String searchQuery,
  ) {
    var filtered = List<dynamic>.from(allConversations);

    if (searchQuery.isNotEmpty) {
      final q = searchQuery.toLowerCase();
      filtered = filtered.where((conversation) {
        final participants =
            (conversation['participants'] as List<dynamic>?) ?? [];

        // determine last message for this conversation from loaded caches
        final convId = conversation['id']?.toString() ?? '';
        final msgs =
            _conversationMessages[convId] ??
            _messagesByConversation[convId] ??
            [];
        final lastMessage = msgs.isNotEmpty ? msgs.last : null;
        final content = lastMessage?['content']?.toString().toLowerCase() ?? '';

        final hasMatchingParticipant = participants.any((participant) {
          final user = participant['user'];
          if (user is Map<String, dynamic>) {
            final firstName = (user['firstName']?.toString() ?? '')
                .toLowerCase();
            final lastName = (user['lastName']?.toString() ?? '').toLowerCase();
            final fullName = '$firstName $lastName';
            return fullName.contains(q);
          }
          return false;
        });

        final hasMatchingContent = content.contains(q);
        return hasMatchingParticipant || hasMatchingContent;
      }).toList();
    }

    // Filter by selected tab: 1 = unread, 2 = read, 3 = archived
    switch (selectedTab) {
      case 1:
        filtered = filtered.where((conversation) {
          final id = conversation['id']?.toString() ?? '';
          return hasUnreadMessages(id);
        }).toList();
        break;
      case 2:
        filtered = filtered.where((conversation) {
          final id = conversation['id']?.toString() ?? '';
          return !hasUnreadMessages(id);
        }).toList();
        break;
      case 3:
        filtered = filtered.where((conversation) {
          return (conversation['isArchived'] ?? false) == true;
        }).toList();
        break;
      default:
        break;
    }

    return filtered;
  }

  Future<void> sendMessage({
    required String conversationId,
    required String content,
    required MessageService messageService,
    required VoidCallback notifyListeners,
  }) async {
    try {
      final sessionService = ServiceLocator.instance.get<SessionService>();
      await sessionService.loadUserId();
      final currentUserId = sessionService.userId;

      if (currentUserId == null || currentUserId.isEmpty) {
        throw Exception("Utilisateur non connecté");
      }

      final tempMessage = {
        'id': 'temp-${DateTime.now().millisecondsSinceEpoch}',
        'conversationId': conversationId,
        'senderId': currentUserId,
        'content': content,
        'createdAt': DateTime.now().toIso8601String(),
        'sender': {
          'id': currentUserId,
          'firstName': 'Moi',
          'lastName': '',
          'email': '',
        },
        'isTemp': true,
      };

      final messages = _conversationMessages[conversationId] ?? [];
      messages.add(tempMessage);
      _conversationMessages[conversationId] = messages;
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

      _conversationMessages[conversationId] = messages;
      _messages.clear();
      _messages.addAll(messages);
      notifyListeners();

      print(
        'Message envoyé et affiché instantanément par l\'utilisateur: $currentUserId',
      );
    } catch (e) {
      print('Erreur envoi message: $e');
      final messages = _conversationMessages[conversationId] ?? [];
      messages.removeWhere((m) => m['isTemp'] == true);
      _conversationMessages[conversationId] = messages;
      _messages.clear();
      _messages.addAll(messages);
      notifyListeners();

      rethrow;
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
        .listen(
          (newMessage) {
            if (newMessage == null) return;

            print('Nouveau message subscription reçu:');
            print('Content: ${newMessage['content']}');
            print('Sender: ${newMessage['sender']}');
            print('SenderId: ${newMessage['senderId']}');

            if (newMessage['sender'] == null ||
                newMessage['sender']['firstName'] == null) {
              print('Structure sender incomplète, correction...');
              newMessage['sender'] = {
                'id': newMessage['senderId'],
                'firstName': 'Utilisateur',
                'lastName': '',
                'email': '',
              };
            }

            final list = _conversationMessages[conversationId] ?? [];
            final exists = list.any((msg) => msg['id'] == newMessage['id']);

            if (!exists) {
              list.add(newMessage);
              _conversationMessages[conversationId] = list;
              _messages.clear();
              _messages.addAll(list);
              notifyListeners();
              print(
                'Message ajouté automatiquement depuis la subscription avec sender: ${newMessage['sender']['firstName']}',
              );
            }
          },
          onError: (error) {
            print('Erreur subscription: $error');
          },
        );
  }

  void dispose() {
    _messageSubscription?.cancel();
  }
}
