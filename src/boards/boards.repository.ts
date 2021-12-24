import { EntityRepository, getRepository, Repository } from 'typeorm';
import { BoardEntity as Board, BoardEntity } from './entities/board.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { UpdateBoardDto } from './dto/update-board.dto';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {
  async findAll(page: number) {
    const SHOW_LIMIT_BOARD = 10;
    const getAllBoards = await getRepository(Board)
      .createQueryBuilder('board')
      .select([
        'board.id AS board_id',
        'board.title',
        'board.uid', // 게시판 작성유저 아이디
        'board.category', // 게시판 카테고리
        'board.createdAt', //생성 날짜
        'board.like', // 좋아요
        'board.dislike', // 싫어요
        'board.views', //조회수
      ])
      // .leftJoin('board', 'user', 'board.uid = user.id')
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('board.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*) AS comment_count')
          .from(CommentEntity, 'comment')
          .where('board.id = comment.boardID');
      }, 'comment_count')
      .orderBy('id', 'DESC')
      .offset(page * SHOW_LIMIT_BOARD)
      .limit(SHOW_LIMIT_BOARD)
      .getRawMany();
    return getAllBoards;
  }
  async findOneBoard(id: number) {
    const getOneBoard = await getRepository(Board)
      .createQueryBuilder('board')
      .where('board.id = :id', { id })
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('board.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .getRawOne();
    return getOneBoard;
  }
  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const { content } = updateBoardDto;
    const updateOneBoard = await getRepository(Board)
      .createQueryBuilder()
      .update('board')
      .set({ content: content })
      .where('board.id = :id', { id })
      .execute();
    return updateOneBoard;
  }
}
