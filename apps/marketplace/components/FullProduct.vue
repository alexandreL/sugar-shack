<script setup lang="ts">

import { FullProductDto } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'
import { useOrderStore } from '../store'

const product = ref<FullProductDto>()
const productId = useAttrs().productId as number
const loading = ref<boolean>(true)
const addToCart = () => {
    const store = useOrderStore()
    store.addProduct(product.value!)
}

onMounted(async () => {
    await loadProduct()
})

const loadProduct = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    product.value = await ProductClient.getProductById(productId) || undefined
    clearTimeout(timeoutId)
    loading.value = false
}
const isInStock = () => {
    return product.value && product.value.stock! > 0
}
</script>
<template>
  <div>
    <div v-if="!product" class="flex justify-center items-center h-96">
      <span class="loading loading-infinity loading-lg text-primary" />
    </div>
    <div v-else :key="productId" class="">
      <figure class="flex justify-center items-center">
        <img class=" object-cover image-full" :src="product.image" alt="product_image">
      </figure>

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
          Stock:
          {{ product.stock }}
        </p>
        <p class="mt-1">
          prix:
          ${{ product.price }}
        </p>
        <span
          v-if="!isInStock()"
          class="badge badge-secondary"
        >
          En rupture de stock
        </span>
        <div class="card-actions justify-end">
          <button
            :disabled="!isInStock()"
            class="btn btn-primary"
            @click="addToCart()"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
