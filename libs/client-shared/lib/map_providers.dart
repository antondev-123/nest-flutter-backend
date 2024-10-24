import 'package:flutter_map/flutter_map.dart';

import 'config.dart';

final TileLayer openStreetTileLayer = TileLayer(
  urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  subdomains: ['a', 'b', 'c'],
  maxNativeZoom: 18,
  tileProvider: NetworkTileProvider(),
);

final TileLayer mapBoxTileLayer = TileLayer(
  urlTemplate:
      "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=$mapBoxAccessToken",
  additionalOptions: {"access_token": mapBoxAccessToken},
  maxNativeZoom: 18,
  tileProvider: NetworkTileProvider(),
);

enum MapProvider { openStreetMap, googleMap, mapBox }
