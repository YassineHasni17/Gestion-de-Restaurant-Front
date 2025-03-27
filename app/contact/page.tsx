"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const response = await axios.post("http://localhost:8000/contact", formData)
      setFormStatus({
        type: "success",
        message: "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
      })
      setFormData({ firstName: "", lastName: "", email: "", message: "" })
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error)
      setFormStatus({
        type: "error",
        message: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <Image src="/pic14.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <Card className="relative z-10 w-full max-w-md border-none shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Contactez-nous</CardTitle>
          <CardDescription className="text-center">
            Nous sommes à votre écoute. Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {formStatus.type && (
            <Alert
              className={`mb-6 ${
                formStatus.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-destructive/10 text-destructive border-destructive/20"
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                className="focus-visible:ring-[#7C4B3C]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message ici..."
                required
                className="min-h-[120px] focus-visible:ring-[#7C4B3C]"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() =>
              document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
            }
            className="w-full bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Contact

