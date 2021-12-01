import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateLikeDto {
  readonly like: number;

  readonly dislike: number;
}
