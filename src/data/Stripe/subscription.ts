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
    description: 'Free subscription. Limited retrieval of data.',
    image: 'https://source.unsplash.com/NUoPWImmjCU',
    name: 'Free subscription',
    price: 0,
    id: returnIdIfEmpty(STRIPE_PRICE_ID_FREE, 'price_1PdHWLKjCboMtBPjo3G7vEiC'),
  },
  {
    description: 'Basic subscription at 30€/month. Limited retrieval of data.',
    image: 'https://source.unsplash.com/NUoPWImmjCU',
    name: 'Basic subscription',
    price: 25,
    id: returnIdIfEmpty(
      STRIPE_PRICE_ID_BASIC,
      'price_1PSHL4KjCboMtBPjAF9ZID55',
    ),
  },
  {
    description:
      'Premium subscription at 35€/month. Filters added but limited retrieval of data.',
    image: 'https://source.unsplash.com/NUoPWImmjCU',
    name: 'Premium subscription',
    price: 35,
    id: returnIdIfEmpty(
      STRIPE_PRICE_ID_PREMIUM,
      'price_1PSHL1KjCboMtBPjlaDDyTTo',
    ),
  },
]
