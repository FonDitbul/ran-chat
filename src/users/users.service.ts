import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { getRepository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const getByUserName = getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    const byUserName = await getByUserName.getOne();
    if (byUserName) {
      const error = { username: 'UserName is already exists' };
      throw new HttpException(
        { message: 'Input data validation failed', error },
        HttpStatus.BAD_REQUEST,
      );
    }

    //create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.password = password;

    // const validate_error = await validate(newUser);
    // if (validate_error.length > 0) {
    //   const _error = { username: 'UserInput is not valid check type' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _error },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {}
    return await this.userRepository.save(newUser).then((user) => {
      return {
        user: {
          id: user.id,
          username: user.username,
        },
      };
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
