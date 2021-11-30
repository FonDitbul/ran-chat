import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicChatEntity } from '../../public-chat/entities/public-chat.entity';
import { BoardEntity } from '../../boards/entities/board.entity';
import { chatEntity } from '../../chats/entities/history-chat.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  userName: string;

  // @Column({ unique: true })
  // email: string;

  @Column()
  password: string;

  @OneToMany((type) => PublicChatEntity, (publicChat) => publicChat.user)
  publicChat: PublicChatEntity[];

  @OneToMany((type) => BoardEntity, (board) => board.user)
  board: BoardEntity[];

  // @OneToMany((type) => PublicChatEntity, (publicChat) => publicChat.user)
  // chat: chatEntity[];

  // @Column({ default: '' })
  // imageLink: string;
}
