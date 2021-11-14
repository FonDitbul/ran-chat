import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  @Render('index')
  homePage() {
    return { title: 'Random-Chatting' };
  }

  @Get('personalChat')
  @Render('layouts/personalChat')
  personalChatPage() {
    return { title: '??' };
  }

  @Get('chatting')
  @Render('template/chatting')
  testChatPage() {
    return { title: '??' };
  }
}
