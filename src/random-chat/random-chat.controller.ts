import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { breadsInterceptor } from '../common/interceptors/breads.interceptor';

@ApiTags('랜덤 채팅')
@Controller('random-chat')
export class RandomChatController {
  constructor() {}

  @ApiOperation({
    summary: '랜덤 채팅방 불러오기',
    description: '랜덤 채팅방 Rendering',
  })
  @Get()
  @UseInterceptors(breadsInterceptor)
  @Render('layouts/randomChat')
  chattingPage() {
    return {};
  }

  // @Get(':id')
  // async getChatHistory() {
  //   const chatHistory = await this.chatsService.findChatHistory();
  //   return chatHistory;
  // }
}
