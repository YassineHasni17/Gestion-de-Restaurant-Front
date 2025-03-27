// import { fetchApi } from "./api-config"

// export interface Reservation {
//   id?: number
//   client: string
//   date: string
//   heure: string
//   personnes: number
//   telephone: string
//   email?: string
//   statut: string
//   table?: number
//   occasion?: string
//   preferences?: string
//   notes?: string
// }

// export async function getAllReservations(): Promise<Reservation[]> {
//   return fetchApi<Reservation[]>("/reservations")
// }

// export async function getReservationById(id: number): Promise<Reservation> {
//   return fetchApi<Reservation>(`/reservations/${id}`)
// }

// export async function createReservation(reservation: Reservation): Promise<Reservation> {
//   return fetchApi<Reservation>("/reservations", {
//     method: "POST",
//     body: JSON.stringify(reservation),
//   })
// }

// export async function updateReservation(id: number, reservation: Partial<Reservation>): Promise<Reservation> {
//   return fetchApi<Reservation>(`/reservations/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(reservation),
//   })
// }

// export async function deleteReservation(id: number): Promise<void> {
//   return fetchApi<void>(`/reservations/${id}`, {
//     method: "DELETE",
//   })
// }


export interface  Reservation  {
  id?: number; 
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  seatingPreference: string;
  occasion: string;
  date: Date;
  time: string;
  statut: string;
};

export const ajouterReservation = async (reservation: Reservation) => {
  try {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      throw new Error('Une erreur est survenue lors de l\'ajout de la réservation');
    }

    const data = await response.json();
    console.log("Réservation ajoutée :", data);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la réservation :", error);
    throw new Error('Erreur lors de l\'ajout de la réservation');
  }
};

export const getReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await fetch('/api/reservations');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    return [];
  }
};
