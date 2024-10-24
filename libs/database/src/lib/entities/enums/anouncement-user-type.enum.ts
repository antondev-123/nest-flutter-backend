import { registerEnumType } from "@nestjs/graphql";

export enum AnnouncementUserType {
    Driver = 'Driver',
    Rider = 'Rider',
    Operator = 'Operator'
}

registerEnumType(AnnouncementUserType, { name: 'AnnouncementUserType' });