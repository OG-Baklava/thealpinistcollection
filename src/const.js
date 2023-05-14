import {
  HomeIcon,
  LibraryIcon,
  PhotographIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/outline"

const navigation = [
  {
    name: "Le 4808",
    description: "La Cuisine étoilée de Pierre & Delphine chez vous.",
    icon: PhotographIcon,
    to: "/4808",
  },
  {
    name: "La Guérite 1814",
    description: "Une table éphémère gastronomique étoilée dans une guérite.",
    icon: LibraryIcon,
    to: "/guerite1814",
  },
  {
    name: "Le Mayen 1842",
    description:
      "Un mayen dans les pâturages de Prarion en-dessus d’Isérables.",
    icon: HomeIcon,
    to: "/mayen1842",
  },
  {
    name: "L'Epicerie 2018",
    description:
      "Une épicerie fine pour emmener les secrets de la cuisine de Pierre dans vos plats.",
    icon: ShoppingBagIcon,
    to: "/epicerie2018",
  },
]

export { navigation }
