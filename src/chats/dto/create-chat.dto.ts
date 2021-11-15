import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  readonly text: string;

  // @IsNotEmpty()
  // readonly date;
}
