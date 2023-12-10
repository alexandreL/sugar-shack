<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OrderDto } from '@sugar-shack/shared'
import { OrderClient } from '~/utils/client'
import OrderLine from '~/components/OrderLine.vue'

const orders = ref<Array<OrderDto>>([])
const loading = ref<boolean>(true)

onMounted(async () => {
    await loadOrders()
})

const loadOrders = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    orders.value = await OrderClient.getAllOrders()

    clearTimeout(timeoutId)
    loading.value = false
}

</script>

<template>
  <div class="container mx-auto py-10 px-6 md:px-12">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold tracking-tight">
        Les commandes
      </h2>
    </div>

    <div v-if="!loading" class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>uuid</th>
            <th>customerName</th>
            <th>customerEmail</th>
            <th>totalPrice</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <OrderLine
            v-for="order in orders"
            :key="order.uuid"
            :order="order"
          />
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="flex justify-center items-center">
      <span class="loading loading-infinity loading-lg text-primary" />
    </div>
  </div>
</template>

<style scoped>

</style>
