import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/ui/screens/newMessageScreen.dart';
import 'package:safe_driving/features/home/message/viewmodels/message_viewmodels.dart';

class MessageScreenWidgets {
  static Widget buildCompleteHeader(
    BuildContext context,
    MessageViewmodels viewModel,
    VoidCallback onSearchPressed,
  ) {
    return Container(
      color: AppColors.light,
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
                    color: AppColors.light,
                    size: 20,
                  ),
                ),
              ),
              const Text(
                'Messages',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                  color: AppColors.dark,
                ),
              ),
              Row(
                children: [
                  IconButton(
                    onPressed: onSearchPressed,
                    icon: const Icon(
                      Icons.search,
                      color: AppColors.dark,
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
                    icon: const Icon(
                      Icons.edit,
                      color: AppColors.dark,
                      size: 24,
                    ),
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

  static Widget buildTabBar(MessageViewmodels viewModel) {
    return Container(
      color: AppColors.light,
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

  static Widget _buildTab(
    String label,
    int index,
    MessageViewmodels viewModel,
  ) {
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

  static Widget buildEmptyState() {
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

  static void showSearchDialog(
    BuildContext context,
    MessageViewmodels viewModel,
  ) {
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
