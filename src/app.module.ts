import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { PublicChatModule } from './public-chat/public-chat.module';
import { RandomChatModule } from './random-chat/random-chat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    UsersModule,
    BoardsModule,
    ChatsModule,
    PublicChatModule,
    RandomChatModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
