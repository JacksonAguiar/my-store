import {
    IsString,
    IsEmail,
    IsNotEmpty
  } from 'class-validator';

export class SignInDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}