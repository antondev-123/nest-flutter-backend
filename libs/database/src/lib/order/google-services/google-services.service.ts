import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable, Logger } from '@nestjs/common';
import { ForbiddenError } from 'apollo-server-fastify';
import { Point } from '../../interfaces/point';
import { SharedConfigurationService } from '../../shared-configuration.service';

@Injectable()
export class GoogleServicesService {
    client = new Client({});
    constructor(
        private configurationService: SharedConfigurationService
    ) { }

    async getSumDistanceAndDuration(points: Point[]): Promise<{ distance: number, duration: number, directions: LatLngLiteral[] }> {
        let distance = 0;
        let duration = 0;
        const config = await this.configurationService.getConfiguration();
        for (let i = 0; i < points.length - 1; i++) {
            const matrixResponse = await this.client.distancematrix({
                params: {
                    origins: [points[i]],
                    destinations: [points[i + 1]],
                    key: config!.backendMapsAPIKey!
                }
            });
            if (matrixResponse.statusText !== "OK") {
                throw new ForbiddenError('NO_ROUTE_FOUND');
            }

            distance += matrixResponse.data.rows[0].elements.filter(element => element.status == 'OK').reduce((a, b) => { return a + b.distance.value }, 0);
            duration += matrixResponse.data.rows[0].elements.filter(element => element.status == 'OK').reduce((a, b) => { return a + b.duration.value }, 0);
        }
        let directions: LatLngLiteral[] = [];
        if (process.env.SHOW_DIRECTIONS != null) {
            try {
                const directionsAPI = await this.client.directions({
                    params: {
                        key: config!.backendMapsAPIKey!,
                        origin: points[0],
                        destination: points[points.length - 1],
                        waypoints: points.length > 2 ? points.slice(1, points.length - 2) : []
                    }
                });
                if (directionsAPI.data.routes.length > 0) {
                    directions = this.decode(directionsAPI.data.routes[0].overview_polyline.points) ?? [];
                }
            } catch (exception) {
                Logger.error(exception);
            }
        }
        return { distance, duration, directions };
    }

    decode(encoded: string): LatLngLiteral[] {

        // array that holds the points

        var points = []
        var index = 0, len = encoded.length;
        var lat = 0, lng = 0;
        while (index < len) {
            var b, shift = 0, result = 0;
            do {

                b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);


            var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push({ lat: (lat / 1E5), lng: (lng / 1E5) })

        }
        return points
    }
}