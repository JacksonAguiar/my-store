import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional
  } from 'class-validator';

export class ProductDTO {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    image?: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;
}