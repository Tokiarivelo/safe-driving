// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';
import 'package:safe_driving/features/home/acceuil/ui/widgets/sideBar/sideBar_profile.dart';

class SidebarHeader extends StatelessWidget {
  final VoidCallback onProfileTap;
  final VoidCallback onClose;

  const SidebarHeader({
    super.key,
    required this.onProfileTap,
    required this.onClose,
  });

  String _initialsFromUser(AuthViewModel? auth) {
    try {
      final user = auth?.currentUser;
      final f = (user?.firstName ?? '').trim();
      final l = (user?.lastName ?? '').trim();
      if (f.isNotEmpty || l.isNotEmpty) {
        final i1 = f.isNotEmpty ? f.characters.first.toUpperCase() : '';
        final i2 = l.isNotEmpty ? l.characters.first.toUpperCase() : '';
        final init = (i1 + i2).trim();
        if (init.isNotEmpty) return init;
      }
      final email = (user?.email ?? '').trim();
      if (email.isNotEmpty) return email.characters.first.toUpperCase();
      return 'U';
    } catch (_) {
      return 'U';
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    AuthViewModel? auth;
    try {
      auth = context.watch<AuthViewModel>();
    } catch (_) {
      auth = null;
    }
    final initials = _initialsFromUser(auth);
    final imageUrl = auth?.currentUser?.profileImageUrl;

    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: onProfileTap,
            child: Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [AppColors.color1, AppColors.color2],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                border: Border.all(color: AppColors.light, width: 2),
              ),
              child: ClipOval(
                child: (imageUrl != null && imageUrl.isNotEmpty)
                    ? Image.network(
                        imageUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) =>
                            _Initials(initials: initials),
                      )
                    : _Initials(initials: initials),
              ),
            ),
          ),
          const SizedBox(width: 12),
          const Expanded(child: SidebarProfile()),
          IconButton(
            icon: Icon(
              Icons.close,
              color: isDark ? AppColors.light : AppColors.dark,
            ),
            onPressed: onClose,
          ),
        ],
      ),
    );
  }
}

class _Initials extends StatelessWidget {
  final String initials;
  const _Initials({required this.initials});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        initials,
        style: const TextStyle(
          color: AppColors.light,
          fontWeight: FontWeight.w700,
          fontSize: 16,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
