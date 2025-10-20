import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/l10n/l10n.dart';

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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return AlertDialog(
      title: Text(
        widget.titleContent,
        style: AppTextStyles.h2BoldNeutral(context),
      ),

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
              h1: AppTextStyles.h1BoldNeutral(context),
              h2: AppTextStyles.h2BoldNeutral(context),
              p: AppTextStyles.body14(context),
              listBullet: TextStyle(
                fontSize: 14,
                color: AppColors.textColor.adapt(context),
              ),
              strong: TextStyle(
                fontWeight: FontWeight.bold,
                color: AppColors.textColor.adapt(context),
              ),
            ),
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          style: TextButton.styleFrom(
            foregroundColor: isDark ? AppColors.light : AppColors.dark,
          ),
          child: Builder(builder: (context) => Text(context.l10n.cancel)),
        ),
        TextButton(
          onPressed: _hasScrolledToBottom
              ? () {
                  widget.onAccept();
                  Navigator.of(context).pop();
                }
              : null,
          style: TextButton.styleFrom(
            foregroundColor: isDark ? AppColors.light : AppColors.dark,
            side: _hasScrolledToBottom && isDark
                ? const BorderSide(color: AppColors.light)
                : null,
          ),
          child: Builder(
            builder: (context) => Text(context.l10n.driverCguAccept),
          ),
        ),
      ],
    );
  }
}
