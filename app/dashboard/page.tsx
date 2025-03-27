import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentReservations } from "@/components/recent-reservations"
import { StockAlert } from "@/components/stock-alert"
import { ContactsList } from "@/components/recent-contacts"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Tableau de Bord</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Alertes de Stock</CardTitle>
            <CardDescription>Ingrédients à commander</CardDescription>
          </CardHeader>
          <CardContent>
            <StockAlert />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Réservations à Venir</CardTitle>
            <CardDescription>Les prochaines réservations</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReservations />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contacts Récents</CardTitle>
            <CardDescription>Messages récents des contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactsList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
