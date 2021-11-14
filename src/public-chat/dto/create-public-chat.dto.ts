import { IsNotEmpty } from 'class-validator';
export class CreatePublicChatDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly uid: number;

  // @IsNotEmpty()
  // readonly date;
}
