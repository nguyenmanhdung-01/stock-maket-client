import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { News, NewsCategory, Users } from 'src/utils/typeorm';
import { Services } from 'src/utils/contants';

@Module({
  imports: [TypeOrmModule.forFeature([News, Users, NewsCategory]), UsersModule],
  providers: [
    {
      provide: Services.NEWS,
      useClass: NewsService,
    },
  ],
  exports: [
    {
      provide: Services.NEWS,
      useClass: NewsService,
    },
  ],
  controllers: [NewsController],
})
export class NewsModule {}
