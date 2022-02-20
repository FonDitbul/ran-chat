import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { getRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { userName, password } = createUserDto;
    const getByUserName = getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.userName = :userName', { userName });

    const byUserName = await getByUserName.getOne();
    if (byUserName) {
      const error = { userName: 'userName is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    //create new user
    const newUser = new UserEntity();
    newUser.userName = userName;
    newUser.password = await bcrypt.hash(password, 12);
    newUser.profileImg = 'profile/basic_blue.jpg';

    return await this.userRepository.save(newUser).then((user) => {
      return {
        user: {
          id: user.id,
          userName: user.userName,
        },
      };
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOneByUserName(userName: string) {
    return await this.userRepository.findOneByUserName(userName);
  }

  async findOneByUserID(id: number) {
    return await this.userRepository.findOneByUserID(id);
  }

  async findUserProfile(id: number) {
    return await this.userRepository.findUserProfile(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const getUser = await this.userRepository.findOne({ id: id });
    if (!getUser) throw new BadRequestException('존재하지 않는 유저입니다.');
    return this.userRepository.deleteUserAndRelation(id);
  }
}
