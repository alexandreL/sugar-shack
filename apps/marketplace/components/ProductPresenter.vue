<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SmallProductDto, SyrupType } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'
import ProductBox from './ProductBox.vue'

const products = ref<Array<SmallProductDto>>([])
const syrupTypeFilter = ref<SyrupType | ''>('')

const loading = ref<boolean>(true)

const page = ref<number>(1)
const perPage = 3 * 4 // 3 lines of 4 products

onMounted(async () => {
    await loadProducts()
})

const loadProducts = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    const syrupType = syrupTypeFilter.value === '' ? undefined : syrupTypeFilter.value
    products.value = await ProductClient.getProductByFilter({ syrupType, take: perPage.toString(), skip: ((page.value - 1) * perPage).toString() })

    clearTimeout(timeoutId)
    loading.value = false
}

const changePage = async (newPage: number) => {
    if (newPage < 1) {
        return
    }
    if (newPage > page.value && products.value.length < perPage) {
        return
    }
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
      <div class="flex">
        <div class="flex items-center">
          <select
            v-model="syrupTypeFilter"
            class="select select-bordered join-item mr-2"
            :class="syrupColor(syrupTypeFilter) + ' ' + syrupTextColor(syrupTypeFilter)"
            @change="loadProducts"
          >
            <option selected value="">
              All Syrup Types
            </option>
            <option v-for="type in Object.values(SyrupType)" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div>
          <NuxtLink to="/shoppingCart" class="btn btn-primary mr-2">
            <img src="/basket.png" alt="basket" class="w-6 h-6 mr-2">
            Shopping Cart
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 mx-auto">
      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="loading" class="flex justify-center items-center">
      <span class="loading loading-infinity loading-lg text-primary" />
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
