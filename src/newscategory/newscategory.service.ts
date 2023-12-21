import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { INewsCategoryService } from './newscategory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News, NewsCategory } from 'src/utils/typeorm';
import {
  CreateNewsCategoryChildrenDto,
  CreateNewsCategoryDto,
} from './dtos/newscategory.dto';
import { NewsCategoryDetails } from 'src/utils/types';

@Injectable()
export class NewscategoryService implements INewsCategoryService {
  constructor(
    @InjectRepository(NewsCategory)
    private readonly newsCategoryRepository: Repository<NewsCategory>,
    @InjectRepository(News)
    private readonly newsPostRepository: Repository<News>,
  ) {}

  async createNewsCategory(
    newsCategoryDetails: CreateNewsCategoryDto,
  ): Promise<NewsCategory> {
    const existingNewsCategory = await this.newsCategoryRepository.findOne({
      name: newsCategoryDetails.name,
    });

    if (existingNewsCategory) {
      throw new HttpException('Đã tồn tại danh mục này', HttpStatus.CONFLICT);
    }
    const newsCategory =
      await this.newsCategoryRepository.create(newsCategoryDetails);
    const saveNewsCategory =
      await this.newsCategoryRepository.save(newsCategory);
    return saveNewsCategory;
  }

  async createNewsCategoryChildren(
    newsCategoryDetailsChildren: CreateNewsCategoryChildrenDto,
  ): Promise<NewsCategory> {
    const existingNewsCategory = await this.newsCategoryRepository.findOne({
      name: newsCategoryDetailsChildren.name,
    });

    if (existingNewsCategory) {
      throw new HttpException('Đã tồn tại danh mục này', HttpStatus.NOT_FOUND);
    }
    const newsCategory = await this.newsCategoryRepository.create(
      newsCategoryDetailsChildren,
    );
    const saveNewsCategory =
      await this.newsCategoryRepository.save(newsCategory);
    return saveNewsCategory;
  }

  async getAllNewsCategory(queryParams: any) {
    const pageSize = 10;
    const page = Number(queryParams.page);
    const getListCategory = await this.newsCategoryRepository.find();
    const countCategory = await this.newsCategoryRepository
      .createQueryBuilder('category')
      .getCount();
    const newsCategories = await this.newsCategoryRepository
      .createQueryBuilder('category')
      // .skip((page - 1) * pageSize)
      // .take(pageSize)
      .getMany();
    for (const newsCategory of newsCategories) {
      const count = await this.newsPostRepository.count({
        news_category: newsCategory,
      });

      newsCategory['postCount'] = count;
    }

    return { newsCategories, countCategory, getListCategory };
  }

  async getOneCategory(id: number) {
    const getOneCategory = await this.newsCategoryRepository.findOne(id);
    return getOneCategory;
  }

  async editCategory(newsCategoryDetails: NewsCategoryDetails) {
    if (newsCategoryDetails.isEdit) {
      const findNewsCategoryDB = await this.newsCategoryRepository.findOne({
        where: {
          name: newsCategoryDetails.name,
        },
      });
      if (findNewsCategoryDB) {
        throw new HttpException('Danh mục đã tồn tại', HttpStatus.NOT_FOUND);
      }
    }

    const newsCategoryDB = await this.newsCategoryRepository.findOne(
      newsCategoryDetails.news_category_id,
    );
    if (!newsCategoryDB) {
      throw new HttpException(
        'Không tìm thấy danh mục này',
        HttpStatus.NOT_FOUND,
      );
    }
    newsCategoryDB.name = newsCategoryDetails.name;
    newsCategoryDB.slug = newsCategoryDetails.slug;
    const savedNewsCategory =
      await this.newsCategoryRepository.save(newsCategoryDB);

    return savedNewsCategory;
  }

  async getOneCategoryById(id: number) {
    const query = this.newsCategoryRepository.createQueryBuilder('category');
    query.where('category.news_category_id = :id OR category.father_id = :id', {
      id,
    });
    const categories = await query.getMany();
    return categories;
  }

  async deletedOneNewsCategory(idNewsCategory: number) {
    // const deleteManyPostByCategoryId = await this.newsPostRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .where('newsCategory = :newsCategory)', {
    //     newsCategory: idNewsCategory,
    //   })
    //   .execute();
    // const deletedNewsCategory = await this.newsCategoryRepository.delete(
    //   idNewsCategory,
    // );
    const postsToDelete = await this.newsPostRepository.find({
      where: { newsCategory: { id: idNewsCategory } },
    });
    //console.log(postsToDelete);

    // return deletedNewsCategory;
  }

  async deleteManyNewsCategory(idNewsCategories: number[]) {
    const deleteManyPostByCategoryId = await this.newsPostRepository
      .createQueryBuilder()
      .delete()
      .where('news_category IN (:...idNewsCategories)', {
        idNewsCategories,
      })
      .execute();

    const deletedMayCategory = await this.newsCategoryRepository
      .createQueryBuilder()
      .delete()
      .where('news_category_id IN (:...idNewsCategories)', { idNewsCategories })
      .execute();
    if (deletedMayCategory) {
      console.log('Bản ghi đã được xóa.');
    } else {
      console.log('Không tìm thấy bản ghi hoặc xóa thất bại.');
    }
  }
}
