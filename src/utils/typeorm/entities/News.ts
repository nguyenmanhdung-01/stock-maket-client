import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeUpdate,
} from 'typeorm';
import { Users } from './Users';
import { NewsCategory } from './NewsCategory';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  news_id: number;

  @ManyToOne(() => NewsCategory)
  news_category: NewsCategory;

  @ManyToOne(() => Users)
  user: Users;

  @Column()
  title: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  update_at: Date;

  @Column({ type: 'longtext' })
  subcontent: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true, type: 'longtext' })
  image: string;

  @Column({ default: 0 })
  view: number;

  @Column({ default: false })
  status: boolean;

  @Column()
  slug: string;

  @Column()
  source: string;

  @Column({ type: 'datetime', nullable: true }) // Kiểu dữ liệu DATETIME trong MySQL
  lastViewedAt: Date;

  @BeforeUpdate()
  updateTimestamps() {
    this.update_at = new Date();
  }
}
