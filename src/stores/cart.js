import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("shop/cart", () => {
  const products = ref([])
  const shippingFee = 10.7
  const allowCheckout = computed(() => products.value.length > 0)
  const total = computed(() =>
    products.value
      .map((product) => product.selectedSize.price)
      .reduce((a, b) => a + b, 0)
  )
  const totalAmount = computed(() => total.value + shippingFee)

  const addProduct = (product) => {
    // let index = products.value.map((n) => n.id).indexOf(product.id)
    // if (index == -1) products.value.push({ ...product, qty: 1 })
    // else
    //   products.value[index] = {
    //     ...products.value[index],
    //     qty: products.value[index].qty + 1,
    //   }
    products.value.push(product)
  }

  const rmProduct = (productId) => {
    let index = products.value.map((n) => n.id).indexOf(productId)
    if (index == -1) return
    products.value.splice(index, 1)
    // let product = products.value[index]
    // if (product.qty == 1) products.value.splice(index, 1)
    // else
    //   products.value[index] = {
    //     ...product,
    //     qty: product.qty + 1,
    //   }
  }

  const clear = () => {
    products.value = []
  }
  return {
    products,
    addProduct,
    clear,
    rmProduct,
    total,
    allowCheckout,
    totalAmount,
    shippingFee,
  }
})
