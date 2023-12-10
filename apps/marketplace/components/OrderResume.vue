<script setup lang="ts">
import { ref } from 'vue'
import { OrderDto, OrderStatus, SyrupType } from '@sugar-shack/shared'
import CartLine from './CartLine.vue'
import OrderProgressComponent from './OrderProgressComponent.vue'

// mock fetch order function
async function fetchOrderData (): Promise<OrderDto> {}

const order: OrderDto = {
    uuid: '123456789',
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    orderStatus: OrderStatus.created,
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
}</script>

<template>
  <div class="flex flex-col p-8 bg-white shadow sm:rounded-lg">
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">
        Customer Information
      </h2>
      <div>Name: {{ order.customerName }}</div>
      <div>Email: {{ order.customerEmail }}</div>
    </div>

    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">
        Products
      </h2>
      <div class="divide-y divide-gray-200">
        <CartLine
          v-for="(orderLine, i) in order.orderLines"
          :key="i"
          :orderLine="orderLine"
          :allowDelete="false"
        />
      </div>
    </div>

    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900">
        Total Price
      </h2>
      <div>${{ order.totalPrice }}</div>
    </div>

    <div>
      <h2 class="text-lg font-medium text-gray-900">
        Order Status
      </h2>
      <OrderProgressComponent :orderStatus="order.orderStatus" />
    </div>
  </div>
</template>
