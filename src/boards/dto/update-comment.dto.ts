import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment.entity';

export class UpdateCommentDto extends PickType(CommentEntity, [
  'id',
  'uid',
  'boardID',
  'rootID',
  'replyID',
  'content',
] as const) {}
