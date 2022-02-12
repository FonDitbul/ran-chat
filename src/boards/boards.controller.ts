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
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';
import { ParsePagePipe } from '../common/pipes/parse-page.pipe';
import { breadsInterceptor } from '../common/interceptors/breads.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { timeLoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('board')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly commentService: CommentService,
    private readonly likeService: LikeService,
  ) {}

  @ApiTags('게시판')
  @ApiOperation({
    summary: '전체 게시판 불러오기',
    description: '전체 게시판 페이지',
  })
  @Get('')
  @Render('layouts/board')
  @UseInterceptors(breadsInterceptor)
  async allBoardsPage(
    @Query('page', new DefaultValuePipe(1), ParsePagePipe) page: number,
  ) {
    const { getAllBoards, totalCountBoard } =
      await this.boardsService.findAllBoard(page);
    return {
      data: getAllBoards,
      page: { curPage: page, totalCountBoard },
    };
  }

  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 만들기',
    description: '게시판 생성 페이지 Rendering',
  })
  @Get('create')
  @UseInterceptors(breadsInterceptor)
  @Render('template/createBoard')
  async createBoardPage() {
    return {
      title: '게시판 만들기',
      breadsOne: { name: '게시판 생성', url: 'board/create' },
    };
  }

  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 업데이트',
    description: '게시판 업데이트 페이지 Rendering',
  })
  @Get('update')
  @UseInterceptors(breadsInterceptor)
  @Render('template/createBoard')
  async updateBoardPage(@Query('id', ParsePagePipe) id: number) {
    const updateBoard = await this.boardsService.findOne(id);
    return {
      title: '게시판 업데이트',
      breadsOne: {
        name: '게시판 업데이트',
        url: 'board/update?id=' + id,
      },
      data: updateBoard,
    };
  }

  @ApiTags('게시판')
  @ApiOperation({
    summary: '한 게시판 불러오기',
    description: '한 게시판 상세페이지 ',
  })
  @Get(':id')
  @Render('template/oneBoard')
  @UseInterceptors(breadsInterceptor)
  async oneBoardPage(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.findOne(id);
    const comment = await this.commentService.findAll(id);
    return {
      breadsOne: {
        url: 'board/' + id,
        name: board.title,
      },
      data: board,
      comment: comment,
    };
  }

  //게시판 create
  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 생성 API',
    description: '게시판 생성 데이터 서버 전송',
  })
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  // 게시판 update
  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 업데이트 API',
    description: '게시판 업데이트 데이터 서버 전송',
  })
  @Patch('')
  update(
    @Query('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, uid, updateBoardDto);
  }

  // 게시판 delete
  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 삭제 API',
    description: '게시판 삭제 서버 전송',
  })
  @Delete('')
  remove(
    @Query('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
  ) {
    return this.boardsService.remove(id, uid);
  }

  //댓글 서비스
  @ApiTags('게시판 댓글')
  @ApiOperation({
    summary: '댓글 불러오기',
    description: '해당 게시판 댓글 불러오기',
  })
  @Get('comment/:boardID')
  async getBoardAllComment(@Param('boardID', ParseIntPipe) boardID: number) {
    return await this.commentService.findAll(boardID);
  }

  @ApiTags('게시판 댓글')
  @ApiOperation({
    summary: '댓글 달기',
    description: '해당 게시판 댓글 달기',
  })
  @Post('comment')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiTags('게시판 댓글')
  @ApiOperation({
    summary: '댓글 업데이트',
    description: '해당 댓글 업데이트',
  })
  @Patch('comment')
  updateComment(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto);
  }

  @ApiTags('게시판 댓글')
  @ApiOperation({
    summary: '댓글 삭제',
    description: '해당 게시판 댓글 삭제',
  })
  @Delete('comment')
  removeComment(@Query('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }

  //좋아요 싫어요 기능
  @ApiTags('게시판 좋아요')
  @ApiOperation({
    summary: '게시판 좋아요 불러오기',
    description: '해당 게시판 좋아요 불러오기',
  })
  @Get('like/:boardID')
  async getLike(@Param('boardID', ParseIntPipe) id: number) {
    return await this.likeService.find(id);
  }

  @ApiTags('게시판 좋아요')
  @ApiOperation({
    summary: '좋아요 추가하기',
    description: '해당 게시판 좋아요 업데이트',
  })
  @Post('like')
  addLike(
    @Query('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
  ) {
    return this.likeService.add(id, uid);
  }

  @ApiTags('게시판 좋아요')
  @ApiOperation({
    summary: '좋아요 삭제하기',
    description: '해당 게시판 좋아요 취소',
  })
  @Patch('like')
  updateLike(
    @Query('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
  ) {
    return this.likeService.delete(id, uid);
  }
}
