import 'dart:async';
import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/service/message_service.dart';
import 'message_conversation_manager.dart';
import 'message_manager.dart';
import 'message_state_manager.dart';

class MessageViewmodels with ChangeNotifier {
  final ConversationService _conversationService;
  final MessageService _messageService;

  final MessageConversationManager _conversationManager;
  final MessageManager _messageManager;
  final MessageStateManager _stateManager;

  MessageViewmodels({
    required ConversationService conversationService,
    required MessageService messageService,
  }) : _conversationService = conversationService,
       _messageService = messageService,
       _conversationManager = MessageConversationManager(),
       _messageManager = MessageManager(),
       _stateManager = MessageStateManager();

  List<dynamic> get conversations => _conversationManager.conversations;
  List<dynamic> get messages => _messageManager.messages;
  bool get isLoading => _stateManager.isLoading;
  int get selectedTab => _stateManager.selectedTab;
  String get searchQuery => _stateManager.searchQuery;
  String? get currentUserId => _stateManager.currentUserId;
  bool get isUserIdLoaded => _stateManager.userIdLoaded;
  ConversationService get conversationService => _conversationService;

  List<dynamic> get filteredMessages => _messageManager.getFilteredMessages(
    _stateManager.searchQuery,
    _stateManager.selectedTab,
  );

  List<dynamic> get filteredConversations =>
      _messageManager.getFilteredConversations(
        _conversationManager.conversations,
        _stateManager.selectedTab,
        _stateManager.searchQuery,
      );

  // Marquer comme lu
  void markConversationAsRead(String conversationId) {
    _messageManager.markConversationAsRead(conversationId, notifyListeners);
  }

  // Archiver/désarchiver
  void toggleConversationArchive(String conversationId) {
    _messageManager.toggleConversationArchive(conversationId, notifyListeners);
  }

  // Vérifier si non lu
  bool hasUnreadMessages(String conversationId) {
    return _messageManager.hasUnreadMessages(conversationId);
  }

  Future<void> loadConversations() async {
    await _conversationManager.loadConversations(
      _conversationService,
      _stateManager,
      notifyListeners,
    );
  }

  Future<void> loadConversationsWithLastMessages() async {
    await _conversationManager.loadConversationsWithLastMessages(
      _conversationService,
      _messageService,
      _stateManager,
      notifyListeners,
    );
  }

  dynamic getLastMessageForConversation(String conversationId) {
    return _conversationManager.getLastMessageForConversation(conversationId);
  }

  bool isConversationLoading(String conversationId) {
    return _conversationManager.isConversationLoading(conversationId);
  }

  Future<void> refreshConversation(String conversationId) async {
    await _conversationManager.refreshConversation(
      conversationId,
      _messageService,
      notifyListeners,
    );
  }

  // Méthodes de gestion des messages
  Future<void> loadMessages(String conversationId) async {
    await _messageManager.loadMessages(
      conversationId,
      _messageService,
      notifyListeners,
    );
  }

  Future<void> loadMessagesForConversation(String conversationId) async {
    await _messageManager.loadMessagesForConversation(
      conversationId,
      _messageService,
      _conversationManager,
      _stateManager,
      notifyListeners,
    );
  }

  List<dynamic> getMessagesForDisplay(String conversationId) {
    return _messageManager.getMessagesForDisplay(conversationId);
  }

  List<dynamic> getMessagesFor(String conversationId) {
    return _messageManager.getMessagesFor(conversationId);
  }

  Future<void> sendMessage({
    required String conversationId,
    required String content,
  }) async {
    await _messageManager.sendMessage(
      conversationId: conversationId,
      content: content,
      messageService: _messageService,
      notifyListeners: notifyListeners,
    );
  }

  Future<void> loadUserId() async {
    await _stateManager.loadUserId(notifyListeners);
  }

  void selectTab(int index) {
    _stateManager.selectTab(index, notifyListeners);
  }

  void searchMessages(String query) {
    _stateManager.searchMessages(query, notifyListeners);
  }

  void markAsRead(dynamic message) {
    _stateManager.markAsRead(notifyListeners);
  }

  void listenToNewMessages(String conversationId) {
    _messageManager.listenToNewMessages(
      conversationId,
      _messageService,
      notifyListeners,
    );
  }

  @override
  void dispose() {
    _messageManager.dispose();
    super.dispose();
  }

  void markAsUnread(MessageModels message) {}

  void deleteMessage(MessageModels message) {}

  void archiveMessage(MessageModels message) {}
}

// Fallback extension to provide the missing method on MessageManager.
// Prefer implementing this logic inside MessageManager itself; this ensures
// existing callers compile and still trigger UI updates.
extension MessageManagerToggleConversationArchive on MessageManager {
  void toggleConversationArchive(
    String conversationId,
    VoidCallback notifyListeners,
  ) {
    // No-op fallback: real archive toggling should be implemented in MessageManager.
    // Calling notifyListeners preserves UI update behavior for now.
    notifyListeners();
  }
}
