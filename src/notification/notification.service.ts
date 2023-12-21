import { Injectable } from '@nestjs/common';
import { INotificationService } from './notification';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepository: Repository<Notifications>,
  ) {}

  async getAllNotifications(): Promise<any> {
    try {
      const notifications = await this.notificationRepository.find({
        order: { time: 'DESC' },
      });
      if (Array.isArray(notifications)) {
        return notifications;
      } else {
        console.log('Dữ liệu không phải là mảng:', notifications);
        // Xử lý lỗi hoặc trả về giá trị mặc định tại đây
      }
    } catch (error) {
      console.log('Lỗi:', error.message);
      // Xử lý lỗi tại đây
    }
  }

  async createNotification(data: any): Promise<Notifications> {
    const newNotifications = new Notifications();
    newNotifications.user = data.user;
    newNotifications.post = data.post;
    newNotifications.message = data.message;
    newNotifications.recipientId = data.recipientId;
    newNotifications.link = data.link;

    const newNotification =
      await this.notificationRepository.save(newNotifications);

    return newNotification;
  }

  async seenNotification(id: number) {
    await this.notificationRepository.update(id, { watched: true });

    const notification = await this.notificationRepository.findOne(id);
    return notification;
  }
}
