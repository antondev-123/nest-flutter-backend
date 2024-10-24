import { registerEnumType } from "@nestjs/graphql";

export enum RiderAddressType {
    Home = 'Home',
    Work = 'Work',
    Partner = 'Partner',
    Gym = 'Gym',
    Parent = 'Parent',
    Cafe = 'Cafe',
    Park = 'Park',
    Other = 'Other'
}

registerEnumType(RiderAddressType, { name: 'RiderAddressType' });