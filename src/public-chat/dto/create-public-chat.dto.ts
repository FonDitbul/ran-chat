import { IsNotEmpty } from 'class-validator';
export class CreatePublicChatDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly text: string;

  // @IsNotEmpty()
  // readonly date;
}
