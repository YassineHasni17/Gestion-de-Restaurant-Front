import { fetchApi } from "./api-config"

export interface Paiement {
  id?: number
  reference: string
  date: string
  heure: string
  client: {
    nom: string
    email: string
    telephone: string
  }
  commande_id: number
  montant: number
  methode: string
  statut: string
  details?: any
}

export async function getAllPaiements(): Promise<Paiement[]> {
  return fetchApi<Paiement[]>("/paiements")
}

export async function getPaiementById(id: number): Promise<Paiement> {
  return fetchApi<Paiement>(`/paiements/${id}`)
}

export async function createPaiement(paiement: Paiement): Promise<Paiement> {
  return fetchApi<Paiement>("/paiements", {
    method: "POST",
    body: JSON.stringify(paiement),
  })
}

export async function updatePaiement(id: number, paiement: Partial<Paiement>): Promise<Paiement> {
  return fetchApi<Paiement>(`/paiements/${id}`, {
    method: "PATCH",
    body: JSON.stringify(paiement),
  })
}

export async function deletePaiement(id: number): Promise<void> {
  return fetchApi<void>(`/paiements/${id}`, {
    method: "DELETE",
  })
}

