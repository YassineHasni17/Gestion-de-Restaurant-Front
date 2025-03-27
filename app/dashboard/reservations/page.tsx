"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface Reservation {
  id: number
  name: string
  email: string
  phone: string
  specialRequests: string
  seatingPreference: string
  occasion: string
  date: string
  time: string
  status: string
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(true)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch("http://localhost:8000/reservations")
        if (!response.ok) {
          throw new Error("Problème lors de la récupération des données")
        }
        const data: Reservation[] = await response.json() 
        setReservations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue")
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const updateReservationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:8000/reservations/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut")
      }

      setReservations(reservations.map(reservation => 
        reservation.id === id ? { ...reservation, status } : reservation
      ))
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err)
    }
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Gestion des Réservations</h1>
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-700">Réservations</CardTitle>
              <CardDescription className="text-gray-500">Gérez les réservations du restaurant</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Rechercher une réservation..." className="w-64 pl-8 border-gray-300" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="w-full bg-white rounded-lg shadow-md">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Demande Spéciale</TableHead>
                <TableHead>Préférence de Siège</TableHead>
                <TableHead>Occasion</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Heure</TableHead>
                <TableHead>Statut</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id} className="hover:bg-gray-100">
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell className="font-medium text-gray-700">{reservation.name}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>{reservation.phone}</TableCell>
                  <TableCell>{reservation.specialRequests}</TableCell>
                  <TableCell>{reservation.seatingPreference}</TableCell>
                  <TableCell>{reservation.occasion}</TableCell>
                  <TableCell>{reservation.date}</TableCell>
                  <TableCell>{reservation.time}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-white font-semibold ${reservation.status === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {reservation.status === 'cancelled' ? 'Annulée' : 'Confirmée'}
                    </span>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button onClick={() => updateReservationStatus(reservation.id, 'confirmed')} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all mr-2">Confirmer</Button>
                      <Button onClick={() => updateReservationStatus(reservation.id, 'cancelled')} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all">Annuler</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
