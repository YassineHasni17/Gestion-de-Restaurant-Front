export async function deconnexion(router: any): Promise<void> {
  try {
    const accessToken = localStorage.getItem("accessToken"); 

    if (!accessToken) {
      console.warn("Aucun accessToken trouvé. Redirection vers la page de connexion.");
      router.push("/authen");
      return;
    }

    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json().catch(() => null);
    console.log("Réponse logout:", response.status, data);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Session expirée. Redirection vers la page de connexion.");
        router.push("/authen");
        return;
      }
      throw new Error("Échec de la déconnexion : " + (data?.message || "Un problème est survenu"));
    }

    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("role"); 

    console.log("Déconnexion réussie !");

    const role = localStorage.getItem("role");
    if (role === "admin") {
      router.push("/dashboard"); 
    } else {
      router.push("/Accueil");
    }
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    throw error;
  }
}