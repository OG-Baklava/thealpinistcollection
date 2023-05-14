import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore"

class ProductService {
  constructor(db) {
    this.collection = collection(db, "products")
    this.db = db
  }
  async read() {
    const data = await getDocs(this.collection)
    return data.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
  }
  async get(id) {
    const document = await getDoc(doc(this.db, "products", id))
    return document.data()
  }
  async create(data) {
    return await addDoc(this.collection, data)
  }
  async update(id, data) {
    return await updateDoc(doc(this.db, "products", id), data)
  }
  async delete(id) {
    await deleteDoc(doc(this.db, "products", id))
  }
}

export default ProductService
