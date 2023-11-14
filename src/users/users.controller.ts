import {
  Controller,
  Inject,
  Param,
  Get,
  Delete,
  Body,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { IUserService } from './users';
import { Users } from 'src/utils/typeorm';
import JwtAuthenticationGuard from 'src/auth/utils/jwt/jwt-authentication.guard';
import { AuthUser } from 'src/utils/decorators';
import { ChangPassWord, editUser } from 'src/utils/types';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @Get('getByName/:username')
  async getUserByName(@Param('username') TenDangNhap: string): Promise<Users> {
    return this.userService.findByUsername(TenDangNhap);
  }

  @Get('getByID/:id')
  async getByID(@Param('id') id: number): Promise<Users> {
    return this.userService.findById(id);
  }

  @Put('edit/:id')
  async editUsers(
    @Param('id') id: number,
    @Body() editUsers: editUser,
  ): Promise<Users> {
    return this.userService.editUser(id, editUsers);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('editPassword')
  async editPassword(
    @AuthUser() user,
    @Body() password: ChangPassWord,
  ): Promise<Users> {
    return this.userService.editPassword(user, password);
  }

  @Delete('delete')
  async delete(@Body() { idDelete }: { idDelete: number[] }): Promise<Users[]> {
    return this.userService.delete(idDelete);
  }

  @Post('saveNews/:userId')
  async saveNews(@Body() newsData, @Param('userId') userId: number) {
    const newNewsId = newsData.newsId; // Lấy news_id từ dữ liệu yêu cầu
    await this.userService.saveNewsIds(newNewsId, userId);
  }

  @Get('getNews/:userId')
  async getSavedNews(@Param('userId') userId: number) {
    const savedNews = await this.userService.getNews(userId);
    return savedNews;
  }

  @Post('removedNews/:userId')
  async removedNews(@Body() newsData, @Param('userId') userId: number) {
    const newNewsId = newsData.newsId; // Lấy news_id từ dữ liệu yêu cầu
    await this.userService.removedNews(userId, newNewsId);
  }
}
