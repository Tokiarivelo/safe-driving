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
        final lastMessage =
            conversation['lastMessage'] ?? conversation['latestMessage'];

        // RÉDUISEZ CES LOGS pour les performances
        // print('🔍 Conversation ${conversation['id']}');
        // print('   LastMessage disponible: $lastMessage');

        bool isUserInConversation = false;
        Map<String, dynamic>? otherParticipant;

        for (var p in participants) {
          if (p is Map && p['user'] != null) {
            final user = p['user'];
            final userId = user['id']?.toString();

            if (userId == currentUserId) {
              isUserInConversation = true;
              // print('   ✅ User $currentUserId est dans cette conversation');
            } else if (userId != null && userId != currentUserId) {
              otherParticipant = Map<String, dynamic>.from(user);
            }
          }
        }

        if (!isUserInConversation) {
          return SizedBox.shrink();
        }

        final safeParticipant =
            otherParticipant ??
            {'firstName': 'Utilisateur', 'lastName': '', 'id': 'unknown'};

        void onTap() {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => MessageDetailScreen(
                conversation: conversation,
                viewModel: viewModel,
              ),
            ),
          );
        }

        return ConversationTile(
          conversation: conversation,
          otherParticipant: safeParticipant,
          lastMessage: lastMessage,
          onTap: onTap,
          onDelete: (convId) => viewModel.deleteConversation(convId),
          onArchive: (convId) => viewModel.archiveConversation(convId),
          onRename: (convId, newName) =>
              viewModel.updateConversationTitle(convId, newName),
        );
      },
    );
  }
  // Widget _buildConversationsList(MessageViewmodels viewModel) {
  //   final currentUserId = viewModel.currentUserId;

  //   return ListView.builder(
  //     padding: EdgeInsets.zero,
  //     itemCount: viewModel.conversations.length,
  //     itemBuilder: (context, index) {
  //       final conversation = viewModel.conversations[index];
  //       final participants = (conversation['participants'] as List?) ?? [];

  //       // RÉCUPÉRATION CORRECTE du dernier message
  //       final lastMessage =
  //           conversation['lastMessage'] ??
  //           conversation['latestMessage'] ??
  //           conversation['messages']?.last;

  //       print('🔍 Conversation ${conversation['id']}');
  //       print('   LastMessage disponible: $lastMessage');

  //       bool isUserInConversation = false;
  //       Map<String, dynamic>? otherParticipant;

  //       for (var p in participants) {
  //         if (p is Map && p['user'] != null) {
  //           final user = p['user'];
  //           final userId = user['id']?.toString();

  //           if (userId == currentUserId) {
  //             isUserInConversation = true;
  //             print('   ✅ User $currentUserId est dans cette conversation');
  //           } else if (userId != null && userId != currentUserId) {
  //             otherParticipant = Map<String, dynamic>.from(user);
  //           }
  //         }
  //       }

  //       if (!isUserInConversation) {
  //         print(
  //           '   ❌ User $currentUserId N\'EST PAS dans cette conversation - IGNORÉ',
  //         );
  //         return SizedBox.shrink();
  //       }
  //       if (otherParticipant == null && participants.isNotEmpty) {
  //         final firstUser = participants.first['user'];
  //         if (firstUser != null) {
  //           otherParticipant = Map<String, dynamic>.from(firstUser);
  //         }
  //       }
  //       final safeParticipant =
  //           otherParticipant ??
  //           {'firstName': 'Utilisateur', 'lastName': '', 'id': 'unknown'};

  //       print(
  //         '   👥 Affiche conversation avec: ${safeParticipant['firstName']}',
  //       );

  //       void onTap() {
  //         Navigator.push(
  //           context,
  //           MaterialPageRoute(
  //             builder: (_) => MessageDetailScreen(
  //               conversation: conversation,
  //               viewModel: viewModel,
  //             ),
  //           ),
  //         );
  //       }

  //       return ConversationTile(
  //         conversation: conversation,
  //         otherParticipant: safeParticipant,
  //         lastMessage: lastMessage,
  //         onTap: onTap,
  //         onDelete: (convId) => viewModel.deleteConversation(convId),
  //         onArchive: (convId) => viewModel.archiveConversation(convId),
  //         onRename: (convId, newName) =>
  //             viewModel.updateConversationTitle(convId, newName),
  //       );
  //     },
  //   );
  // }

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

  // void _showSearchDialog(BuildContext context, MessageViewmodels viewModel) {
  //   final searchController = TextEditingController();

  //   showDialog(
  //     context: context,
  //     builder: (BuildContext context) {
  //       return Dialog(
  //         shape: RoundedRectangleBorder(
  //           borderRadius: BorderRadius.circular(12),
  //         ),
  //         child: Padding(
  //           padding: const EdgeInsets.all(16),
  //           child: Column(
  //             mainAxisSize: MainAxisSize.min,
  //             children: [
  //               TextField(
  //                 controller: searchController,
  //                 decoration: InputDecoration(
  //                   hintText: 'Rechercher une conversation...',
  //                   prefixIcon: const Icon(Icons.search),
  //                   border: OutlineInputBorder(
  //                     borderRadius: BorderRadius.circular(8),
  //                   ),
  //                 ),
  //                 autofocus: true,
  //                 onChanged: (value) {
  //                   viewModel.searchMessages(value);
  //                 },
  //               ),
  //               const SizedBox(height: 16),
  //               Row(
  //                 mainAxisAlignment: MainAxisAlignment.end,
  //                 children: [
  //                   TextButton(
  //                     onPressed: () {
  //                       viewModel.searchMessages('');
  //                       Navigator.pop(context);
  //                     },
  //                     child: const Text('Annuler'),
  //                   ),
  //                   const SizedBox(width: 8),
  //                   ElevatedButton(
  //                     onPressed: () {
  //                       viewModel.searchMessages(searchController.text);
  //                       Navigator.pop(context);
  //                     },
  //                     child: const Text('Rechercher'),
  //                   ),
  //                 ],
  //               ),
  //             ],
  //           ),
  //         ),
  //       );
  //     },
  //   ).then((_) {
  //     viewModel.searchMessages('');
  //   });
  // }

  void _showSearchDialog(BuildContext context, MessageViewmodels viewModel) {
    final searchController = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Dialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Container(
                constraints: BoxConstraints(maxHeight: 500),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Header de recherche
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: TextField(
                        controller: searchController,
                        decoration: InputDecoration(
                          hintText: 'Rechercher une conversation...',
                          prefixIcon: const Icon(Icons.search),
                          suffixIcon: viewModel.isSearching
                              ? Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: SizedBox(
                                    width: 16,
                                    height: 16,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                    ),
                                  ),
                                )
                              : searchController.text.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(Icons.clear, size: 20),
                                  onPressed: () {
                                    searchController.clear();
                                    viewModel.cancelSearch();
                                    setState(() {}); // Force rebuild
                                  },
                                )
                              : null,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        autofocus: true,
                        onChanged: (value) {
                          print('📝 Texte saisi: "$value"');
                          viewModel.searchConversations(value);
                          setState(() {}); // Important pour mettre à jour l'UI
                        },
                      ),
                    ),

                    // Résultats de recherche
                    Expanded(child: _buildSearchResults(viewModel, context)),

                    // Footer
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        border: Border(
                          top: BorderSide(color: Colors.grey.shade300),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          TextButton(
                            onPressed: () {
                              viewModel.cancelSearch();
                              Navigator.pop(context);
                            },
                            child: const Text('Fermer'),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    ).then((_) {
      viewModel.cancelSearch();
    });
  }

  Widget _buildSearchResults(
    MessageViewmodels viewModel,
    BuildContext context,
  ) {
    // Utilisez Consumer pour réagir aux changements du ViewModel
    return Consumer<MessageViewmodels>(
      builder: (context, viewModel, child) {
        print(
          '🔄 UI mise à jour - Recherche: "${viewModel.currentSearchQuery}"',
        );
        print('   Résultats: ${viewModel.searchResults.length}');
        print('   En cours: ${viewModel.isSearching}');

        // État de recherche en cours
        if (viewModel.isSearching) {
          return const Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircularProgressIndicator(),
                SizedBox(height: 16),
                Text('Recherche en cours...'),
              ],
            ),
          );
        }

        // Aucune recherche
        if (viewModel.currentSearchQuery.isEmpty) {
          return const Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.search, size: 64, color: Colors.grey),
                SizedBox(height: 16),
                Text('Commencez à taper pour rechercher'),
              ],
            ),
          );
        }

        // Aucun résultat
        if (viewModel.searchResults.isEmpty) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.search_off, size: 64, color: Colors.grey),
                SizedBox(height: 16),
                Text('Aucun résultat trouvé'),
                SizedBox(height: 8),
                Text(
                  'Aucune conversation ne correspond à "${viewModel.currentSearchQuery}"',
                  style: TextStyle(color: Colors.grey),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          );
        }

        // Affichage des résultats
        return ListView.builder(
          padding: const EdgeInsets.all(8),
          itemCount: viewModel.searchResults.length,
          itemBuilder: (context, index) {
            final conversation = viewModel.searchResults[index];
            final participants = (conversation['participants'] as List?) ?? [];

            // Trouver l'autre participant
            Map<String, dynamic>? otherParticipant;
            for (var p in participants) {
              if (p is Map && p['user'] != null) {
                final user = p['user'];
                final userId = user['id']?.toString();
                if (userId != viewModel.currentUserId) {
                  otherParticipant = Map<String, dynamic>.from(user);
                  break;
                }
              }
            }

            final safeParticipant =
                otherParticipant ??
                {'firstName': 'Utilisateur', 'lastName': '', 'id': 'unknown'};

            return Card(
              margin: const EdgeInsets.symmetric(vertical: 4),
              child: ListTile(
                leading: CircleAvatar(
                  backgroundColor: AppColors.color1,
                  child: Text(
                    safeParticipant['firstName']?.toString().isNotEmpty == true
                        ? safeParticipant['firstName'][0].toUpperCase()
                        : 'U',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                title: Text(
                  '${safeParticipant['firstName'] ?? ''} ${safeParticipant['lastName'] ?? ''}',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Text(
                  'Tapez pour ouvrir la conversation',
                  style: TextStyle(color: Colors.grey[600]),
                ),
                onTap: () {
                  viewModel.cancelSearch();
                  Navigator.pop(context);
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
              ),
            );
          },
        );
      },
    );
  }
}
