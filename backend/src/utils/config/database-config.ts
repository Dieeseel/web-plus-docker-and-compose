import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Offer } from "src/offers/entities/offers.entity";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wishes.entity";
import { Wishlist } from "src/wishlists/entities/wishlists.entity";


@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      entities: [User, Offer, Wish, Wishlist],
      synchronize: true,
    };
  }
}