import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { breadsInterceptor } from './common/interceptors/breads.interceptor';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  @Render('index')
  homePage() {
    return { title: 'Random-Chatting' };
  }

  @Get('personal-chat')
  @UseInterceptors(breadsInterceptor)
  @Render('layouts/personalChat')
  personalChatPage() {
    return { title: '개인채팅' };
  }
}
