import { Module } from '@nestjs/common';
import { PublicChatService } from './public-chat.service';
import { PublicChatController } from './public-chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicChatRepository } from './public-chat.repostiroy';
import { ChatRepository } from '../chats/chats.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicChatRepository]),
    TypeOrmModule.forFeature([ChatRepository]),
  ],
  controllers: [PublicChatController],
  providers: [PublicChatService],
})
export class PublicChatModule {}
