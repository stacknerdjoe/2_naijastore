import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"

const sek = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" })
const fmt = (oere: number) => sek.format(oere / 100)

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <p className="dashboard-welcome">
        Welcome back, <strong>{session.user.name ?? session.user.email}</strong>
      </p>

      <section className="orders-section">
        <h2>Order History</h2>

        {orders.length === 0 ? (
          <p className="orders-empty">You haven&apos;t placed any orders yet.</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Order #{order.id.slice(-8)}</span>
                  <span className={`order-status status-${order.status}`}>{order.status}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString("sv-SE")}
                  </span>
                </div>

                <ul className="order-items">
                  {order.items.map((item) => (
                    <li key={item.id} className="order-item">
                      <span>{item.product.name}</span>
                      <span>× {item.quantity}</span>
                      <span>{fmt(item.price)}</span>
                    </li>
                  ))}
                </ul>

                <div className="order-total">
                  Total: <strong>{fmt(order.total)}</strong>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
