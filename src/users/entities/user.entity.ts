import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
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

  // @OneToMany((type) => PublicChatEntity, (publicChat) => publicChat.user)
  // chat: chatEntity[];

  // @Column({ default: '' })
  // imageLink: string;
}
