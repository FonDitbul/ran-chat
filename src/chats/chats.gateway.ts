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
import { HttpException, Logger } from '@nestjs/common';
import { ChatRepository } from './chats.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { chatEntity } from './entities/history-chat.entity';
@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatRepository: ChatRepository) {}
  private logger = new Logger('chat');

  async handleConnection(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`connected : ${socket.id}`);
    await this.handleUserEntry(socket);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`disconnected : ${socket.id}`);
    await this.handleUserExit(socket);
  }

  afterInit(server: any): any {
    // this.logger.log('init');
  }

  @SubscribeMessage('user_entry')
  async handleUserEntry(@ConnectedSocket() socket: Socket) {
    const newUserEntry = new chatEntity();
    newUserEntry.username = socket.id;
    newUserEntry.text = '님이 입장하셨습니다.';

    await this.chatRepository.save(newUserEntry).catch((error) => {
      throw new HttpException('Server ERROR', error);
    });
    socket.broadcast.emit('new_user', socket.id);
  }

  @SubscribeMessage('user_exit')
  async handleUserExit(@ConnectedSocket() socket: Socket) {
    const newUserDisconnect = new chatEntity();
    newUserDisconnect.username = socket.id;
    newUserDisconnect.text = '님이 퇴장하셨습니다.';

    await this.chatRepository.save(newUserDisconnect);
    socket.broadcast.emit('user_disconnect', socket.id);
  }

  @SubscribeMessage('chatting')
  async handleChatting(
    @MessageBody() chat: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chatting = new chatEntity();
    chatting.username = chat.username;
    chatting.text = chat.text;

    await this.chatRepository.save(chatting);

    socket.broadcast.emit('chatting', {
      id: socket.id,
      text: chat,
    });
  }

  @SubscribeMessage('username')
  async handleUserInfo(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log(data);
  }
}
