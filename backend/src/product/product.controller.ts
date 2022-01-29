import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDTO } from './productCreate.dto';
import { UpdateProductDTO } from './productUpdate.dto';
import { Productcategory } from './productcategory.entity';
import { UpdateCustomerDTO } from '../customer/updateCustomer.dto';

// EndPoint API

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAll(): Promise<Product[]>{
        return await this. productService.getAllProduct();
    }

    @Get('categories')
    async getAllCategories(): Promise<Productcategory[]>{
        return await this.productService.getAllProductCategory();
    }

    @Get(':id')
    async getOneById(@Param('id') id: string){
        return await this.productService.getById(id);
    }

    @Post('save')
    async createProduct(@Body() product: CreateProductDTO){
        return this.productService.createProduct(product);
    }

    @Put('update')
    async updateProduct(@Body() product: UpdateProductDTO) {
        return this.productService.updateProduct(product);
    }

    @Delete(':id')
    async removeProduct(@Param('id') id: string){
        return await this.productService.removeProduct(id);
    }

}
