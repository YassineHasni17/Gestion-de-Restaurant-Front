// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// export function RecentReservations() {
//   return (
//     <div className="space-y-8">
//       {reservations.map((reservation) => (
//         <div key={reservation.id} className="flex items-center">
//           <Avatar className="h-9 w-9">
//             <AvatarImage src={reservation.avatar} alt="Avatar" />
//             <AvatarFallback>{reservation.initials}</AvatarFallback>
//           </Avatar>
//           <div className="ml-4 space-y-1">
//             <p className="text-sm font-medium leading-none">{reservation.client}</p>
//             <p className="text-sm text-muted-foreground">
//               {reservation.date} - {reservation.heure} - {reservation.personnes} pers.
//             </p>
//           </div>
//           <div className="ml-auto font-medium">Table {reservation.table}</div>
//         </div>
//       ))}
//     </div>
//   )
// }

// const reservations = [
//   {
//     id: 1,
//     client: "Famille Dupont",
//     date: "15/06/2023",
//     heure: "20:00",
//     personnes: 4,
//     table: 12,
//     avatar: "/placeholder.svg?height=36&width=36",
//     initials: "FD",
//   },
//   {
//     id: 2,
//     client: "Laurent Girard",
//     date: "15/06/2023",
//     heure: "20:30",
//     personnes: 2,
//     table: 5,
//     avatar: "/placeholder.svg?height=36&width=36",
//     initials: "LG",
//   },
//   {
//     id: 3,
//     client: "Groupe Entreprise XYZ",
//     date: "15/06/2023",
//     heure: "21:00",
//     personnes: 8,
//     table: 15,
//     avatar: "/placeholder.svg?height=36&width=36",
//     initials: "XY",
//   },
//   {
//     id: 4,
//     client: "Céline Dubois",
//     date: "16/06/2023",
//     heure: "19:30",
//     personnes: 3,
//     table: 8,
//     avatar: "/placeholder.svg?height=36&width=36",
//     initials: "CD",
//   },
//   {
//     id: 5,
//     client: "Michel Blanc",
//     date: "16/06/2023",
//     heure: "20:00",
//     personnes: 2,
//     table: 3,
//     avatar: "/placeholder.svg?height=36&width=36",
//     initials: "MB",
//   },
// ]

// import { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// export function RecentReservations() {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/reservations")
//       .then((response) => response.json())
//       .then((data) => {
//         setReservations(
//           data.map((reservation: { id: any; name: string; date: any; time: any; status: any; }) => ({
//             id: reservation.id,
//             client: reservation.name,
//             date: reservation.date,
//             time: reservation.time,
//             status: reservation.status,
//             avatar: "/placeholder.svg?height=36&width=36",
//             initials: reservation.name.split(" ").map((n) => n[0]).join(""),
//           }))
//         );
//       })
//       .catch((error) => console.error("Erreur lors de la récupération des réservations:", error));
//   }, []);

//   return (
//     <div className="space-y-8">
//       {reservations.map((reservation) => (
//         <div key={reservation.id} className="flex items-center">
//           <Avatar className="h-9 w-9">
//             <AvatarImage src={reservation.avatar} alt="Avatar" />
//             <AvatarFallback>{reservation.initials}</AvatarFallback>
//           </Avatar>
//           <div className="ml-4 space-y-1">
//             <p className="text-sm font-medium leading-none">{reservation.client}</p>
//             <p className="text-sm text-muted-foreground">
//               {reservation.date} - {reservation.time}
//             </p>
//             <p className="text-xs text-muted-foreground">{reservation.status}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
'use client'
import { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface Reservation {
  client: ReactNode;
  id: number;
  name: string;
  date: string;
  time: string;
  status: string;
  avatar: string;
  initials: string;
}

export function RecentReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/reservations")
      .then((response) => response.json())
      .then((data) => {
        setReservations(
          data.map((reservation: { id: number; name: string; date: string; time: string; status: string }) => ({
            id: reservation.id,
            client: reservation.name,
            date: reservation.date,
            time: reservation.time,
            status: reservation.status,
            avatar: "/placeholder.svg?height=36&width=36",
            initials: reservation.name.split(" ").map((n) => n[0]).join(""),
          }))
        );
      })
      .catch((error) => console.error("Erreur lors de la récupération des réservations:", error));
  }, []);

  return (
    <div className="space-y-8">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={reservation.avatar} alt="Avatar" />
            <AvatarFallback>{reservation.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{reservation.client}</p>
            <p className="text-sm text-muted-foreground">
              {reservation.date} - {reservation.time}
            </p>
            <p
              className={`text-xs font-medium ${
                reservation.status === "confirmed"
                  ? "text-green-500"
                  : reservation.status === "cancelled"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {reservation.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
