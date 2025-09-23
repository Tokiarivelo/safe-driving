import 'package:flutter/material.dart';

class RoundedActionButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onPressed;
  const RoundedActionButton({super.key, required this.icon, required this.onPressed});
  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.black54,
      shape: const CircleBorder(),
      child: IconButton(icon: Icon(icon, color: Colors.white), onPressed: onPressed),
    );
  }
}
