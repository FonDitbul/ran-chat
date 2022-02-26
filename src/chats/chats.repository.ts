import { EntityRepository, getRepository, Repository } from 'typeorm';
import { chatEntity as Chat, chatEntity } from './entities/history-chat.entity';

@EntityRepository(chatEntity)
export class ChatRepository extends Repository<chatEntity> {
  constructor() {
    super();
    this.showLimitChat = 10;
  }
  private showLimitChat: number;
  // async findChatHistory() {
  //   const getHistory = this.createQueryBuilder('chat').getMany();
  //   return await getHistory;
  // }
  async findChatHistory(roomID: number) {
    const getChatting = await this.createQueryBuilder('chats')
      .where('chats.roomID = :roomID', { roomID })
      .orderBy('chats.createdAt', 'DESC')
      .limit(this.showLimitChat)
      .getMany();
    return getChatting;
  }

  async findOffsetHistory(roomID: number, offset: number) {
    const getChatting = await this.createQueryBuilder('chats')
      .where('chats.roomID = :roomID', { roomID })
      .offset(offset * this.showLimitChat)
      .orderBy('chats.createdAt', 'DESC')
      .limit(this.showLimitChat)
      .getMany();
    return getChatting;
  }

  // async findCursorHistory(roomID: number, offset: number) {
  //   const getChatting = await this.createQueryBuilder('chats')
  //     .where('chats.roomID = :roomID', { roomID })
  //     .andWhere()
  //     .offset(offset * this.showLimitChat)
  //     .orderBy('chats.createdAt', 'DESC')
  //     .limit(this.showLimitChat)
  //     .getMany();
  // }
}
