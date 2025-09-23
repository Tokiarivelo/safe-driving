import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/core/constants/dimens.dart';
import 'package:safe_driving/core/theme/app_text_styles.dart';

class DetailedFiltersPanel extends StatelessWidget {
  final double radiusKm;
  final ValueChanged<double> onRadiusChanged;
  final VoidCallback onReset;
  final VoidCallback onApply;
  final String? vehicleType;
  final ValueChanged<String?> onVehicleTypeChanged;
  final int passengers;
  final ValueChanged<int> onPassengersChanged;
  final bool babySeat;
  final ValueChanged<bool> onBabySeatChanged;
  final String? lang;
  final ValueChanged<String?> onLangChanged;
  final bool animals;
  final ValueChanged<bool> onAnimalsChanged;
  const DetailedFiltersPanel({
    super.key,
    required this.radiusKm,
    required this.onRadiusChanged,
    required this.onReset,
    required this.onApply,
    required this.vehicleType,
    required this.onVehicleTypeChanged,
    required this.passengers,
    required this.onPassengersChanged,
    required this.babySeat,
    required this.onBabySeatChanged,
    required this.lang,
    required this.onLangChanged,
    required this.animals,
    required this.onAnimalsChanged,
  });
  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 8,
      borderRadius: BorderRadius.circular(Radii.r12),
      color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.95),
      child: Container(
        width: Sizes.panelWidth,
        padding: const EdgeInsets.all(Paddings.p20),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 30,
                    height: 30,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: kAccentPink, width: 2),
                    ),
                    child: const CircleAvatar(backgroundColor: kLightGray),
                  ),
                  const Spacer(),
                  Text(
                    'Filtres',
                    style: AppTextStyles.subtitle14(
                      context,
                    ).copyWith(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: () {},
                    icon: Icon(
                      Icons.keyboard_arrow_up,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                'Rayon de recherche',
                style: AppTextStyles.subtitle14(context),
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: [
                  _ChipButton(
                    label: '1km',
                    selected: radiusKm == 1,
                    onTap: () => onRadiusChanged(1),
                  ),
                  _ChipButton(
                    label: '2km',
                    selected: radiusKm == 2,
                    onTap: () => onRadiusChanged(2),
                  ),
                  _ChipButton(
                    label: '5km',
                    selected: radiusKm == 5,
                    onTap: () => onRadiusChanged(5),
                  ),
                  _ChipButton(
                    label: 'Autre',
                    selected: radiusKm != 1 && radiusKm != 2 && radiusKm != 5,
                    onTap: () {},
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: TextField(
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
                        hintText: '${radiusKm.toStringAsFixed(0)}km',
                        suffixText: 'km',
                        filled: true,
                        fillColor: kLightGray,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(Radii.r8),
                          borderSide: BorderSide.none,
                        ),
                      ),
                      onSubmitted: (v) {
                        final val = double.tryParse(
                          v.replaceAll('km', '').trim(),
                        );
                        if (val != null) onRadiusChanged(val);
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Checkbox(value: vehicleType != null, onChanged: (_) {}),
                  Text(
                    'Type de véhicule',
                    style: AppTextStyles.subtitle14(context),
                  ),
                ],
              ),
              Row(
                children: [
                  _Choice(
                    label: 'Moto',
                    selected: vehicleType == 'Moto',
                    onTap: () => onVehicleTypeChanged('Moto'),
                  ),
                  const SizedBox(width: 8),
                  _Choice(
                    label: 'Voiture',
                    selected: vehicleType == 'Voiture',
                    onTap: () => onVehicleTypeChanged('Voiture'),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Checkbox(value: true, onChanged: (_) {}),
                  Text(
                    'Nombre de passagers',
                    style: AppTextStyles.subtitle14(context),
                  ),
                ],
              ),
              Row(
                children: [
                  IconButton(
                    onPressed: () => onPassengersChanged(
                      passengers > 1 ? passengers - 1 : 1,
                    ),
                    icon: const Icon(Icons.remove_circle_outline),
                  ),
                  Text('$passengers', style: AppTextStyles.subtitle14(context)),
                  IconButton(
                    onPressed: () => onPassengersChanged(passengers + 1),
                    icon: const Icon(Icons.add_circle_outline),
                  ),
                ],
              ),
              Row(
                children: [
                  Checkbox(
                    value: babySeat,
                    onChanged: (v) => onBabySeatChanged(v ?? false),
                  ),
                  Text(
                    'Possibilité de siège bébé',
                    style: AppTextStyles.subtitle14(context),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Checkbox(value: lang != null, onChanged: (_) {}),
                  Text('Langue', style: AppTextStyles.subtitle14(context)),
                ],
              ),
              DropdownButtonFormField(
                isDense: true,
                itemHeight: 40,
                style: const TextStyle(fontSize: 14),
                initialValue: lang ?? 'Française',
                items: const [
                  DropdownMenuItem(
                    value: 'Française',
                    child: Text('Française', style: TextStyle(fontSize: 14)),
                  ),
                ],
                onChanged: onLangChanged,
                decoration: InputDecoration(
                  filled: true,
                  fillColor: kLightGray,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(Radii.r8),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.calendar_today, size: 16, color: kBluePulse),
                      SizedBox(width: 6),
                      Text('J/M/A + heure'),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: kBluePulse,
                      borderRadius: BorderRadius.circular(Radii.r8),
                    ),
                    child: Text(
                      'JUIL 17',
                      style: AppTextStyles.caption10(
                        context,
                      ).copyWith(color: Colors.white),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Checkbox(
                    value: animals,
                    onChanged: (v) => onAnimalsChanged(v ?? false),
                  ),
                  Text(
                    'Animaux acceptés',
                    style: AppTextStyles.subtitle14(context),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: onReset,
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: kAccentPink),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 8,
                        ),
                        minimumSize: const Size.fromHeight(36),
                        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(Radii.r8),
                        ),
                      ),
                      child: Text(
                        'Restaurer les filtres',
                        style: AppTextStyles.caption10(
                          context,
                        ).copyWith(color: kAccentPink, fontSize: 12),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: onApply,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: kAccentPink,
                        minimumSize: const Size.fromHeight(Sizes.h45),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(Radii.r8),
                        ),
                      ),
                      child: Text(
                        'Appliquer',
                        style: AppTextStyles.subtitle14(context).copyWith(
                          color: Theme.of(context).colorScheme.onPrimary,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ChipButton extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _ChipButton({
    required this.label,
    required this.selected,
    required this.onTap,
  });
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? kBluePulse.withValues(alpha: 0.1) : kLightGray,
          borderRadius: BorderRadius.circular(Radii.r8),
        ),
        child: Text(label, style: AppTextStyles.subtitle14(context)),
      ),
    );
  }
}

class _Choice extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _Choice({
    required this.label,
    required this.selected,
    required this.onTap,
  });
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? Colors.grey.shade700 : kLightGray,
          borderRadius: BorderRadius.circular(Radii.r8),
        ),
        child: Text(
          label,
          style: AppTextStyles.subtitle14(context).copyWith(
            color: selected
                ? Colors.white
                : Theme.of(context).colorScheme.onSurface,
          ),
        ),
      ),
    );
  }
}
