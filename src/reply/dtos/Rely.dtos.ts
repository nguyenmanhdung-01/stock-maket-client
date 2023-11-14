import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReplyDto {
  //@IsNumber()
  @IsNotEmpty()
  contactId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
