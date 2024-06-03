import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppController } from './app/app.controller';
import { AppModule } from './app/app.module';

@Module({
  imports: [AppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
