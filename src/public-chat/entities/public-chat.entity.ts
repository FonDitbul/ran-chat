import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class PublicChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column()
  title: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
}
