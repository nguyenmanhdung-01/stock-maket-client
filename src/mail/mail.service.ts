import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact, Reply } from 'src/utils/typeorm';

function generateRandomString(length) {
  let result = '';
  const characters = '56789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async sendContact(contact: Contact) {
    await this.mailerService.sendMail({
      to: 'dunglm363@gmail.com',
      subject: contact.title,
      html: `<p>Topic: ${contact.topic}</p><p>Title: ${contact.title}</p><p>Email: ${contact.email}</p><p>Phone Number: ${contact.phone_number}</p><p>Address: ${contact.address}</p><p>Content: ${contact.content}</p>`,
    });
  }

  async sendReplyEmail(reply: Reply) {
    const contact = await this.contactRepository.findOne(
      reply.contact.contact_id,
    );
    // console.log(contact);

    await this.mailerService.sendMail({
      from: 'Phòng truyền thông....',
      to: contact.email,
      subject: 'Phản hồi',
      html: reply.content,
    });
    contact.status = 1;
    await this.contactRepository.save(contact);
    //console.log(reply);
  }

  async sendEmailForgetPassword(email: any) {
    const password = generateRandomString(8);
    await this.mailerService.sendMail({
      to: email.email,
      subject: 'Thư cấp lại mật khẩu',
      html: `<h2>Mật khẩu mới của bạn là: <b>${password}</b></h2><p>Cảm ơn bạn đã sử dụng trang web của chúng tôi!</p>`,
    });
    return password;
  }
  sendEmailConfirmation(email: string, verificationCode: string) {
    //console.log(verificationCode);

    this.mailerService.sendMail({
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    });
  }
}
