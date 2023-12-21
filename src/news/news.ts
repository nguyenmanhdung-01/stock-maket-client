import { News, NewsCategory } from 'src/utils/typeorm';
import { CreateNewsDto } from './dtos/CreateNewsDto.dtos';
import { UpdateNewsDto } from './dtos/UpdateNewsDto.dto';

export interface INewsService {
  getAllNews(status: string, page: number, pageSize: number);
  getAllNew();
  getNewById(id: number);
  getNewBySlug(slug: string);
  getNewsByCategoryAndStatusWithPagination(
    category: number,
    keyword: string,
    page: number,
    pageSize: number,
    id: number,
  );
  getNewBySlugOfCategory(item: any, queryParams: any);
  approveNews(NewId: number[]);
  createNew(NewParams: CreateNewsDto, categoryId: number, userId: number);
  deleteNew(id: number);
  deleteMultiple(ids: number[]);
  updateNew(postId: number, updatePostData: UpdateNewsDto): Promise<News>;
  searchByKeyword(keyword: string, page: number, limit: number);
  getNewsByAction(queryParams: any);
  getLatestNews(): Promise<News[]>;
  getTopViewedNews(): Promise<News[]>;
  getNewsByCategory(): Promise<{ category: NewsCategory; news: News[] }[]>;
  //paginationNew(page: number, pageSize: number): Promise<NewsNew[]>;
}
