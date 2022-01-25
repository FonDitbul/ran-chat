import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BoardEntity } from './board.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity('comment')
export class CommentEntity extends CommonEntity {
  @ApiProperty({
    example: 1,
    description: 'comment id',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNotEmpty()
  @Column()
  uid: number;

  @ApiProperty({
    example: 1,
    description: '게시판 아이디',
    required: true,
  })
  @IsNotEmpty()
  @Column()
  boardID: number;

  @ApiProperty({
    description: '대댓글 root 댓글 ID',
  })
  @Column({ default: 0 })
  groupID: number; // group ID

  @ApiProperty({
    description: '답글 하는 댓글 ID',
  })
  @Column({ nullable: true })
  replyID: number | null; //대댓글 ID

  @ApiProperty({
    description: '답글 하는 댓글 유저 닉네임',
  })
  @Column({ nullable: true })
  replyUserName: string | null; //대댓글 ID

  @ApiProperty({
    example: '예시 댓글 내용',
    description: '댓글 내용',
  })
  @Column()
  content: string;

  //--relations--
  @ManyToOne(() => UserEntity, (users) => users.comments, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'uid' })
  user: UserEntity;

  @ManyToOne(() => BoardEntity, (boards) => boards.comments, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'boardID' })
  board: BoardEntity;
}
