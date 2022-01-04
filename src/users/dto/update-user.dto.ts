import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 1,
    description: '유저 ID, CreateUserDto 참조',
    required: true,
  })
  @IsNotEmpty()
  readonly id: number;
}
