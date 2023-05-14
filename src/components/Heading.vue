<template>
  <div class="max-w-7xl mx-auto pt-16 px-4 sm:pt-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2
        v-if="tip"
        class="text-xl font-semibold text-primary tracking-wide uppercase"
      >
        {{ tip }}
      </h2>
      <p
        class="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
      >
        {{ title }}
      </p>
      <p v-if="text" class="max-w-3xl mt-5 mx-auto text-xl text-neutral-300">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tip: String,
    title: String,
    text: String,
  },
  setup(props) {
    return {
      title: props.title,
      tip: props.tip,
      text: props.text,
    }
  },
}
</script>
