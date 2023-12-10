<script lang="ts" setup>
import Footer from '../../components/Footer.vue'
import Header from '../../components/Header.vue'
import OrderResume from '../../components/OrderResume.vue'
const route = useRoute()

const uuid = route.params.uuid

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1 max-w-6xl md:py-8 md:p-8 md:mt-16">
      <OrderResume :uuid="uuid" />
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
