<script lang="ts" setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Cart from '../components/Cart.vue'
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <Header />
    <main class="flex-1 max-w-6xl md:py-8 md:p-8 md:mt-16">
      <Cart />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
