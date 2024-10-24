import 'package:flutter/material.dart';

class PaymentMethodItem extends StatelessWidget {
  final String id;
  final String title;
  final String? selectedValue;
  final String? imageAddress;
  final Function(String) onSelected;

  const PaymentMethodItem(
      {required this.id,
      required this.title,
      required this.selectedValue,
      required this.imageAddress,
      required this.onSelected,
      Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Radio<String?>(
            visualDensity: VisualDensity.compact,
            value: id,
            groupValue: selectedValue,
            onChanged: (value) {
              if (value == id) onSelected(id);
            }),
        if (imageAddress != null)
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: Image.network(
              imageAddress!,
              width: 50,
              height: 50,
            ),
          ),
        Text(
          title,
          style: Theme.of(context).textTheme.bodyMedium,
        )
      ],
    );
  }
}
