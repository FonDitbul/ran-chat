import { IsNotEmpty } from 'class-validator';
export class publicChatDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly title: string;

  // @IsNotEmpty()
  // readonly date;
}
