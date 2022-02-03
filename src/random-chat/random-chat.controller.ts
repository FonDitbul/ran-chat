import { Controller, Get, Post, Render, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { breadsInterceptor } from '../common/interceptors/breads.interceptor';
import { RandomChatService } from './random-chat.service';

@ApiTags('랜덤 채팅')
@Controller('random-chat')
export class RandomChatController {
  constructor(readonly randomChatService: RandomChatService) {}

  @ApiOperation({
    summary: '랜덤 채팅방',
    description: '랜덤 채팅방 Rendering',
  })
  @Get()
  @UseInterceptors(breadsInterceptor)
  @Render('layouts/randomChat')
  chattingPage() {
    return {};
  }
}
