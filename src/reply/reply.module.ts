import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Reply } from 'src/utils/typeorm';
import { Services } from 'src/utils/contants';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Contact]), MailModule],
  providers: [
    {
      provide: Services.REPLY,
      useClass: ReplyService,
    },
    {
      provide: Services.MAILER,
      useClass: MailService,
    },
  ],
  exports: [
    {
      provide: Services.REPLY,
      useClass: ReplyService,
    },
  ],
  controllers: [ReplyController],
})
export class ReplyModule {}
