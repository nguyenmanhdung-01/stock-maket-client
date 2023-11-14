import { NewsCategory } from 'src/utils/typeorm';
import {
  CreateNewsCategoryChildrenDto,
  CreateNewsCategoryDto,
} from './dtos/newscategory.dto';
import { NewsCategoryDetails } from 'src/utils/types';

export interface INewsCategoryService {
  createNewsCategory(
    newsCategoryDetails: CreateNewsCategoryDto,
  ): Promise<NewsCategory>;
  createNewsCategoryChildren(
    newsCategoryDetailsChildren: CreateNewsCategoryChildrenDto,
  ): Promise<NewsCategory>;

  getAllNewsCategory(queryParams: any);
  getOneCategoryById(id: number);
  getOneCategory(id: number);
  editCategory(editNewsCategoryDetails: NewsCategoryDetails);
  deletedOneNewsCategory(idNewsCategory: number);
  deleteManyNewsCategory(idMembers: number[]);
}
