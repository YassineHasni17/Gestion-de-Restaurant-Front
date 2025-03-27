// Configuration de base pour l'API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Fonction utilitaire pour les requêtes fetch avec timeout
export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`
    console.log(`Fetching: ${url}`, options?.method || "GET")

    if (options?.body) {
      console.log("Request body:", options.body)
    }

    // Ajouter un timeout à la requête
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 secondes de timeout

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorMessage = ""
      try {
        const errorData = await response.json()
        errorMessage = JSON.stringify(errorData)
      } catch (e) {
        errorMessage = await response.text()
      }

      console.error(`API Error (${response.status}): ${errorMessage}`)
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorMessage}`)
    }

    // Pour les requêtes DELETE qui peuvent ne pas retourner de contenu
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T
    }

    // Vérifier si la réponse contient du contenu avant de parser le JSON
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const text = await response.text()
      if (text.trim() === "") {
        return {} as T
      }
      try {
        const data = JSON.parse(text)
        console.log("Response data:", data)
        return data
      } catch (error) {
        console.error("Erreur lors du parsing JSON:", error, "Texte reçu:", text)
        return {} as T
      }
    } else {
      // Si ce n'est pas du JSON, retourner un objet vide
      return {} as T
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("La requête a expiré après 15 secondes")
      throw new Error("La requête API a expiré. Veuillez réessayer.")
    }
    console.error("API Request failed:", error)
    throw error
  }
}

