import { Injectable } from '@nestjs/common';
import { BoardsRepository } from '../boards.repository';
import { UpdateLikeDto } from '../dto/update-like.dto';
import { getRepository } from 'typeorm';
import { BoardEntity as Board } from '../entities/board.entity';

@Injectable()
export class LikeService {
  constructor(private readonly boardsRepository: BoardsRepository) {}
  async updateLike(id: number, updateLikeDto: UpdateLikeDto) {
    let { like, dislike } = updateLikeDto;
    const updateOneBoard = await getRepository(Board)
      .createQueryBuilder()
      .update('board')
      .set({ like: ++like, dislike: ++dislike })
      .where('board.id = :id', { id })
      .execute();
  }
}
