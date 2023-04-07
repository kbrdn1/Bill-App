<template>
  <component
    :is="href ? 'a' : to ? 'router-link' : 'button'"
    class="px-4 py-2 font-medium flex-nowrap items-center gap-2 rounded-md transition-all cursor-pointer"
    :class="variant"
    :to="to"
    :href="href"
  >
    <i v-if="iconLeft" class="fa-solid mr-1" :class="'fa-' + iconLeft" /><slot /><i
      v-if="iconRight"
      class="fa-solid ml-1"
      :class="'fa-' + iconRight"
    />
  </component>
</template>

<script>
export default {
  props: {
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    },
    href: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
