import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/ui/screens/newMessageScreen.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'message_detail_screen.dart';

class MessageScreen extends StatefulWidget {
  const MessageScreen({super.key});

  @override
  State<MessageScreen> createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  String? _currentUserId;

  @override
  void initState() {
    super.initState();
    _loadCurrentUser();
  }

  Future<void> _loadCurrentUser() async {
    final messageViewModel = Provider.of<MessageViewmodels>(
      context,
      listen: false,
    );
    _currentUserId = await messageViewModel.loadCurrentUserId();
    messageViewModel.loadConversations();
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<MessageViewmodels>(context);

    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          _buildCompleteHeader(context, viewModel),
          _buildTabBar(viewModel),
          Expanded(
            child: RefreshIndicator(
              onRefresh: () => viewModel.loadConversations(),
              child: viewModel.isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : viewModel.conversations.isEmpty
                  ? _buildEmptyState()
                  : _buildConversationsList(viewModel),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConversationsList(MessageViewmodels viewModel) {
    return ListView.builder(
      padding: EdgeInsets.zero,
      itemCount: viewModel.conversations.length,
      itemBuilder: (context, index) {
        final conversation = viewModel.conversations[index];
        final participants = conversation['participants'] as List? ?? [];

        // Trouver l'autre participant (pas l'utilisateur courant)
        final otherParticipant = participants.firstWhere(
          (p) => p['user']?['id'] != _currentUserId,
          orElse: () => participants.isNotEmpty ? participants.first : {},
        );

        final messages = conversation['messages'] as List? ?? [];
        final lastMessage = messages.isNotEmpty ? messages.last : null;

        return ConversationTile(
          conversation: conversation,
          otherParticipant:
              otherParticipant['user'] ?? {}, // Accéder à l'objet user
          lastMessage: lastMessage,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => MessageDetailScreen(
                  conversation: conversation,
                  viewModel: viewModel,
                ),
              ),
            );
          },
        );
      },
    );
  }

  // Le reste de votre code reste inchangé...
  Widget _buildCompleteHeader(
    BuildContext context,
    MessageViewmodels viewModel,
  ) {
    return Container(
      color: Colors.white,
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top + 16,
        left: 16,
        right: 16,
        bottom: 16,
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () {},
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: AppColors.color1,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.person,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
              ),

              const Text(
                'Messages',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                  color: Colors.black,
                ),
              ),

              Row(
                children: [
                  IconButton(
                    onPressed: () {
                      _showSearchDialog(context, viewModel);
                    },
                    icon: const Icon(
                      Icons.search,
                      color: Colors.black,
                      size: 24,
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const NewMessageScreen(),
                        ),
                      ).then((_) {
                        viewModel.loadConversations();
                      });
                    },
                    icon: const Icon(Icons.edit, color: Colors.black, size: 24),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildTabBar(MessageViewmodels viewModel) {
    return Container(
      color: Colors.white,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(child: _buildTab('Tous', 0, viewModel)),
                Expanded(child: _buildTab('Non lus', 1, viewModel)),
                Expanded(child: _buildTab('Lus', 2, viewModel)),
                Expanded(child: _buildTab('Archivés', 3, viewModel)),
              ],
            ),
          ),
          Container(height: 2, color: Colors.grey.shade400),
        ],
      ),
    );
  }

  Widget _buildTab(String label, int index, MessageViewmodels viewModel) {
    final isActive = viewModel.selectedTab == index;
    return GestureDetector(
      onTap: () => viewModel.selectTab(index),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isActive ? AppColors.color1 : Colors.transparent,
              width: 3,
            ),
          ),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            color: isActive ? AppColors.color1 : Colors.grey.shade700,
            fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.chat, size: 64, color: Colors.grey),
          SizedBox(height: 16),
          Text(
            "Aucune conversation",
            style: TextStyle(color: Colors.grey, fontSize: 16),
          ),
          SizedBox(height: 8),
          Text(
            "Commencez une nouvelle conversation",
            style: TextStyle(color: Colors.grey, fontSize: 14),
          ),
        ],
      ),
    );
  }

  void _showSearchDialog(BuildContext context, MessageViewmodels viewModel) {
    final searchController = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: searchController,
                  decoration: InputDecoration(
                    hintText: 'Rechercher une conversation...',
                    prefixIcon: const Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  autofocus: true,
                  onChanged: (value) {
                    viewModel.searchMessages(value);
                  },
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: () {
                        viewModel.searchMessages('');
                        Navigator.pop(context);
                      },
                      child: const Text('Annuler'),
                    ),
                    const SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () {
                        viewModel.searchMessages(searchController.text);
                        Navigator.pop(context);
                      },
                      child: const Text('Rechercher'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    ).then((_) {
      viewModel.searchMessages('');
    });
  }
}

class ConversationTile extends StatelessWidget {
  final dynamic conversation;
  final dynamic otherParticipant;
  final dynamic lastMessage;
  final VoidCallback onTap;

  const ConversationTile({
    super.key,
    required this.conversation,
    required this.otherParticipant,
    required this.lastMessage,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final name =
        '${otherParticipant['firstName'] ?? 'Utilisateur'} '
                '${otherParticipant['lastName'] ?? ''}'
            .trim();

    final lastMsg = lastMessage?['content'] ?? 'Aucun message';
    final createdAt =
        lastMessage?['createdAt'] ?? conversation['updatedAt'] ?? '';

    return ListTile(
      leading: CircleAvatar(
        backgroundColor: AppColors.color1,
        child: Text(
          name.isNotEmpty ? name[0].toUpperCase() : 'U',
          style: const TextStyle(color: Colors.white),
        ),
      ),
      title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(lastMsg, maxLines: 1, overflow: TextOverflow.ellipsis),
      trailing: Text(
        _formatDate(createdAt),
        style: const TextStyle(fontSize: 12, color: Colors.grey),
      ),
      onTap: onTap,
    );
  }

  String _formatDate(String? dateString) {
    if (dateString == null || dateString.isEmpty) return '';
    try {
      final date = DateTime.parse(dateString).toLocal();
      final now = DateTime.now();
      if (now.difference(date).inDays == 0) {
        return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
      } else if (now.difference(date).inDays == 1) {
        return 'Hier';
      } else {
        return '${date.day}/${date.month}';
      }
    } catch (_) {
      return '';
    }
  }
}
