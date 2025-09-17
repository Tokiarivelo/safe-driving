import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/models/message_models.dart';

class MessageDetailScreen extends StatelessWidget {
  final MessageModels message;

  const MessageDetailScreen({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          message.sender,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        foregroundColor: AppColors.dark,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(icon: const Icon(Icons.more_vert), onPressed: () {}),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // En-tête du message
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Doc',
                  style: TextStyle(fontSize: 14, color: AppColors.unclickable),
                ),
                Text(
                  message.time,
                  style: TextStyle(fontSize: 14, color: AppColors.unclickable),
                ),
              ],
            ),
            const SizedBox(height: 8),

            // Titre principal
            const Text(
              'In Time...',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 24),

            // Contenu structuré comme sur la capture
            _buildDocumentSection(
              'Info.bm',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortique sollicitudin suscipit. Ut vincor posuere nisi, eget molte mauris. Nullam blandiam nec erat ineu dignissim.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Note here',
              'Done ultricies felicidunt libero, porttitor pulvinar nostrud. Viverra et. in baiecium frigidus fior tortius sollicitudin. Sed nec dictum tercier, or gravide mauris.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Info.bm',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortique sollicitudin suscipit. Ut vincor posuere nisi, eget molte mauris. Nullam blandiam nec erat ineu dignissim.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Note here',
              'Done ultricies felicidunt libero, porttitor pulvinar nostrud. Viverra et. in baiecium frigidus fior tortius sollicitudin. Sed nec dictum tercier, or gravide mauris.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Note here',
              'Done ultricies felicidunt libero, porttitor pulvinar nostrud. Viverra et. in baiecium frigidus fior tortius sollicitudin. Sed nec dictum tercier, or gravide mauris.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Note here',
              'Done ultricies felicidunt libero, porttitor pulvinar nostrud. Viverra et. in baiecium frigidus fior tortius sollicitudin. Sed nec dictum tercier, or gravide mauris.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Note here',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortique sollicitudin suscipit. Ut vincor posuere nisi, eget molte mauris. Nullam blandiam nec erat ineu dignissim.',
            ),

            const SizedBox(height: 20),

            _buildDocumentSection(
              'Note here',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tortique sollicitudin suscipit. Ut vincor posuere nisi, eget molte mauris. Nullam blandiam nec erat ineu dignissim.',
            ),

            const SizedBox(height: 20),

            // Ligne de séparation
            const Divider(height: 30),
            const SizedBox(height: 10),

            // Paragraphe final
            const Text(
              'Sed mauris felis gravida sult fugula nec volutpat pulvinar est. Aenean floritus libero et massa volutpat purae. Ut feugiat ut lest ad consequat. Quisque dic totim nullam. Tincidunt lorem quis, luctus augue. Donec erat ipsum drip sapis duibeur, tincidunt facet quis nostrud. Iltip sed rutile aliquet, ut aliquet fecek dignitat. Duis quis celiflora magna. In venenatis congue piumine.',
              style: TextStyle(fontSize: 16, height: 1.5),
              textAlign: TextAlign.justify,
            ),

            const SizedBox(height: 30),
          ],
        ),
      ),
      // Actions en bas de l'écran
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.light,
          border: Border(top: BorderSide(color: Colors.grey.shade300)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(
              icon: Icon(Icons.reply, color: AppColors.color1, size: 28),
              onPressed: () {},
              tooltip: 'Répondre',
            ),
            IconButton(
              icon: Icon(Icons.forward, color: AppColors.color1, size: 28),
              onPressed: () {},
              tooltip: 'Transférer',
            ),
            IconButton(
              icon: Icon(Icons.delete, color: AppColors.color1, size: 28),
              onPressed: () {},
              tooltip: 'Supprimer',
            ),
            IconButton(
              icon: Icon(Icons.archive, color: AppColors.color1, size: 28),
              onPressed: () {},
              tooltip: 'Archiver',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDocumentSection(String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
            height: 1.3,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          content,
          style: const TextStyle(fontSize: 15, height: 1.4),
          textAlign: TextAlign.justify,
        ),
      ],
    );
  }
}
