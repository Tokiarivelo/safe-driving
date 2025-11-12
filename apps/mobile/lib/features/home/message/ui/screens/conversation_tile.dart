import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class ConversationTile extends StatelessWidget {
  final dynamic conversation;
  final dynamic otherParticipant;
  final dynamic lastMessage;
  final bool isLoading;
  final VoidCallback onTap;
  final Function(String)? onDelete;
  final Function(String)? onArchive;
  final Function(String, String)? onRename;

  const ConversationTile({
    super.key,
    required this.conversation,
    required this.otherParticipant,
    required this.lastMessage,
    this.isLoading = false,
    required this.onTap,
    this.onDelete,
    this.onArchive,
    this.onRename,
  });

  @override
  Widget build(BuildContext context) {
    final name =
        '${otherParticipant['firstName'] ?? 'Utilisateur'} ${otherParticipant['lastName'] ?? ''}'
            .trim();

    String lastMsgContent;
    String? createdAt;

    if (isLoading) {
      lastMsgContent = 'Chargement...';
      createdAt = null;
    } else if (lastMessage != null && lastMessage['content'] != null) {
      lastMsgContent = lastMessage['content'];
      createdAt = lastMessage['createdAt'];

      if (lastMsgContent.length > 40) {
        lastMsgContent = '${lastMsgContent.substring(0, 40)}...';
      }
    } else {
      lastMsgContent = 'Aucun message';
      createdAt = null;
    }

    return ListTile(
      leading: CircleAvatar(
        backgroundColor: AppColors.color1,
        child: Text(
          name.isNotEmpty ? name[0].toUpperCase() : 'U',
          style: const TextStyle(color: AppColors.light),
        ),
      ),
      title: Row(
        children: [
          Expanded(
            child: Text(
              name,
              style: const TextStyle(fontWeight: FontWeight.bold),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          if (isLoading)
            const SizedBox(
              width: 16,
              height: 16,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
        ],
      ),
      subtitle: Text(
        lastMsgContent,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(
          color:
              lastMsgContent == 'Aucun message' ||
                  lastMsgContent == 'Chargement...'
              ? Colors.grey
              : AppColors.dark,
          fontStyle: lastMsgContent == 'Aucun message'
              ? FontStyle.italic
              : FontStyle.normal,
        ),
      ),
      trailing: Text(
        _formatDate(createdAt),
        style: const TextStyle(fontSize: 12, color: Colors.grey),
      ),
      // onTap: isLoading ? null : onTap,
      onTap: onTap,
      onLongPress: () => _showContextMenu(context),
    );
  }

  void _showContextMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: Icon(Icons.archive),
              title: Text('Archiver'),
              onTap: () {
                Navigator.pop(context);
                onArchive?.call(conversation['id']);
              },
            ),
            ListTile(
              leading: Icon(Icons.edit),
              title: Text('Renommer'),
              onTap: () {
                Navigator.pop(context);
                _showRenameDialog(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.delete, color: Colors.red),
              title: Text('Supprimer', style: TextStyle(color: Colors.red)),
              onTap: () {
                Navigator.pop(context);
                _showDeleteConfirmation(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showDeleteConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Supprimer la conversation ?'),
        content: Text('Cette action est irréversible.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Annuler'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              onDelete?.call(conversation['id']);
            },
            child: Text('Supprimer', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _showRenameDialog(BuildContext context) {
    final controller = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Renommer la conversation'),
        content: TextField(
          controller: controller,
          decoration: InputDecoration(hintText: 'Nouveau nom'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Annuler'),
          ),
          TextButton(
            onPressed: () {
              if (controller.text.trim().isNotEmpty) {
                Navigator.pop(context);
                onRename?.call(conversation['id'], controller.text.trim());
              }
            },
            child: Text('Renommer'),
          ),
        ],
      ),
    );
  }

  String _formatDate(String? dateString) {
    if (dateString == null || dateString.isEmpty) return '';
    try {
      final date = DateTime.parse(dateString).toLocal();
      final now = DateTime.now();
      final difference = now.difference(date);

      if (difference.inDays == 0) {
        return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
      } else if (difference.inDays == 1) {
        return 'Hier';
      } else if (difference.inDays < 7) {
        return '${difference.inDays}j';
      } else {
        return '${date.day}/${date.month}';
      }
    } catch (_) {
      return '';
    }
  }
}
