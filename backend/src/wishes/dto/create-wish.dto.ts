import { IsNumber, IsOptional, IsString, IsUrl, Length,  } from "class-validator";

export class CreateWishDto {
    @IsString()
    name: string
    
    @IsString()
    @IsUrl()
    link: string

    @IsString()
    @IsUrl()
    image: string

    @IsNumber()
    price: number


    @IsString()
    @IsOptional()
    @Length(0, 1024)
    description: string
}
