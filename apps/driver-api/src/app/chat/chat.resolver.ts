import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Boolean)
  async updateLastSeenMessagesAt(
    @Args('orderId', { type: () => ID }) orderId: number
  ) {
    return await this.chatService.updateLastSeenMessagesAt(orderId);
  }
}
