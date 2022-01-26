import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { breadsInterceptor } from '../common/interceptors/breads.interceptor';

@ApiTags('채팅')
@Controller('chat')
export class ChatsController {}
