import { registerEnumType } from '@nestjs/graphql';

export enum DeviceType {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

registerEnumType(DeviceType, { name: 'DeviceType' });
