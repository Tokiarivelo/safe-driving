import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';

class MessageItem extends StatelessWidget {
  final MessageModels message;

  const MessageItem({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 25,
            backgroundImage: AssetImage('assets/images/avatar.png'),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  message.sender,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  message.content,
                  style: TextStyle(color: AppColors.unclickable, fontSize: 14),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                message.time,
                style: TextStyle(
                  color: AppColors.unclickable,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                ),
              ),
              if (message.unread)
                Container(
                  margin: const EdgeInsets.only(top: 6),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 6,
                    vertical: 2,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.borderInputField,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text(
                    "10",
                    style: TextStyle(color: AppColors.dark, fontSize: 12),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
