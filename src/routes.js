const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
  },
  {
    path: "/partners",
    name: "Partners",
    component: () => import("@/views/PartnersView.vue"),
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("@/views/TermsView.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/PrivacyView.vue"),
  },
  {
    path: "/4808",
    name: "4808",
    component: () => import("@/views/4808/4808View.vue"),
    children: [
      {
        path: "",
        name: "4808Index",
        component: () => import("@/views/4808/4808IndexView.vue"),
      },
      {
        path: "booking",
        name: "4808Booking",
        component: () => import("@/views/4808/4808BookingView.vue"),
      },
    ],
  },
  {
    path: "/guerite1814",
    name: "Guerite1814",
    component: () => import("@/views/guerite/GueriteView.vue"),
    children: [
      {
        path: "",
        name: "Guerite1814Index",
        component: () => import("@/views/guerite/GueriteIndexView.vue"),
      },
      {
        path: "booking",
        name: "Guerite1814Booking",
        component: () => import("@/views/guerite/GueriteBookingView.vue"),
      },
      {
        path: "menu",
        name: "Guerite1814Menu",
        component: () => import("@/views/guerite/GueriteMenuView.vue"),
      },
    ],
  },
  {
    path: "/guerite1814/checkout/:sessionId",
    name: "Guerite1814BookVerify",
    component: () => import("@/views/guerite/GueriteBookingVerify.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
  {
    path: "/guerite1814/booking/:bookId",
    name: "Guerite1814Book",
    component: () => import("@/views/guerite/GueriteBookView.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
  {
    path: "/mayen1842",
    name: "Mayen1842",
    component: () => import("@/views/mayen/MayenView.vue"),
    children: [
      {
        path: "",
        name: "MayenIndex",
        component: () => import("@/views/mayen/MayenIndexView.vue"),
      },
      {
        path: "booking",
        name: "MayenBooking",
        component: () => import("@/views/mayen/MayenBookingView.vue"),
      },
    ],
  },
  {
    path: "/epicerie2018",
    name: "Epicerie2018",
    component: () => import("@/views/Epicerie.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/shop/ShopView.vue"),
    children: [
      {
        path: "",
        name: "ShopIndex",
        component: () => import("@/views/shop/ShopIndexView.vue"),
      },
      {
        path: "sweet",
        name: "ShopSweet",
        component: () => import("@/views/shop/ShopSweetView.vue"),
      },
      {
        path: "dirty",
        name: "ShopDirty",
        component: () => import("@/views/shop/ShopDirtyView.vue"),
      },
      {
        path: "liquors",
        name: "ShopLiquors",
        component: () => import("@/views/shop/ShopLiquorsView.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "ShopCart",
    component: () => import("@/views/shop/ShopCart.vue"),
  },
  {
    path: "/checkout",
    name: "ShopCheckout",
    component: () => import("@/views/shop/ShopCheckout.vue"),
  },
  {
    path: "/checkout/:sessionId",
    name: "ShopCheckoutSuccess",
    component: () => import("@/views/shop/ShopCheckoutSuccess.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
  {
    path: "/order/:orderId",
    name: "ShopOrder",
    component: () => import("@/views/shop/ShopOrder.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
  {
    path: "/product/:productId",
    name: "ShopProduct",
    component: () => import("@/views/shop/ShopProductView.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      robots: { disallow: true },
    },
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("@/views/RegisterView.vue"),
  // },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/account/AccountView.vue"),
    meta: {
      requiresAuth: true,
      sitemap: {
        hide: true,
      },
      robots: { disallow: true },
    },
    children: [
      {
        path: "",
        name: "AccountIndex",
        component: () => import("@/views/account/AccountIndexView.vue"),
      },
      // {
      //   path: "security",
      //   name: "AccountSecurity",
      //   component: () => import("@/views/account/AccountSecurityView.vue"),
      // },
      // {
      //   path: "order-history",
      //   name: "AccountOrderHistory",
      //   component: () => import("@/views/account/AccountOrderHistoryView.vue"),
      // },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/admin/AdminView.vue"),
    meta: {
      requiresAdmin: true,
      sitemap: {
        hide: true,
      },
      robots: { disallow: true },
    },
    children: [
      {
        path: "",
        name: "AdminIndex",
        component: () => import("@/views/admin/AdminIndexView.vue"),
      },
      {
        path: "add-product",
        name: "AdminAddProduct",
        component: () => import("@/views/admin/AdminAddProductView.vue"),
      },
      {
        path: "booking/guerite",
        name: "AdminGueriteBooking",
        component: () => import("@/views/admin/AdminGueriteBookingView.vue"),
      },
      {
        path: "booking/guerite-menu",
        name: "AdminGueriteMenu",
        component: () => import("@/views/admin/AdminGueriteMenuView.vue"),
      },
      {
        path: "booking/coupon/guerite",
        name: "AdminGueriteCoupon",
        component: () => import("@/views/admin/AdminGueriteCouponView.vue"),
      },
      {
        path: "booking/guerite/:bookId",
        name: "AdminGueriteBook",
        component: () => import("@/views/admin/AdminGueriteBookView.vue"),
      },
      {
        path: "products",
        name: "AdminProducts",
        component: () => import("@/views/admin/AdminProducts.vue"),
      },
    ],
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: () => import("@/views/UnauthorizedView.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      sitemap: {
        hide: true,
      },
    },
  },
]

export default routes
