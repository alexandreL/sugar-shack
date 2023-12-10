<script setup lang="ts">
import { OrderDto, OrderStatus } from '@sugar-shack/shared'

const order: OrderDto = useAttrs().order as OrderDto
const status = ref<string>(order.orderStatus!)

const getNextStatus = () => {
    switch (status.value) {
    case OrderStatus.creating:
        return OrderStatus.pending
    case OrderStatus.pending:
        return OrderStatus.created
    case OrderStatus.created:
        return OrderStatus.shipped
    case OrderStatus.shipped:
        return OrderStatus.delivered
    }
}

const moveToNextStatus = async () => {
    const nextStatus = getNextStatus()
    order.orderStatus = nextStatus
    await OrderClient.updateOrder(order.uuid!, order)
    status.value = order.orderStatus!
}

const deleteOrder = async () => {
    await OrderClient.removeOrder(order.uuid!)
    status.value = order.orderStatus!
}

const cancelOrder = async () => {
    order.orderStatus = OrderStatus.cancelled
    await OrderClient.updateOrder(order.uuid!, order)
    status.value = order.orderStatus!
}

</script>
<template>
  <!--              <th>uuid</th>
            <th>customerName</th>
            <th>customerEmail</th>
            <th>totalPrice</th>
            <th>status</th>            <th>uuid</th>
            <th>customerName</th>
            <th>customerEmail</th>
            <th>totalPrice</th>
            <th>status</th>
            <th>Action</th>
            -->
  <tr>
    <td class="">
      <p>
        {{ order.uuid }}
      </p>
    </td>
    <td class="">
      <p>
        {{ order.customerName }}
      </p>
    </td>
    <td class="">
      <p>
        {{ order.customerEmail }}
      </p>
    </td>
    <td class="">
      <p>
        {{ order.totalPrice }}
      </p>
    </td>
    <td class="">
      <p>
        {{ status }}
      </p>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button v-if="!!getNextStatus()" class="btn btn-accent mr-2" @click="moveToNextStatus">
        Move to {{ OrderStatus[getNextStatus() || OrderStatus.cancelled] }}
      </button>
      <button v-if="status !== OrderStatus.cancelled" class="btn btn-error mr-2" @click="cancelOrder">
        Cancel
      </button>
      <button v-if="status === OrderStatus.cancelled" class="btn btn-error mr-2" @click="deleteOrder">
        Delete
      </button>
    </td>
  </tr>
</template>
