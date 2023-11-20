import {
  Controller,
  Inject,
  Body,
  Post,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { IAuthService } from './auth';
import { IUserService } from 'src/users/users';
import { Routes, Services } from 'src/utils/contants';
import { CreateUserDto } from './dtos/CreateUser.dto';
import JwtAuthenticationGuard from './utils/jwt/jwt-authentication.guard';
import { RequestWithUser, ValidateUserDetails } from 'src/utils/types';
import { LocalAuthGuard } from './utils/local/LocalGuards';
import { AuthUser } from 'src/utils/decorators';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: RequestWithUser,
    @Body() user: ValidateUserDetails,
  ) {
    if (request.user?.IsRemoved === true) {
      throw new HttpException('Người dùng đã bị xóa', HttpStatus.NOT_FOUND);
    }
    const payload = { username: user.TenDangNhap };

    // console.log('payload', payload);

    const token = await this.authService.generateToken(payload);
    return { user: request.user, token };
  }

  // @Roles(RoleEnum.Admin)
  // @UseGuards(JwtAuthenticationGuard, RolesGuard)
  // @Get('admin')
  // async admin(@AuthUser() user) {
  //   return user;
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  async status(@AuthUser() user) {
    return user;
  }
}
