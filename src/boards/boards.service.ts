import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { BoardEntity as Board } from '../boards/entities/board.entity';
import { createQueryBuilder, getRepository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { LikeService } from './services/like.service';
import { UpdateLikeDto } from './dto/update-like.dto';
import { UserEntity } from '../users/entities/user.entity';

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

  async findAll() {
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
      ])
      // .leftJoin('board', 'user', 'board.uid = user.id')
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('board.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .getRawMany();
    return getAllBoards;
  }

  async findOne(id: number) {
    const getOneBoard = await getRepository(Board)
      .createQueryBuilder('Board')
      .where('Board.id = :id', { id })
      .getOne();
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
    return `This action updates a #${id} board`;
  }

  async updateLike(id: number, updateLikeDto: UpdateLikeDto) {
    const { like, dislike } = updateLikeDto;
    await this.likeService.updateLike(id, updateLikeDto);
    return `${like}, ${dislike}`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
