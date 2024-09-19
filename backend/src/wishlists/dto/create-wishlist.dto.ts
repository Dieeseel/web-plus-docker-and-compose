import { IsArray, IsNotEmpty, IsUrl, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateWishlistDto {
    @Length(1, 250)
    @IsNotEmpty()
    name: string

    @IsUrl()
    @IsNotEmpty()
    image: string

    owner: User

    @IsArray()
    itemsId: number[]
}