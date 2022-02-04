import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatRepository } from './chats.repository';
import { chatEntity } from './entities/history-chat.entity';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatRepository: ChatRepository) {}

  private logger = new Logger('chat');
  private prefixRoom = 'publicRoom-';

  async handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`disconnected : ${socket.id}`);
  }

  @SubscribeMessage('joinRoom') //공개 채팅방 join
  async handleJoinRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    await socket.join(this.prefixRoom + data.roomID);
  }

  @SubscribeMessage('leaveRoom') //공개 채팅방 leave
  async handleLeaveRoom(
    @MessageBody() data,
    @ConnectedSocket() socket: Socket,
  ) {
    await socket.leave(this.prefixRoom + data.roomID);
  }

  @SubscribeMessage('reqMsg') //공개 채팅방 데이터 주고 받기
  async handleRequest(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const chatting = new chatEntity();
    chatting.roomID = +data.roomID;
    chatting.uid = data.uid;
    chatting.userName = data.userName;
    chatting.text = data.text;
    await this.chatRepository.save(chatting).catch((error) => {
      this.logger.log(`error : ${error}`);
    });
    socket.in(this.prefixRoom + data.roomID).emit('recMsg', {
      userName: data.userName,
      text: data.text,
    });
  }
}
