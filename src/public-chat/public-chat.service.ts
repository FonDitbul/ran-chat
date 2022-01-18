import { Injectable } from '@nestjs/common';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { PublicChatRepository } from './public-chat.repostiroy';
import { ChatRepository } from '../chats/chats.repository';

@Injectable()
export class PublicChatService {
  constructor(
    private readonly publicChatRepository: PublicChatRepository,
    private readonly chatsRepository: ChatRepository,
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
    return await this.publicChatRepository.findAll();
  }

  async findOne(id: number) {
    return await this.publicChatRepository.findOnePublicchat(id);
  }

  async findChatHistory(roomID: number) {
    return await this.chatsRepository.findChatHistory(roomID);
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  async remove(id: number) {
    return await this.publicChatRepository.delete({ id: id });
  }
}
