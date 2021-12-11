import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  readonly boardID: number;

  @IsNotEmpty()
  readonly uid: number;

  readonly content: string;

  // @IsNotEmpty()
  // readonly date;
}
