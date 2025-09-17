import 'package:flutter/widgets.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';

class MessageViewmodels with ChangeNotifier {
  int _selectedTab = 0;
  final List<String> _tabs = ['Tous', 'Non lus', 'Lus', 'Archivés'];
  final List<MessageModels> _allMessages = [
    MessageModels(
      sender: 'Maria',
      content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortique sollicitudin suscipit...',
      time: '07:40 am',
      unread: true,
    ),
    MessageModels(
      sender: 'John',
      content:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...',
      time: '07:40 am',
      unread: true,
    ),
    MessageModels(
      sender: 'Doe',
      content:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat...',
      time: '07:40 am',
      unread: true,
    ),
    MessageModels(
      sender: 'Monique',
      content:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt...',
      time: '07:40 am',
      unread: true,
    ),
    MessageModels(
      sender: 'Sarah',
      content:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...',
      time: '07:40 am',
      unread: true,
    ),
  ];

  int get selectedTab => _selectedTab;
  List<String> get tabs => _tabs;

  List<MessageModels> get message {
    switch (_selectedTab) {
      case 0:
        return _allMessages;
      case 1: // Non lus
        return _allMessages.where((msg) => msg.unread).toList();
      case 2: // Lus
        return _allMessages.where((msg) => !msg.unread).toList();
      case 3: // Archivés
        return []; // liste vide pour archivés
      default:
        return _allMessages;
    }
  }

  void selectTab(int index) {
    if (index >= 0 && index < _tabs.length) {
      _selectedTab = index;
      notifyListeners();
    }
  }

  void markAsRead(MessageModels message) {
    final index = _allMessages.indexWhere(
      (m) => m.sender == message.sender && m.time == message.time,
    );
    if (index != -1 && _allMessages[index].unread) {
      _allMessages[index] = MessageModels(
        sender: message.sender,
        content: message.content,
        time: message.time,
        unread: false,
      );
      notifyListeners();
    }
  }

  void markAsUnread(MessageModels message) {
    final index = _allMessages.indexWhere(
      (m) => m.sender == message.sender && m.time == message.time,
    );
    if (index != -1 && !_allMessages[index].unread) {
      _allMessages[index] = MessageModels(
        sender: message.sender,
        content: message.content,
        time: message.time,
        unread: true,
      );
      notifyListeners();
    }
  }

  void deleteMessage(MessageModels message) {
    _allMessages.removeWhere(
      (m) => m.sender == message.sender && m.time == message.time,
    );
    notifyListeners();
  }

  void archiveMessage(MessageModels message) {
    notifyListeners();
  }

  void addMessage(MessageModels message) {
    _allMessages.insert(0, message);
    notifyListeners();
  }
}
