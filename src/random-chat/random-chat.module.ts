import { Module } from '@nestjs/common';
import { RandomChatController } from './random-chat.controller';
import { RandomChatService } from './random-chat.service';

@Module({
  controllers: [RandomChatController],
  providers: [RandomChatService]
})
export class RandomChatModule {}
