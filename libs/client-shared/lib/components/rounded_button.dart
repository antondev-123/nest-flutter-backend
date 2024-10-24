import 'package:flutter/cupertino.dart';

import 'package:client_shared/theme/theme.dart';
import 'package:flutter/material.dart';

class RoundedButton extends StatelessWidget {
  final IconData icon;
  final Function() onPressed;
  final int? count;

  const RoundedButton(
      {required this.icon, required this.onPressed, this.count, Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      CupertinoButton(
          padding: const EdgeInsets.all(0),
          onPressed: onPressed,
          child: Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
                color: CustomTheme.primaryColors.shade100,
                borderRadius: BorderRadius.circular(20)),
            child: Icon(
              icon,
              color: CustomTheme.neutralColors,
            ),
          )),
      if (count != null && count! > 0)
        Positioned(
          top: 0,
          right: 0,
          child: Container(
            padding: const EdgeInsets.all(2),
            decoration: const BoxDecoration(
                color: Color(0xffb20d0e), shape: BoxShape.circle),
            constraints: const BoxConstraints(minWidth: 16, minHeight: 16),
            // child: Text(
            //   '$count',
            //   style: const TextStyle(fontSize: 8, color: Colors.white),
            //   textAlign: TextAlign.center,
            // ),
          ),
        )
    ]);
  }
}
