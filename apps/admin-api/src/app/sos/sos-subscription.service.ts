import { InjectPubSub } from '@nestjs-query/query-graphql';
import { Injectable, Logger } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { WSContext } from '../auth/authenticated-admin';
import { SOSDTO } from './dto/sos.dto';

@Injectable()
export class SOSSubscriptionService {
  constructor(
    @InjectPubSub()
    public pubSub: RedisPubSub
  ) {}

  @Subscription(() => SOSDTO, {
    filter(
      this: SOSSubscriptionService,
      payload: { sosCreated: SOSDTO; adminIds: number[] },
      variables,
      context: WSContext
    ) {
      Logger.log(payload.adminIds.includes(context.user.id));
      return payload.adminIds.includes(context.user.id);
    },
  })
  sosCreated() {
    return this.pubSub.asyncIterator('sosCreated');
  }
}
