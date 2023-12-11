<script setup lang="ts">
import { ref } from 'vue'
import { SmallProductDto } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'
import { useOrderStore } from '../store'

const product: SmallProductDto = useAttrs().product as SmallProductDto
const addToCart = () => {
    const store = useOrderStore()
    store.addProduct(product)
}
const isLoaded = ref<boolean>(false)
const showModal = () => {
    isLoaded.value = true
    const modal = document.getElementById('my_modal' + product.id) as HTMLDialogElement
    modal.showModal()
}

const isInStock = () => {
    return product.stock! > 0
}
</script>
<template>
  <div>
    <div :key="product.id" class="card bg-base-100 shadow-xl ">
      <figure><img class="w-full h-48 object-cover" :src="product.image" alt="product_image"></figure>

      <div class="card-body">
        <span class="badge" :class="syrupColor(product.syrupType) + ' ' + syrupTextColor(product.syrupType)">
          {{ product.syrupType }}
        </span>
        <h2 class="text-gray-900 title-font text-lg font-medium card-title hover:cursor-pointer" @click="showModal">
          {{ product.name }}
        </h2>
        <p class="mt-1">
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
    <dialog :id="'my_modal'+ product.id" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <form method="dialog" class="">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <FullProduct v-if="isLoaded" :id="product.id" :key="product.id" :productId="product.id" />
      </div>
      <form method="dialog" class="modal-backdrop" />
    </dialog>
  </div>
</template>
