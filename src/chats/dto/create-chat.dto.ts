import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateChatDto {
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  readonly text: string;

  // @IsNotEmpty()
  // readonly date;

  readonly roomID: number;
}
