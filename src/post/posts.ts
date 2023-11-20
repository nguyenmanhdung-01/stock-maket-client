import { CreatePostDto } from './dtos/CreatePostDto.dtos';

export interface IPostService {
  getAllPosts(status: string, page: number, pageSize: number);
  getAllPost();
  getPostById(id: number);
  getUserPosts(userId: number);
  // getPostBySlug(slug: string);
  createPost(postParams: CreatePostDto, userId: number);
  deletePost(id: number);
  deleteMultiple(ids: number[]);
  //paginationPost(page: number, pageSize: number): Promise<NewsPost[]>;
  likeComment(id: number, userId: number);
}
