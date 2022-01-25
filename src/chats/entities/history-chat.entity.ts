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
import { CommonEntity } from '../../common/entities/common.entity';

@Entity('chats')
export class chatEntity extends CommonEntity {
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

  @Column({})
  roomID: number;

  //--relations--
  @ManyToOne(() => UserEntity, (users) => users.chats, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'uid' })
  user: UserEntity;

  @ManyToOne(() => PublicChatEntity, (publicChat) => publicChat.chats, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'roomID' })
  room: PublicChatEntity;
}
