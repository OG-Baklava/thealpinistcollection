import { collection, addDoc } from "firebase/firestore"

class ContactService {
  constructor(db) {
    this.collection = collection(db, "contact")
    this.db = db
  }
  async create(data) {
    return await addDoc(this.collection, data)
  }
}

export default ContactService
