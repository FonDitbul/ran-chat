import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: '해당 댓글 ID, CreateCommentDto 참조',
    required: true,
  })
  @IsNotEmpty()
  readonly id: number;
}
