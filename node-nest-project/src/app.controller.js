const { Controller, Get } = require('@nestjs/common');
const { AppService } = require('./app.service');

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

