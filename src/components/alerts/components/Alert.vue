<template>
  <div :class="['rounded-md p-4', bgColor]">
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="icon"
          :class="['h-5 w-5', iconColor]"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <span :class="['text-sm font-medium', titleColor]">{{ title }}</span>
        <div :class="['mt-2 text-sm', textColor]">
          <p>
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  setup(props) {
    return {
      title: props.data.title,
      text: props.data.text,
      bgColor: props.data.bgColor,
      iconColor: props.data.iconColor,
      titleColor: props.data.titleColor,
      textColor: props.data.textColor,
      icon: props.data.icon,
    }
  },
}
</script>
