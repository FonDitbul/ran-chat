import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepositry: ChatRepository) {}
  // async findChatHistory() {
  //   return this.chatsRepositry.findChatHistory();
  // }
}
