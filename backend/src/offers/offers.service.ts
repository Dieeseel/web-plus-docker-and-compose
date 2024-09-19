import { BadRequestException, Injectable } from '@nestjs/common';
import { Offer } from './entities/offers.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from 'src/users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer)
        private readonly offerRepository: Repository<Offer>,
        private readonly wishService: WishesService
    ) {}

    findAllOffer() {
        return this.offerRepository.find()
    }

    findOneOffer(id: number) {
        return this.offerRepository.findOneBy({ id })
    }

    async addOffer(data: CreateOfferDto, user: User): Promise<Offer> {
        const wish = await this.wishService.findOne(data.item_id)
        const newAmount = Number(wish.raised) + Number(data.amount)
        
        if (wish.owner.id === user.id) {
            throw new BadRequestException('Попытка создать оффер на свой же собственный подарок')
        } else if (wish.price < Number(wish.raised) + Number(data.amount)) {
            throw new BadRequestException('Сумма оффера превышает порог цены')
        }

        this.wishService.updateRaised(wish.id, newAmount)
        return this.offerRepository.save({ user: user, item: wish, amount: data.amount })
    }
}
