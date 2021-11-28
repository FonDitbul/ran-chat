import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { BoardEntity as Board } from '../boards/entities/board.entity';
import { getRepository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly usersService: UsersService,
  ) {}
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
    for (const board of getAllBoards) {
      board['userName'] = await this.usersService.findOneByUserID(board.uid);
    }
    return getAllBoards;
  }

  async findOne(id: number) {
    const getOneBoard = await getRepository(Board)
      .createQueryBuilder('Board')
      .where('Board.id = :id', { id })
      .getOne();
    return getOneBoard;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
