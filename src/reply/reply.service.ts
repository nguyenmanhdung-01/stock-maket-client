import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Contact, Reply } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { ReplyDto } from './dtos/Rely.dtos';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    private readonly mailService: MailService,
  ) {}

  async createRely(replyDto: ReplyDto): Promise<Reply> {
    const reply: Reply = new Reply();
    reply.contact = new Contact();
    reply.contact.contact_id = replyDto.contactId;
    reply.content = replyDto.content;

    await this.mailService.sendReplyEmail(reply);
    await this.replyRepository.save(reply);
    return reply;
  }
}
