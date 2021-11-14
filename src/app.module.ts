import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { PublicChatModule } from './public-chat/public-chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    UsersModule,
    BoardsModule,
    ChatsModule,
    PublicChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
