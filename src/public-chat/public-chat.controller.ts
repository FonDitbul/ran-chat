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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('공개 채팅방')
@Controller('public-chat')
export class PublicChatController {
  constructor(private readonly publicChatService: PublicChatService) {}

  @ApiOperation({
    summary: '공개 채팅방 전체 불러오기',
    description: '공개 채팅방 전체 불러오기 페이지 Render',
  })
  @Get()
  @Render('layouts/publicChat')
  async publicChatPage() {
    const roomList = await this.publicChatService.findAll();
    return {
      breads: [{ name: '공개 채팅방' }],
      data: roomList,
    };
  }

  @ApiOperation({
    summary: '한 공개 채팅방 불러오기',
    description: '공개 채팅방, 채팅내역 불러오기',
  })
  @Get('chatting/:id')
  @Render('template/publicChattingRoom')
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

  @ApiOperation({
    summary: '공개 채팅방 생성',
    description: '공개 채팅방 생성하기',
  })
  @Post()
  create(@Body() createPublicChatDto: CreatePublicChatDto) {
    return this.publicChatService.create(createPublicChatDto);
  }

  @ApiOperation({
    summary: '공개 채팅방 업데이트',
    description: '공개 채팅방 업데이트 하기',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicChatDto: UpdatePublicChatDto,
  ) {
    return this.publicChatService.update(id, updatePublicChatDto);
  }

  @ApiOperation({
    summary: '공개 채팅방 삭제',
    description: '공개 채팅방 삭제 하기',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicChatService.remove(id);
  }
}
