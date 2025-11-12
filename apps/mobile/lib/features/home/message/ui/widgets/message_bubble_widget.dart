import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'package:safe_driving/features/home/message/ui/widgets/file_message_widget.dart';
import 'package:safe_driving/features/home/message/ui/widgets/image_message_widget.dart';
import 'package:safe_driving/features/home/message/ui/widgets/gif_message_widget.dart';
import 'package:safe_driving/features/home/message/ui/widgets/reaction_widget.dart';
import 'package:safe_driving/features/home/message/ui/utils/message_utils.dart';
import 'package:safe_driving/features/home/message/ui/utils/date_utils.dart'
    as msg_date_utils;

class MessageBubbleWidget extends StatelessWidget {
  final Map<String, dynamic> message;
  final String currentUserId;
  final MessageViewmodels viewModel;
  final String conversationId;
  final Function(Map<String, dynamic>) onReply;
  final bool shouldShowTime;

  const MessageBubbleWidget({
    super.key,
    required this.message,
    required this.currentUserId,
    required this.viewModel,
    required this.conversationId,
    required this.onReply,
    required this.shouldShowTime,
  });

  @override
  Widget build(BuildContext context) {
    final isMe = message['isMine'] as bool? ?? false;
    final content = message['content']?.toString() ?? '';
    final createdAt = message['createdAt']?.toString() ?? '';
    final messageId = message['id']?.toString() ?? '';
    final senderFirst = message['sender']?['firstName']?.toString() ?? 'U';
    final isEdited = message['edited'] ?? false;

    final messageUtils = MessageUtils();
    final dateUtils = msg_date_utils.DateUtils();

    // Détection des différents types de messages
    final bool isGif = messageUtils.isGifMessage(content);
    final String? gifUrl = messageUtils.extractGifUrlRobuste(content);
    final bool isImage = messageUtils.isImageMessage(content);
    final bool isFile = messageUtils.isFileMessage(content);
    final Map<String, String>? imageData = isImage
        ? messageUtils.parseImageMessage(content)
        : null;
    final Map<String, String>? fileData = isFile
        ? messageUtils.parseFileMessage(content)
        : null;

    return GestureDetector(
      onLongPress: () =>
          _showMessageContextMenu(context, messageId, content, isMe),
      onDoubleTap: () {
        viewModel.toggleReaction(messageId: messageId, emoji: '❤️');
      },
      onTap: () {
        _showMessageTapFeedback(context, isMe);
      },
      child: Column(
        crossAxisAlignment: isMe
            ? CrossAxisAlignment.end
            : CrossAxisAlignment.start,
        children: [
          if (shouldShowTime)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Text(
                dateUtils.formatMessageTime(createdAt),
                style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
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
                    _getInitials(senderFirst),
                    style: const TextStyle(color: Colors.white, fontSize: 10),
                  ),
                ),
              if (!isMe) const SizedBox(width: 8),
              Flexible(
                child: Container(
                  margin: const EdgeInsets.symmetric(vertical: 2),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isMe ? AppColors.color1 : Colors.grey.shade200,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (!isMe)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 4),
                          child: Text(
                            senderFirst,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Colors.grey.shade700,
                            ),
                          ),
                        ),

                      // AFFICHAGE SELON LE TYPE DE MESSAGE
                      if (isGif && gifUrl != null)
                        GifMessageWidget(gifUrl: gifUrl, isMe: isMe)
                      else if (isImage && imageData != null)
                        ImageMessageWidget(imageData: imageData, isMe: isMe)
                      else if (isFile && fileData != null)
                        FileMessageWidget(fileData: fileData, isMe: isMe)
                      else
                        Text(
                          content.isNotEmpty ? content : '[Message vide]',
                          style: TextStyle(
                            color: isMe ? Colors.white : Colors.black,
                          ),
                        ),

                      if (isEdited)
                        Padding(
                          padding: const EdgeInsets.only(top: 4),
                          child: Text(
                            'modifié',
                            style: TextStyle(
                              fontSize: 9,
                              color: isMe
                                  ? Colors.white70
                                  : Colors.grey.shade600,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),

                      ReactionWidget(
                        message: message,
                        viewModel: viewModel,
                        currentUserId: currentUserId,
                      ),

                      const SizedBox(height: 4),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            dateUtils.formatTime(createdAt),
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
                              Icons.done,
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
                    _getInitials('Me'),
                    style: const TextStyle(color: Colors.white, fontSize: 10),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  void _showMessageContextMenu(
    BuildContext context,
    String messageId,
    String currentContent,
    bool isMyMessage,
  ) {
    // Implémentation du menu contextuel
  }

  void _showMessageTapFeedback(BuildContext context, bool isMe) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isMe ? 'Appuyez long pour options' : 'Appuyez long pour options',
        ),
        duration: Duration(seconds: 1),
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(8),
      ),
    );
  }

  String _getInitials(String? name) {
    if (name == null || name.isEmpty) return '?';
    final parts = name.trim().split(' ');
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
}
