import { Test, TestingModule } from '@nestjs/testing';
import { RandomChatController } from './random-chat.controller';

describe('RandomChatController', () => {
  let controller: RandomChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomChatController],
    }).compile();

    controller = module.get<RandomChatController>(RandomChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
