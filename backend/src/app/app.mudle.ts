import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

// Importing DB modules
// We use TypeORM, because it is the most mature Object Relational Mapper available for typescript

import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../config/config';
import {OrmConfig} from '../config/db.config';

//Authentication Module
import {AuthModule} from '../auth/auth.module';
//Customer Module
import {CustomersModule} from '../customer/customers.module';
//Product Module
import {ProductModule} from '../product/product.module';
//Order Module
import { OrderModule } from '../order/order.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: OrmConfig,
            inject: [ConfigService],

        }),
        CustomersModule,
        ProductModule,
        OrderModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection){}
}


