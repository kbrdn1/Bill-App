<template>
  <tr class="border-b border-gray-500 odd:bg-zinc-200 even:bg-zinc-100">
    <td class="py-2 text-center">{{ `${client.firstName} ${client.lastName}` }}</td>
    <td class="py-2 text-center">{{ client.company }}</td>
    <td class="py-2 text-end">{{ client.date_added }}</td>
    <td class="flex gap-2 justify-end">
      <BButton
        variant="border-2 border-red-500 hover:bg-red-500"
        iconLeft="trash"
        @click="$emit('delete', this.client._id)"
      >
        Supprimer
      </BButton>
      <BButton
        variant="border-2 border-blue-500 hover:bg-blue-500"
        iconLeft="pen"
        @click="$emit('edit', this.client._id)"
      >
        Éditer
      </BButton>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    client: {
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
