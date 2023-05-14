<script setup>
import ErrorAlert from "@/components/alerts/Error.vue"
import SuccessAlert from "@/components/alerts/Success.vue"
import FormCheckbox from "@/components/form/FormCheckbox.vue"
import FormQuants from "@/components/form/FormQuants.vue"
import FormSelect from "@/components/form/FormSelect.vue"
import Input from "@/components/form/Input.vue"
import Textarea from "@/components/form/Textarea.vue"
import VSpin from "@/components/VSpin.vue"
import { productService, storageService } from "@/services"
import { useForm } from "vee-validate"
import { reactive, ref } from "vue"

const props = defineProps({
  initialData: Object,
  update: {
    type: Boolean,
    default: false,
  },
  productId: {
    type: String,
    default: "",
  },
})

const initialState = {
  success: false,
  error: false,
  loading: false,
  formError: false,
}
const state = reactive({ ...initialState })
const collections = [
  {
    id: "sweet",
    name: "Sucré",
  },
  {
    id: "dirty",
    name: "Salé",
  },
  {
    id: "liquors",
    name: "Liqueurs",
  },
]
const uom = [
  {
    id: "cl",
    name: "Centilitres (cl)",
  },
  {
    id: "g",
    name: "Grammes (g)",
  },
]
const quantsData = ref(
  props.initialData?.quants ? props.initialData.quants : []
)
const coverData = reactive({
  file: null,
  fileName: null,
  fileBlob: null,
})

const { handleSubmit, resetForm, meta } = useForm({
  initialValues: props.initialData,
})

const reset = () => {
  resetForm()
  coverData.file = null
  coverData.fileBlob = null
  coverData.fileName = null
  quantsData.value = []
}

const uploadCover = async () => {
  const reference = (Math.random() + 1).toString(36).substring(2)
  const thumbReference = `${reference}_400x300`
  const url = await storageService.uploadProductCover(coverData.file, reference)
  let thumbUrl = null
  let errorCount = 0
  while (errorCount < 20) {
    const getUrl = async () => {
      try {
        return await storageService.getUrl(thumbReference)
      } catch (exc) {
        switch (exc.code) {
          case "storage/object-not-found":
            await new Promise((r) => setTimeout(r, 2000))
            errorCount += 1
            return await getUrl()
          default:
            state.error = true
            return null
        }
      }
    }
    thumbUrl = await getUrl()
    break
  }
  if (!thumbUrl) return null
  return { url: url, thumbUrl: thumbUrl }
}

const create = async (values) => {
  if (coverData.file == null) {
    state.formError = true
    return
  }
  state.loading = true
  const res = await uploadCover()
  if (res == null) {
    state.error = true
    state.loading = false
    return
  }
  try {
    await productService.create({
      ...values,
      coverUrl: res.url,
      thumbUrl: res.thumbUrl,
      quants: quantsData.value,
    })
    state.success = true
  } catch (exc) {
    state.error = true
  }
  state.loading = false
  reset()
}

const update = async (values) => {
  state.loading = true
  let res = null
  if (coverData.file != null) {
    res = await uploadCover()
    if (res == null) {
      state.error = true
      state.loading = false
      return
    }
  }
  try {
    await productService.update(props.productId, {
      ...values,
      quants: quantsData.value,
      ...(res != null && {
        coverUrl: res.url,
        thumbUrl: res.thumbUrl,
      }),
    })
    state.success = true
  } catch (exc) {
    state.error = true
  }
  state.loading = false
}

const onSubmit = handleSubmit(async (values) => {
  Object.assign(state, initialState)
  if (quantsData.value.length == 0) {
    state.formError = true
    return
  }
  if (props.update) await update(values)
  else await create(values)
})

const changeCover = (event) => {
  if (event.target.files.length > 0) {
    const file = event.target.files[0]
    ;(coverData.file = file),
      (coverData.fileName = file.name),
      (coverData.fileBlob = window.URL.createObjectURL(file))
  }
}
</script>

<template>
  <div
    class="relative max-w-xl mx-auto p-8 rounded-lg shadow-lg bg-neutral-800"
  >
    <form @submit="onSubmit">
      <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <Input identifier="name" label="Nom du produit" type="text" />
        </div>
        <div>
          <Input identifier="shortText" label="Texte court" type="text" />
        </div>
        <div class="sm:col-span-2">
          <FormQuants
            identifier="quants"
            label="Quantités"
            :quants-data="quantsData"
          />
        </div>
        <div>
          <FormCheckbox
            identifier="active"
            label="Actif"
            text="Contrôle la visibilité du produit sur le shop"
          />
        </div>
        <div>
          <FormCheckbox
            identifier="available"
            label="Disponible"
            text="Contrôle la disponibilité du produit sur le shop"
          />
        </div>
        <div>
          <FormSelect
            identifier="collections"
            label="Collection"
            :options="collections"
          />
        </div>
        <div>
          <FormSelect identifier="uom" label="Unité de mesure" :options="uom" />
        </div>
        <div class="sm:col-span-2">
          <Textarea identifier="text" label="Texte complet" :rows="4" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-primary">
            Cover photo
          </label>
          <div
            class="relative mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-neutral-600 border-dashed rounded-md"
          >
            <div
              :class="[
                'space-y-1 text-center flex flex-col justify-center',
                coverData.fileBlob ? 'absolute inset-0 ' : '',
              ]"
            >
              <svg
                class="mx-auto h-12 w-12 text-neutral-300"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="text-sm text-white">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-opacity-80 focus-within:outline-none focus-within:ring-0"
                >
                  <span>Choisissez un fichier</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    accept="image/*"
                    @change="changeCover($event)"
                  />
                </label>
              </div>
              <p class="text-xs text-neutral-300">PNG, JPG, GIF up to 10MB</p>
            </div>
            <img v-if="coverData.fileBlob" :src="coverData.fileBlob" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <button type="submit" class="w-full button-primary">
            <template v-if="state.loading">
              <v-spin />
            </template>
            <template v-else>Envoyer</template>
          </button>
        </div>
        <div v-if="state.formError" class="sm:col-span-2">
          <ErrorAlert
            title="Une erreur est survenue !"
            text="Veuillez saisir au moins une quantité et une photo"
          />
        </div>
        <div v-if="state.error" class="sm:col-span-2">
          <ErrorAlert
            title="Une erreur est survenue !"
            text="Veuillez contactez l'administrateur"
          />
        </div>
        <div v-if="state.success" class="sm:col-span-2">
          <SuccessAlert
            title="Opération réussie !"
            text="Le produit a correctement été inséré."
          />
        </div>
      </div>
    </form>
  </div>
</template>
