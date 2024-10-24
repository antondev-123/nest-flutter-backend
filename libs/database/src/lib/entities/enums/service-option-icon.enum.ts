import { registerEnumType } from "@nestjs/graphql";

export enum ServiceOptionIcon {
    Pet = 'Pet',
    TwoWay = 'TwoWay',
    Luggage = 'Luggage',
    PackageDelivery = 'PackageDelivery',
    Shopping = 'Shopping',
    Custom1 = 'Custom1',
    Custom2 = 'Custom2',
    Custom3 = 'Custom3',
    Custom4 = 'Custom4',
    Custom5 = 'Custom5'
}

registerEnumType(ServiceOptionIcon, { name: 'ServiceOptionIcon' });