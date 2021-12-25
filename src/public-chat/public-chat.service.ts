import { Injectable } from '@nestjs/common';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { PublicChatRepository } from './public-chat.repostiroy';

@Injectable()
export class PublicChatService {
  constructor(private readonly publicChatRepository: PublicChatRepository) {}
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
    return await this.publicChatRepository.findChatHistory(roomID);
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  async remove(id: number) {
    return await this.publicChatRepository.delete({ id: id });
  }
}
