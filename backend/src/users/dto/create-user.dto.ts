import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 30)
    username: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsOptional()
    @IsString()
    @Length(0, 200)
    about: string

    @IsOptional()
    @IsString()
    @IsUrl()
    avatar: string
}