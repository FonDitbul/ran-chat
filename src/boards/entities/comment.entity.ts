import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: number;

  @Column()
  content: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
