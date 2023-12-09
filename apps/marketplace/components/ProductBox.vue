<script setup lang="ts">

import { SmallProductDto } from '@sugar-shack/shared'

const product: SmallProductDto = useAttrs().product as SmallProductDto
const addToCart = (id: number) => {
    console.log('Adding product with id: ', id)
}

</script>
<template>
  <div :key="product.id">
    <div class="block relative h-48 rounded overflow-hidden">
      <img alt="product_image" class="object-cover object-center w-full h-full block" :src="product.image">
    </div>
    <div class="mt-4">
      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
        {{ product.syrupType }}
      </h3>
      <h2 class="text-gray-900 title-font text-lg font-medium">
        {{ product.name }}
      </h2>
      <p class="mt-1">
        ${{ product.price }}
      </p>
      <button
        class="px-3 py-2 my-2 rounded-full bg-primary text-white"
        @click="addToCart(product.id!)"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>
