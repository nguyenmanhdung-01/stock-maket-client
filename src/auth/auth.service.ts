import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/contants';
import { IAuthService } from './auth';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from 'src/users/users';
import { PayloadgenerateToken, ValidateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const { password, TenDangNhap } = userDetails;
    const user = await this.userService.findByUsername(TenDangNhap);
    const isPasswordValid = await compareHash(password, user.MatKhau);
    // console.log('password', password);
    // console.log('user.MatKhau', user.MatKhau);

    return isPasswordValid ? user : null;
  }

  async generateToken(userName: PayloadgenerateToken): Promise<any> {
    return this.jwtService.sign(userName);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
