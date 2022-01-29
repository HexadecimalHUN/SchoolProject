import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ValidateCustomerDTO } from '../customer/validateCustomer.dto';
import { RegisterCustomerDTO } from '../customer/registerCustomer.dto';
import { Customer } from "../customer/customer.entity";
import { JWTPayload } from './jwtpayload.dto';
import { CustomersService } from '../customer/customers.service';

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly customerService: CustomersService,
    ){}

    async signinLocal(dto: ValidateCustomerDTO){
        const user = await Customer.findOne({email: dto.email});
        if (!user) throw new UnauthorizedException('Credentials Incorrect');

        const isPasswordCorrect = await user.comparePassword(dto.password);
        if(!isPasswordCorrect)
        throw new UnauthorizedException('Credentials Incorrect');
        return this.signUser({
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
        });
    }

    signUser(user: JWTPayload){
        return this.jwtService.sign(user);
    }

    async signupLocal(dto: RegisterCustomerDTO){
        const createUser = await this.customerService.save(dto);

        return this.signUser({
            id: createUser.id,
            email: createUser.email,
            name: `${createUser.firstName} ${createUser.lastName}`
        });
    }
}