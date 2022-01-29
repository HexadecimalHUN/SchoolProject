import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Invoiceline } from './invoiceline.entity';
import { Currency } from './currency.entity';
import { ProjectBaseEntity } from '../core/projectBase.entity';

//Generation Invoice Schema with the following attributes:
@Entity()
export class Invoice extends ProjectBaseEntity{
    @Column('varchar')
    customerId: string;

    @Column('int')
    invoiceNumber: number;

    @Column('tinyint', {width:1})
    paid: boolean;

    @Column('datetime', {nullable: true})
    paidDate: Date | null;

    @Column('datetime', {})
    dueDate: Date;

    @Column('text', {nullable: true})
    comment: string | null;

    @Column('varchar', {length: 100})
    name: string;

    @Column('varchar', {length: 100})
    address: string;

    @Column('varchar', {length: 100})
    zipCode: string;

    @Column('varchar', {length: 100})
    city: string;
    
    @Column('varchar')
    country: string;

    @ManyToOne(() => Currency, (currency) => currency.invocies)
    @JoinColumn({name: 'currencyId'})
    currency: Currency;

    @ManyToOne(() => Customer, (customer) => customer.invoices)
    @JoinColumn({name: 'customerId'})
    customer: Customer;

    @ManyToOne(() => Invoiceline, (invoiceline) => invoiceline.invoice)
    invoicelines: Invoiceline[];



}
