<script setup lang="ts">
import { FullProductDto, SyrupType } from '@sugar-shack/shared'

const product = ref<FullProductDto>()
const productId = useAttrs().productId as string
const loading = ref<boolean>(true)
const router = useRouter()
const syrupType = ref<SyrupType>(SyrupType.AMBER)

onMounted(async () => {
    await loadProduct()
})

const loadProduct = async () => {
    const timeoutId = setTimeout(() => (loading.value = true), 200)
    product.value = await ProductClient.getProductById(productId) || undefined
    clearTimeout(timeoutId)
    syrupType.value = product.value?.syrupType || SyrupType.AMBER
    loading.value = false
}

const updateProduct = async () => {
    await ProductClient.updateProduct(productId, product.value!)
    router.push('/products')
}

</script>

<template>
  <div class="flex justify-center items-center">
    <div class="m-4 rounded shadow-lg py-5 px-10 w-1/2">
      <h1 class="text-2xl font-bold mb-4">
        Edit Product
      </h1>
      <div v-if="!product" class="flex justify-center items-center">
        <span class="loading loading-infinity loading-lg text-primary" />
      </div>
      <form v-else @submit.prevent="updateProduct">
        <div class="form-control">
          <label class="label">Product Name</label>
          <input v-model="product.name" class="input input-primary input-bordered" type="text">
        </div>

        <div class="form-control mt-3">
          <label class="label">Description</label>
          <textarea v-model="product.description" class="textarea textarea-bordered textarea-primary" />
        </div>

        <div class="form-control mt-3">
          <label class="label">Price</label>
          <input v-model="product.price" class="input input-primary input-bordered" type="number" step="0.01">
        </div>

        <div class="form-control mt-3">
          <label class="label">Stock</label>
          <input v-model="product.stock" class="input input-primary input-bordered" type="number">
        </div>

        <div class="form-control mt-3">
          <label class="label">Max Stock</label>
          <input v-model="product.maxStock" class="input input-primary input-bordered" type="number">
        </div>

        <div class="form-control mt-3">
          <label class="label">Image URL</label>
          <input v-model="product.image" class="input input-primary input-bordered" type="text">
        </div>

        <div class="form-control mt-3">
          <label class="label">Syrup Type</label>
          <select
            v-model="syrupType"
            class="select select-bordered"
            :class="syrupColor(syrupType) + ' ' + syrupTextColor(syrupType)"
          >
            <option v-for="type in Object.values(SyrupType)" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-4">
          Update Product
        </button>
      </form>
    </div>
  </div>
</template>
