import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Render,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';

@Controller('board')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly commentService: CommentService,
    private readonly lkeService: LikeService,
  ) {}

  @Get('')
  @Render('layouts/board')
  async allBoardsPage() {
    const boardList = await this.boardsService.findAll();
    return {
      title: '자유 게시판',
      breads: [{ name: '자유 게시판' }],
      data: boardList,
    };
  }

  @Get(':id')
  @Render('template/boards')
  async oneBoardPage(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.findOne(id);
    return {
      title: '게시판 test',
      breads: [
        {
          name: '자유 게시판',
        },
        { name: board.title },
      ],
      data: board,
    };
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.remove(id);
  }

  @Get('comment/:boardID')
  async getBoardAllComment(@Param('boardID', ParseIntPipe) boardID: number) {
    return await this.commentService.findAll(boardID);
  }

  @Get('comment/:boardID')
  async getBoardOneComment(
    @Param('boardID', ParseIntPipe) boardID: number,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return await this.commentService.findOne(boardID, id);
  }

  @Post('comment')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Patch('comment')
  updateComment(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto);
  }

  @Delete('comment/:id')
  removeComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }

  @Patch('like')
  updateLike(@Body() updateLikeDto: UpdateLikeDto) {
    return this.lkeService.update(updateLikeDto);
  }
}
