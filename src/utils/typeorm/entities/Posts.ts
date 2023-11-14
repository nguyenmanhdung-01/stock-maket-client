import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeUpdate,
} from 'typeorm';
import { Users } from './Users';
import { Comments } from './Comments';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  post_id: number;

  @ManyToOne(() => Users, { eager: true })
  user: Users;

  @Column()
  title: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  update_at: Date;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true, type: 'longtext' })
  image: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: false })
  IsRemoved: boolean;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];

  @BeforeUpdate()
  updateTimestamps() {
    this.update_at = new Date();
  }
}
