// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository'; // Import UserRepository

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])], // Import UserRepository into TypeOrmModule
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
