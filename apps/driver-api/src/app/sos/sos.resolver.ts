import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Point } from '@ridy/database';
import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { SOSDTO } from './dto/sos.dto';
import { SOSService } from './sos.service';

@Resolver(() => SOSDTO)
export class SOSResolver {
  constructor(private readonly sosService: SOSService) {}

  @Mutation(() => SOSDTO)
  @UseGuards(GqlAuthGuard)
  async sosSignal(
    @Args('orderId', { type: () => ID }) requestId: number,
    @Args('location', { type: () => Point, nullable: true }) location?: Point
  ): Promise<SOSDTO> {
    return this.sosService.submitSOS({ location, requestId });
  }
}
