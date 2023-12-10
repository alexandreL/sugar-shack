<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SmallProductDto, SyrupType } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'
import ProductBox from '~/components/ProductBox.vue'

const products = ref<Array<SmallProductDto>>([])
const syrupTypeFilter = ref<SyrupType | null>('')

const loading = ref<boolean>(true)

const page = ref<number>(1)
const perPage = 3 * 4 // 3 lines of 4 products

onMounted(async () => {
    await loadProducts()
})

const loadProducts = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    if (syrupTypeFilter.value === null) {
        products.value = await ProductClient.getAllProducts()
    } else {
        products.value = await ProductClient.getProductByFilter({ syrupType: syrupTypeFilter.value })
    }
    clearTimeout(timeoutId)
    loading.value = false
}

const changePage = async (newPage: number) => {
    page.value = newPage
    await loadProducts()
}
</script>
<template>
  <div class="container mx-auto py-10 px-6 md:px-12">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold tracking-tight">
        Our Products
      </h2>
      <select
        v-model="syrupTypeFilter"
        class="select select-bordered join-item"
        :class="syrupColor(syrupTypeFilter) + ' ' + syrupTextColor(syrupTypeFilter)"
        @change="loadProducts"
      >
        <option selected value="">
          All
        </option>
        <option v-for="type in Object.values(SyrupType)" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>

    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 mx-auto">
      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="loading" class="flex justify-center items-center">
      <span class="loading loading-infinity loading-lg text-primary"/>
    </div>

    <div class="flex justify-center items-center mt-4">
      <div class="join">
        <button
          class="join-item btn"
          @click="changePage(page - 1)"
        >
          «
        </button>
        <button
          class="join-item btn"
        >
          Page {{ page }}
        </button>
        <button
          class="join-item btn"
          @click="changePage(page + 1)"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>