<script setup>
import { XCircleIcon } from "@heroicons/vue/solid"
import VAlert from "./components/Alert.vue"

const props = defineProps({
  title: String,
  text: String,
})
</script>
<template>
  <VAlert
    :data="{
      title: props.title,
      text: props.text,
      bgColor: 'bg-red-500/10',
      ringColor: 'ring-red-500/20',
      iconColor: 'text-red-400',
      titleColor: 'text-red-400',
      textColor: 'text-red-400',
      icon: XCircleIcon,
    }"
  />
</template>
