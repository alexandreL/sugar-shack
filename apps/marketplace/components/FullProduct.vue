<script setup lang="ts">

import { FullProductDto } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'

const product = ref<FullProductDto>()
const productId = useAttrs().productId as number
const loading = ref<boolean>(true)
const addToCart = (id: number) => {
    console.log('Adding product with id: ', id)
}

onMounted(async () => {
    await loadProduct()
})

const loadProduct = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    product.value = await ProductClient.getProductById(productId)
    clearTimeout(timeoutId)
    loading.value = false
}

</script>
<template>
  <div>
    <div v-if="!product" class="flex justify-center items-center h-96">
      <span class="loading loading-infinity loading-lg text-primary"/>
    </div>
    <div v-else :key="productId" class="">
      <figure><img class="w-full h-48 object-cover" :src="product.image" alt="product_image"></figure>

      <div class="card-body">
        <span class="badge" :class="syrupColor(product.syrupType) + ' ' + syrupTextColor(product.syrupType)">
          {{ product.syrupType }}
        </span>
        <h2 class="text-gray-900 title-font text-lg font-medium card-title">
          {{ product.name }}
        </h2>
        <p class="mt-1">
          {{ product.description }}
        </p>
        <p class="mt-1">
          {{ product.stock }}
        </p>
        <p class="mt-1">
          ${{ product.price }}
        </p>

        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            @click="addToCart(product.id!)"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
