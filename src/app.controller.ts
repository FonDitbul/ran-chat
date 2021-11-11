import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  homePage() {
    return { title: 'Random-Chatting' };
  }

  @Get('chat')
  @Render('layouts/chat')
  chattingPage() {
    return { title: '??' };
  }

  @Get('chattingRoom')
  @Render('layouts/chattingRoom')
  friendPage() {
    return { title: '??' };
  }

  @Get('board')
  @Render('layouts/board')
  boardPage() {
    return { title: '??' };
  }

  @Get('login')
  @Render('layouts/login')
  loginPage() {
    return { title: '??' };
  }
}
