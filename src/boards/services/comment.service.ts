import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async findAll(boardID: number) {
    const getAllComment = await this.commentRepository.findAllComment(boardID);
    for (const reply of getAllComment) {
      reply['comment_reply'] = await this.findReplyComment(reply.comment_id);
    }
    return getAllComment;
  }

  async findOne(boardID: number, id: number) {
    return this.commentRepository.findOneComment(boardID, id);
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
    return await this.commentRepository.updateComment(updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepository.delete({ id: id });
  }
  async findReplyComment(groupID: number) {
    return await this.commentRepository.findReplyComment(groupID);
  }
}
