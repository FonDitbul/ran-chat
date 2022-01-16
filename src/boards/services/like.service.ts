import { Injectable } from '@nestjs/common';
import { BoardsRepository } from '../boards.repository';

@Injectable()
export class LikeService {
  constructor(private readonly boardsRepository: BoardsRepository) {}
  async update(id: number, uid: number) {
    return await this.boardsRepository.updateBoardLike(id, uid);
  }
  async find(id: number) {
    return await this.boardsRepository.findLike(id);
  }
}
