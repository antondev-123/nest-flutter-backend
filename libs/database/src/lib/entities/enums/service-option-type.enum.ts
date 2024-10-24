import { registerEnumType } from "@nestjs/graphql";

export enum ServiceOptionType {
    Free = 'Free',
    Paid = 'Paid',
    TwoWay = 'TwoWay'
}

registerEnumType(ServiceOptionType, { name: 'ServiceOptionType'});