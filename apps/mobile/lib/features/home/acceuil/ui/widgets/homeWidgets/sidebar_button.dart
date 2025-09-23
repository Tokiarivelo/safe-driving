import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';

class SidebarButton extends StatelessWidget {
  final VoidCallback onTap;
  final bool isVisible;

  const SidebarButton({
    super.key,
    required this.onTap,
    required this.isVisible,
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
    if (!isVisible) return const SizedBox.shrink();

    AuthViewModel? auth;
    try {
      auth = context.watch<AuthViewModel>();
    } catch (_) {
      auth = null;
    }

    final initials = _initialsFromUser(auth);
    final imageUrl = auth?.currentUser?.profileImageUrl;

    return Positioned(
      left: 20,
      top: 20,
      child: GestureDetector(
        onTap: onTap,
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
