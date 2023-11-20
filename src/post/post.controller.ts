import {
  Controller,
  Inject,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { IPostService } from './posts';
import { CreatePostDto } from './dtos/CreatePostDto.dtos';
import { Posts } from 'src/utils/typeorm';

@Controller(Routes.POST)
export class PostController {
  constructor(
    @Inject(Services.POST) private readonly postsService: IPostService,
  ) {}

  @Post()
  createPost(@Body() newPostDto: CreatePostDto) {
    const { userId, ...postData } = newPostDto;
    console.log('đây là id', userId);

    return this.postsService.createPost(postData, userId);
  }

  @Get('all-new-posts')
  getAllPost(): Promise<Posts[]> {
    return this.postsService.getAllPost();
  }

  @Get('/details/:id')
  async getPostById(@Param('id') id: number) {
    const post = await this.postsService.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Get(':userId/posts')
  async getUserPosts(@Param('userId') userId: number) {
    return this.postsService.getUserPosts(userId);
  }

  @Delete('/delete/:id')
  deletePost(@Param('id') postId: number) {
    return 'đã xóa' + this.postsService.deletePost(postId);
  }

  @Post('deletes')
  async deleteMultiple(@Body() ids: number[]) {
    //console.log(ids);

    return await this.postsService.deleteMultiple(ids);
  }

  @Put('/:id/like')
  async likeComment(@Param('id') id: number, @Body() request: any) {
    const userId = request.userId;
    console.log('userId', userId);
    return await this.postsService.likeComment(id, userId);
  }
}
