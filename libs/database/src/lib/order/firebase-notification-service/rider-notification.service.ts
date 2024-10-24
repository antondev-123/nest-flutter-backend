import { FirebaseMessagingService } from '@aginix/nestjs-firebase-admin';
import { Injectable } from '@nestjs/common';
import { OrderMessageEntity } from '@ridy/database/request-message.entity';
import { RiderEntity } from '@ridy/database/rider-entity';

@Injectable()
export class RiderNotificationService {
  constructor(private firebaseMessaging: FirebaseMessagingService) {}

  message(rider: RiderEntity, message: OrderMessageEntity) {
    if (rider.notificationPlayerId == null) return;
    try {
      this.firebaseMessaging.messaging.send({
        token: rider.notificationPlayerId,
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

  canceled(rider: RiderEntity) {
    this.sendNotification(
      rider,
      'notification_cancel_title',
      'notification_cancel_body',
      'Canceled',
      'Your trip has been canceled'
    );
  }

  accepted(rider: RiderEntity) {
    this.sendNotification(
      rider,
      'notification_found_title',
      'notification_found_body',
      'Accepted',
      'A driver has accepted your requet'
    );
  }

  bookingAssigned(rider: RiderEntity, time: string) {
    this.sendNotification(
      rider,
      'notification_booking_assigned_title',
      'notification_booking_assigned_body',
      'Assigned',
      'A driver has been assigned to your trip',
      [time]
    );
  }

  arrived(rider: RiderEntity) {
    this.sendNotification(
      rider,
      'notification_arrived_title',
      'notification_arrived_body',
      'Arrived',
      'Driver has arrived to your location'
    );
  }

  started(rider: RiderEntity) {
    this.sendNotification(
      rider,
      'notification_started_title',
      'notification_started_body',
      'Started',
      'Trip has been started'
    );
  }

  waitingForPostPay(rider: RiderEntity) {
    this.sendNotification(
      rider,
      'notification_waiting_for_pay_title',
      'notification_waiting_for_pay_body',
      'Finished',
      'Waiting for post-pay'
    );
  }

  finished(rider: RiderEntity) {
    this.sendNotification(
      rider,
      'notification_finished_title',
      'notification_finished_body',
      'Finished',
      'Trip has been finished.'
    );
  }

  private sendNotification(
    rider: RiderEntity,
    titleLocKey: string,
    bodyLocKey: string,
    titleDefault: string,
    bodyDefault: string,
    bodyLocArgs: string[] = [],
    sound: string = 'default',
    channelId: string = 'tripEvents'
  ) {
    if (
      rider.notificationPlayerId == null ||
      rider.notificationPlayerId.length < 5
    )
      return;
    this.firebaseMessaging.messaging.send({
      token: rider.notificationPlayerId,
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
      webpush: {
        notification: {
          title: titleDefault,
          body: bodyDefault,
        },
      },
    });
  }
}
