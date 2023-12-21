import { News, Users } from 'src/utils/typeorm';
import {
  ChangPassWord,
  CreateUserDetails,
  Useremail,
  editUser,
} from 'src/utils/types';

export interface IUserService {
  findByUsername(TenDangNhap: string);
  findById(UserID: number);
  delete(idDelete: number[]): Promise<Users[]>;
  createUser(userDetails: CreateUserDetails);
  editUser(id: number, editUser: editUser): Promise<Users>;
  updatePermission(id: number, permission: any): Promise<any>;
  forgetPassword(email: Useremail);
  editPassword(user: Users, changePassword: ChangPassWord): Promise<Users>;
  saveNewsIds(newsId: string, userId: number);
  getNews(userId: number): Promise<News[]>;
  removedNews(userId: number, newsIdToRemove: string);
  updateAvatarUser(userId: string, avatarUrl: string);
  approveUsersClose(idUser: number[]);
  checkUserStatus(username: string);
  approveUsersOpen(idUser: number[]);
  getUserPaginationAndStatus(status: boolean, page: number, pageSize: number);
}
