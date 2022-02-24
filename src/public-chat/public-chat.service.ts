import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async findAll(page: number) {
    const allPublicRoom = await this.publicChatRepository.findAll(page - 1);
    const roomList = allPublicRoom[0];
    const totalCountPublicChat = allPublicRoom[1];
    return { roomList, totalCountPublicChat };
  }

  async findOne(id: number) {
    return await this.publicChatRepository.findOnePublicChat(id);
  }

  async findChatHistory(roomID: number) {
    const chatting = await this.chatsRepository.findChatHistory(roomID);
    return chatting.reverse();
  }

  update(id: number, updatePublicChatDto: UpdatePublicChatDto) {
    return `This action updates a #${id} publicChat`;
  }

  async remove(id: number, uid: number) {
    const chatRoom = await this.publicChatRepository.findOnePublicChat(id);
    if (!chatRoom) throw new BadRequestException('존재하지 않는 게시판입니다.');
    if (chatRoom.uid !== uid) {
      throw new ForbiddenException('유효한 유저가 아닙니다');
    }
    return await this.publicChatRepository.removePublicChat(id);
  }
}
