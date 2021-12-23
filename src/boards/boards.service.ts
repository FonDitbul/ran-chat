import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { BoardEntity as Board } from '../boards/entities/board.entity';
import { getRepository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { LikeService } from './services/like.service';
import { UserEntity } from '../users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly likeService: LikeService,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    return await this.boardsRepository
      .save(createBoardDto)
      .then(async (Board) => {
        return Board;
      })
      .catch((error) => {
        return error;
      });
  }

  async findAll(page) {
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
      .offset(page * SHOW_LIMIT_BOARD)
      .limit(SHOW_LIMIT_BOARD)
      .getRawMany();
    const countBoard = await this.boardsRepository.count({});
    const curPage = page + 1;
    const startPage = parseInt(String(curPage / 10 - 1)) + 1;
    const endPage =
      parseInt(String(countBoard / 10)) * 10 < countBoard
        ? parseInt(String(countBoard % 10)) * 10
        : countBoard;
    const pageArr = [];
    for (let i = startPage; i <= endPage; i++) {
      pageArr.push(i);
    }
    return { getAllBoards, countBoard, pageArr };
  }

  async findOne(id: number) {
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

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const { content } = updateBoardDto;
    const updateOneBoard = await getRepository(Board)
      .createQueryBuilder()
      .update('board')
      .set({ content: content })
      .where('board.id = :id', { id })
      .execute();
    return updateOneBoard;
  }

  async remove(id: number) {
    const removedData = await this.boardsRepository.delete({ id: id });
    return `This action removes a #${id} board`;
  }
}
