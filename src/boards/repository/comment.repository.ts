import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { MyCustomLogger } from '../../common/typeorm/my-custom-logger';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findAllComment(boardID: number) {
    const getAllComment = await this.createQueryBuilder('comment')
      .innerJoinAndSelect('comment.user', 'user', 'comment.uid = user.id')
      .andWhere('comment.boardID = :boardID', { boardID })
      .andWhere('comment.groupID = 0')
      .getMany();
    return getAllComment;
  }

  async findOneComment(boardID: number, id: number) {
    const getOneComment = await this.createQueryBuilder('comment')
      .andWhere('comment.id = :id', { id })
      .andWhere('comment.boardID = :boardID', { boardID })
      .getMany();
    return getOneComment;
  }
  async updateComment(updateCommentDto: UpdateCommentDto) {
    const { id, boardID, content } = updateCommentDto;

    const updateComment = await this.createQueryBuilder('comment')
      .update('comment')
      .set({ content: content })
      .andWhere('comment.id = :id', { id })
      .andWhere('comment.boardID = :boardID', { boardID });
    return updateComment;
  }
  async findReplyComment(groupID: number) {
    const replyComment = this.createQueryBuilder('comment')
      .innerJoinAndSelect('comment.user', 'user', 'comment.uid = user.id')
      .andWhere('comment.groupID = :groupID', { groupID })
      .getMany();
    return replyComment;
  }
}

// getConnectionOptions().then((connectionOptions) => {
//   return createConnection(
//     Object.assign(connectionOptions, {
//       logger: new MyCustomLogger(),
//     }),
//   );
// });
