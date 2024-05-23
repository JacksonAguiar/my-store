import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsBoolean
  } from 'class-validator';

export class UserDTO {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsBoolean()
    isAdmin: boolean = false;

    @IsString()
    @IsNotEmpty()
    password: string;

}