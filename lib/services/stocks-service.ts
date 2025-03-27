// import { fetchApi } from "./api-config"

import { fetchApi } from "./api-config";

// export interface Ingredient {
//   id?: number
//   nom: string
//   categorie: string
//   quantite: number
//   unite: string
//   niveau: number
//   prixUnitaire: number
//   seuilAlerte: number
//   fournisseur: string
//   emplacement?: string
//   notes?: string
// }

// export async function getAllIngredients(): Promise<Ingredient[]> {
//   return fetchApi<Ingredient[]>("/stocks")
// }

// export async function getIngredientById(id: number): Promise<Ingredient> {
//   return fetchApi<Ingredient>(`/stocks/${id}`)
// }

// export async function createIngredient(ingredient: Ingredient): Promise<Ingredient> {
//   return fetchApi<Ingredient>("/stocks", {
//     method: "POST",
//     body: JSON.stringify(ingredient),
//   })
// }

// export async function updateIngredient(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> {
//   return fetchApi<Ingredient>(`/stocks/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(ingredient),
//   })
// }

// export async function deleteIngredient(id: number): Promise<void> {
//   return fetchApi<void>(`/stocks/${id}`, {
//     method: "DELETE",
//   })
// }

// import { fetchApi } from "./api-config"

// export interface Ingredient {
//   id?: number;
//   nom: string;
//   categorie: string;
//   quantite: number;
//   unite: string;
//   niveau: number;
//   prixUnitaire: number;
//   seuilAlerte: number;
//   fournisseur: string;
//   emplacement?: string;
//   notes?: string;
// }

// // ✅ Récupérer tous les ingrédients
// export async function getAllIngredients(): Promise<Ingredient[]> {
//   try {
//     return await fetchApi<Ingredient[]>("/stocks");
//   } catch (error) {
//     console.error("Erreur lors de la récupération des ingrédients :", error);
//     throw error;
//   }
// }

// // ✅ Récupérer un ingrédient par son ID
// export async function getIngredientById(id: number): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>(`/stocks/${id}`);
//   } catch (error) {
//     console.error(`Erreur lors de la récupération de l'ingrédient ID ${id} :`, error);
//     throw error;
//   }
// }

// // ✅ Créer un nouvel ingrédient
// export async function createIngredient(ingredient: Ingredient): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>("/stocks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredient),
//     });
//   } catch (error) {
//     console.error("Erreur lors de la création de l'ingrédient :", error);
//     throw error;
//   }
// }

// // ✅ Mettre à jour un ingrédient
// export async function updateIngredient(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>(`/stocks/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredient),
//     });
//   } catch (error) {
//     console.error(`Erreur lors de la mise à jour de l'ingrédient ID ${id} :`, error);
//     throw error;
//   }
// }

// // ✅ Supprimer un ingrédient
// export async function deleteIngredient(id: number): Promise<void> {
//   try {
//     return await fetchApi<void>(`/stocks/${id}`, {
//       method: "DELETE",
//     });
//   } catch (error) {
//     console.error(`Erreur lors de la suppression de l'ingrédient ID ${id} :`, error);
//     throw error;
//   }
// }


// import { fetchApi } from "./api-config";

// export interface Ingredient {
//   id?: number;
//   nom: string;
//   categorie: string;
//   quantite: number;
//   unite: string;
//   niveau: number;
// }

// // ✅ Récupérer tous les ingrédients
// export async function getAllIngredients(): Promise<Ingredient[]> {
//   try {
//     return await fetchApi<Ingredient[]>("/stocks");
//   } catch (error) {
//     console.error("Erreur lors de la récupération des ingrédients :", error);
//     throw error;
//   }
// }

// // ✅ Récupérer un ingrédient par son ID
// export async function getIngredientById(id: number): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>(`/stocks/${id}`);  // Correction ici avec les backticks
//   } catch (error) {
//     console.error(`Erreur lors de la récupération de l'ingrédient ID ${id} :`, error);  // Correction de la syntaxe
//     throw error;
//   }
// }

