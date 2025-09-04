part of '../user_ui_builder.dart';

Widget _buildExpansionTile({
  required int step,
  required StepInfo info,
  required bool isExpanded,
  required Widget content,
  required Function(bool) onExpansionChanged,
}) {
  return Container(
    margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
    child: Theme(
      data: Theme.of(
        NavigationService.navigatorKey.currentContext!,
      ).copyWith(dividerColor: Colors.transparent),
      child: Builder(
        builder: (context) => ExpansionTile(
          key: ValueKey('expansion_tile_${step}_$isExpanded'),
          backgroundColor: AppColors.transparent,
          collapsedBackgroundColor: AppColors.transparent,
          iconColor: AppColors.light.adapt(context),
          collapsedIconColor: AppColors.light.adapt(context),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: AppColors.light.adapt(context), width: 1.0),
          ),
          collapsedShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: BorderSide(color: AppColors.light.adapt(context), width: 1.0),
          ),
          initiallyExpanded: isExpanded,
          maintainState: true,
          onExpansionChanged: onExpansionChanged,
          controlAffinity: ListTileControlAffinity.trailing,
          tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          title: _buildExpansionTileTitle(info),
          children: [
            slideSmoothAnimation(child: _buildExpansionTileContent(content)),
          ],
        ),
      ),
      ),
  );
}

Widget _buildExpansionTileTitle(StepInfo info) {
  return Builder(
    builder: (context) => Row(
      children: [
        if (info.emoji != null)
          Transform.translate(
            offset: const Offset(-4, 0),
            child: Container(
              width: 24,
              height: 30,
              alignment: Alignment.centerLeft,
              child: Text(info.emoji!, style: const TextStyle(fontSize: 20)),
            ),
          )
        else if (info.icon != null)
          Icon(info.icon, color: AppColors.light.adapt(context), size: 24)
        else
          const SizedBox.shrink(),
        const SizedBox(width: 8),
        Text(
          info.title,
          style: TextStyle(
            color: AppColors.light.adapt(context),
            fontWeight: FontWeight.normal,
            fontSize: 16,
          ),
        ),
      ],
    ),
  );
}

Widget _buildExpansionTileContent(Widget content) {
  return Builder(
    builder: (context) => Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(12),
          bottomRight: Radius.circular(12),
        ),
        border: Border(top: BorderSide(color: AppColors.light.adapt(context), width: 1)),
      ),
      padding: const EdgeInsets.all(16),
      child: content,
    ),
  );
}
