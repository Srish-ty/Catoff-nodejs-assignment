import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(appService) {
    this.appService = AppService;
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
