import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly text: string;

  // @IsNotEmpty()
  // readonly date;
}
