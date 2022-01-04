import { Controller, Get, Render } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('채팅창')
@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  @Get()
  @Render('layouts/chat')
  chattingPage() {
    return { title: '채팅창', breads: [{ name: '랜덤 채팅' }] };
  }

  @Get(':id')
  async getChatHistory() {
    const chatHistory = await this.chatsService.findChatHistory();
    return chatHistory;
  }
}
