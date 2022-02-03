import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { RanDomChatQueue } from './random-chat.queue';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'random-chat' })
export class RandomChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');
  // 랜덤 채팅 대기 QUEUE
  private ranChatQueue = new RanDomChatQueue<string>();

  //socket 연결
  handleConnection(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`connected : ${socket.id}`);
    console.log(`connected : ${socket.id}`);
  }
  //socket 끊기
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`disconnected : ${socket.id}`);
    console.log(`disconnected : ${socket.id}`);
  }
  //유저 매칭
  @SubscribeMessage('matchingUser')
  async matchUser(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    if (this.ranChatQueue.isEmpty) {
      this.ranChatQueue.enqueue(socket.id);
      // await socket.leave(socket.id);
      await socket.join('ran-chat-' + socket.id);
      console.log('firstroom', socket.rooms);
      return;
    }
    const otherUser = this.ranChatQueue.dequeue();
    await socket.join('ran-chat-' + otherUser);
    socket
      .in('ran-chat-' + otherUser)
      .emit('randomUserEntry', { room: otherUser });
    return socket.emit('randomUserEntry', { room: otherUser });
  }
  //메시지 전송
  @SubscribeMessage('reqMsg')
  async handleMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log(socket.rooms);
    return socket.in('ran-chat-' + data.room).emit('recMsg', {
      text: data.text,
    });
  }
}
