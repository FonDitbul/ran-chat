import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  // @IsNotEmpty()
  readonly title: string;

  // @IsNotEmpty()
  // readonly uid: number;

  readonly content: string;

  // @IsNotEmpty()
  // readonly date;
}
