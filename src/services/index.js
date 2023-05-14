import { db, functions, storage } from "../firebase"
import {
  BookingService,
  GueriteBookingService,
  MayenBookingService,
  The4808BookingService,
} from "./booking"
import CheckoutService from "./checkout"
import ContactService from "./contact"
import ProductService from "./products"
import StorageService from "./storage"
import UserService from "./user"

const productService = new ProductService(db)
const storageService = new StorageService(storage)
const bookingService = new BookingService(db)
const gueriteBookingService = new GueriteBookingService(db, functions)
const the4808BookingService = new The4808BookingService(db)
const mayenBookingService = new MayenBookingService(db)
const contactService = new ContactService(db)
const userService = new UserService(db)
const checkoutService = new CheckoutService(db, functions)

export {
  productService,
  storageService,
  bookingService,
  contactService,
  gueriteBookingService,
  the4808BookingService,
  mayenBookingService,
  userService,
  checkoutService,
}
