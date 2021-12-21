import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Render,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';
import { ParsePagePipe } from '../common/pipes/ParsePage.pipe';

@Controller('board')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly commentService: CommentService,
    private readonly lkeService: LikeService,
  ) {}

  // 게시판 Render
  @Get('')
  @Render('layouts/board')
  async allBoardsPage(
    @Query('page', new DefaultValuePipe(1), ParsePagePipe) page: number,
  ) {
    const boardList = await this.boardsService.findAll(page);
    return {
      title: '자유 게시판',
      breads: [{ name: '자유 게시판' }],
      data: boardList,
    };
  }

  @Get('create')
  @Render('template/createBoard')
  async createBoardPage() {
    return {
      title: '게시판 만들기',
    };
  }

  @Get(':id')
  @Render('template/boards')
  async oneBoardPage(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.findOne(id);
    const comment = await this.commentService.findAll(id);
    return {
      title: '게시판 test',
      breads: [
        {
          name: '자유 게시판',
        },
        { name: board.title },
      ],
      data: board,
      comment: comment,
    };
  }
  //게시판 CRUD
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
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

  //댓글 서비스
  @Get('comment/:boardID') //게시판 전체
  async getBoardAllComment(@Param('boardID', ParseIntPipe) boardID: number) {
    return await this.commentService.findAll(boardID);
  }

  @Post('comment')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Patch('comment')
  updateComment(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto);
  }

  @Delete('comment')
  removeComment(@Query('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }
  //좋아요 싫어요 기능
  @Patch('like')
  updateLike(@Body() updateLikeDto: UpdateLikeDto) {
    return this.lkeService.update(updateLikeDto);
  }
}
