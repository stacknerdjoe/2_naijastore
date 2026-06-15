import type Stripe from 'stripe'

export interface ProductPrice {
  id: string
  unit_amount: number | null
  currency: string
  recurring: Stripe.Price.Recurring | null
}

export interface StoreProduct {
  id: string
  name: string
  description: string | null
  default_price: string | null
  active: boolean
  prices: ProductPrice[]
}

export interface CartItem extends StoreProduct {
  quantity: number
}

export type Cart = Record<string, CartItem>
