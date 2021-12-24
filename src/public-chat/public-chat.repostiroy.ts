import { EntityRepository, getRepository, Repository } from 'typeorm';
import {
  PublicChatEntity as PublicChat,
  PublicChatEntity,
} from './entities/public-chat.entity';
import { UserEntity } from '../users/entities/user.entity';
import { chatEntity as Chat } from '../chats/entities/history-chat.entity';

@EntityRepository(PublicChatEntity)
export class PublicChatRepository extends Repository<PublicChatEntity> {
  async findAll() {
    const getAllChat = await getRepository(PublicChat)
      .createQueryBuilder('publicChat')
      // .leftJoin('publicChat', 'user', 'publicChat.uid = user.id')
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('publicChat.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .getRawMany();
    return getAllChat;
  }
  async findOnePublicchat(id: number) {
    const getOneChat = getRepository(PublicChat)
      .createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getRawOne();
    return getOneChat;
  }
  async findChatHistory(roomID: number) {
    const getChatting = getRepository(Chat)
      .createQueryBuilder('chats')
      .where('chats.roomID = :roomID', { roomID })
      .getMany();
    return await getChatting;
  }
}
