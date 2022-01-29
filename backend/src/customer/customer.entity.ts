import {Exclude} from 'class-transformer';
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Invoice } from '../order/invoice.entity'
import {ProjectBaseEntity}  from '../core/projectBase.entity'

//Customer DB Schema

@Entity()
export class Customer extends ProjectBaseEntity {

    //Obligatory Information
    @Column('varchar', {length: 100})
    firstName: string;

    @Column('varchar', {length: 100})
    lastName: string;

    @Column('varchar', { length: 100, unique: true })
    email: string;

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
    this.email = this.email.toLowerCase();
    }
    
    //Password Encription

    @Column({nullable: true})
    @Exclude()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async encryptPassword(){
        if(!this.password){
            return;
        }
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword( attempt: string): Promise<boolean>{
        return await bcrypt.compare(attempt, this.password);
    }


    //Invoice Information
    
    @OneToMany(() => Invoice, (invoice) => invoice.customer)
     invoices: Invoice[];

    //Extra non-obligatory stuff

    @Column('varchar', {nullable: true, length: 100})
    address: string | null;

    @Column('varchar', {nullable: true, length: 100})
    zipCode: string | null;

    @Column('varchar', {nullable: true, length: 100})
    city: string | null;

    @Column('varchar', {nullable: true})
    country: string | null;

    @Column('varchar', {nullable: true, length: 50})
    phone: string | null;


}



