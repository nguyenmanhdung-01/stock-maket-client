// src/entities/bang-role-group.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BangRoleGroup {
  @PrimaryGeneratedColumn()
  RoleGroupID: number;

  @Column()
  TenNhomQuyen: string;

  @Column()
  NhomQuyen: string;
}
