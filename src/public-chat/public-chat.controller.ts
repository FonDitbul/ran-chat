import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  ParseIntPipe,
} from '@nestjs/common';
import { PublicChatService } from './public-chat.service';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';

@Controller('public-chat')
export class PublicChatController {
  constructor(private readonly publicChatService: PublicChatService) {}

  @Get()
  @Render('layouts/publicChat')
  async publicChatPage() {
    const roomList = await this.publicChatService.findAll();
    return {
      breads: [{ name: '공개 채팅방' }],
      data: roomList,
    };
  }

  @Get('chatting/:id')
  @Render('template/publicChatting')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const { publicChat_title } = await this.publicChatService.findOne(id);
    const chatHistory = await this.publicChatService.findChatHistory(id);
    return {
      breads: [{ name: '공개 채팅방' }, { name: publicChat_title }],
      roomID: id,
      roomTitle: publicChat_title,
      chatHistory,
    };
  }

  @Post()
  create(@Body() createPublicChatDto: CreatePublicChatDto) {
    return this.publicChatService.create(createPublicChatDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicChatDto: UpdatePublicChatDto,
  ) {
    return this.publicChatService.update(id, updatePublicChatDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicChatService.remove(id);
  }
}
