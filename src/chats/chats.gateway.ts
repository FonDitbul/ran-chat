import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  private logger = new Logger('chat');

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id}`);
  }

  afterInit(server: any): any {
    this.logger.log('init');
  }

  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() temp: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const username = 'tempuser';
    socket.broadcast.emit('new_user', username);
    return username;
  }

  @SubscribeMessage('user_info')
  async handleChats(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    // socket.broadcast.emit('new_user', 'heyhey');
    return 'Hello world!';
  }

  @SubscribeMessage('chatting')
  async handleChatting(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    socket.broadcast.emit('chatting', data);
    return 'Hello world!';
  }
}
