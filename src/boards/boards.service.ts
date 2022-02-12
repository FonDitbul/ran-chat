import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}
  async create(createBoardDto: CreateBoardDto) {
    return await this.boardsRepository
      .save(createBoardDto)
      .then(async (Board) => {
        return Board;
      })
      .catch((error) => {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async findAllBoard(page: number) {
    const allBoards = await this.boardsRepository.findAll(page - 1);
    const getAllBoards = allBoards[0];
    const totalCountBoard = allBoards[1];
    return { getAllBoards, totalCountBoard };
  }

  async findOne(id: number) {
    return await this.boardsRepository.findOneBoard(id);
  }

  async update(id: number, uid: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOneBoard(id);
    if (uid !== board.uid)
      throw new ForbiddenException('유효하지 않은 유저입니다.');
    return await this.boardsRepository.updateBoard(id, updateBoardDto);
  }

  async remove(id: number) {
    return await this.boardsRepository.delete({ id: id });
  }
}
