import { registerEnumType } from "@nestjs/graphql";

export enum Gender {
    Male = "male",
    Female = "female",
    Unknown = "unknown"
}

registerEnumType(Gender, { name : 'Gender' });