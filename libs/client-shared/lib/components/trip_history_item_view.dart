import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:intl/intl.dart';

import '../theme/theme.dart';

class TripHistoryItemView extends StatelessWidget {
  final String id;
  final String title;
  final String canceledText;
  final DateTime dateTime;
  final String currency;
  final double price;
  final bool isCanceled;
  final Function(String) onPressed;

  const TripHistoryItemView(
      {required this.id,
      required this.title,
      required this.canceledText,
      required this.dateTime,
      required this.currency,
      required this.price,
      required this.isCanceled,
      required this.onPressed,
      Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: () => onPressed(id),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                      color: CustomTheme.neutralColors.shade200,
                      borderRadius:
                          const BorderRadius.all(Radius.circular(24))),
                  child: Icon(
                    Ionicons.car,
                    color: CustomTheme.neutralColors.shade600,
                  )),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(title, style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 2),
                  Text(DateFormat('yyyy.MM.dd  kk:mm').format(dateTime),
                      style: Theme.of(context).textTheme.labelMedium),
                ],
              ),
              const Spacer(),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    NumberFormat.simpleCurrency(name: currency).format(price),
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  if (isCanceled)
                    Text(
                      canceledText,
                      style: Theme.of(context)
                          .textTheme
                          .labelMedium
                          ?.copyWith(color: const Color(0xffb20d0e)),
                    )
                ],
              )
            ],
          ),
          const Divider()
        ],
      ),
    );
  }
}
