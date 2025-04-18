"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [telephone, setTelephone] = useState("")
  const [adresse, setAdresse] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, telephone, adresse }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erreur de connexion au serveur")
      }

      router.push("/authen")
    } catch (error: any) {
      setError(error.message || "Une erreur inconnue s'est produite.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <Image src="/pic12.jpg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Card className="relative z-10 w-full max-w-xl shadow-xl border-none bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
          <CardDescription className="text-center">Entrez vos informations pour créer votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom complet"
                required
                className="focus-visible:ring-[#7C4B3C]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                required
                className="focus-visible:ring-[#7C4B3C]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="focus-visible:ring-[#7C4B3C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="Votre adresse"
                  required
                  className="focus-visible:ring-[#7C4B3C]"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] hover:opacity-90 transition-opacity text-white"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Veuillez patienter...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>

          <div className="text-center text-sm">
            Vous avez déjà un compte?{" "}
            <Link href="/authen" className="font-medium relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] bg-clip-text text-transparent hover:underline">
                Connectez-vous ici
              </span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

