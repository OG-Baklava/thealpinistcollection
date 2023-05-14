import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

class StorageService {
  constructor(storage) {
    this.storage = storage
    this.productsRef = ref(storage, "products")
  }
  async uploadProductCover(file, reference, metadata) {
    const snapshot = await uploadBytes(
      ref(this.productsRef, reference),
      file,
      metadata
    )
    return await getDownloadURL(snapshot.ref)
  }
  async getUrl(reference) {
    return await getDownloadURL(ref(this.productsRef, reference))
  }
}

export default StorageService
