import 'package:flutter/cupertino.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';
import 'package:client_shared/theme/theme.dart';

class RidyBackButton extends StatelessWidget {
  final String text;
  final Function()? onPressed;

  const RidyBackButton({Key? key, required this.text, this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoButton(
      onPressed: onPressed ?? () => Navigator.pop(context),
      minSize: 0,
      padding: const EdgeInsets.all(0),
      child: Stack(children: [
        Positioned(
          left: -7,
          child: Icon(
            Ionicons.chevron_back,
            color: CustomTheme.neutralColors.shade800,
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 4, left: 16),
          child: Text(
            text,
            style: TextStyle(color: CustomTheme.neutralColors.shade800),
          ),
        )
      ]),
    );
  }
}
