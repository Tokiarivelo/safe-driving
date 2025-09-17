import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';

class MessageTile extends StatelessWidget {
  final MessageModels message;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const MessageTile({
    super.key,
    required this.message,
    this.onTap,
    this.onLongPress,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      onLongPress: onLongPress,
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
        decoration: BoxDecoration(
          color: AppColors.light,
          border: Border(
            bottom: BorderSide(
              color: AppColors.unclickable.withValues(alpha: 0.2),
              width: 1,
            ),
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.color1,
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  message.sender[0],
                  style: const TextStyle(
                    color: AppColors.light,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            // Contenu du message
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        message.sender,
                        style: TextStyle(
                          fontWeight: message.unread
                              ? FontWeight.bold
                              : FontWeight.w600,
                          fontSize: 16,
                          color: AppColors.dark,
                        ),
                      ),
                      Text(
                        message.time,
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.unclickable,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    message.content,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.unclickable,
                      fontWeight: message.unread
                          ? FontWeight.w500
                          : FontWeight.normal,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            if (message.unread)
              Padding(
                padding: const EdgeInsets.only(left: 8.0),
                child: Container(
                  width: 10,
                  height: 10,
                  decoration: const BoxDecoration(
                    color: AppColors.color1,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
