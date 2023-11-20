import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/utils/typeorm';
import { Services } from 'src/utils/contants';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), AuthModule],
  controllers: [CommentController],
  providers: [
    {
      provide: Services.COMMENT,
      useClass: CommentService,
    },
  ],
})
export class CommentModule {}
