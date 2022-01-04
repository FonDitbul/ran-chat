import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicChatDto } from './create-public-chat.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePublicChatDto extends PartialType(CreatePublicChatDto) {
  @ApiProperty({
    description: '공개 채팅방 ID, CreatePublicChatDto 참조',
    required: true,
  })
  @IsNotEmpty()
  readonly id: number;
}
