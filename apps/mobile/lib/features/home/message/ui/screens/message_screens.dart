import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/home/message/ui/widgets/message_title.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class MessageScreens extends StatelessWidget {
  const MessageScreens({super.key});

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<MessageViewmodels>(context);

    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: viewModel.messages.length,
      itemBuilder: (context, index) {
        final msg = viewModel.messages[index];
        return MessageTitle(message: msg);
      },
    );
  }
}
