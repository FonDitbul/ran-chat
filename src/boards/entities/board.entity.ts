import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  title: string;

  @Column()
  uid: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  content: string;

  @Column()
  comment: string;

  @Column()
  like: number;

  @Column()
  dislike: number;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
