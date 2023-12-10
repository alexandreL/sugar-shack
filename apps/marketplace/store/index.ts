import { defineStore } from 'pinia'
import { FullProductDto, OrderLineDto, SmallProductDto } from '@sugar-shack/shared'
import { useLocalStorage } from '@vueuse/core'

const ORDER_STORE_NAME = 'order'
const ORDER_LINES_STORE_NAME = 'orderLines'

export const useOrderStore = defineStore('order', {
    state: () => ({
        orderLines: useLocalStorage(ORDER_LINES_STORE_NAME, []as Array<OrderLineDto>),
        order: useLocalStorage(ORDER_STORE_NAME, {
            uuid: '',
            customerName: '',
            customerEmail: '',
            orderStatus: '',
        }),
    }),
    actions: {
        addProduct(product: FullProductDto | SmallProductDto) {
            const exist = this.orderLines.find((orderLine) => orderLine.productId === product.id)
            if (exist) {
                if (exist.quantity === undefined) exist.quantity = 0
                exist.quantity++
                return
            }
            this.orderLines.push({
                id: undefined,
                productId: product.id,
                productName: product.name,
                productImage: product.image,
                productPrice: product.price,
                quantity: 1,
                syrupType: product.syrupType,
            })

        },
        removeOrderLine(index: number) {
            this.orderLines.splice(index, 1)
        },
        setOrder(order: any) {
            this.order = order
        },
        resetOrder() {
            this.orderLines = []
            this.order = {
                uuid: '',
                customerName: '',
                customerEmail: '',
                orderStatus: '',
            }
        },
    },
    getters: {
        totalPrice(): number {
            return this.orderLines.reduce((total, orderLine) => {
                if (orderLine.productPrice === undefined) return total
                if (orderLine.quantity === undefined) return total
                return parseFloat((total + (orderLine.productPrice * orderLine.quantity)).toFixed(2))
            }, 0)
        },
        totalQuantity(): number {
            return this.orderLines.reduce((total, orderLine) => {
                if (orderLine.quantity === undefined) return total
                return total + orderLine.quantity
            }, 0)
        },
    },
    hydrate(storeState, initialState) {
        storeState.orderLines = useLocalStorage(ORDER_LINES_STORE_NAME, initialState.orderLines) as any
        storeState.order = useLocalStorage(ORDER_STORE_NAME, initialState.order) as any
    },
})
