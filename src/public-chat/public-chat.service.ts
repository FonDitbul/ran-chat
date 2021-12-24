import { Injectable } from '@nestjs/common';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { getRepository } from 'typeorm';
import { PublicChatRepository } from './public-chat.repostiroy';
import { PublicChatEntity as PublicChat } from './entities/public-chat.entity';
import { chatEntity as Chat } from '../chats/entities/history-chat.entity';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PublicChatService {
  constructor(
    private readonly publicChatRepository: PublicChatRepository,
    private readonly usersService: UsersService,
  ) {}
  async create(createPublicChatDto: CreatePublicChatDto) {
    return await this.publicChatRepository
      .save(createPublicChatDto)
      .then(async (Room) => {
        return Room;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async findAll() {
    return this.publicChatRepository.findAll();
  }

  async findOne(id: number) {
    return this.publicChatRepository.findOnePublicchat(id);
  }

  async findChatHistory(roomID: number) {
    return this.publicChatRepository.findChatHistory(roomID);
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  async remove(id: number) {
    return await this.publicChatRepository.delete({ id: id });
  }
}
