import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';
import 'package:safe_driving/features/home/message/service/conversation_service.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/shared/state_management/service_locator.dart';
import 'message_detail_screen.dart';

class NewMessageScreen extends StatefulWidget {
  const NewMessageScreen({super.key});

  @override
  State<NewMessageScreen> createState() => _NewMessageScreenState();
}

class _NewMessageScreenState extends State<NewMessageScreen> {
  final TextEditingController _searchController = TextEditingController();
  late ConversationService _conversationService;
  late SessionService _sessionService;
  List<dynamic> _availableUsers = [];
  List<dynamic> _filteredUsers = [];
  bool _isLoading = false;
  bool _isSearching = false;

  @override
  void initState() {
    super.initState();
    _conversationService = ServiceLocator.instance.get<ConversationService>();
    _sessionService = ServiceLocator.instance.get<SessionService>();
    _initialize();
  }

  Future<void> _initialize() async {
    await _sessionService.loadUserId();
    await _loadAvailableUsers();
  }

  Future<void> _loadAvailableUsers() async {
    setState(() => _isLoading = true);

    try {
      final users = await _conversationService.getAvailableUsers();
      if (users != null) {
        final currentUserId = _sessionService.userId;
        _availableUsers = users
            .where((user) => user['id'] != currentUserId)
            .toList();
        _filteredUsers = _availableUsers;
      }
    } catch (e) {
      print('Erreur chargement users: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _filterUsers(String query) {
    setState(() {
      _isSearching = query.isNotEmpty;
      if (query.isEmpty) {
        _filteredUsers = _availableUsers;
      } else {
        _filteredUsers = _availableUsers.where((user) {
          final fullName = '${user['firstName']} ${user['lastName']}'
              .toLowerCase();
          final email = user['email']?.toLowerCase() ?? '';
          return fullName.contains(query.toLowerCase()) ||
              email.contains(query.toLowerCase());
        }).toList();
      }
    });
  }

  Future<void> _startConversation(
    String otherUserId,
    String otherUserName,
  ) async {
    String? currentUserId = _sessionService.userId;

    print("🧍 currentUserId: $currentUserId");
    print("👤 otherUserId: $otherUserId");

    currentUserId ??= "currentUserId";

    if (currentUserId == otherUserId) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Impossible de créer une conversation avec soi-même"),
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      String? conversationId;

      try {
        conversationId = await _conversationService.findOrCreateConversation(
          currentUserId: currentUserId,
          otherUserId: otherUserId,
        );
      } catch (e) {
        print("Erreur findOrCreateConversation: $e");
      }

      print("conversationId retourné: $conversationId");

      final viewModel = Provider.of<MessageViewmodels>(context, listen: false);
      try {
        await viewModel.loadConversations();
      } catch (e) {
        print("Erreur loadConversations (non bloquante): $e");
      }
      final conversationMap = {
        'id': conversationId ?? 'local_$otherUserId',
        'participants': [
          {'id': currentUserId, 'firstName': 'Invité'},
          {'id': otherUserId, 'firstName': otherUserName},
        ],
      };

      if (!mounted) return;

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => MessageDetailScreen(
            conversation: conversationMap,
            viewModel: viewModel,
          ),
        ),
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text("Erreur: $e")));
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Nouvelle conversation")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                labelText: "Rechercher un contact",
                hintText: "Nom ou email...",
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          _filterUsers('');
                        },
                      )
                    : null,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: _filterUsers,
            ),
          ),

          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _filteredUsers.isEmpty
                ? _buildEmptyState()
                : _buildUsersList(),
          ),
        ],
      ),
    );
  }

  Widget _buildUsersList() {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      itemCount: _filteredUsers.length,
      itemBuilder: (context, index) {
        final user = _filteredUsers[index];
        final fullName = '${user['firstName']} ${user['lastName']}';

        return Card(
          margin: const EdgeInsets.only(bottom: 8),
          elevation: 2,
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: Colors.blue.shade100,
              child: Text(
                user['firstName']?.toString().substring(0, 1).toUpperCase() ??
                    'U',
                style: const TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            title: Text(
              fullName,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            subtitle: Text(user['email'] ?? ''),
            trailing: const Icon(Icons.message_outlined, color: Colors.blue),
            onTap: () async {
              final userId = user['id']?.toString();
              final fullName = '${user['firstName']} ${user['lastName']}';

              if (userId != null) {
                await _startConversation(userId, fullName);
              } else {
                print("Erreur : user sans ID");
              }
            },
          ),
        );
      },
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            _isSearching ? Icons.search_off : Icons.people_outline,
            size: 64,
            color: Colors.grey.shade400,
          ),
          const SizedBox(height: 16),
          Text(
            _isSearching ? "Aucun contact trouvé" : "Aucun contact disponible",
            style: TextStyle(fontSize: 16, color: Colors.grey.shade600),
          ),
          const SizedBox(height: 8),
          if (!_isSearching)
            ElevatedButton(
              onPressed: _loadAvailableUsers,
              child: const Text("Actualiser"),
            ),
        ],
      ),
    );
  }
}
