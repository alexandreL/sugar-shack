import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderLine } from './orderLine.entity'
import { OrderStatus } from '@sugar-shack/shared'
import { formatPriceForDB, formatPriceForFront } from './utils/PriceManager'
import { Logger } from '@nestjs/common'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    uuid?: string

    @Column()
    customerName?: string

    @Column()
    customerEmail?: string

    @Column()
    totalPrice?: number

    // @Column({ enum: OrderStatus })
    @Column({ type: 'varchar', default: OrderStatus.creating })
    orderStatus?: OrderStatus

    @OneToMany(() => OrderLine, (orderLine) => orderLine.order, { eager: true, cascade: true })
    orderLines?: OrderLine[]


    @BeforeInsert()
    @BeforeUpdate()
    convertPriceToInt() {
        Logger.log('convertPriceToInt', this.totalPrice)
        this.totalPrice = formatPriceForDB(this.totalPrice)
    }

    @AfterLoad()
    convertPriceToNumber() {
        this.totalPrice = formatPriceForFront(this.totalPrice)
    }
}
