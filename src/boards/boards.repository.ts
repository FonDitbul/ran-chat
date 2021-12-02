import { EntityRepository, Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {}
