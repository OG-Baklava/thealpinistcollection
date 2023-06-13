<script setup>
import VGueriteMenu from "@/components/VGueriteMenu.vue"
const props = defineProps({
  menu: Object,
})
</script>

<template>
  <div>
    <VGueriteMenu :menu="props.menu" />
  </div>
</template>
