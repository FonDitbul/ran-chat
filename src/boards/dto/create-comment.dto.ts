import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment.entity';

export class CreateCommentDto extends PickType(CommentEntity, [
  'uid',
  'boardID',
  'rootID',
  'replyID',
  'replyUserName',
  'content',
] as const) {}
