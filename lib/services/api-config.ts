
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log(`Fetching: ${url}`, options?.method || "GET");

    if (options?.body) {
      console.log("Request body:", options.body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); 

    const accessToken = localStorage.getItem("jwt");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    if (accessToken) {
      (headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("Token JWT manquant. Certaines requêtes peuvent échouer.");
    }

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = "";
      try {
        const errorData = await response.json();
        errorMessage = JSON.stringify(errorData);
      } catch (e) {
        errorMessage = await response.text();
      }

      console.error(`API Error (${response.status}): ${errorMessage}`);
      if (response.status === 403) {
        console.error("Accès interdit : utilisateur non authentifié ou accessToken invalide.");
     
        throw new Error("Accès interdit. Veuillez vous reconnecter.");
      }
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorMessage}`);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      if (text.trim() === "") {
        return {} as T;
      }
      try {
        const data = JSON.parse(text);
        console.log("Response data:", data);
        return data;
      } catch (error) {
        console.error("Erreur lors du parsing JSON:", error, "Texte reçu:", text);
        return {} as T;
      }
    } else {
      return {} as T;
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("La requête a expiré après 15 secondes");
      throw new Error("La requête API a expiré. Veuillez réessayer.");
    }
    console.error("API Request failed:", error);
    throw error;
  }
}

