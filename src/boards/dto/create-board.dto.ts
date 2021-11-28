import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  readonly title: string;

  readonly category: number;

  @IsNotEmpty()
  readonly uid: number;

  readonly content: string;

  // @IsNotEmpty()
  // readonly date;
}
