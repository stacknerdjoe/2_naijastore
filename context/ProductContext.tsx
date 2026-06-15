'use client'

import { createContext, useContext, useState, ReactNode } from "react"
import type { StoreProduct, CartItem, Cart } from "@/types"

interface ProductContextValue {
  cart: Cart
  handleIncrementProduct: (priceId: string | null, num: number, data: StoreProduct, noIncrement?: boolean) => void
}

const productContext = createContext<ProductContextValue | undefined>(undefined)

export default function ProductsProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({})

  function handleIncrementProduct(priceId: string | null, num: number, data: StoreProduct, noIncrement = false) {
    if (!priceId) return
    const newCart: Cart = { ...cart }

    if (priceId in cart) {
      newCart[priceId] = {
        ...data,
        quantity: noIncrement ? Number(num) : (newCart[priceId]?.quantity ?? 0) + num
      }
    } else {
      newCart[priceId] = {
        ...data,
        quantity: num
      }
    }

    if (Number(newCart[priceId].quantity) <= 0) {
      delete newCart[priceId]
    }

    setCart(newCart)
  }

  return (
    <productContext.Provider value={{ cart, handleIncrementProduct }}>
      {children}
    </productContext.Provider>
  )
}

export const useProducts = (): ProductContextValue => {
  const ctx = useContext(productContext)
  if (!ctx) throw new Error('useProducts must be used within a ProductsProvider')
  return ctx
}
