import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ChatsModule, TypeOrmModule.forRoot(), UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
