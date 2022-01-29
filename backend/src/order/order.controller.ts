import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateInvoiceDTO } from './InvoiceCreate.dto';
import { UpdateInvoiceDTO } from './invoiceUpdate.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../auth/user.decorator';

//
@Controller('orders')
export class OrderController{
    constructor(private readonly orderService: OrderService){}

    //JWT authentication module, where the JWT Passport-logic's name is JWT. By that we referencing the json web token used. 
    @UseGuards(AuthGuard('jwt'))
    @Get('of/customer')
    async getAllForCustomer(@UserDecorator('id') currentUserId: string){
        return await this.orderService.getAllOrderByCustomerId(currentUserId);
    }
    @UseGuards(AuthGuard('jwt'))
    //
    @Post('insert')
    async createOrder(
        @Body() order: CreateInvoiceDTO,
        @UserDecorator('id') currentUserId: string,
    ){
        //Calling createInvoice afther the authentication
        return this. orderService.createInvoice({
            customerId: currentUserId,
            ...order,
        });
    }

    @Put('update')
    async upodateOrder(@Body() order: UpdateInvoiceDTO){}
}