import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import * as entities from '@sugar-shack/entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            namingStrategy: new SnakeNamingStrategy(),
            entities: entities,
            logging: [ 'query', 'error' ]
        }),
        // TypeOrmModule.forRoot({
        //     type: 'postgres',
        //     host: 'localhost',
        //     port: 5432,
        //     username: 'postgres',
        //     password: 'postgres',
        //     database: 'postgres',
        //     entities: entities
        //     namingStrategy: new SnakeNamingStrategy(),
        //
        // })
        UserModule,
        AuthModule,
        OrderModule,
        ProductModule,
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
