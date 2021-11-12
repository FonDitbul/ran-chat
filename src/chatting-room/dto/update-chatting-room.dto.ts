import { PartialType } from '@nestjs/mapped-types';
import { CreateChattingRoomDto } from './create-chatting-room.dto';

export class UpdateChattingRoomDto extends PartialType(CreateChattingRoomDto) {}
