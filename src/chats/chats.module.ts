import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRepository } from './chats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository])],
  controllers: [ChatsController],
  providers: [ChatsGateway],
})
export class ChatsModule {}
