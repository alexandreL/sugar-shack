<script setup lang="ts">
import { ref } from 'vue'
import { OrderDto } from '@sugar-shack/shared'
import { OrderClient } from '../utils/client'
import OrderProgressComponent from './OrderProgressComponent.vue'
import CartLine from './CartLine.vue'

const uuid = useAttrs().uuid as string
const loading = ref<boolean>(true)
const failed = ref<boolean>(false)
const order = ref<OrderDto>()
const status = ref<string>()

const loadOrder = async () => {
    if (!uuid) {
        failed.value = true
        return
    }
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    const result = await OrderClient.getOrderById(uuid)
    if (result) {
        order.value = result
        status.value = result.orderStatus
    } else {
        failed.value = true
    }

    clearTimeout(timeoutId)
    loading.value = false
}

onMounted(async () => {
    await loadOrder()
})
</script>

<template>
  <div class="flex flex-col p-8 bg-white shadow sm:rounded-lg">
    <div v-if="loading" class="flex justify-center items-center h-96">
      <span class="loading loading-infinity loading-lg text-primary" />
    </div>
    <div v-else-if="failed || !order" class="flex justify-center items-center h-96">
      <span class="text-red-500">Order not found</span>
    </div>
    <div v-else>
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
        <OrderProgressComponent :orderStatus="status" />
      </div>
    </div>
  </div>
</template>
