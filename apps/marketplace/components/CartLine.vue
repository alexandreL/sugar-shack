<script setup lang="ts">
import { OrderLineDto, SyrupType } from '@sugar-shack/shared'

const orderLine: OrderLineDto = useAttrs().orderLine as OrderLineDto
const allowDelete = useAttrs().allowDelete as boolean
const removeItem = (id: number) => {
    console.log('Removing product with id: ', id)
}
</script>

<template>
  <li class="shadow sm:rounded-md sm:overflow-hidden">
    <div class="px-4 py-4 sm:px-6 flex items-center space-x-6">
      <div class="flex-shrink-0">
        <img class="w-8 h-8" :src="orderLine.productImage" alt="">
      </div>
      <div class="flex-1 truncate">
        <div class="text-sm font-medium text-indigo-600 truncate">
          {{ orderLine.productName }}
        </div>
        <p class="text-sm text-gray-500 truncate">
          Quantity: {{ orderLine.quantity }}
        </p>
      </div>
      <div class="text-sm text-gray-500">
        ${{ orderLine.productPrice }}
      </div>
      <button
        v-if="allowDelete"
        class="px-2 py-1 border rounded-md text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
        title="Remove product"
        @click="removeItem(orderLine.id!)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m5-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </li>
</template>
