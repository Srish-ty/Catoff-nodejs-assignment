import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletAddress } from './entities/wallet-address.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletsRepository: Repository<WalletAddress>,
  ) {}

  create(createWalletDto: CreateWalletDto): Promise<WalletAddress> {
    const wallet = this.walletsRepository.create(createWalletDto);
    return this.walletsRepository.save(wallet);
  }

  findAll(): Promise<WalletAddress[]> {
    return this.walletsRepository.find();
  }

  async findOne(id: number): Promise<WalletAddress> {
    const wallet = await this.walletsRepository.findOneBy({ id });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    }
    return wallet;
  }

  async update(id: number, updateWalletDto: UpdateWalletDto): Promise<WalletAddress> {
    await this.walletsRepository.update(id, updateWalletDto);
    const updatedWallet = await this.walletsRepository.findOneBy({ id });
    if (!updatedWallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    }
    return updatedWallet;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.walletsRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    }
  }
}
