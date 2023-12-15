import { Test, TestingModule } from '@nestjs/testing';
import { DataLabsService } from './data-labs.service';

describe('DataLabsService', () => {
  let service: DataLabsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataLabsService],
    }).compile();

    service = module.get<DataLabsService>(DataLabsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
