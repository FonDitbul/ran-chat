import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  readonly board: string;

  @IsNotEmpty()
  readonly uid: number;

  readonly content: string;

  // @IsNotEmpty()
  // readonly date;
}
