import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNotEmpty()
  readonly uid: number;

  @ApiProperty({
    example: 1,
    description: '게시판 아이디',
    required: true,
  })
  @IsNotEmpty()
  readonly boardID: number;

  @ApiProperty({
    description: '대댓글 root 댓글 ID',
  })
  readonly groupID: number;

  @ApiProperty({
    description: '답글 하는 댓글 ID',
  })
  readonly replyID: number;

  @ApiProperty({
    example: '예시 댓글 내용',
    description: '댓글 내용',
  })
  readonly content: string;

  // @IsNotEmpty()
  // readonly date;
}
