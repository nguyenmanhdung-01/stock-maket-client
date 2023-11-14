import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoleUser {
  @PrimaryGeneratedColumn()
  QuyenID: number;

  @Column()
  TenQuyen: string;
}
