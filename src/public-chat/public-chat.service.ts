import { Injectable } from '@nestjs/common';
import { CreatePublicChatDto } from './dto/create-public-chat.dto';
import { UpdatePublicChatDto } from './dto/update-public-chat.dto';
import { getRepository } from 'typeorm';

@Injectable()
export class PublicChatService {
  constructor() {}
  create(createPublicChatDto: CreatePublicChatDto) {
    return 'This action adds a new publicChat';
  }

  findAll() {
    return `This action returns all publicChat`;
  }

  async findOne(id: number) {
    return `this is action `;
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicChat`;
  }
}
