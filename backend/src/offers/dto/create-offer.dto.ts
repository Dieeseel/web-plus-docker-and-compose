import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateOfferDto {
    @IsNotEmpty()
    user: User

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    @IsNumber()
    item_id: number

    @IsBoolean()
    hidden: boolean
}