import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/ui/screens/profil_detail_screen.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class MessageDetailScreen extends StatefulWidget {
  final String sender;
  final MessageViewmodels viewModel;

  const MessageDetailScreen({
    super.key,
    required this.sender,
    required this.viewModel,
  });

  @override
  State<MessageDetailScreen> createState() => _MessageDetailScreenState();
}

class _MessageDetailScreenState extends State<MessageDetailScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    widget.viewModel.addListener(_scrollToBottom);
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
        0,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final messagesFromSender = widget.viewModel.getMessagesBySender(
      widget.sender,
    );

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
                widget.sender[0],
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
                    widget.sender,
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
                  builder: (context) =>
                      ProfileDetailScreen(userName: widget.sender),
                ),
              );
            },
            color: AppColors.dark,
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Date du dernier message
          if (messagesFromSender.isNotEmpty)
            Container(
              padding: const EdgeInsets.symmetric(vertical: 8),
              child: Text(
                _getLastMessageDate(messagesFromSender),
                style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
              ),
            ),

          Expanded(
            child: ListView.builder(
              reverse: true,
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: messagesFromSender.length,
              itemBuilder: (context, index) {
                final message = messagesFromSender[index];
                final isMe = message.senderId == "senderId";

                return Column(
                  crossAxisAlignment: isMe
                      ? CrossAxisAlignment.end
                      : CrossAxisAlignment.start,
                  children: [
                    if (_shouldShowTime(messagesFromSender, index))
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Text(
                          _formatMessageTime(message.createdAt),
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
                              widget.sender[0],
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                              ),
                            ),
                          ),
                        if (!isMe) const SizedBox(width: 8),

                        Flexible(
                          child: Container(
                            margin: const EdgeInsets.symmetric(vertical: 2),
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: isMe
                                  ? AppColors.color1
                                  : Colors.grey.shade200,
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  message.content,
                                  style: TextStyle(
                                    color: isMe ? Colors.white : Colors.black,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    Text(
                                      _formatTime(message.createdAt),
                                      style: TextStyle(
                                        fontSize: 10,
                                        color: isMe
                                            ? Colors.white70
                                            : Colors.grey.shade600,
                                      ),
                                    ),
                                    if (isMe) const SizedBox(width: 4),
                                    if (isMe)
                                      Icon(
                                        message.unread
                                            ? Icons.done
                                            : Icons.done_all,
                                        size: 12,
                                        color: isMe
                                            ? Colors.white70
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
                              "M",
                              style: const TextStyle(
                                color: Colors.white,
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
              color: Colors.white,
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
                        onSubmitted: (value) {
                          _sendMessage();
                        },
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

  void _sendMessage() {
    if (_controller.text.trim().isNotEmpty) {
      widget.viewModel.sendChatMessage(
        content: _controller.text.trim(),
        senderId: "senderId",
        conversationId: "conversation_id",
        recipientId: "recipient_id",
      );
      _controller.clear();
    }
  }

  String _getLastMessageDate(List<dynamic> messages) {
    if (messages.isEmpty) return "";

    final lastMessage = messages.first;
    final now = DateTime.now();
    final messageDate = lastMessage.createdAt;

    if (now.difference(messageDate).inDays == 0) {
      return "Aujourd'hui";
    } else if (now.difference(messageDate).inDays == 1) {
      return "Hier";
    } else {
      return "${messageDate.day}/${messageDate.month}/${messageDate.year}";
    }
  }

  bool _shouldShowTime(List<dynamic> messages, int index) {
    if (index == messages.length - 1) return true;

    final currentMessage = messages[index];
    final previousMessage = messages[index + 1];

    final timeDifference = previousMessage.createdAt.difference(
      currentMessage.createdAt,
    );
    return timeDifference.inMinutes.abs() > 5;
  }

  String _formatMessageTime(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inDays == 0) {
      return "Aujourd'hui";
    } else if (difference.inDays == 1) {
      return "Hier";
    } else if (difference.inDays < 7) {
      return "Il y a ${difference.inDays} jours";
    } else {
      return "${timestamp.day}/${timestamp.month}/${timestamp.year}";
    }
  }

  String _formatTime(DateTime timestamp) {
    return '${timestamp.hour.toString().padLeft(2, '0')}:${timestamp.minute.toString().padLeft(2, '0')}';
  }
}
