import { fetchApi } from "./api-config";

export interface Plat {
  plat_id?: number;
  nom: string;
  description: string;
  prix: number;
  categorie: string;
  disponible: boolean;
  image?: string;
  ingredients?: any[];
  allergenes?: string;
}

export async function getAllPlats(): Promise<Plat[]> {
  try {
    return await fetchApi<Plat[]>("/plats");
  } catch (error) {
    console.error("Erreur lors de la récupération des plats:", error);
    return [];
  }
}

export async function getPlatById(id: number): Promise<Plat> {
  try {
    return await fetchApi<Plat>(`/plats/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la récupération du plat ${id}:`, error);
    throw new Error(`Plat non trouvé: ${error}`);
  }
}

export async function createPlat(plat: Plat): Promise<Plat> {
  try {
    console.log("Données envoyées pour création:", plat);
    return await fetchApi<Plat>("/plats", {
      method: "POST",
      body: JSON.stringify(plat),
    });
  } catch (error) {
    console.error("Erreur lors de la création du plat:", error);
    throw new Error(`Échec de la création du plat: ${error}`);
  }
}

export async function updatePlat(id: number, plat: Partial<Plat>): Promise<Plat> {
  try {
    console.log("Données exactes envoyées pour mise à jour:", JSON.stringify(plat));

    try {
      await getPlatById(id);
    } catch (error) {
      console.error(`Le plat avec l'ID ${id} n'existe pas`);
      throw new Error(`Le plat avec l'ID ${id} n'existe pas ou n'est pas accessible`);
    }

    return await fetchApi<Plat>(`/plats/${id}`, {
      method: "PUT",
      body: JSON.stringify(plat),
    });
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du plat ${id}:`, error);
    throw error;
  }
}

export async function deletePlat(id: number): Promise<void> {
  try {
    console.log(`Suppression du plat ${id}`);
    await fetchApi<void>(`/plats/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Erreur lors de la suppression du plat ${id}:`, error);
    throw new Error(`Échec de la suppression du plat: ${error}`);
  }
}

export async function uploadPlatImage(id: number, imageFile: File): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetchApi<any>(`/plats/${id}/upload`, {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    throw new Error(`Échec du téléchargement de l'image: ${error}`);
  }
}

