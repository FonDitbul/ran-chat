import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommentEntity } from './comment.entity';
import { CommonEntity } from '../../common/entities/common.entity';

export enum category {
  NOTICE = '공지사항',
  BOARD = '게시판',
}

@Entity('board')
export class BoardEntity extends CommonEntity {
  @ApiProperty({
    example: '게시판 ID',
    description: '게시판 ID',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '게시판 제목',
    description: '게시판 제목',
    required: true,
  })
  @IsNotEmpty()
  @Column({ length: 32 })
  title: string;

  @ApiProperty({
    enum: ['공지사항', '게시판'],
    required: false,
  })
  @Column({ type: 'enum', enum: category, default: category.BOARD })
  category: category;

  @ApiProperty({ example: 1, description: '유저아이디', required: true })
  @IsNotEmpty()
  @Column()
  uid: number;

  @ApiProperty({ example: '테스트 게시판', description: '게시판 내용' })
  @Column()
  content: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  views: number;

  //--relations--
  @ManyToOne(() => UserEntity, (users) => users.writeBoards)
  @JoinColumn({ name: 'uid' })
  user: UserEntity;

  @ManyToMany(() => UserEntity, (users) => users.likeBoards)
  userLikes: UserEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.board)
  comments: CommentEntity[];
}
