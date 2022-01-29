import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';

import * as path from 'path';

//Setting up DB congif from env
//https://stackoverflow.com/questions/63678216/nestjs-setup-typeorm-connection-with-env-and-nestjs-config
//https://typeorm.io/#/

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){}

    //To import entities and migrations properly, we must decide if the app is in production
    private isProductionMode(){
        const mode = this.configService.get<string>('mode', 'dev');
        return mode === 'production';
    }

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        let pathName;
        
        if (this.isProductionMode()){
            pathName = path.join(__dirname, '..', '..', 'build');
        } else {
            pathName = path.join(__dirname, '..', '..', 'src');
        }
        

        return {
            type: 'mysql',
      
            host: this.configService.get<string>('db.host'),
            port: this.configService.get<number>('db.port'),
            username: this.configService.get<string>('db.user'),
            password: this.configService.get<string>('db.password'),
            database: this.configService.get<string>('db.database'),
      
            entities: [path.join(pathName, '/**/*.entity.{ts,js}')],
            dropSchema: this.configService.get<boolean>('db.dropSchema'),
            migrationsTransactionMode: 'each',
            migrationsRun: this.configService.get<boolean>('db.migrationsRun'),
            migrations: [path.join(pathName, '/migration/**')],
            cli: {
              migrationsDir: path.join(pathName, '/migration'),
            },
            synchronize: this.configService.get<boolean>('db.synchronize', false),
      
            ssl: this.configService.get('db.ssl', false),
            logging: this.configService.get('db.logging', false),
          };
    }
}