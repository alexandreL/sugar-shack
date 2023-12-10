<script setup lang="ts">

import { SmallProductDto } from '@sugar-shack/shared'
import { syrupColor, syrupTextColor } from '../utils/syrupColor'

const product: SmallProductDto = useAttrs().product as SmallProductDto
const addToCart = (id: number) => {
    console.log('Adding product with id: ', id)
}
const showModal = () => {
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement
    modal.showModal()
}
</script>
<template>
  <div>
    <div :key="product.id" class="card bg-base-100 shadow-xl hover:cursor-pointer" @click="showModal">
      <figure><img class="w-full h-48 object-cover" :src="product.image" alt="product_image"></figure>

      <div class="card-body">
        <span class="badge" :class="syrupColor(product.syrupType) + ' ' + syrupTextColor(product.syrupType)">
          {{ product.syrupType }}
        </span>
        <h2 class="text-gray-900 title-font text-lg font-medium card-title">
          {{ product.name }}
        </h2>
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
    <dialog id="my_modal_2" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <form method="dialog" class="">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <FullProduct :product-id="product.id" />
      </div>
      <form method="dialog" class="modal-backdrop" />
    </dialog>
  </div>
</template>
