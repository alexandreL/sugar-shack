/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing'
import { OrderService } from './order.service'
import { ModuleMocker } from 'jest-mock'
import { ProductService } from '../product/product.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Order, OrderLine } from '@sugar-shack/entity'

const moduleMocker = new ModuleMocker(global)

describe('OrderService', () => {
    let service: OrderService
    let productService: ProductService

    beforeEach(async () => {
        const sample = [
            {
                'id': 1,
                'name': 'Sirop d\'érable Doré - Canne 540ml - La Belle Province',
                'description': '',
                'image': '',
                'price': 1620,
                'stock': 52,
                'maxStock': 100,
                'syrupType': 'AMBER',
            },
            {
                'id': 2,
                'name': 'Sirop d\'érable Ambré - Canne 540ml - La Belle Province',
                'description': '',
                'image': '',
                'price': 1599,
                'stock': 74,
                'maxStock': 100,
                'syrupType': 'AMBER',
            },
            {
                'id': 3,
                'name': 'Sirop d\'érable Foncé - Canne 540ml - La Belle Province',
                'description': '',
                'image': '',
                'price': 1490,
                'stock': 18,
                'maxStock': 100,
                'syrupType': 'DARK',
            },
        ]
        const moduleRef = await Test.createTestingModule({
            providers: [
                OrderService,
                {
                    provide: getRepositoryToken(Order),
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockResolvedValue({}),
                        save: jest.fn().mockImplementation((order) => order),
                        delete: jest.fn().mockResolvedValue({}),
                        create: jest.fn().mockImplementation((order) => order),
                    },
                },
                {
                    provide: getRepositoryToken(OrderLine),
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockResolvedValue({}),
                        save: jest.fn().mockImplementation((order) => order),
                        delete: jest.fn().mockResolvedValue({}),
                        create: jest.fn().mockImplementation((order) => order),
                    },
                },
                {
                    provide: ProductService,
                    useValue: {
                        find: jest.fn().mockResolvedValue([]),
                        findOne: jest.fn().mockImplementation((id) => {
                            return sample.find((product) => product.id === id)
                        }),
                        consumeStock: jest.fn().mockImplementation((id, quantity) => {
                            if (quantity > 0) {
                                const product = sample.find((product) => product.id === id)
                                if (!product) {
                                    throw new Error('unknown product')
                                }
                                product.stock -= quantity
                            } else {
                                throw new Error('not enough stock')
                            }
                        }),

                    },
                },
            ],
        }).compile()

        service = moduleRef.get<OrderService>(OrderService)
        productService = moduleRef.get<ProductService>(ProductService)
    })


    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    describe('create', () => {
        it('should throw an error if no order lines exist', async () => {
            await expect(service.create({} as any)).rejects.toThrow('no order lines')
        })

        it('should throw an error if product id is unknown', async () => {
            await expect(service.create({
                orderLines: [
                    { productId: null, productName: 'non-exist', quantity: 1 },
                ],
            } as any)).rejects.toThrow('unknown product')
        })

        it('should throw an error if product in DB does not exist', async () => {
            jest.spyOn(productService, 'findOne').mockImplementation(() => Promise.resolve(null))
            await expect(service.create({
                orderLines: [
                    { productId: 99999, productName: 'non-exist', quantity: 1 },
                ],
            } as any)).rejects.toThrow('unknown product')
        })

        it('should throw error if product name does not match with DB', async () => {
            await expect(service.create({
                orderLines: [
                    { productId: 2, productName: 'wrong-name', quantity: 1 },
                ],
            } as any)).rejects.toThrow('product name mismatch')
        })

        it('should throw error if not enough stock', async () => {
            await expect(service.create({
                orderLines: [
                    { productId: 3, productName: 'Sirop d\'érable Foncé - Canne 540ml - La Belle Province', quantity: 99999 },
                ],
            } as any)).rejects.toThrow('not enough stock')
        })

        it('should update correct total price if total mismatches', async () => {
            const orderCreated = await service.create({
                orderLines: [
                    { productId: 1, productName: 'Sirop d\'érable Doré - Canne 540ml - La Belle Province', quantity: 2 },
                ],
                totalPrice: 99999,
            } as any)
            expect(orderCreated.totalPrice).toBe(3240)
        })

        it('should throw error when not enough stock on consumption', async () => {
            jest.spyOn(productService, 'consumeStock').mockImplementation(() => {
                throw new Error()
            })
            await expect(service.create({
                orderLines: [
                    { productId: 1, productName: 'Sirop d\'érable Doré - Canne 540ml - La Belle Province', quantity: 2 },
                ],
                totalPrice: 3240,
            } as any)).rejects.toThrow('not enough stock for product 1')
        })

        it('should successfully create order when inputs are correct', async () => {
            const result = await service.create({
                orderLines: [
                    { productId: 1, productName: 'Sirop d\'érable Doré - Canne 540ml - La Belle Province', quantity: 2 },
                ],
                totalPrice: 3240,
            } as any)
            expect(result).toBeDefined()
        })
    })
})
