import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Product} from '../product/product.entity';
import {Invoice} from './invoice.entity';
import { ProjectBaseEntity } from '../core/projectBase.entity';

//Generationg invoiceline schema for the DB. with the following attributes:
@Entity()
export class Invoiceline extends ProjectBaseEntity{

@Column('varchar')
invoiceId: string;

@Column('varchar')
productId: string;

@Column('text', {nullable: true})
lineText: string | null;

@Column('decimal', {precision: 10, scale: 2})
price: string;

@Column('int')
quantity: number;

@ManyToOne(() => Invoice, (invoice) => invoice.invoicelines)
@JoinColumn({ name: 'invoiceId'})
invoice: Invoice;

@ManyToOne(() => Product, (product) => product.invoicelines)
@JoinColumn({name: 'productId'})
product: Product;

} 