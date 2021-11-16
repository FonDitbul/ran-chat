import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly userName: string;

  // @IsNotEmpty() // 나중에 추가
  // readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
