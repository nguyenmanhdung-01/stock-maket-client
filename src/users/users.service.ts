import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News, Users } from 'src/utils/typeorm';
import { IUserService } from './users';
import { ChangPassWord, CreateUserDetails, editUser } from 'src/utils/types';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>, // @Inject(Services.ROLE) private readonly roleService: IRoleService,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    const existing = await this.userRepository.find({
      TenDangNhap: userDetails.TenDangNhap,
    });

    if (existing) {
      throw new HttpException('Người dùng đã tồn tại', HttpStatus.CONFLICT);
    }

    const password = await hashPassword(userDetails.MatKhau);
    const params = { ...userDetails, MatKhau: password };
    const savedUser = await this.userRepository.save(params);

    return savedUser;
  }

  async findByUsername(TenDangNhap: string) {
    const user = await this.userRepository.findOne({
      where: { TenDangNhap },
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

  async editPassword(user: Users, password: ChangPassWord): Promise<any> {
    const { passwordNew } = password;
    const passwordHash = await hashPassword(passwordNew);
    await this.userRepository.update(user.id, { MatKhau: passwordHash });
    return user;
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
}
