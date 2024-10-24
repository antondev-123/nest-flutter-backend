import { ValueTransformer } from 'typeorm';
import {
  Weekday,
  WeekdayMultiplier,
} from '../interfaces/weekday-multiplier.dto';

export class WeekdayMultiplierTransformer implements ValueTransformer {
  to(value: WeekdayMultiplier[]): string[] {
    if (value == null) {
      return [];
    }
    return value.map(
      (row: WeekdayMultiplier) => `${row.weekday}|${row.multiply}`
    );
  }
  from(value: string[] | null): WeekdayMultiplier[] {
    if (value == null) {
      return [];
    }
    return (value as string[]).map((str) => {
      return {
        weekday: str.split('|')[0] as unknown as Weekday,
        multiply: parseFloat(str.split('|')[1]),
      };
    });
  }
}
