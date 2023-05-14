<script setup>
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import { ref, watch } from "vue"

const props = defineProps({
  modelValue: Object,
  allowedDates: {
    type: Array,
    default: [],
  },
  disabledDates: {
    type: Array,
    default: [],
  },
  multi: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue"])

const date = ref(props.modelValue)
watch(date, (newValue) => {
  emit("update:modelValue", newValue)
})
</script>

<template>
  <Datepicker
    id="date"
    v-model="date"
    :allowed-dates="props.allowedDates"
    :disabled-dates="props.disabledDates"
    :enable-time-picker="false"
    :month-change-on-scroll="false"
    :multi-dates="props.multi"
    :auto-apply="!props.multi"
    locale="fr"
    hide-input-icon
    dark
    input-class-name="!text-sm !py-3 !px-4  !shadow-sm !focus:ring-primary !focus:border-primary !rounded-md !bg-neutral-800 !border-neutral-600 text-white"
    class="mt-1"
  />
</template>

<style>
.dp__theme_dark {
  --dp-background-color: #262626;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #42b883;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
</style>
