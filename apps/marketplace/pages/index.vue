<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SmallProductDto } from '@sugar-shack/shared'
import ProductBox from '~/components/ProductBox.vue'

const products = ref<Array<SmallProductDto>>([])

onMounted(async () => {
    products.value = await ProductClient.getAllProducts()
})

const showProduct = (id: number) => {
    console.log('Product Clicked:', id)
    // Here you can add your routing logic to navigate to the detailed product page.
}

</script>
<template>
  <div class="container mx-auto py-10 px-6 md:px-12">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold tracking-tight">
        Our Products
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 mx-auto">
      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="cursor-pointer hover:shadow-lg transition-all"
        @click="showProduct(product.id!)"
      />
    </div>
  </div>
</template>

<style>
h2 {
    color: #2c3e50;
}
</style>
