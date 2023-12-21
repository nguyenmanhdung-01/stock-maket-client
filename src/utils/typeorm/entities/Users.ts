import {
  JoinColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { BangRoleGroup } from './BangRoleGroup';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BangRoleGroup)
  @JoinColumn({ name: 'RoleGroupID' })
  @Column({ nullable: true })
  RoleGroupID: number;

  @Column()
  TenDangNhap: string;

  @Column({ nullable: true })
  HoVaTen: string;

  @Column({ nullable: true })
  Email: string;

  @Column()
  MatKhau: string;

  @Column({ nullable: true })
  GioiTinh: number;

  @Column({ nullable: true })
  NgaySinh: Date;

  @Column({ nullable: true })
  SĐT: string;

  @Column({ nullable: true })
  Avatar: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  NgayTao: Date;

  @Column({ default: 0 })
  status: number;

  @Column('json', { nullable: true })
  news_ids: any;

  @Column({ type: 'boolean', default: false, nullable: true })
  IsRemoved: boolean;
}
