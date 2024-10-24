import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Point } from "@ridy/database";
import { RegionEntity } from "@ridy/database/region.entity";
import { ServiceEntity } from "@ridy/database/service.entity";
import { Repository } from "typeorm";

@Injectable()
export class RegionService {
    constructor(
        @InjectRepository(RegionEntity)
        private regionRepository: Repository<RegionEntity>
    ) {}

    async getRegionWithPoint(point: Point): Promise<RegionEntity[]> {
        const regions: RegionEntity[] = await this.regionRepository.query(`SELECT * FROM region WHERE enabled=TRUE AND ST_Within(st_geomfromtext('POINT(? ?)'), region.location)`, [point.lng, point.lat]);
        return regions;
    }

    async getRegionServices(regionId: number): Promise<ServiceEntity[]> {
        return (await this.regionRepository.findOne(regionId, { relations: ['services']}))?.services ?? [];
    }
}