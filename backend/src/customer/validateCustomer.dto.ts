import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

//Customer Validation with Class Validator
export class ValidateCustomerDTO implements Readonly<ValidateCustomerDTO>{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
