import { auth, signOut } from "@/auth"
import Link from "next/link"
import Image from "next/image"

export default async function Navbar() {
  const session = await auth()

  if (!session?.user) {
    return (
      <nav className="auth-nav">
        <Link href="/auth/login" className="btn-signin">
          Sign In
        </Link>
      </nav>
    )
  }

  return (
    <nav className="auth-nav">
      <div className="auth-nav-user">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "User avatar"}
            width={32}
            height={32}
            className="avatar"
          />
        )}
        <Link href="/dashboard" className="nav-username">
          {session.user.name ?? session.user.email}
        </Link>
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}
        >
          <button type="submit" className="btn-signout">
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  )
}
