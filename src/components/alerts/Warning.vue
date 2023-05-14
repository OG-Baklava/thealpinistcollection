<template>
  <Alert :data="data" />
</template>

<script>
import Alert from "./components/Alert.vue"
import { ExclamationIcon } from "@heroicons/vue/solid"

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
        bgColor: "bg-yellow-500 bg-opacity-10",
        iconColor: "text-yellow-500",
        titleColor: "text-yellow-500",
        textColor: "text-yellow-500",
        icon: ExclamationIcon,
      },
    }
  },
}
</script>
