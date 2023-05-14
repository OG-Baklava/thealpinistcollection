<template>
  <Alert :data="data" />
</template>

<script>
import { XCircleIcon } from "@heroicons/vue/solid"
import Alert from "./components/Alert.vue"

export default {
  components: {
    Alert,
  },
  props: {
    title: String,
    text: String,
  },
  setup(props) {
    return {
      data: {
        title: props.title,
        text: props.text,
        bgColor: "bg-red-500 bg-opacity-10",
        iconColor: "text-red-500",
        titleColor: "text-red-500",
        textColor: "text-red-500",
        icon: XCircleIcon,
      },
    }
  },
}
</script>
