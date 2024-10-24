import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../theme/theme.dart';

class WalletActivityItemView extends StatelessWidget {
  final IconData icon;
  final String title;
  final DateTime dateTime;
  final double amount;
  final String currency;

  const WalletActivityItemView(
      {required this.icon,
      required this.title,
      required this.dateTime,
      required this.amount,
      required this.currency,
      Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
              color: CustomTheme.neutralColors.shade200,
              borderRadius: const BorderRadius.all(Radius.circular(24))),
          child: Icon(
            icon,
            color: CustomTheme.neutralColors.shade600,
          )),
      title: Text(title, style: Theme.of(context).textTheme.titleMedium),
      subtitle: Text(DateFormat('yyyy.MM.dd  kk:mm').format(dateTime),
          style: Theme.of(context).textTheme.labelMedium),
      trailing: Text(
        NumberFormat.simpleCurrency(name: currency).format(amount),
        style: Theme.of(context).textTheme.titleMedium,
      ),
    );
  }
}
