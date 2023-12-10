<script setup lang="ts">
import { FullProductDto } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'

const product: FullProductDto = useAttrs().product as FullProductDto
const stock = ref<number>(product.stock!)

const refillStock = async (productId: number) => {
    await ProductClient.refillStock(productId.toString())
    stock.value = product.maxStock || 0
}
</script>
<template>
  <tr>
    <td>
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10 rounded-full" :src="product.image" alt="">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium">
            {{ product.name }}
          </div>
          <span class="badge" :class="syrupColor(product.syrupType) + ' ' + syrupTextColor(product.syrupType)">
            {{ product.syrupType }}
          </span>
        </div>
      </div>
    </td>
    <td class="">
      <div class="">
        $ {{ product.price }}
      </div>
    </td>
    <td class="">
      <span class="badge badge-accent">
        {{ stock }}
      </span>
    </td>
    <td>
      <span class="badge badge-secondary">
        {{ product.maxStock }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button class="btn btn-accent mr-2" @click="refillStock(product.id!)">
        Refaire le stock
      </button>
      <NuxtLink :to="`/product/${product.id}`" class="text-indigo-600 hover:text-indigo-900">
        <button class="btn btn-primary">
          Edit
        </button>
      </NuxtLink>
    </td>
  </tr>
</template>
