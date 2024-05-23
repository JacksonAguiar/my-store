import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional
  } from 'class-validator';
import { SaleItemDTO } from './saleItemDTO';

export class SaleDTO {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;

    @IsString()
    @IsNotEmpty()
    total: number;

    @IsNotEmpty()
    products: SaleItemDTO[];

    @IsNotEmpty()
    userId: string;

}