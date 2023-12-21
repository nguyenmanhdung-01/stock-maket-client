import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';

import { Server, Socket } from 'socket.io';
import { Services } from 'src/utils/contants';
import { INotificationService } from './notification';

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    @Inject(Services.NOTIFICATION)
    private readonly notificationService: INotificationService,
  ) {}
  afterInit() {
    console.log('WebSocket initialized');
  }

  @SubscribeMessage('likePost')
  async handleLike(client: Socket, payload: any) {
    // console.log('Received likePost from client:', payload);

    // Xử lý payload và gửi lại thông báo đến tất cả client khác
    try {
      const newNotification =
        await this.notificationService.createNotification(payload);
      this.server.emit('likePost', newNotification);
    } catch (error) {
      console.log(error.message);
    }
  }

  @SubscribeMessage('replyPost')
  async handleReplyPost(client: Socket, payload: any) {
    // console.log('replyPost', payload);

    try {
      const newNotification =
        await this.notificationService.createNotification(payload);
      this.server.emit('replyPost', newNotification);
    } catch (error) {
      console.log(error.message);
    }
  }

  @SubscribeMessage('commentPost')
  async handleCommentPost(client: Socket, payload: any) {
    // console.log('replyPost', payload);

    try {
      const newNotification =
        await this.notificationService.createNotification(payload);
      this.server.emit('commentPost', newNotification);
    } catch (error) {
      console.log(error.message);
    }
  }

  @SubscribeMessage('createPost')
  async handleCreatePost(client: Socket, payload: any) {
    // console.log('createPost', payload);

    const { recipients, ...otherData } = payload;
    // console.log('createPost', recipients);

    for (const recipientId of recipients) {
      const data = { recipientId, ...otherData };
      const newNotification =
        await this.notificationService.createNotification(data);
      this.server.emit('createPost', newNotification);
    }
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}
