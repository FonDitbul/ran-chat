import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { userName: username },
      select: ['id', 'userName', 'password'],
    });
    if (!user) return null;
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { userName: user.userName, sub: user.id };
    return {
      uid: user.id,
      userName: user.userName,
      access_token: this.jwtService.sign(payload),
    };
  }
}
