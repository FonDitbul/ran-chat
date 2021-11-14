import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chats.repository';
import { getRepository } from 'typeorm';
import { chatEntity as Chat } from './entities/history-chat.entity';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepositry: ChatRepository) {}
  async findChatHistory() {
    const getHistory = getRepository(Chat).createQueryBuilder('chat').getMany();
    return await getHistory;
  }
}
