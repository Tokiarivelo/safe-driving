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
  List<dynamic> _localMessages = [];

  @override
  void initState() {
    super.initState();
    _initializeScreen().then((_) {
      _loadMessages();
    });
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
        final user = p['user'] ?? p;
        final userId = user['id']?.toString();
        if (userId != null && userId != _currentUserId) {
          found = Map<String, dynamic>.from(user);
          break;
        }
      }
    }

    if (found == null) {
      if (participants.isNotEmpty && participants.first is Map) {
        final firstUser = participants.first['user'] ?? participants.first;
        found = Map<String, dynamic>.from(firstUser);
      } else {
        found = {'id': 'unknown', 'firstName': 'Utilisateur', 'lastName': ''};
      }
    }

    setState(() {
      _otherParticipant = found!;
      _initialized = true;
    });
  }

  Future<void> _loadMessages() async {
    try {
      await widget.viewModel.loadMessages(
        conversationId: widget.conversation['id'],
      );
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          setState(() {
            _localMessages = widget.viewModel.getMessagesForConversation(
              widget.conversation['id'],
            );
          });
        }
      });
    } catch (e) {
      print('Erreur chargement messages: $e');
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_initialized) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final messages = _localMessages;

    print('🎯 BUILD - ${messages.length} messages à afficher');

    final mappedMessages = messages.map<Map<String, dynamic>>((msg) {
      final sender = Map<String, dynamic>.from(msg['sender'] ?? {});
      final isMine = sender['id'] == _currentUserId;
      final senderName = isMine
          ? 'Moi'
          : '${sender['firstName'] ?? ''} ${sender['lastName'] ?? ''}';
      return {...msg, 'isMine': isMine, 'senderName': senderName};
    }).toList();

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
                  color: Colors.white,
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
                      color: Colors.black,
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
                    userName: '$otherFirst $otherLast'.trim(),
                  ),
                ),
              );
            },
            color: AppColors.dark,
          ),
          // BOUTON DEBUG TEMPORAIRE
          IconButton(
            icon: Icon(Icons.refresh, color: Colors.red),
            onPressed: () {
              print('🔄 FORCE REFRESH MANUEL');
              setState(() {
                _localMessages = widget.viewModel.getMessagesForConversation(
                  widget.conversation['id'],
                );
              });
            },
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Expanded(
            child: widget.viewModel.isLoading
                ? const Center(child: CircularProgressIndicator())
                : mappedMessages.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    reverse: true,
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: mappedMessages.length,
                    itemBuilder: (context, index) {
                      final reversedIndex = mappedMessages.length - 1 - index;
                      final message = mappedMessages[reversedIndex];

                      final isMe = message['isMine'] as bool? ?? false;
                      final content = message['content']?.toString() ?? '';
                      final createdAt = message['createdAt']?.toString() ?? '';
                      final senderFirst =
                          message['sender']?['firstName']?.toString() ?? 'U';

                      return Container(
                        margin: EdgeInsets.symmetric(vertical: 4),
                        padding: EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isMe ? AppColors.color1 : Colors.grey.shade300,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              isMe ? 'MOI' : senderFirst,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: isMe ? Colors.white : Colors.black,
                                fontSize: 12,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              content,
                              style: TextStyle(
                                color: isMe ? Colors.white : Colors.black,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              _formatTime(createdAt),
                              style: TextStyle(
                                fontSize: 10,
                                color: isMe
                                    ? Colors.white70
                                    : Colors.grey.shade600,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
          _buildMessageInput(),
        ],
      ),
    );
  }

  Widget _buildMessageInput() {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Colors.grey.shade300)),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _controller,
              decoration: const InputDecoration(
                hintText: "Écrire un message...",
                border: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(horizontal: 12),
              ),
            ),
          ),
          IconButton(
            icon: Icon(Icons.send, color: AppColors.color1),
            onPressed: _sendMessage,
          ),
        ],
      ),
    );
  }

  Future<void> _sendMessage() async {
    final content = _controller.text.trim();
    if (content.isEmpty) return;

    String? convId = widget.conversation['id']?.toString();

    if (convId == null || convId.isEmpty) {
      final conversationService = ServiceLocator.instance
          .get<ConversationService>();
      final otherId = _otherParticipant['id']?.toString() ?? '';

      final created = await conversationService.createConversationBetweenUsers(
        currentUserId: _currentUserId,
        otherUserId: otherId,
      );

      convId = created?['id'] as String?;
      if (convId == null) return;

      setState(() {
        widget.conversation['id'] = convId;
      });
    }

    await widget.viewModel.sendMessage(
      content: content,
      conversationId: convId!,
    );

    _controller.clear();

    // FORCE le rechargement et le rafraîchissement
    await _loadMessages();
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
          SizedBox(height: 16),
          Text("Aucun message", style: TextStyle(color: Colors.grey.shade600)),
          SizedBox(height: 8),
          Text(
            "Envoyez le premier message !",
            style: TextStyle(color: Colors.grey.shade500),
          ),
        ],
      ),
    );
  }

  String _getInitials(String? name) {
    if (name == null || name.isEmpty) return '?';
    final parts = name.trim().split(' ');
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
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
