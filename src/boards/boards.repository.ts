import { EntityRepository, getConnection, Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {
  async findAll(page: number) {
    const SHOW_LIMIT_BOARD = 15;
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
      .loadRelationCountAndMap(
        'board.LikeCount',
        'board.userLikes',
        'LikeCount',
      )
      .orderBy('board.id', 'DESC')
      .offset(page * SHOW_LIMIT_BOARD)
      .limit(SHOW_LIMIT_BOARD)
      .getManyAndCount();
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
        'board.createdAt', //생성 날짜
        'board.views', //조회수
      ])
      .innerJoinAndSelect('board.user', 'user', 'board.uid = user.id')
      .loadRelationCountAndMap(
        'board.LikeCount',
        'board.userLikes',
        'LikeCount',
      )
      .where('board.id = :id', { id })
      .getOne();
    return getOneBoard;
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const { content, title } = updateBoardDto;
    const updateOneBoard = await this.createQueryBuilder()
      .update('board')
      .set({ title: title, content: content })
      .where('board.id = :id', { id })
      .execute();
    return updateOneBoard;
  }

  //좋아요 find
  async findLike(id: number) {
    const boardLikes = await this.createQueryBuilder('board')
      .innerJoinAndSelect('board.userLikes', 'Like')
      .loadRelationCountAndMap(
        'board.LikeCount',
        'board.userLikes',
        'LikeCount',
      )
      .where('board.id = :id', { id })
      .getOne();
    if (!boardLikes) {
      //좋아요 없을시 예외처리, 더 좋은방법 강구
      const tempLikes = await this.createQueryBuilder('board')
        .where('board.id = :id', { id })
        .getOne();
      tempLikes.userLikes = [];
      return tempLikes;
    }
    return boardLikes;
  }
}
