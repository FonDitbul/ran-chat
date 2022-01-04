import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePublicChatDto {
  @ApiProperty({
    example: '채팅하실',
    description: '공개 채팅방 생성',
    required: true,
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNotEmpty()
  readonly uid: number;

  // @IsNotEmpty()
  // readonly date;
}
