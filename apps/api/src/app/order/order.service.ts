import { Injectable, Logger } from '@nestjs/common'
import { OrderDto } from '@sugar-shack/shared'
import { Order } from '@sugar-shack/entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductService } from '../product/product.service'


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private productService: ProductService,
    ) {
    }

    async create(createOrderDto: OrderDto) {
        if (!createOrderDto.orderLines || createOrderDto.orderLines.length === 0)
            throw new Error('no order lines')

        // check the price
        let total = 0
        for (const orderLine of createOrderDto.orderLines) {
            if (!orderLine.productId) {
                throw new Error('unknown product')
            }
            const productFromDB = await this.productService.findOne(orderLine.productId)
            if (!productFromDB) {
                throw new Error('unknown product')
            }
            if (productFromDB.name !== orderLine.productName) {
                throw new Error('product name mismatch')
            }
            if (productFromDB.stock! < orderLine.quantity!) {
                throw new Error('not enough stock')
            }
            total += productFromDB.price! * orderLine.quantity!
            // reconstruct the order line
            orderLine.productPrice = productFromDB.price
            orderLine.productImage = productFromDB.image
        }
        if (total !== createOrderDto.totalPrice) {
            Logger.log(`An user tried to create an order with a wrong total price: ${ createOrderDto.totalPrice } instead of ${ total }`)
            createOrderDto.totalPrice = total
        }
        Logger.log(`An user created an order with a total price of ${ total }`)
        Logger.log('Updating the stock')
        for (const orderLine of createOrderDto.orderLines) {
            try {
                await this.productService.consumeStock(orderLine.productId!, orderLine.quantity!)
            } catch (e) {
                Logger.error(e)
                throw new Error(`not enough stock for product ${ orderLine.productId }`)
            }
        }
        return this.orderRepository.save(createOrderDto)
    }

    findAll() {
        return this.orderRepository.find()
    }

    findOne(uuid: string) {
        return this.orderRepository.findOne({ where: { uuid } })
    }

    update(uuid: string, updateOrderDto: OrderDto) {
        return this.orderRepository.update(uuid, updateOrderDto)
    }

    remove(uuid: string) {
        return this.orderRepository.delete(uuid)
    }
}
