import { EntityRepository, getConnection, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { BoardEntity } from '../boards/entities/board.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findAll() {
    const getAllUser = this.createQueryBuilder('user').getMany();
    return await getAllUser;
  }

  async findOneByUserName(userName: string) {
    const getOneUser = this.createQueryBuilder('user')
      .where('user.userName = :userName', { userName })
      .getOne();
    return await getOneUser;
  }

  async findOneByUserID(id: number) {
    const getOneUser = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return getOneUser.userName;
  }

  async findUserProfile(id: number) {
    const getOneUser = await this.createQueryBuilder('user')
      .loadRelationCountAndMap(
        'user.commentsCount',
        'user.comments',
        'comments',
      )
      .loadRelationCountAndMap(
        'user.writeBoardsCount',
        'user.writeBoards',
        'writeBoards',
      )
      .loadRelationCountAndMap(
        'user.likeBoardsCount',
        'user.likeBoards',
        'likeBoards',
      )
      .loadRelationCountAndMap(
        'user.publicChatCount',
        'user.publicChats',
        'publiChats',
      )
      .where('user.id = :id', { id })
      .getOne();
    return getOneUser;
  }

  async deleteUserAndRelation(id: number) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //유저 좋아요 삭제
      const userLike = await this.findOne({
        relations: ['likeBoards'],
        where: { id: id },
      });
      userLike.likeBoards = [];
      await queryRunner.manager.save(userLike);

      // 해당 유저 작성 게시판 삭제
      await queryRunner.manager
        .getRepository(BoardEntity)
        .softDelete({ uid: id });

      //유저 삭제
      await queryRunner.manager
        .getRepository(UserEntity)
        .softDelete({ id: id });
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
