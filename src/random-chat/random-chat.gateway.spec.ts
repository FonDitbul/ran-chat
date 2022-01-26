import { Test, TestingModule } from '@nestjs/testing';
import { RandomChatGateway } from './random-chat.gateway';

describe('RandomChatGateway', () => {
  let gateway: RandomChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomChatGateway],
    }).compile();

    gateway = module.get<RandomChatGateway>(RandomChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
