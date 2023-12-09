import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import * as entities from '@sugar-shack/entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: entities
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [ AppController ],
    providers: [ ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
