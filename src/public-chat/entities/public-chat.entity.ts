import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
