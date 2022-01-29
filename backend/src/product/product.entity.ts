import { Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import {Invoiceline} from '../order/invoiceline.entity';
import { Productcategory } from './productcategory.entity';
import { ProjectBaseEntity } from '../core/projectBase.entity';
import { Currency } from '../order/currency.entity';

@Entity()
export class Product extends ProjectBaseEntity {
    @Column('varchar', {length: 50})
    partNumber: string;

    @Column('varchar', {length: 100})
    name: string;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;

    @Column('int')
    currencyId: number;

    @Column('text', { nullable: true})
    description: string | null;

    @Column('int')
    productCategoryId: number;

    @Column('varchar', {nullable: true, length: 250})
    imageFile: string | null;

    @OneToMany(() => Invoiceline, (invoiceline) => invoiceline.product)
    invoicelines: Invoiceline[];

    @ManyToOne(()=> Productcategory,(productcategory) => productcategory.products,)
    @JoinColumn({name: 'productCategoryId'})
    productCategory: Productcategory;

    @ManyToOne(() => Currency, (currency) => currency.products)
    @JoinColumn({name: 'currencyId'})
    currency: Currency;
}