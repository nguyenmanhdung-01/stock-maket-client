import {
  Controller,
  Inject,
  Post,
  Body,
  Get,
  Put,
  Param,
  Query,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { UpdateNewsDto } from './dtos/UpdateNewsDto.dto';
import { News } from 'src/utils/typeorm';
import { INewsService } from './news';
import { CreateNewsDto } from './dtos/CreateNewsDto.dtos';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as path from 'path';
import * as sharp from 'sharp';

@Controller(Routes.NEWS)
export class NewsController {
  constructor(
    @Inject(Services.NEWS) private readonly newsPostsService: INewsService,
  ) {}

  @Post()
  createPost(@Body() newPostDto: CreateNewsDto) {
    const { userId, categoryId, ...postData } = newPostDto;
    //console.log('đây là id', userId);

    if (!postData.title) {
      throw new HttpException('Vui lòng thêm tiêu đề', HttpStatus.NOT_FOUND);
    }
    if (!categoryId) {
      throw new HttpException(
        'Vui lòng tạo trước danh mục để thực hiện thêm bài viết',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.newsPostsService.createNew(postData, categoryId, userId);
  }

  @Post('/approve')
  async approvePosts(@Body() postIds: number[]) {
    try {
      const approvedPosts = await this.newsPostsService.approveNews(postIds);
      return { message: 'Posts approved successfully', data: approvedPosts };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('all-new-posts')
  getAllPost(): Promise<News[]> {
    return this.newsPostsService.getAllNew();
  }
  @Get()
  async getNewsByCategoryAndStatusWithPagination(
    @Query('category') category: number | null,
    @Query('keyword') keyword: string | null,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 4,
    @Query('id') id?: number,
  ) {
    const data =
      await this.newsPostsService.getNewsByCategoryAndStatusWithPagination(
        category,
        keyword,
        page,
        pageSize,
        id,
      );

    return data;
  }

  @Get('allPost')
  async getAllPosts(
    status: string = '1',
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 4,
  ) {
    const data = await this.newsPostsService.getAllNews(status, page, pageSize);

    return data;
  }

  @Get('search')
  async searchByKeyword(
    @Query('keyword') keyword: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 8,
  ) {
    const searchResult = await this.newsPostsService.searchByKeyword(
      keyword,
      page,
      limit,
    );
    return searchResult;
  }

  @Get('/details/:id')
  async getPostById(@Param('id') id: number) {
    const news = await this.newsPostsService.getNewById(id);
    if (!news) {
      throw new NotFoundException('News not found');
    }
    return news;
  }

  @Get('/details-slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    const postBySlug = await this.newsPostsService.getNewBySlug(slug);
    //console.log(postBySlug);

    if (!postBySlug) {
      throw new NotFoundException('News not found');
    }

    return postBySlug;
  }

  @Put('/update/:postId')
  updatePost(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdateNewsDto,
  ) {
    return this.newsPostsService.updateNew(postId, updatePostDto);
  }

  @Delete('/delete/:id')
  deletePost(@Param('id') postId: number) {
    return 'đã xóa' + this.newsPostsService.deleteNew(postId);
  }

  @Post('deletes')
  async deleteMultiple(@Body() ids: number[]) {
    //console.log(ids);

    return await this.newsPostsService.deleteMultiple(ids);
  }

  @Get('getPostBySlugOfCategory/:item')
  async getPostBySlugOfCategory(
    @Param('item') item: any,
    @Query() queryParams: any,
  ) {
    const result = await this.newsPostsService.getNewBySlugOfCategory(
      item,
      queryParams,
    );
    return result;
  }

  @Get('getPostAction')
  async getNewsByAction(@Query() queryParams: any) {
    const result = await this.newsPostsService.getNewsByAction(queryParams);
    return result;
  }

  @Get('latest')
  async getLatestNews() {
    return this.newsPostsService.getLatestNews();
  }

  @Get('top-viewed')
  async getTopViewedNews() {
    return this.newsPostsService.getTopViewedNews();
  }

  @Get('by-category')
  async getNewsByCategory() {
    return this.newsPostsService.getNewsByCategory();
  }

  @Post('uploadFileImage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: '../client/public/uploads',
        filename: (req, file, callback) => {
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 4).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);

    const filename =
      Array(8)
        .fill(null)
        .map(() => Math.round(Math.random() * 8).toString(16))
        .join('') + extname(file.originalname);

    await sharp(file.path)
      .resize(800)
      .toFile(path.join('../client/public/uploads', filename));

    return { imageUrl: filename };
  }
}
