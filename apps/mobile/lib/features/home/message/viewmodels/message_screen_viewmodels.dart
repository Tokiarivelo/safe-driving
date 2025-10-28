// import 'package:flutter/material.dart';
// import 'package:safe_driving/features/authentication/services/session_service.dart';
// import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
// import 'package:safe_driving/shared/state_management/service_locator.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// class MessageScreenViewModel with ChangeNotifier {
//   String _currentUserId = '';
//   bool _isInitializing = true;

//   String get currentUserId => _currentUserId;
//   bool get isInitializing => _isInitializing;

//   Future<void> initializeData(MessageViewmodels messageViewModel) async {
//     await messageViewModel.loadUserId();

//     if (messageViewModel.currentUserId != null &&
//         messageViewModel.currentUserId!.isNotEmpty) {
//       _currentUserId = messageViewModel.currentUserId!;
//       print('UserID chargé depuis ViewModel: $_currentUserId');
//     } else {
//       await _tryAlternativeUserIdLoading(messageViewModel);
//       return;
//     }

//     await messageViewModel.loadConversationsWithLastMessages();
//     _isInitializing = false;
//     notifyListeners();
//   }

//   Future<void> _tryAlternativeUserIdLoading(
//     MessageViewmodels messageViewModel,
//   ) async {
//     try {
//       final session = ServiceLocator.instance.get<SessionService>();
//       await session.loadUserId();
//       final sessionUserId = session.userId;

//       if (sessionUserId != null && sessionUserId.isNotEmpty) {
//         print('UserID trouvé via SessionService: $sessionUserId');
//         await _saveAndSetUserId(sessionUserId, messageViewModel);
//         return;
//       }

//       await messageViewModel.loadConversations();
//       final extractedUserId = _extractUserIdFromConversations(messageViewModel);
//       if (extractedUserId.isNotEmpty) {
//         print('UserID extrait des conversations: $extractedUserId');
//         await _saveAndSetUserId(extractedUserId, messageViewModel);
//         return;
//       }
//     } catch (e) {
//       print('Erreur alternative loading: $e');
//     }

//     print('UserID non trouvé, continuation sans filtre');
//     _isInitializing = false;
//     notifyListeners();
//     await messageViewModel.loadConversations();
//   }

//   Future<void> _saveAndSetUserId(
//     String userId,
//     MessageViewmodels messageViewModel,
//   ) async {
//     final prefs = await SharedPreferences.getInstance();
//     await prefs.setString('userId', userId);

//     _currentUserId = userId;
//     _isInitializing = false;

//     await messageViewModel.loadUserId();
//     await messageViewModel.loadConversations();
//     notifyListeners();
//   }

//   String _extractUserIdFromConversations(MessageViewmodels messageViewModel) {
//     if (messageViewModel.conversations.isEmpty) return '';
//     final firstConv = messageViewModel.conversations.first;
//     final participants = firstConv['participants'] as List? ?? [];

//     if (participants.isNotEmpty) {
//       final firstParticipant = participants.first;
//       final user = firstParticipant['user'] ?? firstParticipant;
//       final userId = user['id']?.toString() ?? '';

//       if (userId.isNotEmpty) {
//         print('UserID extrait du premier participant: $userId');
//         return userId;
//       }
//     }

//     return '';
//   }

//   dynamic findOtherParticipant(dynamic conversation) {
//     final participants = conversation['participants'] as List? ?? [];
//     for (var participant in participants) {
//       final user = participant['user'] ?? participant;
//       final userId = user['id']?.toString() ?? '';
//       if (userId != _currentUserId) {
//         return user;
//       }
//     }
//     return null;
//   }

//   // DateTime getLastMessageDate(
//   //   dynamic conversation,
//   //   MessageViewmodels messageViewModel,
//   // ) {
//   //   final conversationId = conversation['id'];
//   //   final lastMessage = messageViewModel.getLastMessageForConversation(
//   //     conversationId,
//   //   );

//   //   if (lastMessage != null && lastMessage['createdAt'] != null) {
//   //     try {
//   //       return DateTime.parse(lastMessage['createdAt']);
//   //     } catch (e) {
//   //       print('Erreur parsing date: $e');
//   //     }
//   //   }

//   //   return DateTime(1900);
//   // }

// }
