<template>
  <tr class="border-b border-gray-500 odd:bg-zinc-200 even:bg-zinc-100">
    <td class="py-2 text-center">{{ bill.date }}</td>
    <td class="py-2 text-center">{{ bill.description }}</td>
    <td class="py-2 text-center">
      {{ bill.client.firstName }} {{ bill.client.lastName }} ({{ bill.client.companyName }})
    </td>
    <td class="py-2 text-end">{{ bill.totalHT.toFixed(2) }} € HT</td>
    <td class="py-2 text-end">{{ bill.totalTTC.toFixed(2) }} € TTC</td>
    <td class="flex gap-2 justify-end">
      <BButton
        variant="border-2 border-red-500 hover:bg-red-500"
        iconLeft="trash"
        @click="$emit('delete', this.bill._id)"
      >
        Supprimer
      </BButton>
      <BButton
        variant="border-2 border-blue-500 hover:bg-blue-500"
        iconLeft="pen"
        @click="$emit('edit', this.bill._id)"
      >
        Éditer
      </BButton>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    bill: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: '-'
    }
  }
}
</script>

<style lang="scss" scoped></style>
