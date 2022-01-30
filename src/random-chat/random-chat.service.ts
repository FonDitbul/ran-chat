import { Injectable } from '@nestjs/common';

class Queue {}

@Injectable()
export class RandomChatService {
  Matching = new Queue();
  createQueue() {
    // 매칭 큐넣기
  }
  popQ() {
    //매칭 하기
  }
  emptyQ() {
    // 요청 유저가 없을때 대기
  }
}
