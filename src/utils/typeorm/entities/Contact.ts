import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reply } from './Reply';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  contact_id: number;

  @Column()
  topic: string;

  @Column()
  username: string;

  @Column()
  title: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: 0 })
  status: number;

  @OneToMany(() => Reply, (reply) => reply.contact)
  replies: Reply[];
}
