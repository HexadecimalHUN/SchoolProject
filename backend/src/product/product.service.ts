import { HttpException, HttpStatus, Injectable, Logger, PreconditionFailedException } from "@nestjs/common";
import { UpdateResult } from "typeorm";
import { Product } from "./product.entity";
import { Productcategory } from "./productcategory.entity";

@Injectable()
export class ProductService {
    async getAllProduct(): Promise<Product[]>{
        return await Product.find({relations: ['currency', 'productCategory']});
    }

    async getAllProductCategory(): Promise<Productcategory[]>{
        return await Productcategory.find({
            order: { productCategoryName: 'ASC'},
        });
    }

    async getById(id: string): Promise<Product>{
        return await Product.findOneOrFail(id);
    }

    async removeProduct(id:string): Promise<string>{
        const productFromDB = await Product.findOne({
            where: { active: true, id: id},
        });
        
        console.log(!productFromDB);

        if(!productFromDB){
            Logger.error(
                `Product does not exist whit the following id: ${id}`,
                null,
                ProductService.name,
            );

            throw new HttpException(
                `Product does not exist whit the following id: ${id}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            await Product.update(id, { isActive: false, deletedAt: Date.now()});
            return 'Product has been deleted!';
        } catch(error){
            Logger.error(
                `Product save error: ${productFromDB.name}`,
                error.stack,
                ProductService.name,
            );
            throw new HttpException(
                `Product save error: ${productFromDB.name}`,
                HttpStatus.BAD_REQUEST,
            );
        } 
    }
    
    async createProduct(product: Partial<Product>): Promise<Product>{
        const productFromDB = await Product.findOne(product.id);

        if (product.id && productFromDB){
            Logger.error(
                `Duplicate product id: ${product.id}`,
                null,
                ProductService.name,
            );
            throw new HttpException(
                `Duplicate product id: ${product.id}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        try{
            const productToDB = Product.create(product);
            return await Product.save(productToDB);
        } catch(error){
            Logger.error(
                `Product save error: ${product.name}`,
                error.stack,
                ProductService.name,
            );
        }
    }

    async updateProduct(product: Partial<Product>): Promise<UpdateResult>{
        const productFromDB = await Product.findOneOrFail(product.id);

        if(!product.id && !productFromDB){
            Logger.error(
                `Product does not exist with that id: ${product.id}`,
                null,
                ProductService.name,
            );
            throw new HttpException(
                `Product does not exist with that id: ${product.id}`,
                HttpStatus.BAD_REQUEST,
            );
        }

        try{
            return await Product.update(
                product.id,
                Object.assign(new Product(),{
                    ...productFromDB,
                    ...product,
                }),
            );
        } catch (error){
            Logger.error(
                `Product save error: ${product.id}`,
                error.stack,
                ProductService.name,
            );
            throw new HttpException(
                `Product save error: ${product.id}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}