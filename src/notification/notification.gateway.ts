// notification.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway(3002, { cors: true })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly authService: AuthService) {}

  afterInit(socket: Socket) {
    console.log('WebSocket initialized');
  }

  // Xử lý các sự kiện từ client và broadcast tới tất cả các client khác
  @SubscribeMessage('likePost')
  handleLike(client: any, payload: any) {
    this.server.emit('likePost', payload); // Gửi thông điệp tới tất cả các client khác
  }

  async handleConnection(socket: Socket) {
    console.log('connection', socket);

    const authHeader = socket.handshake.headers.authorization;
    console.log('Auth header: ' + authHeader);

    if (authHeader && (authHeader as string).split('')[1]) {
      try {
        const id = await this.authService.validateToken(
          (authHeader as string).split('')[1],
        );
        socket.data = id;
      } catch (error) {}
    } else {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(socket.id, socket.data?.id);
  }

  // Tương tự, xử lý các sự kiện bình luận, trả lời bình luận
}
