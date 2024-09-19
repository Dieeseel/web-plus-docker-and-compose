import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @Length(2, 30)
    username: string

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string

    @IsOptional()
    @IsString()
    @Length(0, 200)
    about: string

    @IsString()
    @IsUrl()
    @IsOptional()
    avatar: string
}