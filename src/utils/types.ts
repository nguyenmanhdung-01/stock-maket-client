import { Request } from 'express';
import { Users } from './typeorm';

enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}
export default RoleEnum;

export type ValidateUserDetails = {
  TenDangNhap: string;
  password: string;
};

export type CreateUserDetails = {
  HoVaTen: string;
  NgaySinh: Date;
  GioiTinh: number;
  Email: string;
  TenDangNhap: string;
  MatKhau: string;
};

export type editUser = {
  HoVaTen: string;
  NgaySinh: string;
  GioiTinh: number;
  SĐT: string;
  Email: string;
  RoleGroupID?: number;
};

export type ChangPassWord = {
  passwordOld: string;
  passwordNew: string;
};

export type PayloadgenerateToken = {
  TenDangNhap: string;
};

export type TokenPayload = {
  userId: string;
};

export interface AuthenticatedRequest extends Request {
  user: Users;
}

export interface RequestWithUser extends Request {
  user: Users;
}

export type NewsCategoryDetails = {
  news_category_id?: number;
  father_id?: number;
  name: string;
  slug: string;
  isEdit?: boolean;
};

export type Useremail = {
  email: string;
};
