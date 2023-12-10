<script setup lang="ts">
import { OrderDto } from '@sugar-shack/shared'
import { useOrderStore } from '../store'
import { OrderClient } from '../utils/client'
import CartLine from './CartLine.vue'

const store = useOrderStore()
const customerName = ref('')
const customerEmail = ref('')
const router = useRouter()

const placeOrder = async () => {
    store.setOrder({
        customerName: customerName.value,
        customerEmail: customerEmail.value,
        orderLines: store.orderLines
    })
    customerName.value = ''
    customerEmail.value = ''
    const order = store.order as OrderDto
    order.totalPrice = store.totalPrice
    const result = await OrderClient.createOrder(order)
    if (result) {
        store.resetOrder()
        router.push(`/order/${result.uuid}`)
    }
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
          <input
            id="customerName"
            v-model="customerName"
            type="text"
            class="input input-bordered w-full max-w-xs input-primary"
          >
        </div>
        <div class="mb-4">
          <label for="customerEmail" class="label">Email</label>
          <input
            id="customerEmail"
            v-model="customerEmail"
            type="email"
            class="input input-bordered w-full max-w-xs input-primary"
          >
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
              v-for="(orderLine, i) in store.orderLines"
              :key="i"
              :orderLine="orderLine"
              :allowDelete="true"
            />
          </ul>
        </div>
        <div>
          Total quantity: {{ store.totalQuantity }}
          <br>
          Total price: ${{ store.totalPrice }}
        </div>
      </div>
    </div>
  </div>
</template>
