import { registerEnumType } from "@nestjs/graphql";

export enum RequestActivityType {
    RequestedByOperator = 'RequestedByOperator',
    BookedByOperator = 'BookedByOperator',
    RequestedByRider = 'RequestedByRider',
    BookedByRider = 'BookedByRider',
    DriverAccepted = 'DriverAccepted',
    ArrivedToPickupPoint = 'ArrivedToPickupPoint',
    CanceledByDriver = 'CanceledByDriver',
    CanceledByRider = 'CanceledByRider',
    CanceledByOperator = 'CanceledByOperator',
    Started = 'Started',
    ArrivedToDestination = 'ArrivedToDestination',
    Paid = 'Paid',
    Reviewed = 'Reviewed',
    Expired = 'Expired'
}

registerEnumType(RequestActivityType, { name : 'RequestActivityType'});