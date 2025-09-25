import 'package:flutter/foundation.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';
import 'package:safe_driving/features/home/message/repositories/chat_repository.dart';

class MessageViewmodels with ChangeNotifier {
  final ChatRepository _chatRepository;

  List<MessageModels> _messages = [];
  List<MessageModels> _filteredMessages = [];
  bool _isLoading = false;
  int _selectedTab = 0;
  String _searchQuery = '';

  MessageViewmodels({required ChatRepository chatRepository})
    : _chatRepository = chatRepository;

  List<MessageModels> get messages => _messages;
  List<MessageModels> get filteredMessages => _filteredMessages;
  bool get isLoading => _isLoading;
  int get selectedTab => _selectedTab;

  Future<void> loadMessages() async {
    _isLoading = true;
    notifyListeners();

    try {
      final messagesData = await _chatRepository.getMessages();

      _messages = messagesData.map((messageJson) {
        return MessageModels.fromJson(messageJson);
      }).toList();

      _applyFilters();
    } catch (e) {
      print('Erreur lors du chargement des messages: $e');
      _messages = [];
      _filteredMessages = [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void selectTab(int index) {
    _selectedTab = index;
    _applyFilters();
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query.toLowerCase();
    _applyFilters();
    notifyListeners();
  }

  void _applyFilters() {
    List<MessageModels> filtered = List.from(_messages);

    // Filtre par tab
    switch (_selectedTab) {
      case 1: // Non lus
        filtered = filtered.where((message) => message.unread).toList();
        break;
      case 2: // Lus
        filtered = filtered.where((message) => !message.unread).toList();
        break;
      case 3:
        filtered = filtered.where((message) => false).toList();
        break;
    }

    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((message) {
        return message.sender.toLowerCase().contains(_searchQuery) ||
            message.content.toLowerCase().contains(_searchQuery);
      }).toList();
    }

    _filteredMessages = filtered;
  }

  Future<void> sendChatMessage({
    required String content,
    required String senderId,
    String? conversationId,
    String? rideId,
    String? recipientId,
  }) async {
    try {
      final newMessageData = await _chatRepository.sendMessage({
        'content': content,
        'senderId': senderId,
        if (conversationId != null) 'conversationId': conversationId,
        if (rideId != null) 'rideId': rideId,
        if (recipientId != null) 'recipientId': recipientId,
        'clientTempId': DateTime.now().millisecondsSinceEpoch.toString(),
      });

      final newMessage = MessageModels.fromJson(newMessageData);

      _messages.insert(0, newMessage);
      _applyFilters();
      notifyListeners();
    } catch (e) {
      print('Erreur lors de l\'envoi du message: $e');
      rethrow;
    }
  }

  Future<void> markAsRead(MessageModels message) async {
    try {
      await _chatRepository.markAsRead(message.id, message.senderId);

      final index = _messages.indexWhere((m) => m.id == message.id);
      if (index != -1) {
        _messages[index] = message.copyWith(unread: false);
        _applyFilters();
        notifyListeners();
      }
    } catch (e) {
      print('Erreur lors du marquage comme lu: $e');
    }
  }

  Future<void> deleteMessage(String messageId) async {
    try {
      await _chatRepository.deleteMessage(messageId);

      _messages.removeWhere((msg) => msg.id == messageId);
      _applyFilters();
      notifyListeners();
    } catch (e) {
      print('Erreur lors de la suppression: $e');
    }
  }

  List<MessageModels> getMessagesBySender(String sender) {
    return _messages.where((message) => message.sender == sender).toList();
  }

  void searchMessages(String query) {
    setSearchQuery(query);
  }
}

extension MessageCopyWith on MessageModels {
  MessageModels copyWith({
    String? id,
    String? content,
    String? senderId,
    String? sender,
    DateTime? createdAt,
    bool? unread,
    String? conversationId,
    String? rideId,
    List<MessageModels>? replies,
  }) {
    return MessageModels(
      id: id ?? this.id,
      content: content ?? this.content,
      senderId: senderId ?? this.senderId,
      sender: sender ?? this.sender,
      createdAt: createdAt ?? this.createdAt,
      unread: unread ?? this.unread,
      conversationId: conversationId ?? this.conversationId,
      rideId: rideId ?? this.rideId,
      replies: replies ?? this.replies,
    );
  }
}
