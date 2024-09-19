import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareValue } from 'src/utils/utils';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
      ) {}

    async signUp(newUser: CreateUserDto) {
        try {
            const user = await this.usersService.create(newUser)
            delete user.password
            
            return user
        } catch (error) {
            throw new ConflictException('Введенный username или email уже зарегестрированы')
        }
    }

    signIn(user: User) {
        const payload = { sub: user.id };

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne({
            select: { username: true, password: true, id: true },
            where: { username }
        })

        const isPasswordCorrect = await compareValue(password, user.password)

        if (!isPasswordCorrect || !user) {
            throw new UnauthorizedException('Некорректная пара логин и пароль')
        }
        
        return user
    }
}
