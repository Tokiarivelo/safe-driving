import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';
import 'package:safe_driving/features/home/message/ui/screens/message_detail_screen.dart';
import 'package:safe_driving/features/home/message/ui/widgets/message_title.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class MessageScreen extends StatelessWidget {
  const MessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => MessageViewmodels(),
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
    final viewModel = Provider.of<MessageViewmodels>(context);

    return Column(
      children: [
        SizedBox(
          height: 50,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: viewModel.tabs.map((tab) {
              final index = viewModel.tabs.indexOf(tab);
              return GestureDetector(
                onTap: () => viewModel.selectTab(index),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: viewModel.selectedTab == index
                        ? AppColors.color1
                        : Colors.transparent,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    tab,
                    style: TextStyle(
                      color: viewModel.selectedTab == index
                          ? AppColors.light
                          : AppColors.unclickable,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ),
        const Divider(height: 1),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          color: AppColors.light,
          child: Row(
            children: [
              Expanded(
                child: Container(
                  height: 40,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: AppColors.light,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Rechercher...',
                      hintStyle: TextStyle(color: AppColors.unclickable),
                      border: InputBorder.none,
                      icon: Icon(Icons.search, color: AppColors.unclickable),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.color1,
                  shape: BoxShape.circle,
                ),
                child: IconButton(
                  icon: const Icon(
                    Icons.filter_list,
                    color: AppColors.light,
                    size: 20,
                  ),
                  onPressed: () {},
                ),
              ),
            ],
          ),
        ),
        const Divider(height: 1),
        // Liste des messages
        Expanded(
          child: ListView.builder(
            padding: EdgeInsets.zero,
            itemCount: viewModel.message.length,
            itemBuilder: (context, index) {
              final message = viewModel.message[index];
              return MessageTile(
                message: message,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          MessageDetailScreen(message: message),
                    ),
                  ).then((_) {
                    if (message.unread) {
                      viewModel.markAsRead(message);
                    }
                  });
                },
                onLongPress: () {
                  _showContextMenu(context, viewModel, message);
                },
              );
            },
          ),
        ),
      ],
    );
  }

  void _showContextMenu(
    BuildContext context,
    MessageViewmodels viewModel,
    MessageModels message,
  ) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Wrap(
            children: [
              ListTile(
                leading: const Icon(Icons.mark_as_unread),
                title: const Text('Marquer comme non lu'),
                onTap: () {
                  Navigator.pop(context);
                  viewModel.markAsUnread(message);
                },
              ),
              ListTile(
                leading: const Icon(Icons.delete),
                title: const Text('Supprimer'),
                onTap: () {
                  Navigator.pop(context);
                  viewModel.deleteMessage(message);
                },
              ),
              ListTile(
                leading: const Icon(Icons.archive),
                title: const Text('Archiver'),
                onTap: () {
                  Navigator.pop(context);
                  viewModel.archiveMessage(message);
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
