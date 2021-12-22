import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CategoryEntity } from './category.entity';
import { CommentEntity } from './comment.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  title: string;

  @Column()
  category: number;

  @Column()
  uid: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  content: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  views: number;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
