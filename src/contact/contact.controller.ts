import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { Contact } from 'src/utils/typeorm';
import { CreateContactDto } from './dtos/CreateContactDto.dto';
import { IContactService } from './contact';
import { Routes, Services } from 'src/utils/contants';

@Controller(Routes.CONTACT)
export class ContactController {
  constructor(
    @Inject(Services.CONTACT) private readonly contactService: IContactService,
  ) {}

  @Post()
  createContact(@Body() contactDto: CreateContactDto): Promise<Contact> {
    //console.log('đây' + contactDto);

    return this.contactService.createContact(contactDto);
  }

  @Get()
  getAllContacts(@Query('page') page: number = 1, pageSize: number = 4) {
    const data = this.contactService.getContactPage(page, pageSize);
    return data;
  }

  @Get('all-contacts')
  getAllContact() {
    return this.contactService.getAllContacts();
  }

  @Get('contactById/:id')
  getContactById(@Param('id') id: number) {
    const contact = this.contactService.getContactById(id);
    return contact;
  }

  @Post('deletesContact')
  async deleteMultiple(@Body() ids: number[]): Promise<Contact[]> {
    //console.log(ids);
    const deleteContact = await this.contactService.deleteMultiple(ids);
    return deleteContact;
  }

  @Put('approve-open')
  async approveOpen(@Body() ids: number[]) {
    return await this.contactService.approveContactsOpen(ids);
  }

  @Put('approve-close')
  async approveClose(@Body() ids: number[]) {
    return await this.contactService.approveContactsClose(ids);
  }
}
