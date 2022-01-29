import {Column, Entity, OneToMany} from 'typeorm';
import { ProjectBaseEntity } from '../core/projectBase.entity';
import { Invoice } from './invoice.entity';
import { Product } from '../product/product.entity';

//Generating Currency schema in DB.with the following attributes:

@Entity()
export class Currency extends ProjectBaseEntity{
    @Column('varchar', { length: 100})
    currencyName: string;

    @Column('char', {unique: true, length: 3})
    iso4217Iso: string;

    @OneToMany(() => Invoice, (invoice) => invoice.currency)
    invocies: Invoice[];

    @OneToMany(() => Product, (product) => product.currencyId)
    products: Product[];
}