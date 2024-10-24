import { ValueTransformer } from 'typeorm';
import { Point } from '../interfaces/point';

export class PointTransformer implements ValueTransformer {
  to(value: Point): string | null {
    if (value == null) return null;
    return `POINT(${value.lng} ${value.lat})`;
  }
  from(value: string): Point | null {
    if (value == null || value == '') {
      return null;
    }
    const a = value.substring(6, value.length - 7).split(' ');
    return {
      lng: parseFloat(a[0]),
      lat: parseFloat(a[1])
    };
  }
}
