import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chats.repository';
import { getRepository } from 'typeorm';
import { chatEntity as Chat } from './entities/history-chat.entity';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepositry: ChatRepository) {}
  async findChatHistory() {
    return this.chatsRepositry.findChatHistory();
  }
}
