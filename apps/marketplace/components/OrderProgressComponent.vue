<script setup lang="ts">
import { OrderStatus } from '@sugar-shack/shared'

const orderStatus = useAttrs().orderStatus as OrderStatus

const steps = [
    { status: OrderStatus.pending, title: 'En cours de traitement' },
    { status: OrderStatus.created, title: 'Commande créée' },
    { status: OrderStatus.shipped, title: 'Commande expédiée' },
    { status: OrderStatus.delivered, title: 'Commande livrée' }
]
const stepClass = (step: { status: OrderStatus }) => {
    if (orderStatus === OrderStatus.cancelled) {
        return 'step step-error'
    } else if (orderStatus === step.status) {
        return 'step step-primary'
    } else if (steps.findIndex(s => s.status === step.status) < steps.findIndex(s => s.status === orderStatus)) {
        return 'step step-primary'
    } else {
        return 'step'
    }
}
</script>

<template>
  <div>
    <ul class="steps">
      <li
        v-for="(step, i) in steps"
        :key="i"
        :class="stepClass(step)"
      >
        {{ step.title }}
      </li>
    </ul>
    <div v-if="orderStatus === OrderStatus.cancelled" class="mt-4 text-error">
      The order has been cancelled.
    </div>
  </div>
</template>
