import { EntityRepository, getRepository, Repository } from 'typeorm';
import { BoardEntity as Board, BoardEntity } from './entities/board.entity';
import { UserEntity as User } from '../users/entities/user.entity';
import { UpdateBoardDto } from './dto/update-board.dto';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {
  async findAll(page: number) {
    const SHOW_LIMIT_BOARD = 10;
    const getAllBoards = await this.find({
      relations: ['user'],
      order: { id: 'DESC' },
      skip: page * SHOW_LIMIT_BOARD,
      take: SHOW_LIMIT_BOARD,
    });
    return getAllBoards;
  }

  async findOneBoard(id: number) {
    const getOneBoard = await this.createQueryBuilder('board')
      .select([
        'board.id',
        'board.title',
        'board.uid', // 게시판 작성유저 아이디
        'board.category', // 게시판 카테고리
        'board.content', // 게시판 내용
        'board.like', // 게시판 좋아요
        'board.createdAt', //생성 날짜
        'board.views', //조회수
      ])
      .innerJoinAndSelect('board.user', 'user', 'board.uid = user.id')
      .where('board.id = :id', { id })
      .getOne();
    return getOneBoard;
  }

  async findLike(id: number) {
    const boardLikes = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.userLikes', 'Like')
      .where('board.id = :id', { id })
      .getOne();
    return boardLikes;
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const { content } = updateBoardDto;
    const updateOneBoard = await this.createQueryBuilder()
      .update('board')
      .set({ content: content })
      .where('board.id = :id', { id })
      .execute();
    return updateOneBoard;
  }

  async updateBoardLike(id, uid) {
    //TODO userRepostiroy 불러오기
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :uid', { uid })
      .getOne();

    const board = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.userLikes', 'Like')
      .where('board.id = :id', { id })
      .getOne();
    board.userLikes.push(user);
    return await getRepository(Board).save(board);
  }
}
