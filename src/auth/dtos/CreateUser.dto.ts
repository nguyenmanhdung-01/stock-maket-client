import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  HoVaTen: string;

  @IsNotEmpty()
  NgaySinh: Date;

  @IsNotEmpty()
  GioiTinh: number;

  Email: string;

  @IsNotEmpty()
  TenDangNhap: string;

  @IsNotEmpty()
  MatKhau: string;
}
