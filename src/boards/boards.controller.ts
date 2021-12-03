import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Render,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-board.dto';
import { CommentService } from './services/comment.service';

@Controller('board')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly commentService: CommentService,
  ) {}

  @Get('')
  @Render('layouts/board')
  async allBoardsPage() {
    const boardList = await this.boardsService.findAll();
    return { title: '자유 게시판', data: boardList };
  }

  @Get(':id')
  @Render('template/boards')
  async oneBoardPage(@Param('id') id: string) {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }

  @Post('comment/:id')
  createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(createCommentDto);
  }

  @Patch('comment/:id')
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {}

  @Patch('like/:id')
  updateLike(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.boardsService.updateLike(+id, updateLikeDto);
  }
}
