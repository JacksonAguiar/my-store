import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional
  } from 'class-validator';

export class SaleItemDTO {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}