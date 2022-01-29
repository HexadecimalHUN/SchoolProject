import {Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateCustomerDTO } from '../customer/validateCustomer.dto';
import { RegisterCustomerDTO } from '../customer/registerCustomer.dto';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('local/login')
    async signinLocal(@Body() dto: ValidateCustomerDTO){
        return await this.authService.signinLocal(dto);
    }

    @Post('local/register')
    async signupLocal(@Body() dto: RegisterCustomerDTO){
        return await this.authService.signupLocal(dto);
    }

    
}