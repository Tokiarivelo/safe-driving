// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
// import 'package:safe_driving/features/home/message/ui/widgets/message_title.dart';
// import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

// class MessageScreens extends StatelessWidget {
//   const MessageScreens({super.key});

//   @override
//   Widget build(BuildContext context) {
//     final viewModel = Provider.of<MessageViewmodels>(context);

//     return Scaffold(
//       appBar: AppBar(title: const Text('Messages')),
//       body: ListView.builder(
//         padding: const EdgeInsets.all(8),
//         itemCount: viewModel.messages.length,
//         itemBuilder: (context, index) {
//           final msg = viewModel.messages[index];
//           return MessageTitle(message: msg);
//         },
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

void main() {
  runApp(const MessageScreens());
}

class MessageScreens extends StatelessWidget {
  const MessageScreens({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Safe Driving - Messages',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const MessageScreen(),
    );
  }
}

class MessageScreen extends StatefulWidget {
  const MessageScreen({super.key});

  @override
  State<MessageScreen> createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  int _selectedTab = 0;
  final List<String> _tabs = ['Tous', 'Non lus', 'Lus', 'Archivés'];

  final List<Message> _messages = [
    Message(
      sender: 'Maria',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '07:40 am',
      unread: true,
    ),
    Message(
      sender: 'John',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '07:40 am',
      unread: true,
    ),
    Message(
      sender: 'Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '07:40 am',
      unread: false,
    ),
    Message(
      sender: 'Monique',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '07:40 am',
      unread: true,
    ),
    Message(
      sender: 'Sarah',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      time: '07:40 am',
      unread: false,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Messages',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
        ),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
      ),
      body: Column(
        children: [
          // Barre de navigation horizontale
          SizedBox(
            height: 50,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _tabs.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: ChoiceChip(
                    label: Text(_tabs[index]),
                    selected: _selectedTab == index,
                    selectedColor: AppColors.color1,
                    labelStyle: TextStyle(
                      color: _selectedTab == index
                          ? Colors.white
                          : Colors.black,
                    ),
                    onSelected: (bool selected) {
                      setState(() {
                        _selectedTab = selected ? index : 0;
                      });
                    },
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 16),
          // Liste des messages
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[index];
                return MessageTile(message: message);
              },
            ),
          ),
        ],
      ),
    );
  }
}

class Message {
  final String sender;
  final String content;
  final String time;
  final bool unread;

  Message({
    required this.sender,
    required this.content,
    required this.time,
    required this.unread,
  });
}

class MessageTile extends StatelessWidget {
  final Message message;

  const MessageTile({super.key, required this.message});

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
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Avatar
          CircleAvatar(
            backgroundColor: AppColors.color1,
            child: Text(
              message.sender[0],
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(width: 16),
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
                            : FontWeight.normal,
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      message.time,
                      style: const TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  message.content,
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          // Indicateur de message non lu
          if (message.unread)
            const Padding(
              padding: EdgeInsets.only(left: 8.0),
              child: Icon(Icons.circle, color: AppColors.color1, size: 12),
            ),
        ],
      ),
    );
  }
}
