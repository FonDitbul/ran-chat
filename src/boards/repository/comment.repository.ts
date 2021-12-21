import {
  createConnection,
  EntityRepository,
  getConnectionOptions,
  Repository,
} from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { MyCustomLogger } from '../../common/typeorm/MyCustomLogger';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}

getConnectionOptions().then((connectionOptions) => {
  return createConnection(
    Object.assign(connectionOptions, {
      logger: new MyCustomLogger(),
    }),
  );
});
