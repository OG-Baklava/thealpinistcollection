import { collection, doc, getDoc } from "firebase/firestore"
import { httpsCallable } from "firebase/functions"

class CheckoutService {
  constructor(db, functions) {
    this.collection = collection(db, "checkout")
    this.db = db
    this.functions = functions
  }
  mapData(data) {
    return data.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
  }
  async create(data) {
    // return await addDoc(this.collection, data)
    const createCheckout = httpsCallable(this.functions, "createCheckout")
    const result = await createCheckout(data)
    return result.data.sessionId
  }
  async get(id) {
    const document = await getDoc(doc(this.db, "checkout", id))
    return document.data()
  }
  async verify(sessionId) {
    // const snapshot = await getDocs(
    //   query(this.collection, where("checkoutSessionId.id", "==", sessionId))
    // )
    // console.log(snapshot)
    // if (snapshot.empty) return false
    // const doc = snapshot.docs[0]
    // await updateDoc(doc, {
    //   orderSuccess: true,
    // })
    // return doc.id
    const validatePayment = httpsCallable(this.functions, "validatePayment")
    const result = await validatePayment({ sessionId: sessionId })
    return result.data.orderId
  }
}

export default CheckoutService
