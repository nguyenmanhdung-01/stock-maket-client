import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleUser } from 'src/utils/typeorm';
import { IPhanQuyen } from './phan-quyen';

@Injectable()
export class PhanQuyenService implements IPhanQuyen {
  constructor(
    @InjectRepository(RoleUser)
    private readonly bangRoleUserRepository: Repository<RoleUser>,
  ) {}

  async getAll() {
    const result = await this.bangRoleUserRepository
      .createQueryBuilder('phanQuyen')
      .getMany();
    return result;
  }
}
