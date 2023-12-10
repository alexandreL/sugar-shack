import { Injectable } from '@nestjs/common'
import { EditProductDto, FilterProductDto } from '@sugar-shack/shared'
import { Product } from '@sugar-shack/entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
                private dataSource: DataSource) {
    }

    create(createProductDto: EditProductDto) {
        const product = this.productRepository.create(createProductDto)
        return this.productRepository.save(product)
    }

    findAll() {
        return this.productRepository.find()
    }

    findOne(id: number) {
        return this.productRepository.findOne({ where: { id } })
    }

    update(id: number, updateProductDto: EditProductDto) {
        const product = this.productRepository.create(updateProductDto)
        return this.productRepository.update(id, product)
    }

    remove(id: number) {
        return this.productRepository.delete(id)
    }

    async consumeStock(id: number, quantity: number) {
        const query = this.dataSource.createQueryBuilder().update(Product)
        query.set({ stock: () => 'stock - :quantity' })
        query.where('product.id = :id', { id })
        query.andWhere('product.stock >= :quantity', { quantity })
        const result = await query.execute()
        if (result.affected === 0) {
            throw new Error('not enough stock')
        }
    }

    findAllWithFilter(filter: FilterProductDto) {
        return this.productRepository.find({
            skip: filter.skip ? parseInt(filter.skip, 10) : undefined,
            take: filter.take ? parseInt(filter.take, 10) : undefined,
            order: {
                id: 'ASC',
            },
            where: {
                syrupType: filter.syrupType,
            },
        })
    }
}
