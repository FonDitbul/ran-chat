import { EntityRepository, getConnection, Repository } from 'typeorm';
import { PublicChatEntity } from './entities/public-chat.entity';
import { chatEntity } from '../chats/entities/history-chat.entity';
@EntityRepository(PublicChatEntity)
export class PublicChatRepository extends Repository<PublicChatEntity> {
  constructor() {
    super();
    this.showLimitChatRoom = 10;
  }
  private showLimitChatRoom: number;
  async findAll(page: number) {
    const getAllChat = await this.createQueryBuilder('publicChat')
      .innerJoinAndSelect('publicChat.user', 'user', 'publicChat.uid = user.id')
      .orderBy('publicChat.id', 'DESC')
      .offset(page * this.showLimitChatRoom)
      .limit(this.showLimitChatRoom)
      .getManyAndCount();
    return getAllChat;
  }

  async findOnePublicChat(id: number) {
    const getOneChat = await this.createQueryBuilder('publicChat')
      .where('publicChat.id = :id', { id })
      .getRawOne();
    return getOneChat;
  }

  async removePublicChat(id: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(chatEntity)
        .softDelete({ roomID: id });
      await queryRunner.manager
        .getRepository(PublicChatEntity)
        .softDelete({ id: id });
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
