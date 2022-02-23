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
  UseInterceptors,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { PublicChatService } from './public-chat.service';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { breadsInterceptor } from '../common/interceptors/breads.interceptor';
import { ParsePagePipe } from '../common/pipes/parse-page.pipe';

@ApiTags('공개 채팅방')
@Controller('public-chat')
export class PublicChatController {
  constructor(private readonly publicChatService: PublicChatService) {}

  @ApiOperation({
    summary: '공개 채팅방 전체 불러오기',
    description: '공개 채팅방 전체 불러오기 페이지 Render',
  })
  @Get()
  @UseInterceptors(breadsInterceptor)
  @Render('layouts/publicChat')
  async publicChatPage(
    @Query('page', new DefaultValuePipe(1), ParsePagePipe) page: number,
  ) {
    const { roomList, totalCountPublicChat } =
      await this.publicChatService.findAll(page);
    return {
      data: roomList,
      page: { curPage: page, totalCountPublicChat },
    };
  }

  @ApiOperation({
    summary: '한 공개 채팅방 불러오기',
    description: '공개 채팅방, 채팅내역 불러오기',
  })
  @Get('chatting/:id')
  @UseInterceptors(breadsInterceptor)
  @Render('template/publicChattingRoom')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const { publicChat_title } = await this.publicChatService.findOne(id);
    const chatHistory = await this.publicChatService.findChatHistory(id);
    return {
      breadsOne: { name: publicChat_title, url: 'public-chat/chatting' + id },
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
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
  ) {
    return this.publicChatService.remove(id, uid);
  }
}
