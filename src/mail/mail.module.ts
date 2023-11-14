import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Contact, Users } from 'src/utils/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dunglm363@gmail.com',
          pass: 'cyguikwwpnkhbtdc',
        },
      },
    }),
    TypeOrmModule.forFeature([Contact, Users]),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
