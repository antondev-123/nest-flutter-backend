import { ValueTransformer } from "typeorm";
import { Point } from "../interfaces/point";

export class MultipointTransformer implements ValueTransformer {
	to(value?: Point[]): string | null {
		if(value == null || value.length < 1) return null;
		return `MULTIPOINT(${value.map((x: Point) => `${x.lng} ${x.lat}`).join(',')})`
	}
	from(value: string): Point[] {
		if(value == null) return [];
		const i = value.substring(11, value.length - 1).split(',').map(x => {
			const s = x.substring(1, x.length - 1).split(' ')
			return {
				lng: parseFloat(s[0]),
				lat: parseFloat(s[1])
			}
		})
		return i;
	}
}