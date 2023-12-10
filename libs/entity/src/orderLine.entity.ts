import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'
import { SyrupType } from '@sugar-shack/shared'
import { formatPriceForDB, formatPriceForFront } from './utils/PriceManager'

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    productName?: string

    @Column()
    productImage?: string

    @Column()
    productPrice?: number

    @Column()
    quantity?: number

    @Column({ nullable: true })
    productId?: number

    @Column({ nullable: false })
    orderUuid?: string

    // @Column({ enum: SyrupType })
    @Column({ type: 'varchar' })
    syrupType?: SyrupType

    @ManyToOne(() => Order, (order) => order.orderLines)
    order?: Order

    @ManyToOne(() => Product, (product) => product.orderLines, { onDelete: 'SET NULL' })
    product?: Product

    @BeforeInsert()
    @BeforeUpdate()
    convertPriceToInt() {
        this.productPrice = formatPriceForDB(this.productPrice)
    }

    @AfterLoad()
    convertPriceToNumber() {
        this.productPrice = formatPriceForFront(this.productPrice)
    }

}
