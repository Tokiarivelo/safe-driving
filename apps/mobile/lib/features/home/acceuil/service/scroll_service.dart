import 'package:flutter/material.dart';

class ScrollService {
  static int detectActiveIndex({
    required ScrollController scrollController,
    required List<GlobalKey> itemKeys,
    required BuildContext context,
  }) {
    final screenWidth = MediaQuery.of(context).size.width;
    final center = screenWidth / 2;

    double closestDistance = double.infinity;
    int closestIndex = 0;

    for (int i = 0; i < itemKeys.length; i++) {
      final ctx = itemKeys[i].currentContext;
      if (ctx == null) continue;

      final box = ctx.findRenderObject() as RenderBox?;
      if (box == null) continue;

      final pos = box.localToGlobal(Offset.zero);
      final itemCenter = pos.dx + box.size.width / 2;
      final distance = (itemCenter - center).abs();

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }
}
