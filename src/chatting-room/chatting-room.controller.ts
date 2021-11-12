import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChattingRoomService } from './chatting-room.service';
import { CreateChattingRoomDto } from './dto/create-chatting-room.dto';
import { UpdateChattingRoomDto } from './dto/update-chatting-room.dto';

@Controller('chatting-room')
export class ChattingRoomController {
  constructor(private readonly chattingRoomService: ChattingRoomService) {}

  @Post()
  create(@Body() createChattingRoomDto: CreateChattingRoomDto) {
    return this.chattingRoomService.create(createChattingRoomDto);
  }

  @Get()
  findAll() {
    return this.chattingRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chattingRoomService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChattingRoomDto: UpdateChattingRoomDto,
  ) {
    return this.chattingRoomService.update(+id, updateChattingRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chattingRoomService.remove(+id);
  }
}
