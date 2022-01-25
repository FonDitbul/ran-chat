import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BoardEntity } from '../../boards/entities/board.entity';
import { PublicChatEntity } from '../../public-chat/entities/public-chat.entity';
import { chatEntity } from '../../chats/entities/history-chat.entity';
import { CommentEntity } from '../../boards/entities/comment.entity';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @ApiProperty({
    example: 1,
    description: '유저 ID',
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '개똥이',
    description: '유저 이름',
    required: true,
  })
  @Column({ unique: true, length: 32 })
  userName: string;

  // @Column({ unique: true })
  // email: string;

  @ApiProperty({
    example: '1q2w3e4r',
    description: '유저 비밀번호',
    required: true,
  })
  @Column({ select: false })
  password: string;

  //--relations--
  @OneToMany(() => BoardEntity, (board) => board.user)
  writeBoards: BoardEntity[];

  @OneToMany(() => PublicChatEntity, (publicChat) => publicChat.user)
  publicChats: PublicChatEntity[];

  @OneToMany(() => chatEntity, (chats) => chats.user)
  chats: chatEntity[];

  @ManyToMany(() => BoardEntity, (board) => board.userLikes, {
    createForeignKeyConstraints: false,
  })
  likeBoards: BoardEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.user)
  comments: CommentEntity[];

  // @Column({ default: '' })
  // imageLink: string;
}
