import { ValueTransformer } from 'typeorm';
import { Point } from '../interfaces/point';

export class PolygonTransformer implements ValueTransformer {
    to(value: Point[][]): string | null {
        if(value == null) return null;
        const str = value.map((x: Point[]) => {
            const ar = x.map((y: Point) => `${y.lng} ${y.lat}`);
            return ar.join(',');
        }).join('),(');
        return `POLYGON((${str}))`;
    }
    
    from(value: string): Point[][] {
        if(value == null || value == undefined) {
            return [];
        }
        return value.substring(8, value.length - 1).split('),(').map(x => {
            const res = x.substring(1, x.length - 1).split(',').map(y => {
                const s = y.split(' ');
                return {
                    lng: parseFloat(s[0]),
                    lat: parseFloat(s[1])
                }
            });
            return res;
        });
    }
}


