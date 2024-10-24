import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { DeepPartial, QueryService } from '@nestjs-query/core';
import { InjectPubSub } from '@nestjs-query/query-graphql';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplaintEntity } from '@ridy/database/complaint.entity';
import { OperatorEntity } from '@ridy/database/operator.entity';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Like, Repository } from 'typeorm';
import { ComplaintDTO } from './dto/complaint.dto';

@QueryService(ComplaintDTO)
export class ComplaintQueryService extends TypeOrmQueryService<ComplaintDTO> {
  constructor(
    @InjectRepository(ComplaintEntity) repo: Repository<ComplaintEntity>,
    @InjectRepository(OperatorEntity)
    private operatorRepo: Repository<OperatorEntity>,
    @InjectPubSub()
    private pubSub: RedisPubSub
  ) {
    super(repo);
  }

  override async createOne(
    record: DeepPartial<ComplaintDTO>
  ): Promise<ComplaintDTO> {
    let dto = await super.createOne(record);
    let savedRecord = await this.repo.findOneOrFail(dto.id, {
      relations: ['request', 'activities'],
    });
    const admins = await this.operatorRepo.find({
      where: { enabledNotifications: Like('%complaint%') },
    });
    this.pubSub.publish('complaintCreated', {
      complaintCreated: savedRecord,
      adminIds: admins.map((admin) => admin.id),
    });
    return savedRecord;
  }
}
