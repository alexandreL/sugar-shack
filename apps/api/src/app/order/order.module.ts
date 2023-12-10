import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order, OrderLine, Product } from '@sugar-shack/entity'
import { ProductService } from '../product/product.service'

@Module({
    imports: [ TypeOrmModule.forFeature([ Order, OrderLine, Product ]) ],
    controllers: [ OrderController ],
    providers: [ OrderService, ProductService ],
})
export class OrderModule {
}
