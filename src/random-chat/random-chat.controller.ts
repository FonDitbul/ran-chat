import { Controller, Get, Post, Render, UseInterceptors } from '@nestjs/common';
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

  @Post('match')
  async matchRandomUser() {
    return '랜덤 유저 매칭 요청';
  }

  @Get('match')
  async connectRandomUser() {
    return '랜덤유저 연결 성공';
  }
}
