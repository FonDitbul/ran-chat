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
import { UsersService } from '../users/users.service';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly usersService: UsersService,
  ) {}

  private logger = new Logger('chat');

  async handleConnection(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`connected : ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // this.logger.log(`disconnected : ${socket.id}`);
  }

  @SubscribeMessage('chatting')
  async handleChatting(
    @MessageBody() chat: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chatting = new chatEntity();
    chatting.userName = chat.userName;
    chatting.text = chat.text;

    await this.chatRepository.save(chatting);
    socket.broadcast.emit('chatting', {
      id: socket.id,
      userName: chat.userName,
      text: chat.text,
    });
  }

  @SubscribeMessage('userName')
  async handleUserInfo(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    await this.usersService.findOneByUserName(data.userName);
  }

  @SubscribeMessage('joinRoom') //공개 채팅방 join
  async handleJoin(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    await socket.join(data.roomID);
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
    socket.in(data.roomID).emit('recMsg', {
      userName: data.userName,
      text: data.text,
    });
  }

  // @SubscribeMessage('connection')
  // async handletest(@MessageBody() data, @ConnectedSocket() socket: Socket) {
  //   socket.on('joinRoom', function (room) {
  //     console.log(room);
  //   });
  //   socket.join
  // }

  // 입장 퇴장 코드
  /*
@SubscribeMessage('user_entry')
async handleUserEntry(@ConnectedSocket() socket: Socket) {
  const userName = socket.id;
  const text = '님이 입장하셨습니다.';

  const newUserEntry = new chatEntity();
  newUserEntry.userName = userName;
  newUserEntry.text = text;

  await this.chatRepository.save(newUserEntry).catch((error) => {
    throw new HttpException('Server ERROR', error);
  });
  socket.broadcast.emit('new_user', {
    id: socket.id,
    userName,
    text,
  });
}

@SubscribeMessage('user_exit')
async handleUserExit(@ConnectedSocket() socket: Socket) {
  const userName = socket.id;
  const text = '님이 퇴장하셨습니다.';

  const newUserDisconnect = new chatEntity();
  newUserDisconnect.userName = userName;
  newUserDisconnect.text = text;

  await this.chatRepository.save(newUserDisconnect).catch((error) => {
    throw new HttpException('Server ERROR', error);
  });
  socket.broadcast.emit('user_disconnect', {
    id: socket.id,
    userName,
    text,
  });
}
*/
}
