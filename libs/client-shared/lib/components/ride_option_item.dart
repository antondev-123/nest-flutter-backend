import 'package:client_shared/theme/theme.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class RideOptionItem extends StatelessWidget {
  final IconData icon;
  final String text;
  final Color? iconColor;
  final Function()? onPressed;

  const RideOptionItem(
      {required this.icon,
      required this.text,
      required this.onPressed,
      Key? key,
      this.iconColor})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      padding: const EdgeInsets.all(0),
      onPressed: onPressed,
      child: Row(
        children: [
          Container(
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: CustomTheme.neutralColors.shade200),
            padding: const EdgeInsets.all(12),
            child: Icon(
              icon,
              color: iconColor ?? CustomTheme.neutralColors.shade600,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            text,
            style: Theme.of(context).textTheme.titleMedium,
          )
        ],
      ),
    );
  }
}
