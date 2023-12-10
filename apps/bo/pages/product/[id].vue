<script setup lang="ts">

const route = useRoute()

const productId = route.params.id as string

</script>

<template>
  <EditProduct :productId="productId" />
</template>

<style scoped>

</style>
