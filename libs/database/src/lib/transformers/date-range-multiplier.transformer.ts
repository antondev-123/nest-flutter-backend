import { ValueTransformer } from 'typeorm';
import { DateRangeMultiplier } from '../interfaces/date-range-multiplier.dto';

export class DateRangeMultiplierTransformer implements ValueTransformer {
  to(value: DateRangeMultiplier[]): string[] {
    if (value == null) {
      return [];
    }
    return value.map(
      (row: DateRangeMultiplier) =>
        `${row.startDate}-${row.endDate}|${row.multiply}`
    );
  }
  from(value: string[] | null): DateRangeMultiplier[] {
    if (value == null) {
      return [];
    }
    return (value as string[]).map((str) => {
      return {
        startDate: parseInt(str.split('|')[0].split('-')[0]),
        endDate: parseInt(str.split('|')[0].split('-')[1]),
        multiply: parseFloat(str.split('|')[1]),
      };
    });
  }
}
