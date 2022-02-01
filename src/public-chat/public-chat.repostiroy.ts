import { EntityRepository, Repository } from 'typeorm';
import { PublicChatEntity } from './entities/public-chat.entity';
@EntityRepository(PublicChatEntity)
export class PublicChatRepository extends Repository<PublicChatEntity> {
  async findAll(page: number) {
    const SHOW_LIMIT_CHAT_ROOM = 15;
    const getAllChat = await this.createQueryBuilder('publicChat')
      .innerJoinAndSelect('publicChat.user', 'user', 'publicChat.uid = user.id')
      .orderBy('publicChat.id', 'DESC')
      .offset(page * SHOW_LIMIT_CHAT_ROOM)
      .limit(SHOW_LIMIT_CHAT_ROOM)
      .getManyAndCount();
    return getAllChat;
  }
  async findOnePublicchat(id: number) {
    const getOneChat = await this.createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getRawOne();
    return getOneChat;
  }
}
