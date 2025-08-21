import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/animations/animation_widget.dart';
import '../../../models/user_onboarding_step_model.dart';
import '../user_step_indicator.dart';

class UserUIBuilder {
  static Widget buildOnboardingLayout({
    required Widget child,
    required int currentStep,
    required int totalSteps,
    required String stepTitle,
  }) {
    return Column(
      children: [
        buildHeader(),
        UserStepIndicator(currentStep: currentStep, totalSteps: totalSteps),
        Expanded(child: child),
      ],
    );
  }

  static Widget buildHeader() {
    return Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 10),
      child: Center(
        child: SvgPicture.asset(
          'assets/logo/logo_white.svg',
          width: 85,
          height: 85,
        ),
      ),
    );
  }

  static Widget buildStepContainer({
    required Widget child,
    EdgeInsets? padding,
    double? width,
  }) {
    return Container(
      width: width ?? 330,
      padding: padding ?? const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.secondBackgroundColor,
        borderRadius: BorderRadius.circular(5),
      ),
      child: child,
    );
  }

  static Widget buildExpansionTile({
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
        child: ExpansionTile(
          key: ValueKey('expansion_tile_${step}_$isExpanded'),
          backgroundColor: AppColors.transparent,
          collapsedBackgroundColor: AppColors.transparent,
          iconColor: AppColors.light,
          collapsedIconColor: AppColors.light,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: AppColors.light, width: 1.0),
          ),
          collapsedShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: AppColors.light, width: 1.0),
          ),
          initiallyExpanded: isExpanded,
          maintainState: true,
          onExpansionChanged: onExpansionChanged,
          controlAffinity: ListTileControlAffinity.trailing,
          tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          title: buildExpansionTileTitle(info),
          children: [
            slideSmoothAnimation(child: buildExpansionTileContent(content)),
          ],
        ),
      ),
    );
  }

  static Widget buildExpansionTileTitle(StepInfo info) {
    return Row(
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
          Icon(info.icon, color: AppColors.light, size: 24),
        const SizedBox(width: 8),
        Text(
          info.title,
          style: const TextStyle(
            color: AppColors.light,
            fontWeight: FontWeight.normal,
            fontSize: 16,
          ),
        ),
      ],
    );
  }

  static Widget buildExpansionTileContent(Widget content) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        color: AppColors.secondBackgroundColor,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(12),
          bottomRight: Radius.circular(12),
        ),
        border: Border(top: BorderSide(color: AppColors.light, width: 1)),
      ),
      padding: const EdgeInsets.all(16),
      child: content,
    );
  }

  static Widget buildStepContent({
    required String title,
    required String subtitle,
    Widget? additionalContent,
    List<Widget>? buttons,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: AppColors.buttonWithoutBackGround,
            fontWeight: FontWeight.w800,
            fontSize: 18,
          ),
          textAlign: TextAlign.center,
        ),
        if (subtitle.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(
            subtitle,
            style: TextStyle(
              color: AppColors.buttonWithoutBackGround.withValues(alpha: 0.75),
            ),
            textAlign: TextAlign.center,
          ),
        ],
        if (additionalContent != null) ...[
          const SizedBox(height: 16),
          additionalContent,
        ],
        if (buttons != null) ...[const SizedBox(height: 16), ...buttons],
      ],
    );
  }

  static Widget buildTransportModeChips({
    required List<String> modes,
    required List<String> selectedModes,
    required Map<String, IconData> icons,
    required Function(String, bool) onSelectionChanged,
  }) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
          width: 1,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(8),
      child: Wrap(
        spacing: 8,
        children: modes.map((mode) {
          final isSelected = selectedModes.contains(mode);
          return FilterChip(
            avatar: Icon(icons[mode], size: 18),
            label: Text(mode),
            selected: isSelected,
            onSelected: (selected) => onSelectionChanged(mode, selected),
            selectedColor: AppColors.fillButtonBackground,
            checkmarkColor: AppColors.light,
          );
        }).toList(),
      ),
    );
  }

  static Widget buildSummarySection({
    required String title,
    required List<Widget> items,
  }) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.fillButtonBackground.withValues(alpha: 0.3),
          width: 1,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              color: AppColors.buttonWithoutBackGround,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 8),
          ...items,
        ],
      ),
    );
  }
}

class NavigationService {
  static GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
}
