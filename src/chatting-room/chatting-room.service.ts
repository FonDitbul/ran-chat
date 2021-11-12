import { Injectable } from '@nestjs/common';
import { CreateChattingRoomDto } from './dto/create-chatting-room.dto';
import { UpdateChattingRoomDto } from './dto/update-chatting-room.dto';

@Injectable()
export class ChattingRoomService {
  create(createChattingRoomDto: CreateChattingRoomDto) {
    return 'This action adds a new chattingRoom';
  }

  findAll() {
    return `This action returns all chattingRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chattingRoom`;
  }

  update(id: number, updateChattingRoomDto: UpdateChattingRoomDto) {
    return `This action updates a #${id} chattingRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chattingRoom`;
  }
}
