import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

@Controller('api/board')
export class BoardsController {
  constructor() {}
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
