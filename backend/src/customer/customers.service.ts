import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UpdateResult } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService{
    async save(customer: Partial<Customer>):Promise<Customer>{
        const customerFromDB = await Customer.findOne({email: customer.email});
        if (customer.email && customerFromDB?.email){
            Logger.error(
                `This email has already been registered: ${customer.email}`,
                CustomersService.name,
            );
            throw new HttpException(
                `This email has already been registered: ${customer.email}`,
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const customerToDb = Customer.create(customer);
            return await Customer.save(customerToDb);
        } catch (error) {
            Logger.error(
                `Customer can not be saved:${customer.email}`,
                error.stack,
                CustomersService.name, 
            );
            throw new HttpException(
                `Customer can not be saved:${customer.email}`,
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    async update(
        id: string, { email, ...customer }: Partial<Customer>,
    ):Promise<UpdateResult>{
        const { password, ...customerFromDb} = await Customer.findOne(id);
        if(!customerFromDb){
            Logger.error(`Id not found: ${id}`, null, CustomersService.name);
            throw new HttpException(`Id not found: ${id}`, HttpStatus.NOT_FOUND);
        }
        try{
            return await Customer.update(
                id, 
                Object.assign(new Customer(),{
                    ...customerFromDb,
                    ...customer,
                }),
            );
        }catch (error){
            Logger.error(
                `Customer can not be updated: ${email}`,
                error,
                CustomersService.name,
            );
            throw new HttpException(
                `Customer can not be updated: ${email}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    async getUserById(id: string): Promise<Partial<Customer>>{
        try{
            const { password, ...restOfUser } = await Customer.findOneOrFail(id);
            return restOfUser;
        } catch(error){
            Logger.error(`Id not found: ${id}`, null, CustomersService.name);
            throw new HttpException(`Id not found: ${id}`, HttpStatus.NOT_FOUND);
        }
    }
}