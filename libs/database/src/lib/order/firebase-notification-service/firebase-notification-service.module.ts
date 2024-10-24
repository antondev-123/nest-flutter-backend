import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { existsSync, promises as fs } from 'fs';

import { DriverNotificationService } from './driver-notification.service';
import { RiderNotificationService } from './rider-notification.service';

@Module({})
export class FirebaseNotificationModule {
  static async register(): Promise<DynamicModule> {
    const modules = [];
    let providers: any[] = [];

    const configAddress = `${process.cwd()}/config/config.${
      process.env.NODE_ENV
    }.json`;
    Logger.log('configAddress: ' + configAddress, 'FirebaseNotificationModule');
    if (existsSync(configAddress)) {
      const file = await fs.readFile(configAddress, { encoding: 'utf-8' });
      const config = JSON.parse(file as string);
      const firebaseKeyFileAddress = `${process.cwd()}/config/${
        config.firebaseProjectPrivateKey
      }`;
      if (
        config.firebaseProjectPrivateKey != null &&
        existsSync(firebaseKeyFileAddress)
      ) {
        modules.push(
          FirebaseAdminModule.forRootAsync({
            useFactory: () => ({
              credential: admin.credential.cert(firebaseKeyFileAddress),
            }),
          })
        );
        providers = [DriverNotificationService, RiderNotificationService];
      }
    }
    return {
      module: FirebaseNotificationModule,
      imports: modules,
      providers: providers,
      exports: providers,
    };
  }
}
