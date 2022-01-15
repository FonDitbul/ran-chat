import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UserEntity as User, UserEntity } from './entities/user.entity';

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
}
