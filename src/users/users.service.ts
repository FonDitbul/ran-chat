import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { getRepository } from 'typeorm';
import { UserEntity as User, UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { userName, password } = createUserDto;
    const getByuserName = getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.userName = :userName', { userName });

    const byUserName = await getByuserName.getOne();
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
    newUser.password = password;

    // const validate_error = await validate(newUser);
    // if (validate_error.length > 0) {
    //   const _error = { userName: 'UserInput is not valid check type' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _error },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {}
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
