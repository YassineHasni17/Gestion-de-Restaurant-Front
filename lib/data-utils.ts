// URL de base de l'API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"


// Types pour les entités

interface Stock {
  nom: string
  categorie: string
  quantite: number
  unite: string
  prixUnitaire: number
  seuilAlerte: number
  fournisseur: string
  emplacement: string
  notes: string
  action :string
  niveau:string
  statuts:string
}

interface Plat {
  plat_id?: number
  nom: string
  description: string
  prix: number
  categorie: string
  disponible: boolean
  image?: string
  ingredients?: any[]
  allergenes?: string
}

interface Ingredient {
  id?: number
  nom: string
  categorie: string
  quantite: number
  unite: string
  niveau: number
}

interface Reservation {
  id?: number
  client: string
  date: string
  heure: string
  personnes: number
  telephone: string
  statut: string
  email?: string
  occasion?: string
  preferences?: string
  notes?: string
}

// Fonction pour initialiser les données de démo (maintenue pour compatibilité)
export function initializeData() {
  console.log("Initialisation des données désactivée - utilisation de l'API")
  // Cette fonction ne fait plus rien car nous utilisons l'API
}

// Fonctions CRUD pour les plats
export async function getPlats(): Promise<Plat[]> {
  try {
    const response = await fetch(`${API_URL}/plats`)
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Erreur lors de la récupération des plats:", error)
    return []
  }
}

export async function getPlat(id: number): Promise<Plat | null> {
  try {
    const response = await fetch(`${API_URL}/plats/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Erreur lors de la récupération du plat ${id}:`, error)
    return null
  }
}

export async function ajouterPlat(plat: Plat): Promise<Plat | null> {
  try {
    const response = await fetch(`${API_URL}/plats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plat),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Erreur lors de l'ajout du plat:", error)
    return null
  }
}

export async function modifierPlat(id: number, plat: Partial<Plat>): Promise<Plat | null> {
  try {
    const response = await fetch(`${API_URL}/plats/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plat),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erreur lors de la modification du plat ${id}:`, error)
    return null
  }
}

export async function supprimerPlat(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/plats/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression du plat ${id}:`, error)
    return false
  }
}

export async function uploadPlatImage(id: number, imageFile: File): Promise<boolean> {
  try {
    const formData = new FormData()
    formData.append("image", imageFile)

    const response = await fetch(`${API_URL}/plats/${id}/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error(`Erreur lors du téléchargement de l'image pour le plat ${id}:`, error)
    return false
  }
}
// Ajouter un stock via l'API
export async function ajouterStock(stock: Stock): Promise<Stock | null> {
  try {
    const response = await fetch(`${API_URL}/stocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Erreur lors de l'ajout du stock:", error)
    return null
  }
}


export function getReservations(): Reservation[] {
  if (typeof window === "undefined") return []
  const reservations = localStorage.getItem("reservations")
  return reservations ? JSON.parse(reservations) : []
}

export function getReservation(id: number): Reservation | undefined {
  const reservations = getReservations()
  return reservations.find((reservation: Reservation) => reservation.id === id)
}

export function ajouterReservation(reservation: Reservation): Reservation {
  const reservations = getReservations()
  const newId = reservations.length > 0 ? Math.max(...reservations.map((r: Reservation) => r.id || 0)) + 1 : 1
  const newReservation = { ...reservation, id: newId }
  localStorage.setItem("reservations", JSON.stringify([...reservations, newReservation]))
  return newReservation
}

export function modifierReservation(id: number, reservation: Partial<Reservation>): Reservation | null {
  const reservations = getReservations()
  const index = reservations.findIndex((r: Reservation) => r.id === id)
  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...reservation }
    localStorage.setItem("reservations", JSON.stringify(reservations))
    return reservations[index]
  }
  return null
}

export function supprimerReservation(id: number): boolean {
  const reservations = getReservations()
  const newReservations = reservations.filter((reservation: Reservation) => reservation.id !== id)
  localStorage.setItem("reservations", JSON.stringify(newReservations))
  return true
}












