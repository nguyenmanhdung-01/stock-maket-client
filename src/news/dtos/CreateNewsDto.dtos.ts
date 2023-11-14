import { IsString } from 'class-validator';

export class CreateNewsDto {
  //@IsNotEmpty()
  id: string;

  //@IsNotEmpty()
  // @IsString()
  title: string;

  // @IsString()
  subcontent: string;

  // @IsString()
  content: string;
  source: string;

  //@IsString()
  image: string;

  @IsString()
  slug: string;

  //@IsNotEmpty()
  //@IsNumber()
  categoryId?: number;

  userId?: number;

  status: boolean;
}
