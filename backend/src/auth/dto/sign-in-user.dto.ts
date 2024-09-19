import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 30)
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}