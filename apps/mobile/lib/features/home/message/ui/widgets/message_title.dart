import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';

class MessageTitle extends StatelessWidget {
  final MessageModels message;
  const MessageTitle({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
      child: InkWell(
        onTap: () {},
        child: ListTile(
          leading: CircleAvatar(
            backgroundColor: AppColors.color1,
            child: Text(
              message.sender[0],
              style: const TextStyle(color: AppColors.light),
            ),
          ),
          title: Text(
            message.sender,
            style: TextStyle(
              fontWeight: message.unread ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          subtitle: Text(message.content),
          trailing: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(message.time, style: const TextStyle(fontSize: 12)),
              if (message.unread)
                const Icon(Icons.circle, color: AppColors.color1, size: 12),
            ],
          ),
        ),
      ),
    );
  }
}
