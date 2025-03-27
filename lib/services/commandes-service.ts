import { fetchApi } from "./api-config"

export interface Commande {
  id?: number
  client: string
  date: string
  heure: string
  montant: number
  type: string
  statut: string
  items: CommandeItem[]
}

export interface CommandeItem {
  id?: number
  nom: string
  quantite: number
  prixUnitaire: number
  total: number
}

export async function getAllCommandes(): Promise<Commande[]> {
  return fetchApi<Commande[]>("/commandes")
}

export async function getCommandeById(id: number): Promise<Commande> {
  return fetchApi<Commande>(`/commandes/${id}`)
}

export async function createCommande(commande: Commande): Promise<Commande> {
  return fetchApi<Commande>("/commandes", {
    method: "POST",
    body: JSON.stringify(commande),
  })
}

export async function updateCommande(id: number, commande: Partial<Commande>): Promise<Commande> {
  return fetchApi<Commande>(`/commandes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(commande),
  })
}

export async function deleteCommande(id: number): Promise<void> {
  return fetchApi<void>(`/commandes/${id}`, {
    method: "DELETE",
  })
}

