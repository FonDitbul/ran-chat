import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import { UsersModule } from '../users/users.module';
import { LikeService } from './services/like.service';
import { CommentRepository } from './repository/comment.repository';
import { CommentService } from './services/comment.service';
import { UserRepository } from '../users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      BoardsRepository,
      UserRepository,
    ]),
    UsersModule,
  ],
  controllers: [BoardsController],
  providers: [CommentService, LikeService, BoardsService],
})
export class BoardsModule {}
