import axios from "axios";

const API_URL = "http://localhost:8000/stocks";

// Fonction pour récupérer les en-têtes d'authentification
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("Token utilisé :", accessToken);

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    console.warn("Token JWT manquant. Certaines requêtes peuvent échouer.");
    return {};
  }
};

export const StockService = {
  // Récupérer tous les stocks
  getAll: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          ...getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Erreur lors de la récupération des stocks");
    }
  },

  // Récupérer un stock par ID
  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          ...getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error: any) {
      handleServiceError(error, `Erreur lors de la récupération du stock avec l'ID ${id}`);
    }
  },

  // Ajouter un nouveau stock
  addStock: async (stockData: {
    stock_id: string;
    quantite: number;
    unite: string;
    nomS: string;
    categorie: string;
    niveau: string;
    action: string;
  }) => {
    try {
      const response = await axios.post(API_URL, stockData, {
        headers: {
          ...getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error: any) {
      handleServiceError(error, "Erreur lors de l'ajout du stock");
    }
  },
};

// Fonction pour gérer les erreurs du service
const handleServiceError = (error: any, defaultMessage: string) => {
  if (error.response) {
    // Erreur HTTP avec une réponse du serveur
    if (error.response.status === 401) {
      console.error("Accès non autorisé : accessToken invalide ou expiré.");
      throw new Error("Accès non autorisé. Veuillez vous reconnecter.");
    }
    if (error.response.status === 403) {
      console.error("Accès interdit : utilisateur non authentifié ou accessToken invalide.");
      throw new Error("Accès interdit. Veuillez vous reconnecter.");
    }
    console.error(`${defaultMessage} :`, error.response.data);
    throw new Error(error.response.data.message || defaultMessage);
  } else if (error.request) {
    // Aucune réponse du serveur
    console.error("Aucune réponse du serveur :", error.request);
    throw new Error("Impossible de contacter le serveur. Veuillez réessayer plus tard.");
  } else {
    // Erreur lors de la configuration de la requête
    console.error("Erreur lors de la requête :", error.message);
    throw new Error(defaultMessage);
  }
};
