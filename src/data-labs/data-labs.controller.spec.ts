import { Test, TestingModule } from '@nestjs/testing';
import { DataLabsController } from './data-labs.controller';
import { DataLabsService } from './data-labs.service';

describe('DataLabsController', () => {
  let controller: DataLabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataLabsController],
      providers: [DataLabsService],
    }).compile();

    controller = module.get<DataLabsController>(DataLabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
