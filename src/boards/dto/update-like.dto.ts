import { IsNotEmpty } from 'class-validator';

export class UpdateLikeDto {
  @IsNotEmpty()
  readonly boardID: number;

  readonly like: number;

  readonly dislike: number;
}
