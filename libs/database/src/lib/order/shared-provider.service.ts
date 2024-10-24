import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderTransactionEntity } from '../entities/provider-transaction.entity';
import { ProviderWalletEntity } from '../entities/provider-wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SharedProviderService {
    constructor(
        @InjectRepository(ProviderWalletEntity)
        private providerWalletRepo: Repository<ProviderWalletEntity>,
        @InjectRepository(ProviderTransactionEntity)
        private providerTransactionRepo: Repository<ProviderTransactionEntity>
    ) { }

    async rechargeWallet(transaction: Pick<ProviderTransactionEntity, 'action' | 'rechargeType' | 'deductType' | 'amount' | 'currency' | 'requestId' | 'operatorId' | 'refrenceNumber' | 'description'>) {
        let wallet = await this.providerWalletRepo.findOne({ currency: transaction.currency });
        if (wallet == null) {
            wallet = await this.providerWalletRepo.save({ balance: transaction.amount, currency: transaction.currency });
        } else {
            await this.providerWalletRepo.update(wallet.id, { balance: transaction.amount + wallet.balance });
            wallet.balance += transaction.amount;
        }
        if(transaction.amount != 0) {
            Logger.log(`Saving transaction ${JSON.stringify(transaction)}`);
            this.providerTransactionRepo.save(transaction);
        }
        return wallet;
    }
}