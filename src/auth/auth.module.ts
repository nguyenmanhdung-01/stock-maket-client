import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/contants';
import { LocalStrategy } from './utils/local/LocalStrategy';
import { LocalAuthGuard } from './utils/local/LocalGuards';
import { JwtStrategy } from './utils/jwt/jwt.strategy';
import { RolesGuard } from './utils/role/roles.guard';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('TIME_JWT_SECRET')}m` }, // Thời gian hết hạn của token
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    RolesGuard,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
