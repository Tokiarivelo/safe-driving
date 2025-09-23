import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';
import 'package:safe_driving/core/constants/dimens.dart';

class DriverPopup extends StatelessWidget {
  final String name;
  final double rating;
  final String statusText;
  final String vehicleModel;
  final int seats;
  final String phone;
  const DriverPopup({super.key, required this.name, required this.rating, required this.statusText, required this.vehicleModel, required this.seats, required this.phone});
  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return Material(
      elevation: 4,
      borderRadius: BorderRadius.circular(Radii.r12),
      child: Container(
        width: width * 0.3,
        padding: const EdgeInsets.all(Paddings.p16),
        decoration: BoxDecoration(color: kLightGray, borderRadius: BorderRadius.circular(Radii.r12)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: AppColors.borderButtonDark, width: 2),
                  ),
                  child: const CircleAvatar(
                    backgroundColor: AppColors.softBackgroundColor,
                    child: Icon(Icons.person, size: 30, color: AppColors.unclickable),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(name, style: AppTextStyles.title24(context)),
                      const SizedBox(height: 8),
                      Row(children: [
                        const Icon(Icons.star, color: kStarYellow, size: 20),
                        const SizedBox(width: 6),
                        Text(rating.toStringAsFixed(1), style: AppTextStyles.body16(context)),
                      ]),
                      const SizedBox(height: 4),
                      Row(children: [
                        Container(width: 8, height: 8, decoration: const BoxDecoration(color: AppColors.success, shape: BoxShape.circle)),
                        const SizedBox(width: 6),
                        Text(statusText, style: AppTextStyles.subtitle14(context)),
                      ]),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Row(children: [
                      const Icon(Icons.directions_car, color: kRedDriver, size: 18),
                      const SizedBox(width: 6),
                      Text(vehicleModel, style: AppTextStyles.subtitle14(context)),
                    ]),
                    const SizedBox(height: 8),
                    Row(children: [
                      const Icon(Icons.event_seat, color: kSeatBlue, size: 18),
                      const SizedBox(width: 6),
                      Text('Places: $seats', style: AppTextStyles.subtitle14(context)),
                    ]),
                  ],
                )
              ],
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.phone, color: kBluePulse, size: 24),
                const SizedBox(width: 8),
                Text(phone, style: AppTextStyles.body16(context)),
              ],
            ),
            const SizedBox(height: 12),
            Row(children: [
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    borderRadius: BorderRadius.circular(Radii.r8),
                  ),
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: const TextField(
                    decoration: InputDecoration(hintText: 'Envoyer un message', border: InputBorder.none),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Container(
                decoration: const BoxDecoration(color: kBluePulse, shape: BoxShape.circle),
                child: IconButton(
                  onPressed: () {},
                  icon: Icon(Icons.arrow_upward, color: Theme.of(context).colorScheme.onPrimary),
                ),
              )
            ])
          ],
        ),
      ),
    );
  }
}