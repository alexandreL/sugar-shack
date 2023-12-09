import { Injectable } from '@nestjs/common'
import { EditProductDto } from '@sugar-shack/shared'
import { Product } from '@sugar-shack/entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {
    }

    create(createProductDto: EditProductDto) {
        return this.productRepository.save(createProductDto)
    }

    findAll() {
        return this.productRepository.find()
    }

    findOne(id: number) {
        return this.productRepository.findOne({ where: { id } })
    }

    update(id: number, updateProductDto: EditProductDto) {
        return this.productRepository.update(id, updateProductDto)
    }

    remove(id: number) {
        return this.productRepository.delete(id)
    }
}
