import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUser } from 'src/utils/typeorm';
import { PhanQuyenController } from './phan-quyen.controller';
import { Services } from 'src/utils/contants';
import { PhanQuyenService } from './phan-quyen.service';
@Module({
  imports: [TypeOrmModule.forFeature([RoleUser])],
  controllers: [PhanQuyenController],
  providers: [
    {
      provide: Services.PHANQUYEN,
      useClass: PhanQuyenService,
    },
  ],
  exports: [
    {
      provide: Services.PHANQUYEN,
      useClass: PhanQuyenService,
    },
  ],
})
export class PhanQuyenModule {}
