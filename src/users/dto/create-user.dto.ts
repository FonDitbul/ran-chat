import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends PickType(UserEntity, [
  'userName',
  'password',
] as const) {
  @ApiProperty({
    example: '1q2w3e4r',
    description: '비밀번호 확인',
    required: true,
  })
  @IsNotEmpty()
  passwordConfirm: string;
}
