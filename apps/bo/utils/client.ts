import { EditProductDto, EditUserDto, FullProductDto, OrderDto, SmallProductDto } from '@sugar-shack/shared'


class _ProductClient {
    constructor(private readonly baseURL: string = 'http://localhost:4000') {
    }

    async getAllProducts(): Promise<Array<SmallProductDto>> {
        const data = await $fetch<Array<FullProductDto>>('/api/product', {
            method: 'GET',
            baseURL: this.baseURL,
            params: {},
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
        return data || []
    }

    async getProductById(id: string): Promise<FullProductDto | null> {
        const data = await $fetch<FullProductDto>(`/api/product/${ id }`, {
            method: 'GET',
            baseURL: this.baseURL,
        })
        return data || null
    }

    async createProduct(product: EditProductDto): Promise<void> {
        await $fetch<void>('/api/product', {
            method: 'POST',
            baseURL: this.baseURL,
            body: product,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
    }

    async updateProduct(id: string, product: EditProductDto): Promise<void> {
        await $fetch<void>(`/api/product/${ id }`, {
            method: 'PATCH',
            baseURL: this.baseURL,
            body: product,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
    }

    async refillStock(id: string): Promise<void> {
        await $fetch<void>(`/api/product/${ id }/refill`, {
            method: 'PATCH',
            baseURL: this.baseURL,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
    }

    async removeProduct(id: string): Promise<void> {
        await $fetch<void>(`/api/product/${ id }`, {
            method: 'DELETE',
            baseURL: this.baseURL,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
    }

    private getAuthToken(): string | undefined {
        const token = useCookie('token')
        return token.value || undefined
    }
}


class _OrderClient {
    constructor(private readonly baseURL: string = 'http://localhost:4000') {
    }

    async getAllOrders(): Promise<Array<OrderDto>> {
        const data = await $fetch<Array<OrderDto>>('/api/order', {
            method: 'GET',
            baseURL: this.baseURL,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
        return data || []
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

    async updateOrder(uuid: string, order: OrderDto): Promise<void> {
        await $fetch<void>(`/api/order/${ uuid }`, {
            method: 'PATCH',
            baseURL: this.baseURL,
            body: order,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
    }

    async removeOrder(uuid: string): Promise<void> {
        await $fetch<void>(`/api/order/${ uuid }`, {
            method: 'DELETE',
            baseURL: this.baseURL,
            headers: { 'Authorization': `Bearer ${ this.getAuthToken() }` },
        })
    }

    private getAuthToken(): string | undefined {
        const token = useCookie('token')
        return token.value || undefined
    }
}

class _UserClient {
    constructor(private readonly baseURL: string = 'http://localhost:4000') {
    }

    async createUser(user: EditUserDto): Promise<void> {
        await $fetch<void>('/api/user', {
            method: 'POST',
            baseURL: this.baseURL,
            body: user,
        })
    }

    async updateUser(id: string, user: EditUserDto): Promise<void> {
        await $fetch<void>(`/api/user/${ id }`, {
            method: 'PATCH',
            baseURL: this.baseURL,
            body: user,
        })
    }

    async removeUser(id: string): Promise<void> {
        await $fetch<void>(`/api/user/${ id }`, {
            method: 'DELETE',
            baseURL: this.baseURL,
        })
    }
}

export const ProductClient = new _ProductClient()
export const OrderClient = new _OrderClient()
export const UserClient = new _UserClient()
