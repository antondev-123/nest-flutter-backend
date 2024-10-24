import { registerEnumType } from '@nestjs/graphql';

export enum DevicePlatform {
  Android = 'ANDROID',
  Ios = 'IOS',
  Web = 'WEB',
  MacOS = 'MACOS',
  Windows = 'WINDOWS',
  Linux = 'LINUX',
}

registerEnumType(DevicePlatform, { name: 'DevicePlatform' });
