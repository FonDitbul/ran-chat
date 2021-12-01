import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { UsersModule } from '../users/users.module';
import { LikeService } from './servies/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsRepository]), UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService, LikeService],
})
export class BoardsModule {}
