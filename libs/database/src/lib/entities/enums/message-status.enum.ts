import { registerEnumType } from "@nestjs/graphql";

export enum MessageStatus {
    Sent = "sent",
    Delivered = "delivered",
    Seen = "seen"
}

registerEnumType(MessageStatus, { name: 'MessageStatus' });