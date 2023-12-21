import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  user: any;

  @Column({ type: 'json', nullable: true })
  post: any;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @Column()
  message: string;

  @Column({ nullable: true })
  recipientId: string;

  @Column({ nullable: true })
  link: string;

  @Column({ default: false })
  watched: boolean;
}
