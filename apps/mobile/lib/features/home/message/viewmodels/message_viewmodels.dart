import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';

class MessageViewmodels extends ChangeNotifier {
  final List<MessageModels> _messages = [
    MessageModels(
      sender: 'Jean Dupont',
      content: 'Salut, ça va?',
      time: '10:30',
      unread: true,
    ),
    MessageModels(
      sender: 'Marie Curie',
      content: 'Merci pour le trajet!',
      time: '09:15',
    ),
    MessageModels(
      sender: 'Transport SA',
      content: 'Nouvelle offre disponible',
      time: 'Hier',
      unread: true,
    ),
  ];
  List<MessageModels> get messages => _messages;
}
