import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { RedisPubSubProvider } from '@ridy/database';
import { ComplaintEntity } from '@ridy/database/complaint.entity';
import { OperatorEntity } from '@ridy/database/operator.entity';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { ComplaintQueryService } from './complaint-query.service';
import { ComplaintDTO } from './dto/complaint.dto';
import { ComplaintInput } from './dto/complaint.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([ComplaintEntity, OperatorEntity]),
      ],
      services: [ComplaintQueryService],
      pubSub: RedisPubSubProvider.provider(),
      resolvers: [
        {
          EntityClass: ComplaintEntity,
          DTOClass: ComplaintDTO,
          CreateDTOClass: ComplaintInput,
          ServiceClass: ComplaintQueryService,
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          create: { many: { disabled: true } },
          guards: [GqlAuthGuard],
        },
      ],
    }),
  ],
})
export class ComplaintModule {}
