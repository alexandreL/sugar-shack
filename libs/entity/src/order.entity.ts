import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderLine } from './orderLine.entity'
import { OrderStatus } from '@sugar-shack/shared'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    customerName?: string

    @Column()
    customerEmail?: string

    // @Column({ enum: OrderStatus })
    @Column({ type: 'varchar', default: OrderStatus.creating })
    orderStatus?: OrderStatus

    @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
    orderLines?: OrderLine[]
}
