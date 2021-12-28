import { Injectable } from '@nestjs/common';
import { BoardsRepository } from '../boards.repository';

@Injectable()
export class LikeService {
  constructor(private readonly boardsRepository: BoardsRepository) {}
  // async update(updateLikeDto: UpdateLikeDto) {
  //   const { boardID, like, dislike } = updateLikeDto;
  //   const updateOneBoard = await getRepository(Board)
  //     .createQueryBuilder()
  //     .update('board')
  //     .set({ like: like, dislike: dislike })
  //     .where('board.id = :boardID', { boardID })
  //     .execute();
  //   return updateOneBoard;
  // }

  async update(id: number, uid: number) {
    return await this.boardsRepository.updateBoardLike(id, uid);
  }
  async find(id: number) {
    return await this.boardsRepository.findLike(id);
  }
}
