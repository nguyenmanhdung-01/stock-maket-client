import { Notifications } from 'src/utils/typeorm';

export interface INotificationService {
  getAllNotifications(): Promise<any>;
  createNotification(data: any): Promise<Notifications>;
  seenNotification(id: number);
}
