import { Test } from '@nestjs/testing';
import { ApiCompaniesApiController } from './api-companies-api.controller';

describe('ApiCompaniesApiController', () => {
  let controller: ApiCompaniesApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiCompaniesApiController],
    }).compile();

    controller = module.get(ApiCompaniesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
