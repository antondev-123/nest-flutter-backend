import { registerEnumType } from "@nestjs/graphql";

export enum VersionStatus {
    Latest = 'Latest',
    MandatoryUpdate = 'MandatoryUpdate',
    OptionalUpdate = 'OptionalUpdate'
}

registerEnumType(VersionStatus, { name: 'VersionStatus'});