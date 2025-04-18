"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  email: string | null;
  setEmail: (email: string | null) => void;
  logout: () => void;
  fetchUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    

    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    let accessToken = localStorage.getItem("accessToken");
    console.log("Token d'accès :", accessToken);

    if (!accessToken) {
      console.log("Aucun token trouvé. L'utilisateur n'est pas connecté.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        console.log("Token expiré. Tentative de rafraîchissement...");
        accessToken = await refreshAccessToken();
        if (!accessToken) {
          console.log("Impossible de rafraîchir le token. Déconnexion.");
          logout();
          return;
        }

        const retryResponse = await fetch("http://localhost:8000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!retryResponse.ok) {
          console.error("Erreur lors de la récupération des données utilisateur après rafraîchissement :", retryResponse.statusText);
          return;
        }

        const userData = await retryResponse.json();
        console.log("Données utilisateur récupérées après rafraîchissement :", userData);
        setEmail(userData.email); 
        return;
      }

      if (!response.ok) {
        console.error("Erreur lors de la récupération des données utilisateur :", response.statusText);
        return;
      }

      const userData = await response.json();
      console.log("Données utilisateur récupérées :", userData);
      setEmail(userData.email); 
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
    }
  };

  const updateEmail = (newEmail: string | null) => {
    if (newEmail) {
      localStorage.setItem("userEmail", newEmail);
    } else {
      localStorage.removeItem("userEmail");
    }
    setEmail(newEmail);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    setEmail(null);
    console.log("Utilisateur déconnecté.");
  };

  return (
    <UserContext.Provider value={{ email, setEmail: updateEmail, logout, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.log("Aucun refresh token trouvé. L'utilisateur doit se reconnecter.");
      return null;
    }

    const response = await fetch("http://localhost:8000/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.error("Échec du rafraîchissement du token :", response.statusText);
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;

    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }

    console.error("Aucun token d'accès retourné par le point de terminaison de rafraîchissement.");
    return null;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token :", error);
    return null;
  }
}
