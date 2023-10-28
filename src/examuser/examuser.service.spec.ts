import { Test, TestingModule } from '@nestjs/testing';
import { ExamuserService } from './examuser.service';

describe('ExamuserService', () => {
  let service: ExamuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamuserService],
    }).compile();

    service = module.get<ExamuserService>(ExamuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
