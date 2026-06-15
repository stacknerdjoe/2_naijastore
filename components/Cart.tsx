'use client'

import { useProducts } from "@/context/ProductContext"
import Link from "next/link"

export default function Cart() {
  const { cart } = useProducts()
  const numProducts = Object.keys(cart).reduce((acc, curr) => {
    return acc + cart[curr].quantity
  }, 0)

  return (
    <div>
      <Link className="unstyled-button" href={'/cart'}>
        <i className="fa-solid fa-bag-shopping"></i>
        {numProducts > 0 && (
          <div className="cart-num">
            <p>{numProducts}</p>
          </div>
        )}
      </Link>
    </div>
  )
}
