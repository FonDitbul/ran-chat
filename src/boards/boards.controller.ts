import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('board')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('')
  @Render('layouts/board')
  async boardsPage() {
    const boardList = await this.boardsService.findAll();
    return { title: '자유 게시판', data: boardList };
  }

  @Get(':id')
  @Render('template/boards')
  async boardPage(@Param('id') id: string) {
    const board = await this.boardsService.findOne(+id);
    return { title: '게시판 test', data: board };
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Patch('like/:id')
  updateLike(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.boardsService.updateLike(+id, updateLikeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
