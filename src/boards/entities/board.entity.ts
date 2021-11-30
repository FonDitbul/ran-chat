import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  title: string;

  @Column()
  category: number;

  @ManyToOne((type) => UserEntity, (user) => user.board)
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  content: string;

  @Column({ default: 0 })
  comment: number;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
