import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RiderEntity } from '../entities/rider-entity';
import { RiderTransactionEntity } from '../entities/rider-transaction.entity';
import { RiderWalletEntity } from '../entities/rider-wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SharedRiderService {
  constructor(
    @InjectRepository(RiderEntity) private repo: Repository<RiderEntity>,
    @InjectRepository(RiderWalletEntity) private riderWalletRepo: Repository<RiderWalletEntity>,
    @InjectRepository(RiderTransactionEntity) private riderTransactionRepo: Repository<RiderTransactionEntity>,
  ) { }

  async findById(id: number): Promise<RiderEntity> {
    return this.repo.findOneOrFail(id, { withDeleted: true });
  }

  private async findUserByMobileNumber(mobileNumber: string): Promise<RiderEntity | undefined> {
    return this.repo.findOne({ where: { mobileNumber }, withDeleted: true });
  }

  private async createUserWithMobileNumber(mobileNumber: string): Promise<RiderEntity> {
    const addResult = await this.repo.save({
      mobileNumber: mobileNumber,
    });
    return addResult;
  }

  async findOrCreateUserWithMobileNumber(
    mobileNumber: string
  ): Promise<RiderEntity> {
    const findResult = await this.findUserByMobileNumber(mobileNumber);
    if(findResult?.deletedAt != null) {
      await this.repo.restore(findResult?.id);
    }
    if (findResult == null) {
      return await this.createUserWithMobileNumber(mobileNumber);
    } else {
      return findResult;
    }
  }

  async deleteById(id: number): Promise<RiderEntity> {
    const user = await this.findById(id);
    await this.repo.softDelete(id);
    return user;
  }

  async getRiderCreditInCurrency(riderId: number, currency: string) {
    const wallet = await this.riderWalletRepo.findOne({ riderId, currency });
    return (wallet?.balance ?? 0);
  }

  async rechargeWallet(transaction: Pick<RiderTransactionEntity, 'status' | 'action' | 'rechargeType' | 'deductType' | 'amount' | 'currency' | 'riderId' | 'requestId' | 'operatorId' | 'paymentGatewayId' | 'refrenceNumber' | 'description' | 'giftCardId'>): Promise<RiderWalletEntity> {
    let wallet = await this.riderWalletRepo.findOne({ riderId: transaction.riderId, currency: transaction.currency });
    if (wallet == null) {
      wallet = await this.riderWalletRepo.save({ balance: transaction.amount, currency: transaction.currency, riderId: transaction.riderId });
    } else {
      await this.riderWalletRepo.update(wallet.id, { balance: transaction.amount + wallet.balance });
      wallet.balance += transaction.amount;
    }
    this.riderTransactionRepo.save(transaction);
    return wallet;
  }
}

