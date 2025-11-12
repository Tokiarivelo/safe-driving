import 'package:flutter/material.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class ReactionWidget extends StatelessWidget {
  final Map<String, dynamic> message;
  final MessageViewmodels viewModel;
  final String currentUserId;

  const ReactionWidget({
    super.key,
    required this.message,
    required this.viewModel,
    required this.currentUserId,
  });

  @override
  Widget build(BuildContext context) {
    final messageId = message['id']?.toString() ?? '';
    final reactions = viewModel.getReactionsForMessage(messageId);

    if (reactions.isEmpty) return SizedBox.shrink();

    final reactionsByEmoji = <String, List<Map<String, dynamic>>>{};
    for (final reaction in reactions) {
      final emoji = reaction['emoji'];
      reactionsByEmoji[emoji] = [...reactionsByEmoji[emoji] ?? [], reaction];
    }

    return Container(
      margin: EdgeInsets.only(top: 4),
      child: Wrap(
        spacing: 4,
        runSpacing: 2,
        children: reactionsByEmoji.entries.map((entry) {
          final emoji = entry.key;
          final emojiReactions = entry.value;
          final isUserReacted = emojiReactions.any(
            (r) => r['userId'] == currentUserId,
          );

          return GestureDetector(
            onTap: () {
              viewModel.toggleReaction(messageId: messageId, emoji: emoji);
            },
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: isUserReacted
                    ? Colors.blue.shade100
                    : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: isUserReacted ? Colors.blue : Colors.grey.shade300,
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(emoji, style: TextStyle(fontSize: 14)),
                  SizedBox(width: 4),
                  Text(
                    emojiReactions.length.toString(),
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: isUserReacted
                          ? Colors.blue.shade800
                          : Colors.grey.shade700,
                    ),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
