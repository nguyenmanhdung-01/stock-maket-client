import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  //@IsNumber()
  contactId: number;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
