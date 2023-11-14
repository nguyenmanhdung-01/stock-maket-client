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

  @Column()
  father_id: number;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  status: number;

  @Column()
  liked: number;
}
