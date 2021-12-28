import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
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
