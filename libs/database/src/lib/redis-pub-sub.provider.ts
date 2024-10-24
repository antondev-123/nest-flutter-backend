import { pubSubToken } from '@nestjs-query/query-graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { Provider } from '@nestjs/common';

export class RedisPubSubProvider {
  static provider(): Provider {
    return {
      provide: pubSubToken(),
      useFactory: () => {
        const options = {
          host: process.env.REDIS_HOST || 'localhost',
          port: 6379
        };
        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        })
      } ,
    };
  }
}
