import { Controller, Get, Render } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('랜덤 채팅')
@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({
    summary: '랜덤 채팅방 불러오기',
    description: '랜덤 채팅방 Rendering',
  })
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
