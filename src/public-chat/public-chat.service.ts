import { Injectable } from '@nestjs/common';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { getRepository } from 'typeorm';
import { PublicChatRepository } from './public-chat.repostiroy';
import { PublicChatEntity } from './entities/public-chat.entity';

@Injectable()
export class PublicChatService {
  constructor(private readonly publicChatRepositry: PublicChatRepository) {}
  async create(createPublicChatDto: CreatePublicChatDto) {
    const newPublicChat = new PublicChatEntity();
    newPublicChat.title = createPublicChatDto.title;
    newPublicChat.uid = createPublicChatDto.uid;
    return await this.publicChatRepositry
      .save(newPublicChat)
      .then((Room) => {
        return Room;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async findAll() {
    const getAllChat = getRepository(PublicChatEntity)
      .createQueryBuilder('publicChat')
      .getMany();
    return getAllChat;
  }

  async findOne(id: number) {
    const getOneChat = getRepository(PublicChatEntity)
      .createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getOne();
    // console.log(getOneChat);
    return getOneChat;
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicChat`;
  }
}
