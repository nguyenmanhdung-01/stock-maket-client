import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact, Reply } from 'src/utils/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { ReplyModule } from 'src/reply/reply.module';
import { Services } from 'src/utils/contants';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, Reply]),
    MailModule,
    ReplyModule,
  ],
  controllers: [ContactController],
  providers: [
    {
      provide: Services.CONTACT,
      useClass: ContactService,
    },
    {
      provide: Services.MAILER,
      useClass: MailService,
    },
  ],
  exports: [
    {
      provide: Services.CONTACT,
      useClass: ContactService,
    },
  ],
})
export class ContactModule {}
