<template>
  <Alert :data="data" />
</template>

<script>
import { CheckCircleIcon } from "@heroicons/vue/solid"
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
        bgColor: "bg-primary bg-opacity-50",
        iconColor: "text-white",
        titleColor: "text-white",
        textColor: "text-white",
        icon: CheckCircleIcon,
      },
    }
  },
}
</script>
