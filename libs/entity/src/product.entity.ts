import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { SyrupType } from '@sugar-shack/shared'
import { OrderLine } from './orderLine.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    description?: string

    @Column()
    image?: string

    @Column()
    price?: number

    @Column()
    stock?: number

    @Column()
    maxStock?: number

    // @Column({ enum: SyrupType })
    @Column({ type: 'varchar' })
    syrupType?: SyrupType

    @OneToMany(() => OrderLine, (orderLine) => orderLine.product)
    orderLines?: OrderLine[]
}
