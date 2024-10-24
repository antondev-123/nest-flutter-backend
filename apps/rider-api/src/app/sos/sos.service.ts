import { InjectPubSub } from '@nestjs-query/query-graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from '@ridy/database';
import { OperatorEntity } from '@ridy/database/operator.entity';
import { SOSEntity } from '@ridy/database/sos.entity';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class SOSService {
  constructor(
    @InjectRepository(SOSEntity)
    private readonly sosRepository: Repository<SOSEntity>,
    @InjectRepository(OperatorEntity)
    private readonly operatorRepo: Repository<OperatorEntity>,
    @InjectPubSub()
    private pubSub: RedisPubSub
  ) {}

  async submitSOS(input: {
    location: Point;
    requestId: number;
  }): Promise<SOSEntity> {
    let dto = await this.sosRepository.save({
      submittedByRider: true,
      ...input,
    });
    let savedRecord = await this.sosRepository.findOneOrFail(dto.id, {
      relations: ['request', 'activities'],
    });
    const admins = await this.operatorRepo.find({
      where: { enabledNotifications: Like('%sos%') },
    });
    this.pubSub.publish('sosCreated', {
      sosCreated: savedRecord,
      adminIds: admins.map((admin) => admin.id),
    });
    return savedRecord;
  }
}
