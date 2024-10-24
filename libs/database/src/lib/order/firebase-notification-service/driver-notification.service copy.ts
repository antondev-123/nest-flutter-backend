import { FirebaseMessagingService } from '@aginix/nestjs-firebase-admin';
import { Injectable, Logger } from '@nestjs/common';
import { DriverEntity } from '../../entities/driver.entity';
import { OrderMessageEntity } from '../../entities/request-message.entity';

@Injectable()
export class DriverNotificationService {
  constructor(private firebaseMessaging: FirebaseMessagingService) {}
  async requests(driver: DriverEntity[]) {
    const tokens: string[] = driver
      .filter((_driver) => (_driver.notificationPlayerId?.length ?? 0) > 0)
      .map((x) => x.notificationPlayerId) as unknown as string[];
    
    if (tokens.length < 1) return;
    

    const BATCH_SIZE = 500;
    const chunks = [];
    for (let i = 0; i < tokens.length; i += BATCH_SIZE) {
      chunks.push(tokens.slice(i, i + BATCH_SIZE));
    }
    
    for (const chunk of chunks) {
      await this.firebaseMessaging.messaging.sendMulticast({
        tokens: chunk,
        android: {
          notification: {
            sound: 'default',
            titleLocKey: 'notification_new_request_title',
            bodyLocKey: 'notification_new_request_body',
            channelId: 'request',
            icon: 'notification_icon',
            priority: 'high',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: process.env.REQUEST_SOUND ?? 'default',
              badge: 1,
              contentAvailable: true,
              alert: {
                titleLocKey: 'notification_new_request_title',
                subtitleLocKey: 'notification_new_request_body',
              },
            },
          },
        },
      });
    }

    const batchSize = 500;
    for (let i = 0; i < tokens.length; i += batchSize) {
      const tokenBatch = tokens.slice(i, i + batchSize);
      try {
        const notificationResult =
          await this.firebaseMessaging.messaging.sendMulticast({
            tokens: tokenBatch,
            android: {
              notification: {
                sound: 'default',
                titleLocKey: 'notification_new_request_title',
                bodyLocKey: 'notification_new_request_body',
                channelId: 'request',
                icon: 'notification_icon',
                priority: 'high',
              },
            },
            apns: {
              payload: {
                aps: {
                  sound: process.env.REQUEST_SOUND ?? 'default',
                  badge: 1,
                  contentAvailable: true,
                  alert: {
                    titleLocKey: 'notification_new_request_title',
                    subtitleLocKey: 'notification_new_request_body',
                  },
                },
              },
            },
          });
        Logger.log(notificationResult);
      } catch (error) {
        Logger.error(error);
      }
    }
  }
  


  canceled(driver: DriverEntity) {
    this.sendNotification(
      driver,
      'notification_cancel_title',
      'notification_cancel_body'
    );
  }

  message(driver: DriverEntity, message: OrderMessageEntity) {
    if (driver.notificationPlayerId == null) return;
    try {
      this.firebaseMessaging.messaging.send({
        token: driver.notificationPlayerId,
        android: {
          notification: {
            sound: 'default',
            titleLocKey: 'notification_new_message_title',
            body: message.content,
            channelId: 'message',
            icon: 'notification_icon',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
              contentAvailable: true,
              alert: {
                titleLocKey: 'notification_new_message_title',
                subtitle: message.content,
              },
            },
          },
        },
      });
    } catch (error) {}
  }

  paid(driver: DriverEntity) {
    this.sendNotification(
      driver,
      'notification_paid_title',
      'notification_paid_body'
    );
  }

  assigned(driver: DriverEntity, time: string, from: string, to: string) {
    this.sendNotification(
      driver,
      'notification_assigned_title',
      'notification_assigned_body',
      [time, from, to]
    );
  }

  upcomingBooking(driver: DriverEntity) {
    this.sendNotification(
      driver,
      'notification_upcoming_ride_title',
      'notification_upcoming_ride_body'
    );
  }

  private sendNotification(
    driver: DriverEntity,
    titleLocKey: string,
    bodyLocKey: string,
    bodyLocArgs: string[] = [],
    sound: string = 'default',
    channelId: string = 'tripEvents'
  ) {
    if (driver.notificationPlayerId == null) return;
    this.firebaseMessaging.messaging.send({
      token: driver.notificationPlayerId,
      android: {
        notification: {
          sound,
          titleLocKey,
          bodyLocKey,
          bodyLocArgs,
          channelId,
          icon: 'notification_icon',
        },
      },
      apns: {
        payload: {
          aps: {
            sound,
            alert: {
              titleLocKey,
              subtitleLocKey: bodyLocKey,
              subtitleLocArgs: bodyLocArgs,
            },
          },
        },
      },
    });
  }
}
