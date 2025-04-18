'use client'
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

interface Ingredient {
  id: number;
  nomS: string;
  quantite: number;
  unite: string;
  niveau: number;
}

export function StockAlert() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        // Récupérer le accessToken depuis localStorage
        const accessToken = localStorage.getItem("accessToken");
        console.log("Token utilisé :", accessToken);

        if (!accessToken) {
          setError("Vous devez être connecté pour accéder aux stocks.");
          return;
        }

        // Effectuer la requête GET pour récupérer les stocks
        const response = await fetch("http://localhost:8000/stocks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Réponse de l'API :", response);

        if (!response.ok) {
          if (response.status === 401) {
            setError("Accès non autorisé. Veuillez vérifier vos informations d'identification.");
          } else if (response.status === 403) {
            setError("Accès interdit. Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.");
          } else {
            setError("Erreur lors de la récupération des stocks.");
          }
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Données reçues :", data);

        if (Array.isArray(data)) {
          setIngredients(data);
        } else {
          setError("Les données reçues ne sont pas valides.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error);
        setError("Une erreur est survenue lors de la récupération des stocks.");
      }
    };

    fetchIngredients();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {ingredients.length === 0 ? (
        <p>Aucun stock trouvé.</p>
      ) : (
        ingredients.map((ingredient, index) => (
          <div key={ingredient.id || index} className="flex items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{ingredient.nomS}</p>
              <p className="text-sm text-muted-foreground">
                {ingredient.quantite} {ingredient.unite} restants
              </p>
            </div>
            <div className="ml-auto font-medium">
              <span className={`text-sm ${ingredient.niveau <= 15 ? "text-red-500" : "text-amber-500"}`}>
                {ingredient.niveau}%
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}