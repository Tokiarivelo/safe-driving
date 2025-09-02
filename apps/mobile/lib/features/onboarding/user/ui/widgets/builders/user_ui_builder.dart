import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/shared/widgets/customs/animations/animation_widget.dart';
import '../../../models/user_onboarding_step_model.dart';
import '../user_step_indicator.dart';

part 'parts/header_builder.dart';
part 'parts/layout_builder.dart';
part 'parts/expansion_tile_builder.dart';
part 'parts/step_container_builder.dart';
part 'parts/step_content_builder.dart';
part 'parts/transport_chips_builder.dart';
part 'parts/summary_section_builder.dart';
part 'parts/navigation_service.dart';

class UserUIBuilder {
  static Widget buildOnboardingLayout({
    required Widget child,
    required int currentStep,
    required int totalSteps,
    required String stepTitle,
  }) {
    return _buildOnboardingLayout(
      child: child,
      currentStep: currentStep,
      totalSteps: totalSteps,
      stepTitle: stepTitle,
    );
  }

  static Widget buildHeader() => _buildHeader();

  static Widget buildStepContainer({
    required Widget child,
    EdgeInsets? padding,
    double? width,
  }) => _buildStepContainer(child: child, padding: padding, width: width);

  static Widget buildExpansionTile({
    required int step,
    required StepInfo info,
    required bool isExpanded,
    required Widget content,
    required Function(bool) onExpansionChanged,
  }) => _buildExpansionTile(
        step: step,
        info: info,
        isExpanded: isExpanded,
        content: content,
        onExpansionChanged: onExpansionChanged,
      );

  static Widget buildExpansionTileTitle(StepInfo info) =>
      _buildExpansionTileTitle(info);

  static Widget buildExpansionTileContent(Widget content) =>
      _buildExpansionTileContent(content);

  static Widget buildStepContent({
    required String title,
    required String subtitle,
    Widget? additionalContent,
    List<Widget>? buttons,
  }) => _buildStepContent(
        title: title,
        subtitle: subtitle,
        additionalContent: additionalContent,
        buttons: buttons,
      );

  static Widget buildTransportModeChips({
    required List<String> modes,
    required List<String> selectedModes,
    required Map<String, IconData> icons,
    required Function(String, bool) onSelectionChanged,
  }) => _buildTransportModeChips(
        modes: modes,
        selectedModes: selectedModes,
        icons: icons,
        onSelectionChanged: onSelectionChanged,
      );

  static Widget buildSummarySection({
    required String title,
    required List<Widget> items,
  }) => _buildSummarySection(title: title, items: items);
}
