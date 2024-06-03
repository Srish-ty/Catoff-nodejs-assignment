import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { createUser, deleteUser} from './controllers/users.controllers'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    return this.appService.getHello();
  }

  @Get('/api')
  getAPI(){
    return {"name":"Dolly", "age":19}
  }

  @Get('/create/:id')
  createUser(@Param('id') id: number) { 
    return createUser(id); 
  }
}
