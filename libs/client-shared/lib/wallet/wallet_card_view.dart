import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:intl/intl.dart';

import '../theme/theme.dart';

class WalletCardView extends StatelessWidget {
  final String title;
  final String actionAddCreditText;
  final String? actionRedeemGiftCardText;
  final String currency;
  final double credit;
  final Function() onAdddCredit;
  final Function()? onRedeemGiftCard;

  const WalletCardView(
      {required this.title,
      required this.actionAddCreditText,
      this.actionRedeemGiftCardText,
      required this.currency,
      required this.credit,
      required this.onAdddCredit,
      this.onRedeemGiftCard,
      Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          gradient: const LinearGradient(
            colors: [Color(0xff0c266d), Color(0xff3869ea)],
            stops: [0, 1],
            begin: Alignment(0.87, 0.50),
            end: Alignment(-0.87, -0.50),
            // angle: 300,
            // scale: undefined,
          ),
          boxShadow: const [
            BoxShadow(
                color: Color(0x29000000),
                offset: Offset(0, 5),
                blurRadius: 15,
                spreadRadius: 0)
          ]),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context)
                .textTheme
                .headlineMedium
                ?.copyWith(color: CustomTheme.primaryColors.shade50),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                    color: CustomTheme.primaryColors.shade100,
                    borderRadius: BorderRadius.circular(10)),
                child: Text(
                    NumberFormat.simpleCurrency(name: currency).currencySymbol,
                    style: Theme.of(context).textTheme.displayMedium),
              ),
              const SizedBox(width: 8),
              Text(
                NumberFormat.simpleCurrency(name: currency).format(credit),
                style: Theme.of(context)
                    .textTheme
                    .displayMedium
                    ?.copyWith(color: CustomTheme.primaryColors.shade100),
              )
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              CupertinoButton(
                  padding: EdgeInsets.zero,
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                            color: CustomTheme.primaryColors.shade300,
                            borderRadius: BorderRadius.circular(30)),
                        child: Icon(
                          Icons.add_rounded,
                          size: 20,
                          color: CustomTheme.primaryColors.shade600,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Text(
                        actionAddCreditText,
                        style: Theme.of(context)
                            .textTheme
                            .titleMedium
                            ?.copyWith(
                                color: CustomTheme.primaryColors.shade200),
                      )
                    ],
                  ),
                  onPressed: () => onAdddCredit()
                  // {
                  //   showModalBottomSheet(
                  //       context: context,
                  //       isScrollControlled: true,
                  //       constraints: const BoxConstraints(maxWidth: 600),
                  //       builder: (context) {
                  //         return AddCreditSheetView(
                  //           currency: selectedWalletIndex != null
                  //               ? wallet[selectedWalletIndex!].currency
                  //               : "USD",
                  //         );
                  //       });
                  // }
                  ),
              const SizedBox(width: 8),
              if (onRedeemGiftCard != null)
                SizedBox(
                  width: 1,
                  height: 20,
                  child: Container(color: CustomTheme.primaryColors.shade200),
                ),
              const SizedBox(width: 8),
              if (onRedeemGiftCard != null)
                CupertinoButton(
                    padding: EdgeInsets.zero,
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                              color: CustomTheme.primaryColors.shade300,
                              borderRadius: BorderRadius.circular(30)),
                          child: SizedBox(
                            width: 20,
                            height: 20,
                            child: Padding(
                              padding: const EdgeInsets.only(left: 1),
                              child: Icon(Ionicons.gift,
                                  size: 16,
                                  color: CustomTheme.primaryColors.shade600),
                            ),
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(actionRedeemGiftCardText ?? "",
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                    color: CustomTheme.primaryColors.shade200))
                      ],
                    ),
                    onPressed: () => onRedeemGiftCard!()),
            ],
          )
        ],
      ),
    );
  }
}
