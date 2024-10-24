import { ValueTransformer } from "typeorm";
import { DistanceMultiplier } from "../interfaces/distance-multiplier.dto";

export class DistanceMultiplierTransformer implements ValueTransformer {
	to(value: DistanceMultiplier[]): string[] {
		if(value == null) {
			return [];
		}
		return value.map((row: DistanceMultiplier) => `${row.distanceFrom}-${row.distanceTo}|${row.multiply}`)
	}
	from(value: string[] | null): DistanceMultiplier[] {
		if(value == null) {
			return [];
		}
		return (value as string[]).map(str => {
			return {
				distanceFrom: parseInt(str.split('|')[0].split('-')[0]),
				distanceTo: parseInt(str.split('|')[0].split('-')[1]),
				multiply: parseFloat(str.split('|')[1])
			}
		});
	}
}