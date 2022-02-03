import { Module } from '@nestjs/common';
import { RandomChatController } from './random-chat.controller';
import { RandomChatService } from './random-chat.service';
import { RandomChatGateway } from './random-chat.gateway';

@Module({
  controllers: [RandomChatController],
  providers: [RandomChatService, RandomChatGateway],
})
export class RandomChatModule {}
