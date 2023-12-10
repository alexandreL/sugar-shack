<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SmallProductDto } from '@sugar-shack/shared'
import ProductLine from '~/components/ProductLine.vue'

const products = ref<Array<SmallProductDto>>([])
const loading = ref<boolean>(true)

onMounted(async () => {
    await loadProducts()
})

const loadProducts = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    products.value = await ProductClient.getAllProducts()

    clearTimeout(timeoutId)
    loading.value = false
}

</script>
<template>
  <div class="container mx-auto py-10 px-6 md:px-12">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold tracking-tight">
        Nos produits
      </h2>
    </div>

    <div v-if="!loading" class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Produit</th>
            <th>prix</th>
            <th>stock</th>
            <th>stock Maximum</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <ProductLine
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="flex justify-center items-center">
      <span class="loading loading-infinity loading-lg text-primary" />
    </div>
  </div>
</template>
