import { EntityRepository, Repository } from 'typeorm';
import { PublicChatEntity } from './entities/public-chat.entity';

@EntityRepository(PublicChatEntity)
export class PublicChatRepository extends Repository<PublicChatEntity> {}
