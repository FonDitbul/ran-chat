import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { getRepository } from 'typeorm';
import { CommentEntity as Comment } from '../entities/comment.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
  async findAll(boardID: number) {
    const getAllComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.boardID = :boardID', { boardID })
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('comment.uid = user.id')
          .limit(1);
      }, 'user_userName')
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
    const { id, boardID, uid, content } = updateCommentDto;

    const updateComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .update('comment')
      .set({ content: content })
      .andWhere('comment.id = :id', { id })
      .andWhere('comment.boardID = :boardID', { boardID });
    return updateComment;
  }

  async remove(id: number) {
    const removedData = await this.commentRepository.delete({ id: id });
    return 'remove';
  }
}
