import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chats')
export class chatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  userName: string;

  @Column()
  text: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;

  @Column({ default: 1 })
  roomID: number;
}
