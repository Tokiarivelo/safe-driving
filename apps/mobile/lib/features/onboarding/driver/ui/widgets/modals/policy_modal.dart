import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class PolicyModal extends StatefulWidget {
  final String titleContent;
  final String content;
  final VoidCallback onAccept;

  const PolicyModal({
    super.key,
    required this.titleContent,
    required this.content,
    required this.onAccept,
  });

  @override
  State<PolicyModal> createState() => _PolicyModalState();
}

class _PolicyModalState extends State<PolicyModal> {
  final ScrollController _scrollController = ScrollController();
  bool _hasScrolledToBottom = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_checkScrollPosition);
  }

  @override
  void dispose() {
    _scrollController
      ..removeListener(_checkScrollPosition)
      ..dispose();
    super.dispose();
  }

  void _checkScrollPosition() {
    if (!_scrollController.hasClients) return;
    final maxScroll = _scrollController.position.maxScrollExtent;
    final currentScroll = _scrollController.position.pixels;
    final threshold = maxScroll * 0.9;
    if (currentScroll >= threshold && !_hasScrolledToBottom) {
      setState(() => _hasScrolledToBottom = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.titleContent, style: AppTextStyles.h2BoldNeutral),

      content: SizedBox(
        width: double.maxFinite,
        height: MediaQuery.of(context).size.height * 0.6,
        child: Scrollbar(
          controller: _scrollController,
          thumbVisibility: true,
          child: Markdown(
            controller: _scrollController,
            data: widget.content,
            styleSheet: MarkdownStyleSheet(
              h1: AppTextStyles.h1BoldNeutral,
              h2: AppTextStyles.h2BoldNeutral,
              p: AppTextStyles.body14,
              listBullet: const TextStyle(
                fontSize: 14,
                color: AppColors.textColor,
              ),
              strong: const TextStyle(
                fontWeight: FontWeight.bold,
                color: AppColors.textColor,
              ),
            ),
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text(
            "Annuler",
            style: TextStyle(color: AppColors.buttonWithoutBackGround),
          ),
        ),
        ElevatedButton(
          onPressed: _hasScrolledToBottom
              ? () {
                  widget.onAccept();
                  Navigator.of(context).pop();
                }
              : null,
          style: ElevatedButton.styleFrom(
            backgroundColor: _hasScrolledToBottom
                ? AppColors.fillButtonBackground
                : AppColors.unclickable,
          ),
          child: Text(
            _hasScrolledToBottom ? "J'accepte" : "Lisez d'abord le contenu",
            style: TextStyle(
              color: _hasScrolledToBottom
                  ? AppColors.light
                  : AppColors.light.withValues(alpha: 0.7),
            ),
          ),
        ),
      ],
    );
  }
}
