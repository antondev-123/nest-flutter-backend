import { Injectable } from '@nestjs/common';
import { Point } from '../interfaces/point';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class DriverRedisService {
  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async setLocation(driverId: number, point: Point) {
    await Promise.all([
      this.redisService.geoadd(
        RedisKeys.Driver,
        point.lng,
        point.lat,
        driverId.toString()
      ),
      this.redisService.zadd(
        RedisKeys.DriverLocationTime,
        Date.now(),
        driverId
      ),
    ]);
  }

  async getDriverCoordinate(driverId: number): Promise<Point | null> {
    const pos = await this.redisService.geopos(
      RedisKeys.Driver,
      driverId.toString()
    );
    return pos[0]
      ? { lat: parseFloat(pos[0][1]), lng: parseFloat(pos[0][0]) }
      : null;
  }

  async getClose(
    point: Point,
    distance: number
  ): Promise<DriverLocationWithId[]> {
    const bare = (await this.redisService.call(
      'GEORADIUS',
      RedisKeys.Driver,
      point.lng,
      point.lat,
      distance,
      'm',
      'WITHCOORD'
    )) as string[][];
    return bare.map((item: string[]) => ({
      driverId: parseInt(item[0] as string),
      location: {
        lat: parseFloat(item[1][1]),
        lng: parseFloat(item[1][0]),
      },
    }));
  }

  async getCloseWithoutIds(point: Point, distance: number): Promise<Point[]> {
    const bare = (await this.redisService.call(
      'GEORADIUS',
      RedisKeys.Driver,
      point.lng,
      point.lat,
      distance,
      'm',
      'WITHCOORD'
    )) as string[][];
    return bare.map((item: string[]) => ({
      lat: parseFloat(item[1][1]),
      lng: parseFloat(item[1][0]),
    }));
  }

  async getAllOnline(center: Point, count: number): Promise<IOnlineDriver[]> {
    const bare = (await this.redisService.call(
      'GEORADIUS',
      RedisKeys.Driver,
      center.lng.toString(),
      center.lat.toString(),
      '22000',
      'km',
      'WITHCOORD',
      `COUNT`,
      count.toString(),
      'ASC'
    )) as string[][];
    const times: string[] = await this.redisService.zrangebyscore(
      RedisKeys.DriverLocationTime,
      0,
      new Date().getTime(),
      'WITHSCORES'
    );
    return bare.map((x: string[]) => {
      return {
        driverId: parseInt(x[0] as string),
        location: { lat: parseFloat(x[1][1]), lng: parseFloat(x[1][0]) },
        lastUpdatedAt: parseInt(times[times.indexOf(x[0] as string) + 1]),
      };
    });
  }

  async expire(userId: number[]) {
    await this.redisService.zrem(RedisKeys.Driver, userId);
    await this.redisService.zrem(RedisKeys.DriverLocationTime, userId);
  }
}

enum RedisKeys {
  Driver = 'driver',
  DriverLocationTime = 'driver-location-time',
}

export type DriverLocation = {
  location: Point;
};
export type DriverLocationWithId = DriverLocation & { driverId: number };

export type DriverLocationWithDist = DriverLocation & { distance: number };

export type DriverLocationWithDistAndId = DriverLocationWithDist & {
  driverId: number;
};

export interface IOnlineDriver {
  driverId: number;
  location: Point;
  lastUpdatedAt: number;
}
