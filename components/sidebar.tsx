import Link from "next/link"
import { LayoutDashboard, Utensils, ShoppingBag, Package, Calendar, CreditCard, Users, Book } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-muted/10 md:block">
      <nav className="grid gap-2 p-4 md:p-6">
        <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary hover:bg-muted">
          <LayoutDashboard className="h-5 w-5" />
          <span>Tableau de Bord</span>
        </Link>
        <Link
          href="/dashboard/plats"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Utensils className="h-5 w-5" />
          <span>Plats</span>
        </Link>
        <Link
          href="/dashboard/stocks"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          <span>Stocks</span>
        </Link>
        <Link
          href="/dashboard/reservations"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Calendar className="h-5 w-5" />
          <span>Réservations</span>
        </Link>

        <Link
          href="/dashboard/menu"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Book className="h-5 w-5" />
          <span>Menu</span>
        </Link>
      </nav>
    </aside>
  )
}

