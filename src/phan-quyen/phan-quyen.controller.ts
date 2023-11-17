import { Controller, Inject, Get } from '@nestjs/common';
import { IPhanQuyen } from './phan-quyen';
import { Routes, Services } from './../utils/contants';

@Controller(Routes.PHANQUYEN)
export class PhanQuyenController {
  constructor(
    @Inject(Services.PHANQUYEN) private readonly phanQuyenService: IPhanQuyen,
  ) {}

  @Get('')
  async getAll() {
    const result = await this.phanQuyenService.getAll();
    return result;
  }
}
