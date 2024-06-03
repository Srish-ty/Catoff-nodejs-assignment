import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js'; // Assuming the controller file is a JavaScript file

describe('AppController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
