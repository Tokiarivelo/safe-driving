import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class NewMessageScreen extends StatelessWidget {
  const NewMessageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Provider.of<MessageViewmodels>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Nouveau message')),
      body: ListView(
        children: [
          //  liste des contacts
          ListTile(
            title: const Text('Contact exemple'),
            onTap: () {
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}
