import { Test, TestingModule } from '@nestjs/testing';
import { RandomChatService } from './random-chat.service';

describe('RandomChatService', () => {
  let service: RandomChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomChatService],
    }).compile();

    service = module.get<RandomChatService>(RandomChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
