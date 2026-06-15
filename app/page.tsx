import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";
import Stripe from "stripe";
import type { StoreProduct, ProductPrice } from "@/types";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!)

async function getProducts(): Promise<StoreProduct[]> {
  const products = await stripe.products.list({ active: true })
  const prices = await stripe.prices.list({ active: true })

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    default_price: typeof product.default_price === 'string' ? product.default_price : null,
    active: product.active,
    prices: prices.data
      .filter((price) => price.product === product.id)
      .map((price): ProductPrice => ({
        id: price.id,
        unit_amount: price.unit_amount,
        currency: price.currency,
        recurring: price.recurring
      }))
  }))
}

export default async function Home() {
  const products = await getProducts()

  let planner: StoreProduct | null = null
  const stickers: StoreProduct[] = []

  for (const product of products) {
    if (product.name === 'Quest & Campaigns Planner') {
      planner = product
      continue
    }
    stickers.push(product)
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}
