import { Module } from '@nestjs/common';
import { PublicChatService } from './public-chat.service';
import { PublicChatController } from './public-chat.controller';
import { ChatsModule } from '../chats/chats.module';

@Module({
  // imports: [ChatsModule],
  controllers: [PublicChatController],
  providers: [PublicChatService],
})
export class PublicChatModule {}
