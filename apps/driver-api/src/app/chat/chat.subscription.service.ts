import { InjectPubSub } from '@nestjs-query/query-graphql';
import { Injectable, Logger } from '@nestjs/common';
import { Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { OrderMessageDTO } from './dto/order-message.dto';

@Injectable()
export class ChatSubscriptionService {
  constructor(
    @InjectPubSub()
    private pubSub: RedisPubSub
  ) {}

  @Subscription(() => OrderMessageDTO, {
    filter(
      this: ChatSubscriptionService,
      payload: { newMessageReceived: OrderMessageDTO; driverId: number },
      variables,
      context
    ) {
      return context.id == payload.driverId;
    },
    resolve: (payload: { newMessageReceived: OrderMessageDTO }) => {
      payload.newMessageReceived.sentAt = new Date(
        payload.newMessageReceived.sentAt
      );
      return payload.newMessageReceived;
    },
  })
  newMessageReceived() {
    return this.pubSub.asyncIterator('newMessageForDriver');
  }
}
