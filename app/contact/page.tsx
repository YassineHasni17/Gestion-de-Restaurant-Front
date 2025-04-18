"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

const Contact = () => {
  const { email: userEmail } = useUser(); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: userEmail || "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {

    setFormData((prev) => ({ ...prev, email: userEmail || "" }));
  }, [userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Token utilisé :", accessToken);

      if (!accessToken) {
        setFormStatus({
          type: "error",
          message: "Vous devez être connecté pour envoyer un message.",
        });
        return;
      }

      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("Réponse de l'API :", response);

      if (!response.ok) {
        const errorData = await response.json();
        setFormStatus({
          type: "error",
          message: errorData.message || "Une erreur est survenue. Veuillez réessayer plus tard.",
        });
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      setFormStatus({
        type: "success",
        message: "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ firstName: "", lastName: "", email: userEmail || "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setFormStatus({
        type: "error",
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userEmail) {
    return <div className="text-center text-red-500">Vous devez être connecté pour accéder à cette page.</div>;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
      
      <div className="absolute inset-0 z-0">
        <Image src="/pic14.jpg" alt="Dar Tassnime" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      
      <Card className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl border-none shadow-2xl rounded-2xl p-4">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-extrabold text-[#7C4B3C]">Contactez-nous</CardTitle>
          <CardDescription className="text-[#333]">
            Une question, une réservation, un mot gentil ? Laissez-nous un message 💌
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {formStatus.type && (
            <Alert
              className={`rounded-xl ${
                formStatus.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {formStatus.type === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{formStatus.type === "success" ? "Succès" : "Erreur"}</AlertTitle>
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Votre prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="rounded-xl focus-visible:ring-[#7C4B3C]"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="rounded-xl focus-visible:ring-[#7C4B3C]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-xl focus-visible:ring-[#7C4B3C]"
                disabled 
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="message">Votre message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Écrivez votre message ici..."
                value={formData.message}
                onChange={handleChange}
                required
                className="rounded-xl min-h-[120px] focus-visible:ring-[#7C4B3C]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-2 text-lg rounded-xl font-semibold bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] text-white hover:opacity-90 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Merci de votre confiance 💛 L’équipe Dar Tassnime
        </CardFooter>
      </Card>
    </div>
  );
};

export default Contact;
