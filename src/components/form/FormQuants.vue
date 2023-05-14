<script setup>
import { PlusIcon } from "@heroicons/vue/solid"
import { reactive, toRefs } from "vue"

const props = defineProps({
  label: String,
  identifier: String,
  text: String,
  quantsData: Array,
})

const { label, identifier, text, quantsData } = toRefs(props)
const quantsForm = reactive({
  price: 0,
  qty: 0.0,
  text: "",
})
const onAddQty = () => {
  quantsData.value.push({
    price: quantsForm.price,
    qty: quantsForm.qty,
    text: quantsForm.text,
  })
}
const onDelete = (idx) => quantsData.value.splice(idx, 1)
</script>

<template>
  <label for="text" :class="['block text-sm font-medium text-primary']"
    >Quantités</label
  >
  <div
    v-if="quantsData.length"
    class="-mx-4 my-4 ring-1 ring-neutral-600 sm:-mx-6 md:mx-0 md:rounded-lg"
  >
    <table class="min-w-full divide-y divide-neutral-600">
      <thead>
        <tr>
          <th
            scope="col"
            class="py-2.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6"
          >
            Quantité
          </th>
          <th
            scope="col"
            class="px-3 py-2.5 text-left text-sm font-semibold text-primary"
          >
            Prix
          </th>
          <th
            scope="col"
            class="px-3 py-2.5 text-left text-sm font-semibold text-primary"
          >
            Description
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">delete</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quant, planIdx) in quantsData" :key="quant">
          <td
            :class="[
              planIdx === 0 ? '' : 'border-t border-neutral-600',
              'pl-4 pr-3 py-3.5 text-sm text-gray-500 sm:pl-6',
            ]"
          >
            {{ quant.qty }}
          </td>
          <td
            :class="[
              planIdx === 0 ? '' : 'border-t border-neutral-600',
              'px-3 py-3.5 text-sm text-gray-500',
            ]"
          >
            {{ quant.price }}
          </td>
          <td
            :class="[
              planIdx === 0 ? '' : 'border-t border-neutral-600',
              'px-3 py-3.5 text-sm text-gray-500',
            ]"
          >
            {{ quant.text }}
          </td>
          <td
            :class="[
              planIdx === 0 ? '' : 'border-t border-neutral-600',
              'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium',
            ]"
          >
            <button class="button-primary-small" @click="onDelete(planIdx)">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="ml-2 flex gap-x-8 mt-1">
    <div class="flex-grow">
      <label for="quantity" :class="['block text-sm font-medium text-primary']"
        >Quantité</label
      >
      <div class="mt-1">
        <input
          id="quantity"
          v-model="quantsForm.qty"
          placeholder="Quantité (ex: 100)"
          type="number"
          step="0.1"
          class="text-sm py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white"
        />
      </div>
    </div>
    <div class="flex-grow">
      <label for="quantity" :class="['block text-sm font-medium text-primary']"
        >Prix</label
      >
      <div class="mt-1">
        <input
          id="price"
          v-model="quantsForm.price"
          type="number"
          step="0.1"
          placeholder="Prix (ex: 17.30)"
          class="text-sm py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white"
        />
      </div>
    </div>
  </div>
  <div class="ml-2 mt-2">
    <label for="text" :class="['block text-sm font-medium text-primary']"
      >Texte</label
    >
    <div class="mt-1 flex items-center">
      <div class="flex-grow">
        <input
          id="text"
          v-model="quantsForm.text"
          type="text"
          step="0.1"
          placeholder="Petit texte en relation avec la quantité (Pas affiché si une seul quantité)"
          class="text-sm py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary rounded-md bg-neutral-800 border-neutral-600 text-white"
        />
      </div>
      <span class="ml-3">
        <button type="button" class="button-primary-small" @click="onAddQty">
          <PlusIcon class="-ml-2 mr-1 h-5 w-5 text-white" aria-hidden="true" />
          <span>Add</span>
        </button>
      </span>
    </div>
  </div>
</template>
