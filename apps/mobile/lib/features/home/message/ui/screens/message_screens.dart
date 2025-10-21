import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
// import 'package:safe_driving/features/home/message/models/message_models.dart';
// import 'package:safe_driving/features/home/message/ui/screens/message_detail_screen.dart';
// import 'package:safe_driving/features/home/message/ui/widgets/message_title.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class MessageScreen extends StatelessWidget {
  const MessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => MessageViewmodels(
        conversationService: throw UnimplementedError(
          'Provide a ConversationService instance here',
        ),
        // ignore: dead_code
        messageService: throw UnimplementedError(
          'Provide a MessageService instance here',
        ),
      ),
      child: Scaffold(
        appBar: AppBar(
          title: const Text(
            'Messages',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          elevation: 0,
          backgroundColor: Colors.transparent,
          foregroundColor: AppColors.dark,
        ),
        body: const MessageContent(),
      ),
    );
  }
}

class MessageContent extends StatelessWidget {
  const MessageContent({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withValues(alpha: 0.2),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
    );
  }

  // void _showContextMenu(
  //   BuildContext context,
  //   MessageViewmodels viewModel,
  //   MessageModels message,
  // ) {
  //   showModalBottomSheet(
  //     context: context,
  //     builder: (BuildContext context) {
  //       return SafeArea(
  //         child: Wrap(
  //           children: [
  //             ListTile(
  //               leading: const Icon(Icons.mark_as_unread),
  //               title: const Text('Marquer comme non lu'),
  //               onTap: () {
  //                 Navigator.pop(context);
  //                 viewModel.markAsUnread(message);
  //               },
  //             ),
  //             ListTile(
  //               leading: const Icon(Icons.delete),
  //               title: const Text('Supprimer'),
  //               onTap: () {
  //                 Navigator.pop(context);
  //                 viewModel.deleteMessage(message);
  //               },
  //             ),
  //             ListTile(
  //               leading: const Icon(Icons.archive),
  //               title: const Text('Archiver'),
  //               onTap: () {
  //                 Navigator.pop(context);
  //                 viewModel.archiveMessage(message);
  //               },
  //             ),
  //           ],
  //         ),
  //       );
  //     },
  //   );
  // }
}
