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
  Query,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { IUserService } from './users';
import { Users } from 'src/utils/typeorm';
import JwtAuthenticationGuard from 'src/auth/utils/jwt/jwt-authentication.guard';
import { AuthUser } from 'src/utils/decorators';
import { ChangPassWord, Useremail, editUser } from 'src/utils/types';
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

  @Get()
  async getUserByStatusWithPagination(
    @Query('status') status: boolean | null,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 4,
  ) {
    const data = await this.userService.getUserPaginationAndStatus(
      status,
      page,
      pageSize,
    );

    return data;
  }

  @Put('edit/:id')
  async editUsers(
    @Param('id') id: number,
    @Body() editUsers: editUser,
  ): Promise<Users> {
    console.log('editUsers', editUsers);

    return this.userService.editUser(id, editUsers);
  }

  @Put('edit-quyen/:id')
  async updateQuyen(
    @Param('id') id: number,
    @Body() permission: any,
  ): Promise<Users> {
    return this.userService.updatePermission(id, permission);
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

  @Post('changeAvatar/:userId')
  async uploadFile(@Body() imageUrl: any, @Param('userId') userId: string) {
    //console.log(userId);
    // console.log('file', imageUrl);

    const updatedUser = await this.userService.updateAvatarUser(
      userId,
      imageUrl.imageUrl,
    );
    return updatedUser;
  }

  @Put('approve-close')
  async approveClose(@Body() ids: number[]) {
    return await this.userService.approveUsersClose(ids);
  }

  @Put('approve-open')
  async approveOpen(@Body() ids: number[]) {
    return await this.userService.approveUsersOpen(ids);
  }

  @Post('getOneUser')
  async forgetPassword(@Body() email: Useremail): Promise<Users> {
    return this.userService.forgetPassword(email);
  }
}
