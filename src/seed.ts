import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BangRoleGroup, RoleUser, Users } from './utils/typeorm';
import { hashPassword } from './utils/helpers';

async function seedData(connection: Connection) {
  const defaultQuyen = [
    {
      QuyenID: 1,
      TenQuyen: 'Quản Lý Người Dùng',
    },
    {
      QuyenID: 2,
      QuyenIDCha: 1,
      TenQuyen: 'Khóa Tài Khoản Người Dùng',
    },
    {
      QuyenID: 3,
      QuyenIDCha: 1,
      TenQuyen: 'Mở Khóa Tài Khoản Người Dùng',
    },
    {
      QuyenID: 4,
      QuyenIDCha: 1,
      TenQuyen: 'Xóa Người Dùng',
    },
    {
      QuyenID: 5,
      TenQuyen: 'Quản Lý Danh Mục',
    },
    {
      QuyenID: 6,
      QuyenIDCha: 5,
      TenQuyen: 'Thêm Mới Danh Mục',
    },
    {
      QuyenID: 7,
      QuyenIDCha: 5,
      TenQuyen: 'Xóa Danh Mục',
    },
    {
      QuyenID: 8,
      QuyenIDCha: 5,
      TenQuyen: 'Chỉnh Sửa Danh Mục',
    },
    {
      QuyenID: 9,
      TenQuyen: 'Quản Lý Tin Tức',
    },
    {
      QuyenID: 10,
      QuyenIDCha: 9,
      TenQuyen: 'Thêm Mới Tin Tức',
    },
    {
      QuyenID: 11,
      QuyenIDCha: 9,
      TenQuyen: 'Xóa Tin Tức',
    },
    {
      QuyenID: 12,
      QuyenIDCha: 9,
      TenQuyen: 'Chỉnh Sửa Tin Tức',
    },
    {
      QuyenID: 13,
      TenQuyen: 'Quản Lý Liên Hệ',
    },
    {
      QuyenID: 14,
      QuyenIDCha: 13,
      TenQuyen: 'Trả Lời',
    },
    {
      QuyenID: 15,
      QuyenIDCha: 13,
      TenQuyen: 'Xóa',
    },
    {
      QuyenID: 16,
      QuyenIDCha: 13,
      TenQuyen: 'Thay Đổi Trạng Thái',
    },
    {
      QuyenID: 17,
      TenQuyen: 'Quản Lý Bài Viết',
    },
    {
      QuyenID: 18,
      QuyenIDCha: 17,
      TenQuyen: ' Xóa Bài Viết',
    },
    {
      QuyenID: 19,
      QuyenIDCha: 17,
      TenQuyen: 'Xóa Bình Luận Của Bài Viết',
    },
    {
      QuyenID: 20,
      TenQuyen: 'Truy cập trang quản trị',
    },
    {
      QuyenID: 21,
      QuyenIDCha: 20,
      TenQuyen: 'Truy cập',
    },
  ];
  const user = {
    TenDangNhap: 'admin',
    MatKhau: 'admin',
  };
  const idQuyen = defaultQuyen.map((item) => item.QuyenID);
  const bangRoleUserRepository = connection.getRepository(RoleUser);
  const bangRoleGroupRepository = connection.getRepository(BangRoleGroup);
  const userRespository = connection.getRepository(Users);

  try {
    console.log('Dữ liệu đã được seed thành công.');
    console.log('Tạo quyền thành công.');
    await Promise.all(
      defaultQuyen.map(async (tr) => {
        // Kiểm tra xem dữ liệu đã tồn tại hay chưa
        const existingQuyenID = await bangRoleUserRepository.findOne(
          tr.QuyenID,
        );

        if (!existingQuyenID) {
          // Nếu chưa tồn tại, thêm dữ liệu mới
          const roleUser = bangRoleUserRepository.create(tr);
          await bangRoleUserRepository.save(roleUser);
        }
      }),
    );

    const exisRoleAdmin = await bangRoleGroupRepository
      .createQueryBuilder('roleGroup')
      .where('roleGroup.TenNhomQuyen = :name', { name: 'admin' })
      .getOne();
    if (exisRoleAdmin) {
      exisRoleAdmin.NhomQuyen = JSON.stringify(idQuyen);
      await bangRoleGroupRepository.save(exisRoleAdmin);
    } else {
      const dataNhomQuyen = {
        TenNhomQuyen: 'ADMIN',
        NhomQuyen: JSON.stringify(idQuyen),
      };
      const nhomQuyen = await bangRoleGroupRepository.create(dataNhomQuyen);
      await bangRoleGroupRepository.save(nhomQuyen);
    }

    const existingUser = await userRespository.findOne({
      TenDangNhap: user.TenDangNhap,
    });
    if (!existingUser) {
      // Nếu người dùng chưa tồn tại, thêm người dùng mới
      const password = await hashPassword(user.MatKhau);
      const newUser = userRespository.create({
        ...user,
        MatKhau: password,
        RoleGroupID: 1,
      });
      await userRespository.save(newUser);
      // Handle logic sau khi thêm người dùng thành công
    } else {
      console.log('tài khoản admin đã tồn tại');
    }
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  }
}
async function main() {
  const app = await NestFactory.create(AppModule);

  const connection = app.get(Connection);

  // Chạy lệnh seedData để thêm dữ liệu vào bảng
  await seedData(connection);

  await app.close();
}

main();
