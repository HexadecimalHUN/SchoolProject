import { Printer } from 'prettier';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectBaseEntity } from '../core/projectBase.entity';
import { Product } from './product.entity';

@Entity()
export class Productcategory extends ProjectBaseEntity {
    @Column('varchar', {length: 100})
    productCategoryName: string;

    @OneToMany(() => Product, (product) => product.productCategory)
    products: Product[];
}