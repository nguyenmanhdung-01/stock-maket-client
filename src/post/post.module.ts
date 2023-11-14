import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments, Posts, Users } from 'src/utils/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/contants';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users, Comments]), UsersModule],
  providers: [
    {
      provide: Services.POST,
      useClass: PostService,
    },
  ],
  exports: [
    {
      provide: Services.POST,
      useClass: PostService,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
