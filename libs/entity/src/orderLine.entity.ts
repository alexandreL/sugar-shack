import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'
import { SyrupType } from '@sugar-shack/shared'

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    ProductName?: string

    @Column()
    ProductImage?: string

    @Column()
    productPrice?: number

    @Column()
    quantity?: number

    // @Column({ enum: SyrupType })
    @Column({ type: 'varchar' })
    syrupType?: SyrupType

    @ManyToOne(() => Order, (order) => order.orderLines)
    order?: Order

    @ManyToOne(() => Product, (product) => product.orderLines, { onDelete: 'SET NULL' })
    product?: Product
}
