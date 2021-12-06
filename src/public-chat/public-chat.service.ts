import { Injectable } from '@nestjs/common';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { getRepository } from 'typeorm';
import { PublicChatRepository } from './public-chat.repostiroy';
import { PublicChatEntity as PublicChat } from './entities/public-chat.entity';
import { chatEntity as Chat } from '../chats/entities/history-chat.entity';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PublicChatService {
  constructor(
    private readonly publicChatRepositry: PublicChatRepository,
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepository,
  ) {}
  async create(createPublicChatDto: CreatePublicChatDto) {
    const user = await this.userRepository.findOne(createPublicChatDto.uid, {
      relations: ['publicChat'],
    });
    return await this.publicChatRepositry
      .save(createPublicChatDto)
      .then(async (Room) => {
        return Room;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async findAll() {
    const getAllChat = await getRepository(PublicChat)
      .createQueryBuilder('publicChat')
      // .leftJoin('publicChat', 'user', 'publicChat.uid = user.id')
      .addSelect((subQuery) => {
        return subQuery
          .select(['user.userName'])
          .from(UserEntity, 'user')
          .where('publicChat.uid = user.id')
          .limit(1);
      }, 'user_userName')
      .getRawMany();
    function getDate(date) {
      const year = (date.getFullYear() - 2000).toString();
      const month: number = date.getMonth() + 1;
      const day: number = date.getDate();
      const hours = date.getHours(); // 시
      const minutes = date.getMinutes(); // 분
      const seconds = date.getSeconds(); // 초
      const monthStr: string =
        month < 10 ? '0' + month.toString() : month.toString();
      const dayStr: string = day < 10 ? '0' + day.toString() : day.toString();
      const hoursStr: string =
        hours < 10 ? '0' + hours.toString() : hours.toString();
      const minutesStr: string =
        minutes < 10 ? '0' + minutes.toString() : minutes.toString();
      const secondsStr: string =
        seconds < 10 ? '0' + seconds.toString() : seconds.toString();
      return (
        year +
        '/' +
        monthStr +
        '/' +
        dayStr +
        ' [' +
        hoursStr +
        ':' +
        minutesStr +
        ']'
      );
    }
    for (const list of getAllChat) {
      list['publicChat_createdTime'] = getDate(list.publicChat_createdAt);
    }
    return getAllChat;
  }

  async findOne(id: number) {
    const getOneChat = getRepository(PublicChat)
      .createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getRawOne();
    return getOneChat;
  }

  async findChatHistory(roomID: number) {
    const getChatting = getRepository(Chat)
      .createQueryBuilder('chats')
      .where('chats.roomID = :roomID', { roomID })
      .getMany();
    return await getChatting;
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicChat`;
  }
}
