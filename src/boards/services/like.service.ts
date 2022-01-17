import { Injectable } from '@nestjs/common';
import { BoardsRepository } from '../boards.repository';
import { UserRepository } from '../../users/users.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private userRepository: UserRepository,
  ) {}
  async find(id: number) {
    const boardsLike = await this.boardsRepository.findLike(id);
    return boardsLike;
  }

  async add(id: number, uid: number) {
    const board = await this.boardsRepository.findLike(id);
    const user = await this.userRepository.findOne(uid);
    board.userLikes.push(user);
    return this.boardsRepository.save(board);
  }

  async delete(id: number, uid: number) {
    const board = await this.boardsRepository.findLike(id);
    board.userLikes = board.userLikes.filter((likeUsers) => {
      return likeUsers.id !== uid;
    });
    return this.boardsRepository.save(board);
  }
}
