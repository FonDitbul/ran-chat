import { EntityRepository, Repository } from 'typeorm';
import { PublicChatEntity } from './entities/public-chat.entity';
@EntityRepository(PublicChatEntity)
export class PublicChatRepository extends Repository<PublicChatEntity> {
  async findAll() {
    const getAllChat = await this.createQueryBuilder('publicChat')
      .innerJoinAndSelect('publicChat.user', 'user', 'publicChat.uid = user.id')
      .getRawMany();
    return getAllChat;
  }
  async findOnePublicchat(id: number) {
    const getOneChat = await this.createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getRawOne();
    return getOneChat;
  }
}
