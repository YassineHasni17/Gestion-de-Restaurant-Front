"use client";

import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { CalendarIcon, Search, User, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReservationPage() {
  const { email, logout } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    time: "",
    guests: "",
    name: "",
    email: email || "",
    phone: "",
    specialRequests: "",
    seatingPreference: "indifferent",
    occasion: "Aucune occasion spéciale",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = ["12:00", "12:30", "13:00", "13:30", "14:00", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
  const occasions = [
    "Aucune occasion spéciale",
    "Anniversaire",
    "Anniversaire de mariage",
    "Fiançailles",
    "Rendez-vous professionnel",
    "Autre",
  ];
  const steps = [
    { id: 1, name: "Rechercher", icon: Search },
    { id: 2, name: "Information", icon: User },
    { id: 3, name: "Additionnel", icon: FileText },
    { id: 4, name: "Confirmation", icon: CheckCircle },
  ];

  useEffect(() => {
    console.log("Email dans le contexte :", email);
    setFormData((prev) => ({ ...prev, email: email || "" }));
  }, [email, router]);

  const handleInputChange = (field: string, value: Date | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.date) newErrors.date = "Veuillez sélectionner une date.";
      if (!formData.time) newErrors.time = "Veuillez sélectionner une heure.";
      if (!formData.guests) newErrors.guests = "Veuillez sélectionner le nombre de personnes.";
    } else if (step === 2) {
      if (!formData.name || formData.name.length < 2) {
        newErrors.name = "Le nom doit contenir au moins 2 caractères.";
      }
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Veuillez entrer une adresse email valide.";
      }
      if (!formData.phone || formData.phone.length < 10) {
        newErrors.phone = "Veuillez entrer un numéro de téléphone valide.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const formatDateForApi = (date?: Date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < 4) {
      nextStep();
      return;
    }

    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Token utilisé :", accessToken);

      if (!accessToken) {
        alert("Vous devez être connecté pour effectuer une réservation.");
        return;
      }

      const requestData = {
        ...formData,
        date: formatDateForApi(formData.date),
      };

      console.log("Données envoyées :", requestData);

      const response = await fetch("http://localhost:8000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log("Réponse de l'API :", response);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur de l'API :", errorText);
        throw new Error("Erreur lors de la réservation");
      }

      setFormData({
        date: undefined,
        time: "",
        guests: "",
        name: "",
        email: email || "",
        phone: "",
        specialRequests: "",
        seatingPreference: "indifferent",
        occasion: "Aucune occasion spéciale",
      });
      setCurrentStep(1);

      alert(`Réservation confirmée pour le ${formatDate(formData.date!)} à ${formData.time}`);
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Un problème est survenu lors de la réservation. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/pic20.jpg')",
      }}
    >
      <Card className="border-none shadow-lg bg-white/90 max-w-5xl w-full">
        <CardContent className="p-10 md:p-16">
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, i) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 
                      ${currentStep >= step.id ? "bg-primary text-white" : "text-gray-400"}`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Sélectionnez la date et l'heure</h2>
                  <p className="text-muted-foreground">Choisissez le moment qui vous convient le mieux</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal border-muted-foreground/20",
                          !formData.date && "text-muted-foreground",
                          errors.date && "border-red-500",
                        )}
                      >
                        {formData.date ? formatDate(formData.date) : <span>Choisir une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date: string | Date) => handleInputChange("date", date)}
                        disabled={(date: Date) => date.getTime() < new Date().getTime()}
                        initialFocus
                        required
                      />

                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="time">Heure</Label>
                    <Select onValueChange={(value) => handleInputChange("time", value)} value={formData.time}>
                      <SelectTrigger
                        id="time"
                        className={cn("border-muted-foreground/20", errors.time && "border-red-500")}
                      >
                        <SelectValue placeholder="Sélectionner">
                          {formData.time ? formData.time : <span className="text-muted-foreground">Heure</span>}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Nombre de personnes</Label>
                    <Select onValueChange={(value) => handleInputChange("guests", value)} value={formData.guests}>
                      <SelectTrigger
                        id="guests"
                        className={cn("border-muted-foreground/20", errors.guests && "border-red-500")}
                      >
                        <SelectValue placeholder="Sélectionner">
                          {formData.guests ? (
                            `${formData.guests} personne${Number.parseInt(formData.guests) > 1 ? "s" : ""}`
                          ) : (
                            <span className="text-muted-foreground">Nombre de personnes</span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} personne{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.guests && <p className="text-sm text-red-500">{errors.guests}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Vos informations personnelles</h2>
                  <p className="text-muted-foreground">
                    Nous avons besoin de ces informations pour confirmer votre réservation
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={cn("border-muted-foreground/20", errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={cn("border-muted-foreground/20", errors.email && "border-red-500")}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={cn("border-muted-foreground/20", errors.phone && "border-red-500")}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Informations additionnelles</h2>
                  <p className="text-muted-foreground">
                    Ces détails nous aideront à rendre votre expérience plus agréable
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Préférence de placement</Label>
                  <RadioGroup
                    value={formData.seatingPreference}
                    onValueChange={(value) => handleInputChange("seatingPreference", value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="interieur" id="interieur" />
                      <Label htmlFor="interieur" className="font-normal">
                        Intérieur
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="exterieur" id="exterieur" />
                      <Label htmlFor="exterieur" className="font-normal">
                        Terrasse / Extérieur
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="indifferent" id="indifferent" />
                      <Label htmlFor="indifferent" className="font-normal">
                        Indifférent
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occasion">Occasion</Label>
                  <Select onValueChange={(value) => handleInputChange("occasion", value)} value={formData.occasion}>
                    <SelectTrigger id="occasion" className="border-muted-foreground/20">
                      <SelectValue placeholder="Sélectionner une occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map((occasion) => (
                        <SelectItem key={occasion} value={occasion}>
                          {occasion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Allergies, préférences alimentaires, etc."
                    className="resize-none border-muted-foreground/20 min-h-[100px]"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Confirmation de votre réservation</h2>
                  <p className="text-muted-foreground">Veuillez vérifier les détails de votre réservation</p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                      <p>{formData.date ? formatDate(formData.date) : "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Heure</h3>
                      <p>{formData.time || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Personnes</h3>
                      <p>
                        {formData.guests
                          ? `${formData.guests} personne${Number.parseInt(formData.guests) > 1 ? "s" : ""}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Placement</h3>
                      <p>
                        {formData.seatingPreference === "interieur"
                          ? "Intérieur"
                          : formData.seatingPreference === "exterieur"
                            ? "Extérieur"
                            : "Indifférent"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Informations personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nom</p>
                        <p>{formData.name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{formData.email || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p>{formData.phone || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {(formData.occasion !== "Aucune occasion spéciale" || formData.specialRequests) && (
                    <div className="pt-4 border-t border-border/30">
                      {formData.occasion !== "Aucune occasion spéciale" && (
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Occasion</h3>
                          <p>{formData.occasion}</p>
                        </div>
                      )}

                      {formData.specialRequests && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Demandes spéciales</h3>
                          <p>{formData.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    En confirmant cette réservation, vous acceptez nos conditions générales et notre politique de
                    confidentialité.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Retour
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                type={currentStep < 4 ? "button" : "submit"}
                onClick={currentStep < 4 ? nextStep : undefined}
                disabled={isSubmitting}
                className={`${currentStep < 4 ? "bg-gradient-to-r from-[#e1e14d] to-[#7C4B3C]" : "bg-gray-400"
                  } text-white font-bold py-2 px-4 rounded transition-all duration-300`}
              >
                {currentStep < 4 ? "Continuer" : isSubmitting ? "Traitement en cours..." : "Confirmer la réservation"}
              </Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

