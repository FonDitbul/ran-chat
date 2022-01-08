import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto extends PickType(UserEntity, [
  'id',
  'userName',
  'password',
] as const) {}
