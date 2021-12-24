import { Injectable } from '@nestjs/common';
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
        return error;
      });
  }

  async findAll(page: number) {
    const getAllBoards = await this.boardsRepository.findAll(page);
    //임시 board pagination
    //getManyAndCount 로 변경
    const countBoard = await this.boardsRepository.count({});
    const curPage = page + 1;
    const startPage = parseInt(String(curPage / 10 - 1)) + 1;
    const endPage =
      parseInt(String(countBoard / 10)) * 10 < countBoard
        ? parseInt(String(countBoard % 10)) * 10
        : countBoard;
    const pageArr = [];
    for (let i = startPage; i <= 10; i++) {
      pageArr.push(i);
    }
    return { getAllBoards, countBoard, pageArr };
  }

  async findOne(id: number) {
    return await this.boardsRepository.findOneBoard(id);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.boardsRepository.updateBoard(id, updateBoardDto);
  }

  async remove(id: number) {
    return await this.boardsRepository.delete({ id: id });
  }
}
