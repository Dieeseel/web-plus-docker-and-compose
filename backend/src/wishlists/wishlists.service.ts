import { BadRequestException, Injectable } from '@nestjs/common';
import { Wishlist } from './entities/wishlists.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
    constructor(
        @InjectRepository(Wishlist)
        private readonly wishListsRepository: Repository<Wishlist>,
        private readonly wishService: WishesService
    ) {}

    findAllWishlists(): Promise<Wishlist[]> {
        return this.wishListsRepository.find()
    }

    findWishlistById(id: number) {
        return this.wishListsRepository.findOne({
            where: {
                id: id
            },
            relations: ['owner', 'items'],
        })
    }

    async addWishlist(createWishlistDto: CreateWishlistDto, user: User) {
        const wishes = await this.wishService.find({
            where: { id: In (createWishlistDto.itemsId) },
          })

        return this.wishListsRepository.save({...createWishlistDto, items: wishes, owner: user})
    }

    async deleteWishlist(id: number, user: User) {
        const wishlist = await this.wishListsRepository.findOne({
            where: {
                id: id
            },
            relations: ['owner'],
        })
        
        if (!wishlist) {
            throw new BadRequestException('Коллекции с таким id не существует')
        }

        if (user.id !== wishlist.owner.id) {
            throw new BadRequestException('Попытка удалить чужую коллекцию')
        }

        return this.wishListsRepository.delete({ id })
    }
}
