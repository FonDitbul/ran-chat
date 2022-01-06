import { PickType } from '@nestjs/swagger';
import { BoardEntity, category } from '../entities/board.entity';

export class CreateBoardDto extends PickType(BoardEntity, [
  'title',
  'category',
  'uid',
  'content',
] as const) {}
