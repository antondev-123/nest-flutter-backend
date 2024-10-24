import { registerEnumType } from "@nestjs/graphql";

export enum RiderDocumentType {
    ID = "ID",
    Passport = "Passport",
    DriverLicense = "DriverLicense",
    ResidentPermitID = "ResidentPermitID"
}

registerEnumType(RiderDocumentType, { name: 'RiderDocumentType' })