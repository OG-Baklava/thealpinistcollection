import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { httpsCallable } from "firebase/functions"

class BookingService {
  constructor(db) {
    this.collectionName = "bookSettings"
    this.collection = collection(db, this.collectionName)
    this.db = db
    this.gueriteRef = doc(this.db, this.collectionName, "guerite")
    this.generalRef = doc(this.db, this.collectionName, "general")
  }
  async getGueriteSettings() {
    const document = await getDoc(this.gueriteRef)
    return document.data()
  }
  async updateGueriteSettings(values) {
    await updateDoc(this.gueriteRef, {
      ...values,
    })
    const document = await getDoc(this.gueriteRef)
    return document.data()
  }
  async getGeneralSettins() {
    const document = await getDoc(this.generalRef)
    return document.data()
  }
  async updateSettings(values) {
    await updateDoc(this.generalRef, {
      ...values,
    })
  }
}

class GueriteBookingService {
  constructor(db, functions) {
    this.collectionName = "gueriteBookings"
    this.collection = collection(db, this.collectionName)
    this.couponCollection = collection(db, "gueriteCoupon")
    this.db = db
    this.functions = functions
  }
  async create(data) {
    const createGueriteBooking = httpsCallable(
      this.functions,
      import.meta.env.PROD ? "createGueriteBooking" : "createGueriteBookingTest"
    )
    const result = await createGueriteBooking(data)
    return result.data
  }
  async verify(sessionId) {
    const validateGueriteBook = httpsCallable(
      this.functions,
      "validateGueriteBook"
    )
    const result = await validateGueriteBook({ sessionId: sessionId })
    return result.data.bookId
  }
  async checkCoupon(couponId, peoples) {
    const checkGueriteCoupon = httpsCallable(
      this.functions,
      "checkGueriteCoupon"
    )
    const result = await checkGueriteCoupon({
      couponId: couponId,
      peoples: peoples,
    })
    return result.data
  }
  async addCoupon(identifier, amount) {
    return await addDoc(this.couponCollection, {
      identifier: identifier,
      amount: amount,
      used: false,
    })
  }
  async closeCoupon(couponId) {
    const ref = doc(this.db, "gueriteCoupon", couponId)
    await updateDoc(ref, {
      used: true,
    })
  }
  async getBook(bookId) {
    const document = await getDoc(
      doc(this.db, "gueriteCustomerBooking", bookId)
    )
    return document.data()
  }
  async addBook(data) {
    return await addDoc(collection(this.db, "gueriteCustomerBooking"), data)
  }
  async deleteBook(bookId) {
    return await deleteDoc(doc(this.db, "gueriteCustomerBooking", bookId))
  }
  async createBookDate(data) {
    return await addDoc(this.collection, data)
  }
  async moveBook(fromBooking, toBooking, book) {
    await this.setAvailible(
      fromBooking.id,
      fromBooking.data.available + book.data.peoples
    )
    await this.setAvailible(
      toBooking.id,
      toBooking.data.available - book.data.peoples
    )
    const ref = doc(this.db, "gueriteCustomerBooking", book.id)
    await updateDoc(ref, {
      date: toBooking.data.date,
      bookRef: doc(this.db, this.collectionName, toBooking.id),
    })
  }
  async close(id) {
    const ref = doc(this.db, this.collectionName, id)
    await updateDoc(ref, {
      closed: true,
    })
  }
  async reopen(id) {
    const ref = doc(this.db, this.collectionName, id)
    await updateDoc(ref, {
      closed: false,
    })
  }
  async setAvailible(id, available) {
    const ref = doc(this.db, this.collectionName, id)
    await updateDoc(ref, {
      available: available,
      closed: available > 0 ? false : true,
    })
  }
}

class The4808BookingService {
  constructor(db) {
    this.collectionName = "the4808Booking"
    this.collection = collection(db, this.collectionName)
    this.db = db
  }
  mapData(data) {
    return data.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
  }
  async create(data) {
    return await addDoc(this.collection, data)
  }
}

class MayenBookingService {
  constructor(db) {
    this.collectionName = "mayenBooking"
    this.collection = collection(db, this.collectionName)
    this.db = db
  }
  mapData(data) {
    return data.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
  }
  async create(data) {
    return await addDoc(this.collection, data)
  }
}

export {
  BookingService,
  GueriteBookingService,
  MayenBookingService,
  The4808BookingService,
}
