import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsNotEmpty()
  readonly board: string;

  @IsNotEmpty()
  readonly uid: number;

  readonly content: string;
}
