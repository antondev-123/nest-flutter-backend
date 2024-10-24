import { ValueTransformer } from "typeorm";
import { TimeMultiplier } from "../interfaces/time-multiplier.dto";

export class TimeMultiplierTransformer implements ValueTransformer {
	to(value: TimeMultiplier[]): string[] {
		if(value == null) {
			return [];
		}
		return value.map((row: TimeMultiplier) => `${row.startTime}-${row.endTime}|${row.multiply}`)
	}
	from(value: string[] | null): TimeMultiplier[] {
		if(value == null) {
			return [];
		}
		return (value as string[]).map(str => {
			return {
				startTime: str.split('|')[0].split('-')[0],
				endTime: str.split('|')[0].split('-')[1],
				multiply: parseFloat(str.split('|')[1])
			}
		});
	}
}