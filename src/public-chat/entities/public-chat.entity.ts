import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { chatEntity } from '../../chats/entities/history-chat.entity';

@Entity('publicChat')
export class PublicChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'title', length: 32 })
  title: string;

  @ApiProperty({ example: 1, description: '유저아이디', required: true })
  @IsNotEmpty()
  @Column('int', { name: 'uid' })
  uid: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  //--relations--
  @ManyToOne(() => UserEntity, (users) => users.publicChat)
  @JoinColumn({ name: 'uid' })
  user: UserEntity;

  @OneToMany(() => chatEntity, (chats) => chats.room)
  chats: chatEntity[];
}
