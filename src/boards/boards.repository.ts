import { EntityRepository, getRepository, Repository } from 'typeorm';
import { BoardEntity as Board, BoardEntity } from './entities/board.entity';
import { UserEntity as User } from '../users/entities/user.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CommentEntity } from './entities/comment.entity';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {
  async findAll(page: number) {
    const SHOW_LIMIT_BOARD = 10;
    // 다른 표현식
    // const getAllBoards = await this.find({
    //   relations: ['user', 'comments'],
    //   order: { id: 'DESC' },
    //   skip: page * SHOW_LIMIT_BOARD,
    //   take: SHOW_LIMIT_BOARD,
    // });
    // 쿼리빌더로 사용했을 경우
    const getAllBoards = await this.createQueryBuilder('board')
      .innerJoinAndSelect('board.user', 'user')
      .loadRelationCountAndMap(
        'board.commentsCount',
        'board.comments',
        'comments',
      )
      .orderBy('board.id', 'DESC')
      .offset(page * SHOW_LIMIT_BOARD)
      .limit(SHOW_LIMIT_BOARD)
      .getMany();
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

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const { content } = updateBoardDto;
    const updateOneBoard = await this.createQueryBuilder()
      .update('board')
      .set({ content: content })
      .where('board.id = :id', { id })
      .execute();
    return updateOneBoard;
  }

  //좋아요 CRUD
  async findLike(id: number) {
    const boardLikes = await this.findOne({
      relations: ['userLikes'],
      where: { id: id },
    });
    const testFind = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.userLikes', 'Like')
      .where('board.id = :id', { id })
      .getMany();
    console.log(testFind[0].userLikes);
    return boardLikes.userLikes;
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
