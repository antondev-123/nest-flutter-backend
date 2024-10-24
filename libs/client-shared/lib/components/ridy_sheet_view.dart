import 'package:flutter/material.dart';

import 'package:client_shared/theme/theme.dart';

class RidySheetView extends StatelessWidget {
  final Widget child;

  const RidySheetView({required this.child, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
            color: CustomTheme.primaryColors.shade50,
            borderRadius: BorderRadius.circular(16),
            boxShadow: const [
              BoxShadow(
                  color: Color(0x14000000),
                  offset: Offset(0, -3),
                  blurRadius: 25)
            ]),
        child: SafeArea(
            top: false,
            minimum: EdgeInsets.only(
                top: 16,
                left: 16,
                right: 16,
                bottom: MediaQuery.of(context).viewInsets.bottom + 16),
            child: child));
  }
}
