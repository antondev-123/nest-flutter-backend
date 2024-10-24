import { registerEnumType } from "@nestjs/graphql";

export enum SOSActivityAction {
    Submitted = 'Submitted',
    Seen = 'Seen',
    ContactDriver = 'ContactDriver',
    ContactAuthorities = 'ContactAuthorities',
    MarkedAsResolved = 'MarkedAsResolved',
    MarkedAsFalseAlarm = 'MarkedAsFalseAlarm'
}

registerEnumType(SOSActivityAction, { name: 'SOSActivityAction' });