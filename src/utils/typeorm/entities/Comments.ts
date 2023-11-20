import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Posts } from './Posts';
import { Users } from './Users';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Posts)
  post: Posts;

  @ManyToOne(() => Users)
  user: Users;

  @Column({ nullable: true })
  father_id: number;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: false })
  status: number;

  @Column({ default: 0 })
  liked: number;

  @Column('json', { nullable: true })
  likedUsers: any;
}
