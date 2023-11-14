import { Module } from '@nestjs/common';
import { NewscategoryController } from './newscategory.controller';
import { NewscategoryService } from './newscategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News, NewsCategory } from 'src/utils/typeorm';
import { Services } from 'src/utils/contants';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategory, News]), NewsModule],
  controllers: [NewscategoryController],
  providers: [
    {
      provide: Services.NEWSCATEGORY,
      useClass: NewscategoryService,
    },
  ],
})
export class NewscategoryModule {}
