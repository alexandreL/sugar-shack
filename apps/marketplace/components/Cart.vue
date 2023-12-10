<script setup lang="ts">
import { OrderDto, OrderStatus, SyrupType } from '@sugar-shack/shared'
import CartLine from './CartLine.vue'

const order: OrderDto = {
    uuid: '123456789',
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    orderStatus: OrderStatus.creating,
    totalPrice: 50,
    orderLines: [
        {
            id: 1,
            productName: 'Product 1',
            productImage: 'https://example.com/product1.jpg',
            productPrice: 20,
            quantity: 2,
            syrupType: SyrupType.AMBER
        },
        {
            id: 2,
            productName: 'Product 2',
            productImage: 'https://example.com/product2.jpg',
            productPrice: 10,
            quantity: 3,
            syrupType: SyrupType.DARK
        },
        {
            id: 3,
            productName: 'Product 3',
            productImage: 'https://example.com/product3.jpg',
            productPrice: 5,
            quantity: 1,
            syrupType: SyrupType.CLEAR
        }
    ]
}
const customerName = ref('')
const customerEmail = ref('')

const totalQuantity = () => order.orderLines?.reduce((total, product) => (total + product.quantity!), 0) ?? 0
const placeOrder = () => {
    console.log(`Placing the order for ${customerName.value} with email ${customerEmail.value} `)
}

</script>
<template>
  <div class="flex items-start space-x-6">
    <!-- Customer Details Form -->
    <div class="w-1/2 h-64">
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        Your personal details
      </h2>
      <form class="form-control" @submit.prevent="placeOrder">
        <div class="mb-4">
          <label for="customerName" class="label">Name</label>
          <input id="customerName" v-model="customerName" type="text" class="input input-bordered w-full max-w-xs input-primary">
        </div>
        <div class="mb-4">
          <label for="customerEmail" class="label">Email</label>
          <input id="customerEmail" v-model="customerEmail" type="email" class="input input-bordered w-full max-w-xs input-primary">
        </div>
        <button
          :disabled="!customerName || !customerEmail"
          type="submit"
          class="btn btn-accent max-w-xs"
        >
          Place Order
        </button>
      </form>
    </div>
    <!-- Order Details Box -->
    <div class="w-1/2 bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900">
          Order details
        </h3>
        <div class="-mt-4 -ml-4 relative">
          <ul class="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
            <CartLine
              v-for="(orderLine, i) in order.orderLines"
              :key="i"
              :orderLine="orderLine"
              :allowDelete="true"
            />
          </ul>
        </div>
        <div>
          Total quantity: {{ totalQuantity() }}
          <br>
          Total price: ${{ order.totalPrice }}
        </div>
      </div>
    </div>
  </div>
</template>
