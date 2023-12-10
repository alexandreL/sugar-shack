import { FilterProductDto, FullProductDto, OrderDto, SmallProductDto } from '@sugar-shack/shared'


class _ProductClient {
    constructor(private readonly baseURL: string = 'http://localhost:4000') {
    }

    async getProductByFilter(filter: FilterProductDto): Promise<Array<SmallProductDto>> {
        const data = await $fetch<Array<FullProductDto>>('/api/product/filtered', {
            method: 'GET',
            baseURL: this.baseURL,
            params: filter,
        })
        return data || []
    }

    async getProductById(id: number): Promise<SmallProductDto | null> {
        if (!id) return null
        const data = await $fetch<SmallProductDto>(`/api/product/${ id }`, {
            method: 'GET',
            baseURL: this.baseURL,
        })
        return data || null
    }
}


class _OrderClient {
    constructor(private readonly baseURL: string = 'http://localhost:4000') {
    }

    async getOrderById(uuid: string): Promise<OrderDto | null> {
        const data = await $fetch<OrderDto>(`/api/order/${ uuid }`, {
            method: 'GET',
            baseURL: this.baseURL,
        })
        return data || null
    }

    async createOrder(order: OrderDto): Promise<void> {
        await $fetch<void>('/api/order', {
            method: 'POST',
            baseURL: this.baseURL,
            body: order,
        })
    }

}


export const ProductClient = new _ProductClient()
export const OrderClient = new _OrderClient()
