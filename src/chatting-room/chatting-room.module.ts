import { Module } from '@nestjs/common';
import { ChattingRoomService } from './chatting-room.service';
import { ChattingRoomController } from './chatting-room.controller';

@Module({
  controllers: [ChattingRoomController],
  providers: [ChattingRoomService],
})
export class ChattingRoomModule {}
