import 'package:flutter/cupertino.dart';
import 'package:flutter_vector_icons/flutter_vector_icons.dart';

import 'package:client_shared/theme/theme.dart';

class UserAvatarView extends StatelessWidget {
  final String urlPrefix;
  final String? url;
  final double cornerRadius;
  final double size;
  final Color? backgroundColor;

  const UserAvatarView(
      {required this.urlPrefix,
      required this.url,
      required this.cornerRadius,
      required this.size,
      this.backgroundColor,
      Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
        borderRadius: BorderRadius.circular(cornerRadius),
        child: url != null
            ? Image.network(
                urlPrefix + url!,
                width: size,
                height: size,
              )
            : Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(cornerRadius),
                  color: backgroundColor ?? CustomTheme.neutralColors.shade100,
                ),
                child: Icon(
                  Ionicons.person,
                  size: size,
                  color: CustomTheme.neutralColors.shade600,
                ),
              ));
  }
}
