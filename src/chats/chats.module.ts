import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chats.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository]), UsersModule],
  controllers: [],
  providers: [ChatsGateway],
})
export class ChatsModule {}
