import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { BoardEntity as Board } from '../boards/entities/board.entity';
import { getRepository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { LikeService } from './servies/like.service';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly likeService: LikeService,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    const user = await this.userRepository.findOne(createBoardDto.uid, {
      relations: ['board'],
    });
    return await this.boardsRepository
      .save(createBoardDto)
      .then(async (Board) => {
        user.board.push(Board);
        await this.userRepository.save(user);
        return Board;
      })
      .catch((error) => {
        return error;
      });
  }

  async findAll() {
    const getAllBoards = await getRepository(Board)
      .createQueryBuilder('Board')
      .leftJoinAndSelect('Board.user', 'user')
      .getMany();
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
