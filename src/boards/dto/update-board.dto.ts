import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board.entity';

export class UpdateBoardDto extends PickType(BoardEntity, [
  'id',
  'title',
  'category',
  'content',
] as const) {}
