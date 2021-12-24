import {
  createConnection,
  EntityRepository,
  getConnectionOptions,
  getRepository,
  Repository,
} from 'typeorm';
import {
  CommentEntity as Comment,
  CommentEntity,
} from '../entities/comment.entity';
import { MyCustomLogger } from '../../common/typeorm/MyCustomLogger';
import { UserEntity } from '../../users/entities/user.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findAllComment(boardID: number) {
    const getAllComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('comment.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .andWhere('comment.boardID = :boardID', { boardID })
      .andWhere('comment.groupID = 0')
      .getRawMany();
    return getAllComment;
  }

  async findOneComment(boardID: number, id: number) {
    const getOneComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .andWhere('comment.id = :id', { id })
      .andWhere('comment.boardID = :boardID', { boardID })
      .getRawMany();
    return getOneComment;
  }
  async updateComment(updateCommentDto: UpdateCommentDto) {
    const { id, boardID, content } = updateCommentDto;

    const updateComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .update('comment')
      .set({ content: content })
      .andWhere('comment.id = :id', { id })
      .andWhere('comment.boardID = :boardID', { boardID });
    return updateComment;
  }
  async findReplyComment(groupID: number) {
    const replyComment = await getRepository(Comment)
      .createQueryBuilder('comment')
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('comment.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .andWhere('comment.groupID = :groupID', { groupID })
      .getRawMany();
    return replyComment;
  }
}

getConnectionOptions().then((connectionOptions) => {
  return createConnection(
    Object.assign(connectionOptions, {
      logger: new MyCustomLogger(),
    }),
  );
});
