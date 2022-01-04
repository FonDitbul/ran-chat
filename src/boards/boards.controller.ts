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
import { ParsePagePipe } from '../common/pipes/ParsePage.pipe';
import { dataInterceptor } from '../common/interceptors/data.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  async allBoardsPage(
    @Query('page', new DefaultValuePipe(1), ParsePagePipe) page: number,
  ) {
    const { getAllBoards, countBoard, pageArr } =
      await this.boardsService.findAll(page);
    return {
      title: '자유 게시판',
      breads: [{ name: '자유 게시판' }],
      data: getAllBoards,
      page: { cur: page, total: countBoard, pageArr: pageArr },
    };
  }

  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 만들기',
    description: '게시판 생성 페이지 Rendering',
  })
  @Get('create')
  @Render('template/createBoard')
  async createBoardPage() {
    return {
      title: '게시판 만들기',
      breads: [{ name: '자유 게시판' }, { name: '게시판 생성' }],
    };
  }

  @ApiTags('게시판')
  @ApiOperation({
    summary: '한 게시판 불러오기',
    description: '한 게시판 상세페이지 ',
  })
  @Get(':id')
  @Render('template/boards')
  async oneBoardPage(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.findOne(id);
    const comment = await this.commentService.findAll(id);
    const like = await this.likeService.find(id);
    return {
      title: '게시판 test',
      breads: [
        {
          name: '자유 게시판',
        },
        { name: board.board_title },
      ],
      data: board,
      like: like.userLikes,
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
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  // 게시판 delete
  @ApiTags('게시판')
  @ApiOperation({
    summary: '게시판 삭제 API',
    description: '게시판 삭제 서버 전송',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.remove(id);
  }

  //댓글 서비스
  @ApiTags('게시판 댓글')
  @ApiOperation({
    summary: '댓글 불러오기',
    description: '해당 게시판 댓글 불러오기',
  })
  @Get('comment/:boardID')
  @UseInterceptors(dataInterceptor)
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
    const like = await this.likeService.find(id);
    return like.userLikes;
  }

  @ApiTags('게시판 좋아요')
  @ApiOperation({
    summary: '좋아요 업데이트',
    description: '해당 게시판 좋아요 업데이트',
  })
  @Patch('like')
  updateLike(
    @Query('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
  ) {
    return this.likeService.update(id, uid);
  }
}
