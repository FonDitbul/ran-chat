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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: '전체 유저 불러오기' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: '로그인 페이지 보여주기' })
  @Get('auth/login')
  @Render('layouts/login')
  loginPage() {
    return { title: '??' };
  }

  @ApiOperation({ summary: '해당 유저 프로필' })
  @Get('profile/:uid')
  @Render('template/profile')
  profilePage(@Param() uid: number) {
    return { title: 'profile' };
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
