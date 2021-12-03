import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNotEmpty()
  readonly board: string;

  @IsNotEmpty()
  readonly uid: number;

  readonly content: string;
}
