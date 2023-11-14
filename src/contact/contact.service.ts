import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../utils/typeorm/entities/Contact';
import { IContactService } from './contact';
import { CreateContactDto } from './dtos/CreateContactDto.dto';
import { MailService } from 'src/mail/mail.service';
import { Reply } from 'src/utils/typeorm';

@Injectable()
export class ContactService implements IContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailService: MailService,
    @InjectRepository(Reply)
    private readonly relyRepository: Repository<Reply>,
  ) {}

  async createContact(contactDto: CreateContactDto): Promise<Contact> {
    const contact: Contact = this.contactRepository.create(contactDto); // Tạo đối tượng Contact từ contactDto
    await this.contactRepository.save(contact); // Lưu đối tượng Contact và trả về Promise<Contact>

    await this.mailService.sendContact(contact);
    return contact;
  }

  async getAllContacts() {
    return await this.contactRepository.find();
  }

  async getContactById(id: number) {
    const contact = await this.contactRepository.findOne(id, {
      relations: ['replies'],
    });
    if (!contact) {
      return 'Không có dữ liệu';
    }

    return contact;
  }

  async approveContactsOpen(contactIds: number[]) {
    await this.contactRepository
      .createQueryBuilder()
      .update(Contact)
      .set({ status: 1 })
      .whereInIds(contactIds)
      .execute();

    // Trả về danh sách các liên hệ đã được cập nhật
    const approvedContacts = await this.contactRepository.findByIds(contactIds);
    return approvedContacts;
  }

  async approveContactsClose(contactIds: number[]) {
    await this.contactRepository
      .createQueryBuilder()
      .update(Contact)
      .set({ status: 0 })
      .whereInIds(contactIds)
      .execute();

    // Trả về danh sách các liên hệ đã được cập nhật
    const approvedContacts = await this.contactRepository.findByIds(contactIds);
    return approvedContacts;
  }

  async deleteMultiple(ids: number[]) {
    await this.relyRepository
      .createQueryBuilder()
      .delete()
      .where('contact IN (:...ids)', { ids })
      .execute();
    return await this.contactRepository
      .createQueryBuilder()
      .delete()
      .where('contact_id IN (:...ids)', { ids })
      .execute();
  }

  async getContactPage(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const queryBuilder = this.contactRepository
      .createQueryBuilder('Contact')
      .leftJoinAndSelect('Contact.replies', 'Reply')
      .orderBy('Contact.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }
}
