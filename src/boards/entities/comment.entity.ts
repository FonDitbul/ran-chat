import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

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
