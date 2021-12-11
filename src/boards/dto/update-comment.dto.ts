import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly boardID: number;

  @IsNotEmpty()
  readonly uid: number;

  readonly content: string;
}
