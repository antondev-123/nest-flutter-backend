import { Authorize, IDField } from '@nestjs-query/query-graphql';
import { ID, ObjectType } from '@nestjs/graphql';
import { ServiceOptionIcon } from '@ridy/database/enums/service-option-icon.enum';
import { ServiceOptionType } from '@ridy/database/enums/service-option-type.enum';
import { ServiceAuthorizer } from './service.authorizer';

@ObjectType('ServiceOption')
@Authorize(ServiceAuthorizer)
export class ServiceOptionDTO {
  @IDField(() => ID)
  id: number;
  name: string;
  type: ServiceOptionType;
  additionalFee?: number;
  icon: ServiceOptionIcon;
}
