import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News, Users } from 'src/utils/typeorm';
import { IUserService } from './users';
import {
  ChangPassWord,
  CreateUserDetails,
  Useremail,
  editUser,
} from 'src/utils/types';
import { hashPassword } from 'src/utils/helpers';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>, // @Inject(Services.ROLE) private readonly roleService: IRoleService,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly mailService: MailService,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    // const existing = await this.userRepository.find({
    //   TenDangNhap: userDetails.TenDangNhap,
    // });

    // if (existing) {
    //   throw new HttpException('Tên đăng nhập đã tồn tại', HttpStatus.CONFLICT);
    // }

    const password = await hashPassword(userDetails.MatKhau);
    const params = { ...userDetails, MatKhau: password };
    const savedUser = await this.userRepository.save(params);

    return savedUser;
  }

  async createAdminUser(username: string, password: string) {
    const pass = await hashPassword(password);
    const adminUser = this.userRepository.create({
      TenDangNhap: username,
      MatKhau: pass,
    });
    // const adminRole = await this.roleRepository.findOne({ name: username });
    // adminUser.roles = [adminRole];
    // console.log('admin role: ' + adminRole);

    return this.userRepository.save(adminUser);
  }

  async getUserPaginationAndStatus(
    status?: boolean | null,
    page: number = 1,
    pageSize: number = 4,
  ) {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.userRepository
      .createQueryBuilder('User')
      .orderBy('User.NgayTao', 'DESC')
      .skip(skip)
      .take(pageSize);

    if (status !== null && status !== undefined) {
      queryBuilder.andWhere('User.status = :status', { status });
    }

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async findByUsername(TenDangNhap: string) {
    const user = await this.userRepository.findOne({
      where: { TenDangNhap },
      relations: ['RoleGroupID'],
    });

    if (!user) {
      throw new HttpException(
        'Tên đăng nhập không tồn tại',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findById(UserID: number) {
    const user = await this.userRepository.findOne({
      where: { id: UserID },
      relations: ['RoleGroupID'],
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async editUser(id: number, editUser: editUser): Promise<any> {
    console.log('editUser', editUser);

    const user = await this.findById(id);
    if (user) {
      await this.userRepository.update(id, editUser);
    }
    return user;
  }

  async updatePermission(id: number, permission: any): Promise<any> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Cập nhật RoleGroupID
    user.RoleGroupID = permission.RoleGroupID;

    // Lưu thông tin cập nhật
    await this.userRepository.save(user);

    // Tìm lại user sau khi lưu để có thông tin chi tiết
    return await this.userRepository.findOne(id, {
      relations: ['RoleGroupID'],
    });
  }

  async editPassword(user: Users, password: ChangPassWord): Promise<any> {
    const { passwordNew } = password;
    const passwordHash = await hashPassword(passwordNew);
    await this.userRepository.update(user.id, { MatKhau: passwordHash });
    return user;
  }

  async forgetPassword(email: Useremail) {
    // console.log('email', email);

    const findUserByEmail = await this.userRepository.findOne({
      where: { Email: email.email },
    });

    // console.log('findUserByEmail', findUserByEmail);

    if (!findUserByEmail) {
      throw new HttpException('Không thấy người dùng', HttpStatus.NOT_FOUND);
    }

    const pass = await this.mailService.sendEmailForgetPassword(email);
    const password = await hashPassword(pass);
    findUserByEmail.MatKhau = password;
    await this.userRepository.save(findUserByEmail);
    return findUserByEmail;

    // return findUserByEmail;
  }

  async delete(idDelete: number[]): Promise<Users[]> {
    await this.userRepository
      .createQueryBuilder()
      .update(Users)
      //   .set({ IsRemoved: true })
      .where('UserID IN (:...ids)', { ids: idDelete })
      .execute();
    const result = await this.userRepository.find();
    return result;
  }

  async saveNewsIds(newsId: string, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } }); // Lấy người dùng từ cơ sở dữ liệu
    // ID của tin tức mới
    if (!user.news_ids) {
      user.news_ids = [newsId];
    } else {
      user.news_ids.push(newsId);
    }
    await this.userRepository.save(user); // Lưu người dùng để cập nhật cơ sở dữ liệu
  }

  async getNews(userId: number): Promise<News[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user && user.news_ids) {
      const newsIds = user.news_ids; // Danh sách news_ids
      const savedNews = await this.newsRepository.findByIds(newsIds); // Lấy thông tin về các bài viết dựa trên danh sách news_ids
      return savedNews;
    }
    return [];
  }

  async removedNews(userId: number, newsIdToRemove: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user && user.news_ids) {
      user.news_ids = user.news_ids.filter(
        (news) => news.id !== newsIdToRemove,
      );
      await this.userRepository.save(user);
    }
  }

  async updateAvatarUser(userId: string, avatarUrl: string) {
    // console.log('avatarUrl: ' + avatarUrl);

    const user = await this.userRepository.findOne(
      {
        id: Number(userId),
      },
      {
        relations: ['RoleGroupID'],
      },
    );
    if (!user) {
      throw new Error('User not found');
    }
    // console.log('xuong day tiep: ', avatarUrl);

    // const memberByUser = await

    user.Avatar = avatarUrl;
    const updateAvatar = await this.userRepository.save(user);

    return updateAvatar;
  }

  async approveUsersClose(userIds: number[]) {
    await this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set({ status: 1 })
      .whereInIds(userIds)
      .execute();

    // Trả về danh sách các liên hệ đã được cập nhật
    const approvedContacts = await this.userRepository.findByIds(userIds);
    return approvedContacts;
  }

  async approveUsersOpen(userIds: number[]) {
    await this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set({ status: 0 })
      .whereInIds(userIds)
      .execute();

    // Trả về danh sách các liên hệ đã được cập nhật
    const approvedUsers = await this.userRepository.findByIds(userIds);
    return approvedUsers;
  }

  async checkUserStatus(username: string) {
    const user = await this.userRepository.findOne({ TenDangNhap: username });
    return user ? user.status : 2;
  }
}
