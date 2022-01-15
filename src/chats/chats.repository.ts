import { EntityRepository, getRepository, Repository } from 'typeorm';
import { chatEntity as Chat, chatEntity } from './entities/history-chat.entity';

@EntityRepository(chatEntity)
export class ChatRepository extends Repository<chatEntity> {
  async findChatHistory() {
    const getHistory = this.createQueryBuilder('chat').getMany();
    return await getHistory;
  }
}
