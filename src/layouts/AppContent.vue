<script setup>
const props = defineProps({
  textCenter: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    :class="[
      'mt-6 prose prose-a:text-primary prose-invert prose-lg text-white mx-auto p-4 lg:p-0',
      props.textCenter
        ? 'prose-p:text-center prose-h2:text-center prose-h3:text-center prose-h3:m-0'
        : 'prose-p:text-justify',
    ]"
  >
    <slot></slot>
  </div>
</template>
