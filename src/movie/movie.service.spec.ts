import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();
    service = module.get<MovieService>(MovieService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
