import 'dart:io';
import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

/// Base layout widget for photo modals providing consistent structure
class BaseModalLayout extends StatelessWidget {
  final Widget header;
  final Widget content;
  final Widget? pageIndicator;
  final Widget actionButtons;
  final List<File> images;

  const BaseModalLayout({
    super.key,
    required this.header,
    required this.content,
    this.pageIndicator,
    required this.actionButtons,
    required this.images,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: AppColors.light.adapt(context),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: Column(
        children: [
          header,
          const SizedBox(height: 16),
          Expanded(child: content),
          const SizedBox(height: 16),
          if (pageIndicator != null && images.length > 1) ...[
            pageIndicator!,
            const SizedBox(height: 16),
          ],
          actionButtons,
        ],
      ),
    );
  }
}
