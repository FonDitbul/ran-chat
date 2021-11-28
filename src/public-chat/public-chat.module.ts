import { Module } from '@nestjs/common';
import { PublicChatService } from './public-chat.service';
import { PublicChatController } from './public-chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicChatRepository } from './public-chat.repostiroy';
import { ChatRepository } from '../chats/chats.repository';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicChatRepository]),
    TypeOrmModule.forFeature([ChatRepository]),
    UsersModule,
  ],
  controllers: [PublicChatController],
  providers: [PublicChatService],
})
export class PublicChatModule {}
