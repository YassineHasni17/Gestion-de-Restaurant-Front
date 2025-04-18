export interface ForgotPasswordRequest {
    email: string;
  }
  
export const renitialiserMotDePasse = async (email: string) => { 
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'envoi de la demande de réinitialisation du mot de passe');
      }
  
      const data = await response.json();
      console.log("Demande de réinitialisation envoyée :", data);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de réinitialisation :", error);
      throw new Error('Erreur lors de l\'envoi de la demande de réinitialisation');
    }
  };
  