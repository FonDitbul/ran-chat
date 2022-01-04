import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { category } from '../entities/board.entity';

export class CreateBoardDto {
  @ApiProperty({
    example: '게시판 제목',
    description: '게시판 제목',
    required: true,
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    enum: ['공지사항', '게시판'],
    required: false,
  })
  readonly category: category;

  @ApiProperty({ example: 1, description: '유저아이디', required: true })
  @IsNotEmpty()
  readonly uid: number;

  @ApiProperty({ example: '테스트 게시판', description: '게시판 내용' })
  readonly content: string;
}
