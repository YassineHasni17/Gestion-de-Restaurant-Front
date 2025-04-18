"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();
  const { fetchUserData } = useUser();

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setSuccessMessage("");
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Erreur HTTP! Statut: ${response.status}`);
      }

      const userData = await response.json();
      localStorage.setItem("accessToken", userData.accessToken || "");
      localStorage.setItem("refreshToken", userData.refreshToken || "");

      fetchUserData()

      setSuccessMessage("Connexion réussie !");

      setTimeout(() => {
        if (userData.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/reservation");
        }
      }, 1000);
    } catch (error: any) {
      setError(error.message || "Une erreur inconnue s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur de connexion au serveur");
      }

      setSuccessMessage("Un e-mail de réinitialisation a été envoyé.");
      setIsForgotPassword(false);
    } catch (error: any) {
      setError(error.message || "Une erreur inconnue s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/pic12.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Card className="relative z-10 w-full max-w-md border-none shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isForgotPassword ? "Réinitialiser le mot de passe" : "Login"}
          </CardTitle>
          <CardDescription className="text-center">
            {isForgotPassword
              ? "Entrez votre adresse e-mail pour réinitialiser votre mot de passe"
              : "Entrez vos identifiants pour accéder à votre compte"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isForgotPassword ? (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="DarTassnime@Gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Entrez votre adresse e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Veuillez patienter...
                  </>
                ) : (
                  "Envoyer l'e-mail de réinitialisation"
                )}
              </Button>
            </form>
          )}
        </CardContent>

        {!isForgotPassword && (
          <CardFooter>
            <div className="text-center text-sm mt-4 w-full">
              <p>
                Mot de passe oublié ?{" "}
                <Button variant="link" onClick={handleForgotPassword} className="text-[#7C4B3C]">
                  Cliquez ici
                </Button>
              </p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
