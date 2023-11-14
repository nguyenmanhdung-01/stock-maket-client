import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { ICommentService } from './comment';

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async createComment(commentDetails: Partial<Comments>) {
    const createComment = await this.commentRepository.create(commentDetails);
    const savedComment = await this.commentRepository.save(createComment);
    return savedComment;
  }

  async getCommentByIdPost(id: number) {
    const getComment = await this.commentRepository.find({
      where: { post: id },
      relations: ['user'],
    });

    return getComment;
  }

  async getOneCommentById(id: number) {
    const query = this.commentRepository.createQueryBuilder('comment');
    query.where('comment.id = :id OR comment.father_id = :id', {
      id,
    });
    const comments = await query.getMany();
    return comments;
  }

  async editComment(commentEditDetails: any) {
    const checkComment = await this.commentRepository.findOne({
      id: commentEditDetails.id,
    });
    if (!checkComment) {
      throw new HttpException(
        'Không tìm thấy bình luận',
        HttpStatus.BAD_REQUEST,
      );
    }
    checkComment.content = commentEditDetails.content;
    return await this.commentRepository.save(checkComment);
  }

  async getCommentsById(id: number): Promise<Comments[]> {
    const query = this.commentRepository.createQueryBuilder('comment');
    query.where('comment.id = :id', { id });
    const comment = await query.getOne();

    if (!comment) {
      return []; // Trả về mảng rỗng nếu không tìm thấy comment
    }

    const childComments = await this.getChildComments(comment.id);

    return [comment, ...childComments];
  }

  async getChildComments(parentId: number): Promise<Comments[]> {
    const query = this.commentRepository.createQueryBuilder('comment');
    query.where('comment.father_id = :parentId', { parentId });
    const comments = await query.getMany();

    const childComments: Comments[] = [];
    for (const comment of comments) {
      const subComments = await this.getChildComments(comment.id);
      childComments.push(comment, ...subComments);
    }

    return childComments;
  }

  async deleteManyComments(commentDeleteId: number[]) {
    const deletedManyEvent = await this.commentRepository
      .createQueryBuilder()
      .delete()
      .where('id IN (:...commentDeleteId)', { commentDeleteId })
      .execute();
    return deletedManyEvent;
  }

  async getUniqueCommentById(id: number) {
    const result = await this.commentRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    return result;
  }
}
