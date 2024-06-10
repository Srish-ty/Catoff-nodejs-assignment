import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { WalletAddress } from './wallets/entities/wallet-address.entity';


import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, WalletAddress],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    WalletsModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
