import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { async } from "rxjs";
import { getManager } from "typeorm";
import { Invoice } from "./invoice.entity";
import { Invoiceline } from "./invoiceline.entity";

//Service file used for detching data and sending out orders.
//For a specific customer returns all the existing orders where the attribute isActive is true
@Injectable()
export class OrderService {
    async getAllOrderByCustomerId(id: string) {
        return await Invoice.createQueryBuilder('invoice')
        .leftJoinAndSelect('invoice.invoicelines', 'invoicelines')
        .leftJoinAndSelect('invoiceline.currency','currencyOfInvoice')
        .leftJoinAndSelect('invoicelines.product', 'product')
        .leftJoinAndSelect('product.currency', 'currencyOfProduct')
        .leftJoinAndSelect('product.productCategory', 'productCategory')
        .where('invoice.customerId =:customerId',{customerId: id})
        .andWhere('invoice.isActive =:active', { active: true})
        .getMany();
    }

    async createInvoice(order: Partial<Invoice>){
        const { invoicelines, ...invoice} = order;

        const createdInvoice = Invoice.create(invoice);
        const createdInvoiceLine = Invoiceline.create(invoicelines);

        await getManager()
            .transaction(async (transactionEntityManager) => {
                const {id} = await transactionEntityManager.save(createdInvoice);
                createdInvoiceLine.forEach((ivl) => (ivl.invoiceId = id));
                await transactionEntityManager.save(createdInvoiceLine);
            })
            .catch((e) => {
                Logger.error(`Oops, something went wrong!`, OrderService.name);
                throw new HttpException(
                    `Oops, something went wrong!`,
                    HttpStatus.BAD_REQUEST,
                );
            });
            return 'Order sent out succesfully!';
    }
}