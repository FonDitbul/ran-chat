import { Controller, Get, Render } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  @Get()
  @Render('layouts/chat')
  chattingPage() {
    return { title: '채팅창' };
  }

  @Get(':id')
  async getChatHistory() {
    const chatHistory = await this.chatsService.findChatHistory();
    console.log(chatHistory);
    return chatHistory;
  }
}
