<script setup>
const props = defineProps({
  tip: String,
  title: String,
  text: String,
})
</script>

<template>
  <div class="max-w-7xl mx-auto pt-16 px-4 sm:pt-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2
        v-if="props.tip"
        class="text-xl font-semibold text-primary tracking-wide uppercase"
      >
        {{ props.tip }}
      </h2>
      <p
        class="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
      >
        {{ props.title }}
      </p>
      <p
        v-if="props.text"
        class="max-w-3xl mt-5 mx-auto text-xl text-neutral-300"
      >
        {{ props.text }}
      </p>
    </div>
  </div>
</template>
