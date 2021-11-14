import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chats.repository';
import { UsersModule } from '../users/users.module';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository]), UsersModule],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
