'use client'
import { useEffect, useState } from "react";
import { User } from "lucide-react";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  message: string;
}

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Récupérer le accessToken depuis localStorage
        const accessToken = localStorage.getItem("accessToken");
        console.log("Token utilisé :", accessToken);

        if (!accessToken) {
          setError("Vous devez être connecté pour accéder aux contacts.");
          return;
        }

        // Effectuer la requête avec le accessToken dans les en-têtes
        const response = await fetch("http://localhost:8000/contact", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("Réponse de l'API :", response);

        if (!response.ok) {
          if (response.status === 401) {
            setError("Accès non autorisé. Veuillez vérifier vos informations d'identification.");
          } else {
            setError("Erreur lors de la récupération des contacts.");
          }
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues :", data);

        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setError("Les données reçues ne sont pas un tableau.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts :", error);
        setError("Erreur de connexion à l'API.");
      }
    };

    fetchContacts();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {contacts.length === 0 ? (
        <p>Aucun contact trouvé.</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="flex items-center space-x-4 p-4 border-b">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {contact.firstName} {contact.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{contact.message}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
