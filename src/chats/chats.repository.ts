import { EntityRepository, Repository } from 'typeorm';
import { chatEntity } from './entities/history-chat.entity';

@EntityRepository(chatEntity)
export class ChatRepository extends Repository<chatEntity> {}
