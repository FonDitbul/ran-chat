import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  getHello() {
    return { title: 'Random-Chatting' };
  }

  @Get('chat')
  @Render('layouts/chat')
  getChat() {
    return { title: '??' };
  }
}
