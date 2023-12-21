import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { Services } from 'src/utils/contants';
import { NotificationService } from './notification.service';
import { Notifications } from 'src/utils/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notifications]),
    AuthModule,
    UsersModule,
    JwtModule,
    ConfigModule,
  ],
  providers: [
    {
      provide: Services.NOTIFICATION,
      useClass: NotificationService,
    },
    NotificationGateway,
    AuthService,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
