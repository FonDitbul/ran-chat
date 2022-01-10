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
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum category {
  NOTICE = '공지사항',
  BOARD = '게시판',
}

@Entity('board')
export class BoardEntity {
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

  @ManyToOne(() => UserEntity, (users) => users.board)
  @JoinColumn({ name: 'uid' })
  user: UserEntity;

  @ApiProperty({ example: '테스트 게시판', description: '게시판 내용' })
  @Column()
  content: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  userLikes: UserEntity[];

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
