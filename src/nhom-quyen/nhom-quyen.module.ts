import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BangRoleGroup, RoleUser, Users } from 'src/utils/typeorm';
import { NhomQuyenController } from './nhom-quyen.controller';
import { Services } from 'src/utils/contants';
import { NhomQuyenService } from './nhom-quyen.service';

@Module({
  imports: [TypeOrmModule.forFeature([BangRoleGroup, RoleUser, Users])],
  controllers: [NhomQuyenController],
  providers: [
    {
      provide: Services.NHOMQUYEN,
      useClass: NhomQuyenService,
    },
  ],
  exports: [
    {
      provide: Services.NHOMQUYEN,
      useClass: NhomQuyenService,
    },
  ],
})
export class NhomQuyenModule {}
