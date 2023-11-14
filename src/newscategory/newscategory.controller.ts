import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import {
  CreateNewsCategoryChildrenDto,
  CreateNewsCategoryDto,
} from './dtos/newscategory.dto';
import { INewsCategoryService } from './newscategory';

@Controller(Routes.NEWSCATEGORY)
export class NewscategoryController {
  constructor(
    @Inject(Services.NEWSCATEGORY)
    private readonly newsCategoryService: INewsCategoryService,
  ) {}

  @Post('createNewsCategory')
  async createNewsCategory(@Body() newsCategory: CreateNewsCategoryDto) {
    const savedNewsCategory =
      await this.newsCategoryService.createNewsCategory(newsCategory);
    return savedNewsCategory;
  }

  @Post('createNewsCategoryChildren')
  async createNewsCategoryChildren(
    @Body() newsCategory: CreateNewsCategoryChildrenDto,
  ) {
    const savedNewsCategory =
      await this.newsCategoryService.createNewsCategoryChildren(newsCategory);
    return savedNewsCategory;
  }

  @Get('getAllNewsCategory')
  async getAllNewsCategory(@Query() queryParams: any) {
    const newsCategory =
      await this.newsCategoryService.getAllNewsCategory(queryParams);

    return newsCategory;
  }

  @Get('getCategory/:id')
  async getOneCategory(@Param('id', ParseIntPipe) idNewsCategory: number) {
    const result =
      await this.newsCategoryService.getOneCategory(idNewsCategory);
    return result;
  }

  @Put('editCategory')
  async editCategory(@Body() newsCategory: CreateNewsCategoryDto) {
    const result = await this.newsCategoryService.editCategory(newsCategory);
    return result;
  }

  @Get('getOneCategory/:id')
  async getOneCategoryById(@Param('id', ParseIntPipe) idNewsCategory: number) {
    const result =
      await this.newsCategoryService.getOneCategoryById(idNewsCategory);
    return result;
  }

  @Delete('deletedManyCategory')
  async deleteManyNewsCategory(@Body() deletedManyCategory: number[]) {
    const result =
      await this.newsCategoryService.deleteManyNewsCategory(
        deletedManyCategory,
      );
    return result;
  }

  @Delete('deletedOneNewsCategory/:id')
  async deletedOneNewsCategory(
    @Param('id', ParseIntPipe) idNewsCategory: number,
  ) {
    const deletedNewsCategory =
      await this.newsCategoryService.deletedOneNewsCategory(idNewsCategory);
    return deletedNewsCategory;
  }
}
