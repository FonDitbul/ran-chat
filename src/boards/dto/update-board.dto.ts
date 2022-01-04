import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({
    example: 1,
    description: '업데이트 게시판 ID, createBoarDto 참조',
    required: true,
  })
  @IsNotEmpty()
  readonly boardID: number;
}
