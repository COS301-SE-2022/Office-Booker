import { Test, TestingModule } from '@nestjs/testing';

import { MailService } from './mail.service';

describe('AppController', () => {
  let service: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get(MailService);
  });

  describe('getData', () => {
    it('should be defined', () => {
      expect(service).toBeTruthy();
    });
  });
});
