import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateNewsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  subcontent: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsString()
  slug: string;
}
