import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';
import { PublicChatEntity } from '../../public-chat/entities/public-chat.entity';

@Entity('chats')
export class chatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: '유저아이디', required: true })
  @IsNotEmpty()
  @Column()
  uid: number;

  @Column({}) // TODO : 삭제
  userName: string;

  @Column()
  text: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;

  @Column({})
  roomID: number;

  //--relations--
  @ManyToOne(() => UserEntity, (users) => users.chats)
  @JoinColumn({ name: 'uid' })
  user: UserEntity;

  @ManyToOne(() => PublicChatEntity, (publicChat) => publicChat.chats)
  @JoinColumn({ name: 'roomID' })
  room: PublicChatEntity;
}
