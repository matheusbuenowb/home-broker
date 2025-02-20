import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {

  constructor(@InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
  @InjectModel(WalletAsset.name) private walletAssetSchema: Model<WalletAsset>
){

  }


  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(symbol: string) {
    return this.walletSchema.findOne({symbol});
  }


  createWalletAsset(data: {
      walletId: string; 
      assetId: string;
      shares: number;
    }) {

      return this.walletAssetSchema.create({
        wallet: data.walletId,
        asset: data.assetId,
        shares: data.shares,
      })
    }
    
}
