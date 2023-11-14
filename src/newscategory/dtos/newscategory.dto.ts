import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}

export class CreateNewsCategoryChildrenDto {
  @IsNotEmpty()
  father_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
