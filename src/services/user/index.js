import { collection, doc, getDoc, updateDoc } from "firebase/firestore"

class UserService {
  constructor(db) {
    this.collectionName = "users"
    this.collection = collection(db, this.collectionName)
    this.db = db
  }
  async getProfile(uid) {
    const document = await getDoc(doc(this.db, this.collectionName, uid))
    return document.data()
  }
  async updateProfile(data, uid) {
    await updateDoc(doc(this.db, this.collectionName, uid), data)
    const document = await getDoc(doc(this.db, this.collectionName, uid))
    return document.data()
  }
}

export default UserService
