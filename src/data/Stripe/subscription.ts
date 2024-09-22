import { ItemData } from './itemData'

const STRIPE_PRICE_ID_FREE = import.meta.env.VITE_STRIPE_PRICE_ID_FREE
const STRIPE_PRICE_ID_BASIC = import.meta.env.VITE_STRIPE_PRICE_ID_BASIC
const STRIPE_PRICE_ID_PREMIUM = import.meta.env.VITE_STRIPE_PRICE_ID_PREMIUM

const returnIdIfEmpty = (data: string | undefined, id: string) => {
  if (data === '' || data === undefined) {
    return id
  }

  return data
}

export const products: ItemData[] = [
  {
    name: 'Abonnement gratuit',
    description: '15 requêtes par jour.',
    price: 0,
    id: returnIdIfEmpty(STRIPE_PRICE_ID_FREE, 'price_1PdHWLKjCboMtBPjo3G7vEiC'),
    image: 'https://source.unsplash.com/NUoPWImmjCU',
  },
  {
    name: 'Abonnement basique',
    description: '100 requêtes par jour.',
    price: 25,
    id: returnIdIfEmpty(
      STRIPE_PRICE_ID_BASIC,
      'price_1PSHL4KjCboMtBPjAF9ZID55',
    ),
    image: 'https://source.unsplash.com/NUoPWImmjCU',
    isFavorite: true,
  },
  {
    name: 'Abonnement premium',
    description: '200 requêtes par jour.',
    price: 35,
    id: returnIdIfEmpty(
      STRIPE_PRICE_ID_PREMIUM,
      'price_1PSHL1KjCboMtBPjlaDDyTTo',
    ),
    image: 'https://source.unsplash.com/NUoPWImmjCU',
  },
]
