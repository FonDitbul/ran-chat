import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { AuthService } from '../auth/auth.service';

@ApiTags('유저')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@User() user) {
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwtAuth')
  getProfile(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그인 페이지 보여주기' })
  @Get('auth/login')
  @Render('layouts/login')
  loginPage() {
    return { title: '??' };
  }

  @ApiOperation({ summary: '해당 유저 프로필' })
  @Get('profile')
  @Render('template/profile')
  async profilePage(@Query('uid', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserProfile(id);
    return { title: 'profile', data: user };
  }

  @ApiOperation({ summary: '유저 이름으로 id 가져오기' })
  @Get(':userName')
  findOneByUserName(@Param('userName') userName: string) {
    return this.usersService.findOneByUserName(userName);
  }

  @ApiOperation({ summary: '유저 정보 변경' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: '유저 탈퇴' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
