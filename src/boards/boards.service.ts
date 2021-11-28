import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { BoardEntity as Board } from '../boards/entities/board.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}
  async create(createBoardDto: CreateBoardDto) {
    const newBoard = new Board();
    newBoard.title = createBoardDto.title;
    newBoard.uid = createBoardDto.uid;
    newBoard.category = createBoardDto.category;
    newBoard.content = 'test게시판';
    return await this.boardsRepository
      .save(newBoard)
      .then((board) => {
        return board;
      })
      .catch((error) => {
        return error;
      });
  }

  async findAll() {
    const getAllBoards = await getRepository(Board)
      .createQueryBuilder('Board')
      .getMany();
    return getAllBoards;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
