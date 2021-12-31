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

@Controller('board')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly commentService: CommentService,
    private readonly likeService: LikeService,
  ) {}

  // 전체 게시판 불러오기
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
  // 게시판 만들기
  @Get('create')
  @Render('template/createBoard')
  async createBoardPage() {
    return {
      title: '게시판 만들기',
      breads: [{ name: '자유 게시판' }, { name: '게시판 생성' }],
    };
  }
  // one 게시판 불러오기
  @Get(':id')
  @Render('template/boards')
  async oneBoardPage(@Param('id', ParseIntPipe) id: number) {
    const board = await this.boardsService.findOne(id);
    const comment = await this.commentService.findAll(id);
    const like = await this.likeService.find(id);
    console.log(like);
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
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }
  // 게시판 update
  @Patch('')
  update(
    @Query('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }
  // 게시판 delete
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.remove(id);
  }
  //댓글 서비스
  @Get('comment/:boardID')
  @UseInterceptors(dataInterceptor)
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
  @Get('like/:boardID')
  async getLike(@Param('boardID', ParseIntPipe) id: number) {
    const like = await this.likeService.find(id);
    return like.userLikes;
  }
  @Patch('like')
  updateLike(
    @Query('id', ParseIntPipe) id: number,
    @Query('uid', ParseIntPipe) uid: number,
  ) {
    return this.likeService.update(id, uid);
  }
}
