import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/features/home/message/ui/screens/conversation_tile.dart';
import 'package:safe_driving/features/home/message/ui/screens/newMessageScreen.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'message_detail_screen.dart';

class MessageScreen extends StatefulWidget {
  const MessageScreen({super.key});

  @override
  State<MessageScreen> createState() => _MessageScreenState();
}

class _MessageScreenState extends State<MessageScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final viewModel = Provider.of<MessageViewmodels>(context, listen: false);

      final sessionService = SessionService();
      final currentId = await sessionService.getUserId();
      if (currentId != null) {
        viewModel.setCurrentUserId(currentId);
      }

      await viewModel.loadConversations();

      if (viewModel.conversations.isNotEmpty) {
        final firstConversation = viewModel.conversations.first;
        await viewModel.loadMessages(conversationId: firstConversation['id']);
      }
    });
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
    final currentUserId = viewModel.currentUserId;

    return ListView.builder(
      padding: EdgeInsets.zero,
      itemCount: viewModel.conversations.length,
      itemBuilder: (context, index) {
        final conversation = viewModel.conversations[index];
        final participants = (conversation['participants'] as List?) ?? [];

        // RÉCUPÉRATION CORRECTE du dernier message
        final lastMessage =
            conversation['lastMessage'] ??
            conversation['latestMessage'] ??
            conversation['messages']?.last;

        print('🔍 Conversation ${conversation['id']}');
        print('   LastMessage disponible: $lastMessage');

        // FILTRE CRITIQUE: Vérifie si l'utilisateur courant est dans les participants
        bool isUserInConversation = false;
        Map<String, dynamic>? otherParticipant;

        for (var p in participants) {
          if (p is Map && p['user'] != null) {
            final user = p['user'];
            final userId = user['id']?.toString();

            if (userId == currentUserId) {
              isUserInConversation = true;
              print('   ✅ User $currentUserId est dans cette conversation');
            } else if (userId != null && userId != currentUserId) {
              otherParticipant = Map<String, dynamic>.from(user);
            }
          }
        }

        // N'affiche QUE si l'utilisateur courant participe à la conversation
        if (!isUserInConversation) {
          print(
            '   ❌ User $currentUserId N\'EST PAS dans cette conversation - IGNORÉ',
          );
          return SizedBox.shrink(); // Cache complètement
        }

        // Si aucun autre participant n'est trouvé, utilise le premier
        if (otherParticipant == null && participants.isNotEmpty) {
          final firstUser = participants.first['user'];
          if (firstUser != null) {
            otherParticipant = Map<String, dynamic>.from(firstUser);
          }
        }

        // Fallback si toujours null
        final safeParticipant =
            otherParticipant ??
            {'firstName': 'Utilisateur', 'lastName': '', 'id': 'unknown'};

        print(
          '   👥 Affiche conversation avec: ${safeParticipant['firstName']}',
        );

        return ConversationTile(
          conversation: conversation,
          otherParticipant: safeParticipant,
          lastMessage: lastMessage, // Passe le lastMessage CORRECT
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
