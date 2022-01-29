import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator'

//Customer registration Data Transfer Object used on DB.
export class RegisterCustomerDTO implements Readonly<RegisterCustomerDTO>{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    address: string | null;

    @IsOptional()
    @IsString()
    city: string | null;

    @IsOptional()
    @IsString()
    zipCode: string | null;

    @IsOptional()
    @IsString()
    country: string | null;

    @IsOptional()
    @IsString()
    phone: string | null;

    
}