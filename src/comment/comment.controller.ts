import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ICommentService } from './comment';
import { CreateCommentDto } from './dtos/comment.dto';
import { Routes, Services } from 'src/utils/contants';

@Controller(Routes.COMMENT)
export class CommentController {
  constructor(
    @Inject(Services.COMMENT) private readonly commentService: ICommentService,
  ) {}

  @Post('createComment')
  async createComment(@Body() commentDetails: CreateCommentDto) {
    const savedComment =
      await this.commentService.createComment(commentDetails);
    return savedComment;
  }

  @Get('getCommentByPost/:idPost')
  async getCommentByPost(@Param('idPost', ParseIntPipe) idPost: number) {
    const commentList = await this.commentService.getCommentByIdPost(idPost);
    return commentList;
  }

  @Get('getOneCommentById/:id')
  async getOneCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getOneCommentById(id);
    return comment;
  }

  @Post('editComment')
  async editComment(@Body() commentEditDetails: any) {
    const editedComment =
      await this.commentService.editComment(commentEditDetails);
    return editedComment;
  }

  @Get('comment/:id')
  async getCommentsById(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getCommentsById(id);
    return comment;
  }

  @Get('commentUnique/:id')
  async getUniqueCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentService.getUniqueCommentById(id);
    return comment;
  }

  @Delete('deletedManyEvent')
  async deleteManyComments(@Body() commentDeleteId: number[]) {
    const result =
      await this.commentService.deleteManyComments(commentDeleteId);
    return result;
  }
}