// // ✅ Créer un nouvel ingrédient
// export async function createIngredient(ingredient: Ingredient): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>("/stocks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredient),
//     });
//   } catch (error) {
//     console.error("Erreur lors de la création de l'ingrédient :", error);
//     throw error;
//   }
// }

// // ✅ Mettre à jour un ingrédient
// export async function updateIngredient(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>(`/stocks/${id}`, {  // Correction ici avec les backticks
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredient),
//     });
//   } catch (error) {
//     console.error(`Erreur lors de la mise à jour de l'ingrédient ID ${id} :`, error);  // Correction de la syntaxe
//     throw error;
//   }
// }

// // ✅ Supprimer un ingrédient
// export async function deleteIngredient(id: number): Promise<void> {
//   try {
//     return await fetchApi<void>(`/stocks/${id}`, {  // Correction ici avec les backticks
//       method: "DELETE",
//     });
//   } catch (error) {
//     console.error(`Erreur lors de la suppression de l'ingrédient ID ${id} :`, error);  // Correction de la syntaxe
//     throw error;
//   }
// }**


// import { fetchApi } from "./api-config";

// // Définition de l'interface Ingredient
// export interface Ingredient {
//   id?: number;
//   nom: string;
//   categorie: string;
//   quantite: number;
//   unite: string;
//   niveau: number;
// }

// // ✅ Récupérer tous les ingrédients
// export async function getAllIngredients(): Promise<Ingredient[]> {
//   try {
//     return await fetchApi<Ingredient[]>("/stocks");
//   } catch (error) {
//     console.error("Erreur lors de la récupération des ingrédients :", error);
//     throw error;  // Propager l'erreur pour qu'elle puisse être gérée ailleurs
//   }
// }

// // ✅ Récupérer un ingrédient par son ID
// export async function getIngredientById(id: number): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>(`/stocks/${id}`);  // Utilisation de backticks pour l'URL dynamique
//   } catch (error) {
//     console.error(`Erreur lors de la récupération de l'ingrédient ID ${id} :`, error);  // Message d'erreur plus explicite
//     throw error;  // Propager l'erreur pour la gestion en amont
//   }
// }

// // ✅ Créer un nouvel ingrédient
// export async function createIngredient(ingredient: Ingredient): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>("/stocks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredient),  // Convertir l'objet ingredient en JSON
//     });
//   } catch (error) {
//     console.error("Erreur lors de la création de l'ingrédient :", error);
//     throw error;  // Propager l'erreur
//   }
// }

// // ✅ Mettre à jour un ingrédient
// export async function updateIngredient(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> {
//   try {
//     return await fetchApi<Ingredient>(`/stocks/${id}`, {  // Utilisation de backticks pour l'URL dynamique
//       method: "PATCH",  // Utilisation de la méthode PATCH pour une mise à jour partielle
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(ingredient),  // Conversion des données de mise à jour en JSON
//     });
//   } catch (error) {
//     console.error(`Erreur lors de la mise à jour de l'ingrédient ID ${id} :`, error);  // Message d'erreur plus explicite
//     throw error;  // Propager l'erreur
//   }
// }

// // ✅ Supprimer un ingrédient
// export async function deleteIngredient(id: number): Promise<void> {
//   try {
//     return await fetchApi<void>(`/stocks/${id}`, {  // Utilisation de backticks pour l'URL dynamique
//       method: "DELETE",  // Méthode DELETE pour supprimer un ingrédient
//     });
//   } catch (error) {
//     console.error(`Erreur lors de la suppression de l'ingrédient ID ${id} :`, error);  // Message d'erreur plus explicite
//     throw error;  // Propager l'erreur
//   }
// }
// src/services/stocks-service.ts
// src/lib/services/stocks-service.ts

