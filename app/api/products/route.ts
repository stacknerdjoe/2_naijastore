import Stripe from "stripe";
import '../../../envConfig'

export async function GET() {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!)
  try {
    const products = await stripe.products.list({ active: true })
    const prices = await stripe.prices.list({ active: true })

    const combinedData = products.data.map((product) => {
      const productPrices = prices.data.filter((price) => price.product === product.id)

      return {
        ...product,
        prices: productPrices.map((price) => ({
          id: price.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
          recurring: price.recurring
        }))
      }
    })

    return Response.json(combinedData)
  } catch (err) {
    console.error('Error fetching data from stripe:', err instanceof Error ? err.message : err)
    return Response.json({ error: 'Failed to fetch error from stripe' })
  }
}
