import { EntityRepository, Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { CommentEntity } from './entities/comment.entity';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {}

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}
