import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { ReplyModule } from './reply/reply.module';
import { MailModule } from './mail/mail.module';
import { NewscategoryModule } from './newscategory/newscategory.module';
import { NewsModule } from './news/news.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PhanQuyenModule } from './phan-quyen/phan-quyen.module';
import { NhomQuyenModule } from './nhom-quyen/nhom-quyen.module';
import entities from './utils/typeorm';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities,
      logging: false,
    }),
    AuthModule,
    UsersModule,
    ContactModule,
    ReplyModule,
    MailModule,
    NewscategoryModule,
    NewsModule,
    PostModule,
    CommentModule,
    PhanQuyenModule,
    NhomQuyenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
