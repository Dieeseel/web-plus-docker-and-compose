import { BadRequestException, Injectable } from '@nestjs/common';
import { Wish } from './entities/wishes.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';


@Injectable()
export class WishesService {
    constructor(
        @InjectRepository(Wish)
        private readonly wishRepository: Repository<Wish>,
        private readonly userService: UsersService
    ) {}

    async addWish(user: User, wish: CreateWishDto) {
        const owner = await this.userService.findOneById(user.id)
        this.wishRepository.save({
            ...wish,
            owner: owner
        }) 

        return null
    }

    async find(query: FindManyOptions<Wish>): Promise<Wish[]> {
        const wishes = await this.wishRepository.find(query)
        return wishes
    }

    async findOne(id: number): Promise<Wish| null> {
        const wish = await this.wishRepository.findOne({
            where: {
                id: id
            },
            relations: ['owner'],
        })
        return wish
    }

    async findTopWishes() {
        const wishes = await this.wishRepository.find({
            relations: ['owner'],
            order: { copied: 'DESC' },
            take: 40,
        })
        return wishes
    }
    
    async findLastWishes() {
        const wishes = await this.wishRepository.find({
            relations: ['owner'],
            order: { createdAt: 'DESC' },
            take: 10,
        })
        return wishes
    }
    
    async updateWish(id: number, user: User, data) {
        const wish = await this.findOne(id)
        
        if (!wish) {
            throw new BadRequestException('Такого подарка не существует');
        }
        else if (user.id !==  wish.owner.id) {
            throw new BadRequestException('Попытка изменить данные подарка другого пользователя')
        }

        return this.wishRepository.save({...wish, ...data})
    }


    async copyWish(id: number, user: User) {
        const wish = await this.findOne(id)
        const ownerWishes = await this.userService.findMyWishes(user.id)

        if (!wish) {
            throw new BadRequestException('Такого подарка не существует');
        }
        
        if (ownerWishes.find((ownerWish) => {
            return ownerWish.name === wish.name && ownerWish.link === wish.link &&
                   ownerWish.image === wish.image && ownerWish.price === wish.price &&
                   ownerWish.description === wish.description
        },
          )) {
            throw new BadRequestException('Попытка повторного копирования');
        }
        const newWish = {
            name: wish.name,
            link: wish.link,
            image: wish.image,
            price: wish.price,
            description: wish.description,
        }

        this.addWish(user, newWish)
        await this.wishRepository.update({ id }, {copied: wish.copied + 1});
        return null
    }

    async deleteWish(id: number, user: User) {
        const wish: Wish = await this.wishRepository.findOne({
            where: {
                id: id
            },
            relations: ['owner'],
        })
        
        if (user.id !== wish.owner.id) {
            throw new BadRequestException('Попытка удалить чужую карточку')
        }

        return this.wishRepository.delete({ id })
    }

    async updateRaised(id: number, amount: number) {
        return this.wishRepository.update({ id }, { raised: amount })
    }
}
