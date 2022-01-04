import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum category {
  NOTICE = '공지사항',
  BOARD = '게시판',
}

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  title: string;

  @Column({ type: 'enum', enum: category, default: category.BOARD })
  category: category;

  @Column()
  uid: number;

  @CreateDateColumn()
  readonly createdAt: Date;

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

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
