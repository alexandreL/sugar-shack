import { Test } from '@nestjs/testing'
import { ProductService } from './product.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Product } from '@sugar-shack/entity'
import { DataSource } from 'typeorm'

describe('ProductService', () => {

    let service: ProductService
    let dataSource: DataSource

    beforeEach(async () => {

        const mockDataSource = {
            createQueryBuilder: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            set: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue({ affected: 1 }),
        }

        const moduleRef = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockResolvedValue({}),
                        save: jest.fn().mockImplementation((product) => product),
                        delete: jest.fn().mockResolvedValue({}),
                    },
                },
                {
                    provide: DataSource,
                    useValue: mockDataSource
                },
            ],
        }).compile()

        service = moduleRef.get<ProductService>(ProductService)
        dataSource = moduleRef.get<DataSource>(DataSource)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('consumeStock', () => {

        it('should reduce product stock', async () => {
            await service.consumeStock(1, 2)
            expect(dataSource.createQueryBuilder).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(dataSource.execute).toHaveBeenCalled()
        })

        it('should throw an error if not enough stock', async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dataSource.execute = jest.fn().mockResolvedValue({ affected: 0 })

            await expect(service.consumeStock(1, 2))
                .rejects
                .toThrow(new Error('not enough stock'))
        })
    })
})
