import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from './Contact';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.replies)
  contact: Contact;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
