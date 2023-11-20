import { Comments } from 'src/utils/typeorm';

export interface ICommentService {
  createComment(commentDetails: Partial<Comments>);
  getCommentByIdPost(id: number);
  editComment(commentEditDetails: any);
  getOneCommentById(id: number);
  getCommentsById(id: number);
  getUniqueCommentById(id: number);
  getChildComments(parentId: number);
  deleteManyComments(commentDeleteId: number[]);
  likeComment(id: number, userId: number);
}
