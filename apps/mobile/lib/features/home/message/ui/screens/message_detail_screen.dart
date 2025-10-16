import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/home/message/ui/screens/profil_detail_screen.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';

class MessageDetailScreen extends StatefulWidget {
  final dynamic conversation;
  final MessageViewmodels viewModel;

  const MessageDetailScreen({
    super.key,
    required this.conversation,
    required this.viewModel,
  });

  @override
  State<MessageDetailScreen> createState() => _MessageDetailScreenState();
}

class _MessageDetailScreenState extends State<MessageDetailScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  String _currentUserId = '';
  Map<String, dynamic> _otherParticipant = {};
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    widget.viewModel.addListener(_scrollToBottom);
    _initializeScreen();
  }

  Future<void> _initializeScreen() async {
    final sessionService = ServiceLocator.instance.get<SessionService>();
    try {
      await sessionService.loadUserId();
    } catch (e) {
      print("Erreur loadUserId: $e");
    }
    final loadedId = sessionService.userId;
    setState(() {
      _currentUserId = loadedId ?? 'currentUserId';
    });

    final participants =
        (widget.conversation['participants'] as List<dynamic>?) ?? [];
    Map<String, dynamic>? found;

    for (var p in participants) {
      if (p is Map) {
        final user = p['user'];
        if (user is Map && user['id'] != _currentUserId) {
          found = Map<String, dynamic>.from(user);
          break;
        }
      }
    }

    if (found == null) {
      if (participants.isNotEmpty && participants.first is Map) {
        final firstUser = participants.first['user'];
        if (firstUser is Map) {
          found = Map<String, dynamic>.from(firstUser);
        } else {
          found = {'firstName': 'Utilisateur', 'lastName': ''};
        }
      } else {
        found = {'firstName': 'Utilisateur', 'lastName': ''};
      }
    }

    setState(() {
      _otherParticipant = found!;
      _initialized = true;
    });

    try {
      await widget.viewModel.loadMessagesForConversation(
        widget.conversation['id'],
      );
      widget.viewModel.listenToNewMessages(widget.conversation['id']);

      WidgetsBinding.instance.addPostFrameCallback((_) {
        _scrollToBottom();
      });
    } catch (e) {
      print('Erreur loadMessages: $e');
    }
  }

  @override
  void dispose() {
    widget.viewModel.removeListener(_scrollToBottom);
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  List<dynamic> _getMessagesForDisplay() {
    return widget.viewModel.getMessagesForDisplay(widget.conversation['id']);
  }

  @override
  Widget build(BuildContext context) {
    if (!_initialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final messages = _getMessagesForDisplay();
    final otherFirst = (_otherParticipant['firstName'] ?? 'Utilisateur')
        .toString();
    final otherLast = (_otherParticipant['lastName'] ?? '').toString();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
          color: AppColors.dark,
        ),
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: AppColors.color1,
              child: Text(
                _getInitials(otherFirst),
                style: const TextStyle(
                  color: AppColors.light,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '$otherFirst $otherLast',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: AppColors.dark,
                    ),
                  ),
                  const Text(
                    "En ligne",
                    style: TextStyle(fontSize: 12, color: Colors.green),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProfileDetailScreen(
                    userName:
                        '${_otherParticipant['firstName'] ?? ''} ${_otherParticipant['lastName'] ?? ''}'
                            .trim(),
                  ),
                ),
              );
            },
            color: AppColors.dark,
          ),
        ],
        backgroundColor: AppColors.light,
        elevation: 0,
      ),
      body: Column(
        children: [
          if (messages.isNotEmpty)
            Container(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Text(
                _getLastMessageDate(messages),
                style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
              ),
            ),
          Expanded(
            child: widget.viewModel.isLoading
                ? const Center(child: CircularProgressIndicator())
                : messages.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: messages.length,
                    itemBuilder: (context, index) {
                      final message = messages[index] as Map<String, dynamic>;

                      final senderId = message['senderId']?.toString() ?? '';
                      final content = message['content']?.toString() ?? '';
                      final createdAt = message['createdAt']?.toString() ?? '';
                      final readAt = message['readAt'];
                      final senderFirst =
                          message['sender']?['firstName']?.toString() ?? '';
                      final isMe = senderId == _currentUserId;

                      return Column(
                        crossAxisAlignment: isMe
                            ? CrossAxisAlignment.end
                            : CrossAxisAlignment.start,
                        children: [
                          if (_shouldShowTime(messages, index))
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 4),
                              child: Text(
                                _formatMessageTime(createdAt),
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Colors.grey.shade500,
                                ),
                              ),
                            ),
                          Row(
                            mainAxisAlignment: isMe
                                ? MainAxisAlignment.end
                                : MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              if (!isMe)
                                CircleAvatar(
                                  radius: 12,
                                  backgroundColor: AppColors.color1,
                                  child: Text(
                                    _getInitials(
                                      senderFirst.isNotEmpty
                                          ? senderFirst
                                          : 'U',
                                    ),
                                    style: const TextStyle(
                                      color: AppColors.light,
                                      fontSize: 10,
                                    ),
                                  ),
                                ),
                              if (!isMe) const SizedBox(width: 8),
                              Flexible(
                                child: Container(
                                  margin: const EdgeInsets.symmetric(
                                    vertical: 2,
                                  ),
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: isMe
                                        ? AppColors.color1
                                        : Colors.grey.shade200,
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        content.isNotEmpty
                                            ? content
                                            : '[Message vide]',
                                        style: TextStyle(
                                          color: isMe
                                              ? AppColors.light
                                              : AppColors.dark,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.end,
                                        children: [
                                          Text(
                                            _formatTime(createdAt),
                                            style: TextStyle(
                                              fontSize: 10,
                                              color: isMe
                                                  ? AppColors.light
                                                  : Colors.grey.shade600,
                                            ),
                                          ),
                                          if (isMe) const SizedBox(width: 4),
                                          if (isMe)
                                            Icon(
                                              readAt != null
                                                  ? Icons.done_all
                                                  : Icons.done,
                                              size: 12,
                                              color: isMe
                                                  ? AppColors.light
                                                  : Colors.grey.shade600,
                                            ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                              if (isMe) const SizedBox(width: 8),
                              if (isMe)
                                CircleAvatar(
                                  radius: 12,
                                  backgroundColor: Colors.blue,
                                  child: Text(
                                    _getInitials('Me'),
                                    style: const TextStyle(
                                      color: AppColors.light,
                                      fontSize: 10,
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ],
                      );
                    },
                  ),
          ),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppColors.light,
              border: Border(top: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(
                        Icons.emoji_emotions,
                        color: Colors.grey,
                      ),
                      onPressed: () {},
                    ),
                    IconButton(
                      icon: const Icon(Icons.gif, color: Colors.grey),
                      onPressed: () {},
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.keyboard_voice,
                        color: Colors.grey,
                      ),
                      onPressed: () {},
                    ),
                    IconButton(
                      icon: const Icon(Icons.photo_camera, color: Colors.grey),
                      onPressed: () {},
                    ),
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          hintText: "Écrire un message...",
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(horizontal: 12),
                        ),
                        onSubmitted: (value) => _sendMessage(),
                      ),
                    ),
                    IconButton(
                      icon: Icon(Icons.send, color: AppColors.color1),
                      onPressed: _sendMessage,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _sendMessage() async {
    final content = _controller.text.trim();
    if (content.isEmpty) return;

    final sessionService = ServiceLocator.instance.get<SessionService>();
    try {
      await sessionService.loadUserId();
    } catch (e) {
      print('Erreur loadUserId: $e');
    }

    final currentUserId = sessionService.userId;
    if (currentUserId == null || currentUserId.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Veuillez vous connecter pour envoyer un message."),
        ),
      );
      return;
    }

    String? convId = widget.conversation['id']?.toString();

    if (convId == null || convId.isEmpty || convId.startsWith('local_')) {
      final conversationService = ServiceLocator.instance
          .get<ConversationService>();

      String? otherId;
      final participants =
          (widget.conversation['participants'] as List<dynamic>?) ?? [];
      for (var p in participants) {
        if (p is Map) {
          final user = p['user'];
          if (user is Map && user['id'] != currentUserId) {
            otherId = user['id']?.toString();
            break;
          }
        }
      }

      if (otherId == null || otherId.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Participant introuvable.")),
        );
        return;
      }

      print(
        'Création conversation côté serveur avec participantIds: [$currentUserId, $otherId]',
      );
      final created = await conversationService.createConversationBetweenUsers(
        currentUserId: currentUserId,
        otherUserId: otherId,
      );

      if (created == null || created['id'] == null) {
        print('createConversationBetweenUsers returned null. result: $created');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Impossible de créer la conversation côté serveur."),
          ),
        );
        return;
      }

      convId = created['id'] as String;
      setState(() {
        widget.conversation['id'] = convId;
      });
    }

    try {
      _controller.clear();

      await widget.viewModel.sendMessage(
        content: content,
        conversationId: convId,
      );

      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (_scrollController.hasClients) {
          _scrollController.animateTo(
            _scrollController.position.maxScrollExtent,
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOut,
          );
        }
      });
    } catch (e) {
      print('Erreur envoi message: $e');
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Erreur envoi message: $e')));
    }
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.chat_bubble_outline,
            size: 64,
            color: Colors.grey.shade400,
          ),
          const SizedBox(height: 16),
          Text(
            "Aucun message",
            style: TextStyle(color: Colors.grey.shade600, fontSize: 16),
          ),
          const SizedBox(height: 8),
          Text(
            "Envoyez le premier message !",
            style: TextStyle(color: Colors.grey.shade500, fontSize: 14),
          ),
        ],
      ),
    );
  }

  String _getInitials(String name) {
    if (name.isEmpty) return 'U';
    return name.substring(0, 1).toUpperCase();
  }

  String _getLastMessageDate(List<dynamic> messages) {
    if (messages.isEmpty) return "Aucun message";
    final lastMessage = messages.last;
    final messageDate = _parseDate(lastMessage['createdAt'] ?? '');
    final now = DateTime.now();
    if (now.difference(messageDate).inDays == 0) return "Aujourd'hui";
    if (now.difference(messageDate).inDays == 1) return "Hier";
    return "${messageDate.day}/${messageDate.month}/${messageDate.year}";
  }

  bool _shouldShowTime(List<dynamic> messages, int index) {
    if (index == 0) return true;
    final currentMessage = messages[index];
    final previousMessage = messages[index - 1];
    final currentTime = _parseDate(currentMessage['createdAt'] ?? '');
    final previousTime = _parseDate(previousMessage['createdAt'] ?? '');
    final timeDifference = currentTime.difference(previousTime).abs();
    return timeDifference.inMinutes > 5;
  }

  String _formatMessageTime(String timestamp) {
    final date = _parseDate(timestamp);
    final now = DateTime.now();
    final difference = now.difference(date);
    if (difference.inDays == 0) return "Aujourd'hui";
    if (difference.inDays == 1) return "Hier";
    if (difference.inDays < 7) return "Il y a ${difference.inDays} jours";
    return "${date.day}/${date.month}/${date.year}";
  }

  String _formatTime(String timestamp) {
    final date = _parseDate(timestamp);
    return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }

  DateTime _parseDate(String dateString) {
    try {
      return DateTime.parse(dateString).toLocal();
    } catch (e) {
      return DateTime.now();
    }
  }
}
