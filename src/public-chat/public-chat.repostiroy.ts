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
    const getAllChat = await this.createQueryBuilder('publicChat')
      .innerJoinAndSelect('publicChat.user', 'user', 'publicChat.uid = user.id')
      .getRawMany();
    return getAllChat;
  }
  async findOnePublicchat(id: number) {
    const getOneChat = await this.createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getRawOne();
    return getOneChat;
  }
  async findChatHistory(roomID: number) {
    const getChatting = await this.createQueryBuilder('chats')
      .where('chats.roomID = :roomID', { roomID })
      .getMany();
    return await getChatting;
  }
}
