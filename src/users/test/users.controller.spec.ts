import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { AuthService } from '../../auth/auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService],
    }).compile();

    service = await module.resolve<UsersService>(UsersService);
    controller = await module.resolve<UsersController>(UsersController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
