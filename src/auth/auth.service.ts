import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/contants';
import { IAuthService } from './auth';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from 'src/users/users';
import { PayloadgenerateToken, ValidateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userDetails: ValidateUserDetails) {
    const { password, TenDangNhap } = userDetails;
    const user = await this.userService.findByUsername(TenDangNhap);
    const isPasswordValid = await compareHash(password, user.MatKhau);
    // console.log('password', password);
    // console.log('user.MatKhau', user.MatKhau);

    return isPasswordValid ? user : null;
  }

  async generateToken(
    payload: PayloadgenerateToken,
  ): Promise<{ token: string; expiresIn: number }> {
    const expiresIn = parseInt(this.configService.get('TIME_JWT_SECRET'), 10);
    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return { token, expiresIn };
  }

  async validateToken(token: string): Promise<any> {
    try {
      // console.log('validateToken1', token);
      const payload = await this.jwtService.verify(token);
      // console.log('validateToken2', payload);

      // Kiểm tra thời gian hết hạn của token
      const currentTimestamp = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại dsad
      if (payload.exp && payload.exp < currentTimestamp) {
        throw new Error('Token has expired');
      }

      // Nếu không có lỗi, trả về payload
      return payload['TenDangNhap'];
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
