import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('publicChat')
export class PublicChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  title: string;

  @Column()
  uid: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
