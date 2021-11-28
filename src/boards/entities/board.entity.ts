import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  comment: number;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
