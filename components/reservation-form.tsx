"use client"

import { useState } from "react"
// @ts-ignore
import { useForm } from "react-hook-form"
import { z } from "zod"
// @ts-ignore
import { format } from "date-fns"
import { CalendarIcon, Search, User, FileText, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  date: z.date({
    required_error: "Veuillez sélectionner une date.",
  }),
  time: z.string({
    required_error: "Veuillez sélectionner une heure.",
  }),
  guests: z.string().min(1, {
    message: "Veuillez sélectionner le nombre de personnes.",
  }),
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  specialRequests: z.string().optional(),
  seatingPreference: z
    .enum(["interieur", "exterieur", "indifferent"], {
      required_error: "Veuillez sélectionner une préférence.",
    })
    .optional()
    .default("indifferent"),
  occasion: z.string().optional(),
})

const timeSlots = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

const occasions = [
  "Aucune occasion spéciale",
  "Anniversaire",
  "Anniversaire de mariage",
  "Fiançailles",
  "Rendez-vous professionnel",
  "Autre",
]

export default function ReservationForm({ apiUrl }: { apiUrl: string }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // @ts-ignore
  const form = useForm({
    defaultValues: {
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
        seatingPreference: "indifferent",
        occasion: "Aucune occasion spéciale",
        date: "",
        time: "",
        guests: "",
    },
  })

  const steps = [
    { id: 1, name: "Rechercher", icon: Search },
    { id: 2, name: "Information", icon: User },
    { id: 3, name: "Additionnel", icon: FileText },
    { id: 4, name: "Confirmation", icon: CheckCircle },
  ]

  const nextStep = async () => {
    let isValid = true

    if (currentStep === 1) {
      isValid = await form.trigger(["date", "time", "guests"])
    } else if (currentStep === 2) {
      isValid = await form.trigger(["name", "email", "phone"])
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // @ts-ignore
  async function onSubmit(values) {
    if (currentStep < 4) {
      nextStep()
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          date: format(values.date, "yyyy-MM-dd"),
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la réservation")
      }

      const data = await response.json()

      toast({
        title: "Réservation confirmée",
        description: `Votre réservation pour le ${formatDate(values.date)} à ${values.time} a été confirmée.`,
        variant: "default",
      })

      // Reset form and go back to step 1
      form.reset()
      setCurrentStep(1)
    } catch (error) {
      console.error("Reservation error:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de la réservation. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // @ts-ignore
  const formatDate = (date) => {
    if (!date) return ""
    return format(date, "d MMMM yyyy")
  }

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6 md:p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 
                    ${
                      currentStep >= step.id ? "border-primary bg-primary text-white" : "border-gray-300 text-gray-400"
                    }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {/* <div className="text-xs text-center font-medium">{step.name}</div>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute h-[2px] w-[calc(25%-2rem)] bg-gray-200 top-[2.25rem] left-[calc(12.5%+1rem+10px*i)]">
                    <div
                      className={`h-full bg-primary transition-all duration-500 ${
                        currentStep > step.id ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Search */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Sélectionnez la date et l'heure</h2>
                  <p className="text-muted-foreground">Choisissez le moment qui vous convient le mieux</p>
                </div>

                <FormField
                  control={form.control}
                  name="date"
                  // @ts-ignore
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal border-muted-foreground/20",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? formatDate(field.value) : <span>Choisir une date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                      mode="single"
                                      selected={field.value ? new Date(field.value) : undefined} // Convert to Date if it's a string
                                      onSelect={field.onChange}
                                      disabled={(date) => date instanceof Date && date < new Date()}
                                      initialFocus
                                  />

                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="time"
                    // @ts-ignore
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-muted-foreground/20">
                              <SelectValue placeholder="Sélectionner">
                                {field.value ? field.value : <span className="text-muted-foreground">Heure</span>}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guests"
                    // @ts-ignore
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de personnes</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-muted-foreground/20">
                              <SelectValue placeholder="Sélectionner">
                                {field.value ? (
                                  `${field.value} personne${Number.parseInt(field.value) > 1 ? "s" : ""}`
                                ) : (
                                  <span className="text-muted-foreground">Nombre de personnes</span>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} personne{num > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Vos informations personnelles</h2>
                  <p className="text-muted-foreground">
                    Nous avons besoin de ces informations pour confirmer votre réservation
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  // @ts-ignore
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} className="border-muted-foreground/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    // @ts-ignore
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            {...field}
                            className="border-muted-foreground/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    // @ts-ignore
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} className="border-muted-foreground/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Additional */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-medium mb-2">Informations additionnelles</h2>
                  <p className="text-muted-foreground">
                    Ces détails nous aideront à rendre votre expérience plus agréable
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="seatingPreference"
                  // @ts-ignore
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Préférence de placement</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="interieur" />
                            </FormControl>
                            <FormLabel className="font-normal">Intérieur</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="exterieur" />
                            </FormControl>
                            <FormLabel className="font-normal">Terrasse / Extérieur</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="indifferent" />
                            </FormControl>
                            <FormLabel className="font-normal">Indifférent</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occasion"
                  // @ts-ignore
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-muted-foreground/20">
                            <SelectValue placeholder="Sélectionner une occasion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occasions.map((occasion) => (
                            <SelectItem key={occasion} value={occasion}>
                              {occasion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  // @ts-ignore
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demandes spéciales (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Allergies, préférences alimentaires, etc."
                          className="resize-none border-muted-foreground/20 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Confirmation */}
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
                      <p>{form.getValues("date") ? formatDate(form.getValues("date")) : "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Heure</h3>
                      <p>{form.getValues("time") || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Personnes</h3>
                      <p>
                        {form.getValues("guests")
                          ? `${form.getValues("guests")} personne${Number.parseInt(form.getValues("guests") || "1") > 1 ? "s" : ""}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Placement</h3>
                      <p>
                        {form.getValues("seatingPreference") === "interieur"
                          ? "Intérieur"
                          : form.getValues("seatingPreference") === "exterieur"
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
                        <p>{form.getValues("name") || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{form.getValues("email") || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p>{form.getValues("phone") || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {(form.getValues("occasion") !== "Aucune occasion spéciale" || form.getValues("specialRequests")) && (
                    <div className="pt-4 border-t border-border/30">
                      {form.getValues("occasion") !== "Aucune occasion spéciale" && (
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Occasion</h3>
                          <p>{form.getValues("occasion")}</p>
                        </div>
                      )}

                      {form.getValues("specialRequests") && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Demandes spéciales</h3>
                          <p>{form.getValues("specialRequests")}</p>
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

            {/* Navigation Buttons */}
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
              >
                {currentStep < 4 ? "Continuer" : isSubmitting ? "Traitement en cours..." : "Confirmer la réservation"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

