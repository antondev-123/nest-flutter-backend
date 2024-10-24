import 'package:client_shared/config.dart';

enum UnitOfMeasurement { metric, imperial }

String distanceToString(double distance) {
  if (unitOfMeasurement == UnitOfMeasurement.metric) {
    if (distance < 1000) {
      return "${distance.toStringAsFixed(0)} m";
    } else {
      return "${(distance / 1000).toStringAsFixed(1)} km";
    }
  } else {
    if (distance < 1609.34) {
      return "${(distance * 3.28084).toStringAsFixed(0)} ft";
    } else {
      return "${(distance / 1609.34).toStringAsFixed(1)} mi";
    }
  }
}
