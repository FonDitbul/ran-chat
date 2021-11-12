import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ChattingRoomModule } from './chatting-room/chatting-room.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    UsersModule,
    BoardsModule,
    ChatsModule,
    ChattingRoomModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
