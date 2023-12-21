import { Controller, Inject, Get, Put, Param } from '@nestjs/common';
import { INotificationService } from './notification';
import { Routes, Services } from 'src/utils/contants';

@Controller(Routes.NOTIFICATION)
export class NotificationController {
  constructor(
    @Inject(Services.NOTIFICATION)
    private readonly notificationService: INotificationService,
  ) {}

  @Get('')
  async getNotifications(): Promise<any> {
    try {
      return await this.notificationService.getAllNotifications();
    } catch (error) {
      console.log('lỗi', error.message);
    }
  }

  @Put('watch/:id')
  async watchNotify(@Param() id: number) {
    return await this.notificationService.seenNotification(id);
  }
}
