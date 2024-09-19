import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Like, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashValue } from 'src/utils/utils';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOne(query: FindOneOptions<User>) {
        try {
            const user = await this.userRepository.findOneOrFail(query)
            return user
        } catch (error) {
            throw new UnauthorizedException('Пользователь не найден')
        }
    }
    
    findOneById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id })
    }
    
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create({
                ...createUserDto,
                password: await hashValue(createUserDto.password)
            })
            return this.userRepository.save(user)
        } catch (error) {
            throw new ConflictException('Введенный username или email уже зарегестрированы')
        }
    }

    async updateMe(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOneById(id)
        const { password } = updateUserDto

        if (password) {
            updateUserDto.password = await hashValue(password)
        }
        
        try {
            return await this.userRepository.save({...user, ...updateUserDto})
        } catch (error) {
            throw new ConflictException('Введенный username или email уже зарегестрированы')
        }

    }

    findManyUsers(query: string) {
        const users = this.userRepository.find({
            where: [
                { username: Like(`%${query}%`) },
                { email: Like(`%${query}%`) },
            ],
          })
        return users
    }

    async findMyWishes(id: number) {
        const { wishes } = await this.userRepository.findOne({
            where: { id },
            relations: ['wishes', 'offers'],
        })
        return wishes
    }

    async findUserWishes(username: string) {
        const { wishes } = await this.findOne({ 
            where: { username },
            relations: ['wishes', 'offers'],
        })

        return wishes
    }
}
