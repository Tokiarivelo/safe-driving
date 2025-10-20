// ignore_for_file: file_names
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/authentication/viewmodels/auth_view_model.dart';

class SidebarProfile extends StatelessWidget {
  const SidebarProfile({super.key});

  String _displayName(AuthViewModel? auth) {
    try {
      final user = auth?.currentUser;
      final f = (user?.firstName ?? '').trim();
      final l = (user?.lastName ?? '').trim();
      String name = '';
      if (f.isNotEmpty || l.isNotEmpty) {
        name = [f, l].where((s) => s.isNotEmpty).join(' ');
      } else {
        name = (user?.email ?? '').trim();
      }
      if (name.isEmpty) name = 'Utilisateur';
      return name;
    } catch (_) {
      return 'Utilisateur';
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? AppColors.light : AppColors.dark;

    AuthViewModel? auth;
    try {
      auth = context.watch<AuthViewModel>();
    } catch (_) {
      auth = null;
    }

    final name = _displayName(auth);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: textColor,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '« Pensionné de la route depuis 10 ans, votre confort et votre sécurité sont ma priorité. »',
            style: TextStyle(
              fontSize: 14,
              fontStyle: FontStyle.italic,
              color: textColor,
            ),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}
