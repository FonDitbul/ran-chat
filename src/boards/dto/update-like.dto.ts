import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLikeDto {
  @ApiProperty({
    description: '게시판 아이디',
    required: true,
  })
  @IsNotEmpty()
  readonly boardID: number;

  @ApiProperty({
    example: 1,
    description: '게시판 좋아요!',
    required: true,
  })
  @IsNotEmpty()
  readonly like: number;

  // @ApiProperty({
  //   example: 1,
  //   description: '싫어요!',
  //   required: true,
  // })
  // readonly dislike: number;
}
