import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class MessageInputWidget extends StatelessWidget {
  final TextEditingController controller;
  final Map<String, dynamic>? replyingTo;
  final VoidCallback onSendMessage;
  final VoidCallback onSendReply;
  final VoidCallback onShowSendOptions;
  final VoidCallback onToggleEmojiPicker;
  final VoidCallback onShowGifPicker;

  const MessageInputWidget({
    super.key,
    required this.controller,
    required this.replyingTo,
    required this.onSendMessage,
    required this.onSendReply,
    required this.onShowSendOptions,
    required this.onToggleEmojiPicker,
    required this.onShowGifPicker,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
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
                icon: Icon(Icons.add_circle_outline, color: AppColors.color1),
                onPressed: onShowSendOptions,
              ),
              Expanded(
                child: TextField(
                  controller: controller,
                  decoration: InputDecoration(
                    hintText: replyingTo != null
                        ? "Tapez votre réponse..."
                        : "Écrire un message...",
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(horizontal: 12),
                  ),
                  onSubmitted: (_) =>
                      replyingTo != null ? onSendReply() : onSendMessage,
                ),
              ),
              IconButton(
                icon: Icon(Icons.emoji_emotions, color: AppColors.color1),
                onPressed: onToggleEmojiPicker,
              ),
              IconButton(
                icon: Icon(
                  replyingTo != null ? Icons.reply : Icons.send,
                  color: AppColors.color1,
                ),
                onPressed: replyingTo != null ? onSendReply : onSendMessage,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
