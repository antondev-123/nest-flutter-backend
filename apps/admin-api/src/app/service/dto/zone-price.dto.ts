import {
  Authorize,
  IDField,
  UnPagedRelation,
} from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { Point, TimeMultiplier } from '@ridy/database';
import { FleetDTO } from '../../fleet/dto/fleet.dto';
import { ServiceAuthorizer } from './service.authorizer';
import { ServiceDTO } from './service.dto';

@ObjectType('ZonePrice')
@UnPagedRelation('fleets', () => FleetDTO)
@UnPagedRelation('services', () => ServiceDTO)
@Authorize(ServiceAuthorizer)
export class ZonePriceDTO {
  @IDField(() => ID)
  id: number;
  name!: string;
  from!: Point[][];
  to!: Point[][];
  cost: number;
  timeMultipliers!: TimeMultiplier[];
}
