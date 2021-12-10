import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { getRepository } from 'typeorm';
import { CommentEntity as Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
  async findAll(boardID: number) {
    const getAllComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.boardID = :boardID', { boardID })
      .getRawMany();
    return getAllComment;
  }
  async findOne(boardID: number, id: number) {
    const getAllComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .andWhere('comment.id = :id', { id })
      .andWhere('comment.boardID = :boardID', { boardID })
      .getRawMany();
    return getAllComment;
  }
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository
      .save(createCommentDto)
      .then(async (Comment) => {
        return Comment;
      })
      .catch((error) => {
        return error;
      });
  }

  async update(updateCommentDto: UpdateCommentDto) {
    return `update Comment `;
  }
  async remove() {
    return 'remove';
  }
}
