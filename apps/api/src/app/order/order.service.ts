import { Injectable } from '@nestjs/common'
import { OrderDto } from '@sugar-shack/shared'
import { Order } from '@sugar-shack/entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'


@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {
    }

    create(createOrderDto: OrderDto) {
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
