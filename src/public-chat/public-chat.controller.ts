import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
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
    // this.publicChatService.findAll();
    const roomList = await this.publicChatService.findAll();
    return {
      data: roomList,
    };
  }

  @Post()
  create(@Body() createPublicChatDto: CreatePublicChatDto) {
    return this.publicChatService.create(createPublicChatDto);
  }

  @Get('chatting/:id')
  @Render('template/chatting')
  async findOne(@Param('id') id: string) {
    const { publicChat_title, publicChat_uid, publicChat_createdAt } =
      await this.publicChatService.findOne(+id);
    const chatHistory = await this.publicChatService.findChatHistory(+id);
    return { roomID: id, roomTitle: publicChat_title, chatHistory };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicChatDto: UpdatePublicChatDto,
  ) {
    return this.publicChatService.update(+id, updatePublicChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicChatService.remove(+id);
  }
}
