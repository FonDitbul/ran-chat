import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '개똥이',
    description: '유저 이름',
    required: true,
  })
  @IsNotEmpty()
  readonly userName: string;

  // @IsNotEmpty() // 나중에 추가
  // readonly email: string;

  @ApiProperty({
    example: '1q2w3e4r',
    description: '유저 비밀번호',
    required: true,
  })
  @IsNotEmpty()
  readonly password: string;
}
