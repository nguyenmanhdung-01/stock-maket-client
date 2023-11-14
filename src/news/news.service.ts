import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { News, NewsCategory, Users } from 'src/utils/typeorm';
import { CreateNewsDto } from './dtos/CreateNewsDto.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNewsDto } from './dtos/UpdateNewsDto.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsPostRepository: Repository<News>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(NewsCategory)
    private readonly newsCategoryRepository: Repository<NewsCategory>,
  ) {}

  async createNew(
    newsPostData: CreateNewsDto,
    categoryId: number,
    userId: number,
  ): Promise<News> {
    // const user = await this.userRepository.findOne(userId, {
    //   relations: ['RoleGroupID'],
    // });
    const user = await this.userRepository.findOne(userId);

    //const category = await this.newsCategoryRepository.findOne(categoryId, {relations:['member']});

    if (!user) {
      throw new HttpException(
        'Không có dữ liệu hội viên',
        HttpStatus.NOT_FOUND,
      );
    }

    const newsPost = new News();
    newsPost.title = newsPostData.title;
    newsPost.content = newsPostData.content;
    newsPost.subcontent = newsPostData.subcontent;
    newsPost.slug = newsPostData.slug;
    newsPost.image = newsPostData.image;
    newsPost.source = newsPostData.source;
    newsPost.user = user;
    newsPost.news_category = new NewsCategory();
    newsPost.news_category.news_category_id = categoryId;

    const savedNewsPost = await this.newsPostRepository.save(newsPost);
    //console.log(savedNewsPost);

    return savedNewsPost;
  }

  async getAllNew() {
    return await this.newsPostRepository.find();
  }

  async approveNews(postIds: number[]) {
    const approvedPosts: News[] = [];

    for (const postId of postIds) {
      const post = await this.newsPostRepository.findOne(postId);

      if (!post) {
        throw new Error(`Post with ID ${postId} not found`);
      }

      // const isAdmin = post.user.roles.some((role) => role.name === 'admin');
      // if (!isAdmin) {
      //   throw new Error('You are not authorized to approve posts');
      // }

      post.status = true;
      const approvedPost = await this.newsPostRepository.save(post);
      approvedPosts.push(approvedPost);
    }

    return approvedPosts;
  }

  async getNewById(id: number) {
    const post = await this.newsPostRepository.findOne(id);
    if (!post) {
      throw new HttpException('Không có dữ liệu', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async getNewBySlug(slug: string) {
    const postBySlug = await this.newsPostRepository.findOne({
      where: { slug: slug },
    });
    if (!postBySlug) {
      throw new HttpException('Không có dữ liệu', HttpStatus.NOT_FOUND);
    }
    // Kiểm tra thời gian từ lần cuối cùng xem bài viết
    const currentTime = new Date().getTime();
    const lastViewedAt = postBySlug.lastViewedAt?.getTime() || 0;
    const elapsedTime = currentTime - lastViewedAt;

    // Nếu đã trôi qua 1 phút, tăng số lượt view và cập nhật thời gian xem mới nhất
    if (elapsedTime > 60000) {
      postBySlug.view += 1;
      postBySlug.lastViewedAt = new Date();
      await this.newsPostRepository.save(postBySlug);
    }
    return postBySlug;
  }

  async updateNew(postId: number, updateNewsDto: UpdateNewsDto) {
    const post = await this.newsPostRepository.findOne(postId);
    if (!post) {
      throw new HttpException('Không tìm thấy bài viết', HttpStatus.NOT_FOUND);
    }

    post.title = updateNewsDto.title;
    post.subcontent = updateNewsDto.subcontent;
    post.content = updateNewsDto.content;
    post.slug = updateNewsDto.slug;
    post.image = updateNewsDto.image;

    const updatedPost = await this.newsPostRepository.save(post);

    return updatedPost;
  }

  async searchByKeyword(keyword: string, page: number = 1, limit: number = 8) {
    try {
      const query = await this.newsPostRepository
        .createQueryBuilder('newsPost')
        .where('newsPost.status = :status', { status: true })
        .andWhere(
          '(newsPost.title LIKE :keyword OR newsPost.subcontent LIKE :keyword)',
          { keyword: `%${keyword}%` },
        )
        .skip((page - 1) * limit)
        .take(limit);
      // .getMany();

      const countMany = await this.newsPostRepository
        .createQueryBuilder('newsPost')
        .where(
          '(newsPost.title LIKE :keyword OR newsPost.subcontent LIKE :keyword)',
          { keyword: `%${keyword}%` },
        )
        .andWhere('newsPost.status = :status', { status: true });

      // .getCount();

      // const [results, totalCount] = await query
      //   .orderBy('newsPost.created_at', 'DESC')

      //   .getManyAndCount();
      const postList = await query.getMany();
      const total = await countMany.getCount();
      return { postList, total };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNew(postId: number) {
    const removePost = await this.newsPostRepository.delete(postId);
    return removePost;
  }

  async deleteMultiple(ids: number[]) {
    return await this.newsPostRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async getNewsByCategoryAndStatusWithPagination(
    category?: number | null,
    status?: boolean | null,
    page: number = 1,
    pageSize: number = 4,
    // id?: number | null,
  ) {
    const skip = (page - 1) * pageSize;
    // const user = await this.userRepository.findOne(id);
    //console.log(user.roles.find((role) => console.log(role.name)));

    const queryBuilder = this.newsPostRepository
      .createQueryBuilder('NewsPost')
      .leftJoinAndSelect('NewsPost.news_category', 'NewsCategory')
      .leftJoinAndSelect('NewsPost.user', 'User')
      // .leftJoinAndSelect('User.roles', 'Role')
      .where('NewsPost.status = :status', { status: false })
      .orderBy('NewsPost.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    if (category !== null && category !== undefined) {
      queryBuilder.andWhere('NewsCategory.news_category_id = :category', {
        category,
      });
    }

    if (status !== null && status !== undefined) {
      queryBuilder.andWhere('NewsPost.status = :status', { status });
    }

    // if (
    //   user.roles.find(
    //     (role) => role.name === 'admin' || role.name === 'contentManager',
    //   )
    // ) {
    // } else {
    //   queryBuilder.andWhere('User.id = :id', { id: id });
    // }

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async getAllNews(
    status: string = '0',
    page: number = 1,
    pageSize: number = 4,
  ) {
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.newsPostRepository
      .createQueryBuilder('NewsPost')
      .leftJoinAndSelect('NewsPost.news_category', 'NewsCategory')
      .leftJoinAndSelect('NewsPost.user', 'User')
      // .leftJoinAndSelect('User.roles', 'Role')
      //.where('NewsPost.status = :status', Ơ)
      .orderBy('NewsPost.created_at', 'DESC')
      .skip(skip)
      .take(pageSize);

    // if (status !== null && status !== undefined) {
    //   queryBuilder.andWhere('NewsPost.status = :status', { status });
    // }

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async getNewBySlugOfCategory(item: any, queryParams: any) {
    const page = Number(queryParams.page);
    const pageSize = 8;
    const query = await this.newsPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.news_category', 'category')
      .leftJoinAndSelect('post.user', 'User')
      // .where('post.status = :status', { status: 1 })
      .andWhere(
        '(category.news_category_id = :news_category_id OR category.father_id = :father_id)',
        {
          news_category_id: item,
          father_id: item,
        },
      )
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('post.news_id', 'DESC')
      .getMany();

    const queryCount = await this.newsPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.news_category', 'category')
      // .where('post.status = :status', { status: 1 })
      .andWhere(
        '(category.news_category_id = :news_category_id OR category.father_id = :father_id)',
        {
          news_category_id: item,
          father_id: item,
        },
      )

      .getCount();
    return { query, queryCount };
  }

  async getLatestNews(): Promise<News[]> {
    return this.newsPostRepository
      .createQueryBuilder('news')
      .orderBy('news.created_at', 'DESC')
      .limit(5)
      .getMany();
  }

  async getTopViewedNews(): Promise<News[]> {
    return this.newsPostRepository
      .createQueryBuilder('news')
      .orderBy('news.view', 'DESC')
      .limit(5)
      .getMany();
  }

  async getNewsByCategory(): Promise<
    { category: NewsCategory; news: News[] }[]
  > {
    const categories = await this.newsCategoryRepository.find();

    const result: { category: NewsCategory; news: News[] }[] = [];

    for (const category of categories) {
      const news = await this.newsPostRepository.find({
        where: {
          news_category: category.news_category_id,
        },
      });

      result.push({ category, news });
    }

    return result;
  }
}
