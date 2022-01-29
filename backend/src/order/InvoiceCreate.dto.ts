import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

//Invoice Data Transfer Object --DTO-, wich sent out by the api.

export class CreateInvoiceDTO implements Readonly<CreateInvoiceDTO>{
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsOptional()
    @IsString()
    lineText: string;

    @IsNotEmpty()
    @IsNumber()
    price: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}