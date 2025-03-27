// import { Package } from "lucide-react"

// export function StockAlert() {
//   return (
//     <div className="space-y-4">
//       {ingredients.map((ingredient) => (
//         <div key={ingredient.id} className="flex items-center">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
//             <Package className="h-5 w-5 text-primary" />
//           </div>
//           <div className="ml-4 space-y-1">
//             <p className="text-sm font-medium leading-none">{ingredient.nom}</p>
//             <p className="text-sm text-muted-foreground">
//               {ingredient.quantite} {ingredient.unite} restants
//             </p>
//           </div>
//           <div className="ml-auto font-medium">
//             <span className={`text-sm ${ingredient.niveau <= 15 ? "text-red-500" : "text-amber-500"}`}>
//               {ingredient.niveau}%
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// const ingredients = [
//   {
//     id: 1,
//     nom: "Safran",
//     categorie: "Épices",
//     quantite: 25,
//     unite: "g",
//     niveau: 15,
//   },
//   {
//     id: 2,
//     nom: "Amandes",
//     categorie: "Fruits secs",
//     quantite: 0.8,
//     unite: "kg",
//     niveau: 20,
//   },
//   {
//     id: 3,
//     nom: "Menthe fraîche",
//     categorie: "Herbes",
//     quantite: 0.5,
//     unite: "kg",
//     niveau: 25,
//   },
//   {
//     id: 4,
//     nom: "Pruneaux",
//     categorie: "Fruits secs",
//     quantite: 1.2,
//     unite: "kg",
//     niveau: 30,
//   },
//   {
//     id: 5,
//     nom: "Huile d'olive",
//     categorie: "Huiles",
//     quantite: 5,
//     unite: "L",
//     niveau: 50,
//   },
// ]
'use client'
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

// Définir le type pour chaque ingrédient
interface Ingredient {
  id: number;
  nomS: string;
  quantite: number;
  unite: string;
  niveau: number;
}

export function StockAlert() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/stocks")
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des ingrédients:", error));
  }, []);

  return (
    <div className="space-y-4">
      {ingredients.map((ingredient, index) => (
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
      ))}
    </div>
  );
}
