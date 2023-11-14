import { CreateContactDto } from './dtos/CreateContactDto.dto';

export interface IContactService {
  createContact(contactParams: CreateContactDto);
  getAllContacts();
  getContactById(id: number);
  getContactPage(page: number, pageSize: number);
  approveContactsOpen(contactIds: number[]);
  approveContactsClose(idContact: number[]);
  deleteMultiple(ids: number[]);
}
