import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  readonly uid: number;

  @IsNotEmpty()
  readonly boardID: number;

  readonly groupID: number;

  readonly replyID: number;

  readonly content: string;

  // @IsNotEmpty()
  // readonly date;
}
