"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { type Plat, createPlat, uploadPlatImage } from "@/lib/services/plats-service"

export default function AjouterPlatPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const [formData, setFormData] = useState<Plat>({
    nom: "",
    description: "",
    prix: 0,
    categorie: "plats-principaux",
    disponible: true,
    allergenes: "",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const resetImageInput = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Valdt
      if (!formData.nom || !formData.prix) {
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: "Veuillez remplir tous les champs obligatoires.",
        })
        setIsSubmitting(false)
        return
      }

      console.log("Envoi des données:", formData)

      
      const newPlat = await createPlat(formData)
      console.log("Plat créé:", newPlat)

    
      if (imageFile && newPlat.plat_id) {
        console.log("Téléchargement de l'image pour le plat ID:", newPlat.plat_id)
        await uploadPlatImage(newPlat.plat_id, imageFile)
        console.log("Image téléchargée avec succès")
      }

      toast({
        variant: "success",
        title: "Plat ajouté",
        description: "Le plat a été ajouté avec succès au menu.",
      })

      router.push("/dashboard/plats")
    } catch (error) {
      console.error("Erreur complète:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du plat. Vérifiez la console pour plus de détails.",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/plats">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Ajouter un Plat</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Détails du Plat</TabsTrigger>
          <TabsTrigger value="options">Options & Prix</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Informations Générales</CardTitle>
                <CardDescription>Entrez les détails de base du plat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom du Plat</Label>
                    <Input
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      placeholder="Ex: Tajine d'Agneau aux Pruneaux"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select
                      value={formData.categorie}
                      onValueChange={(value) => handleSelectChange("categorie", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entrees">Entrées</SelectItem>
                        <SelectItem value="plats-principaux">Plats Principaux</SelectItem>
                        <SelectItem value="desserts">Desserts</SelectItem>
                        <SelectItem value="boissons">Boissons</SelectItem>
                        <SelectItem value="accompagnements">Accompagnements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez le plat, sa préparation et ses saveurs..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image du Plat</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-md border border-dashed">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Aperçu"
                            className="h-full w-full rounded-md object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                            onClick={resetImageInput}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center">
                          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                          <div className="text-xs text-muted-foreground">
                            <label htmlFor="image" className="cursor-pointer text-primary hover:underline">
                              Cliquez pour télécharger
                            </label>
                            <input
                              id="image"
                              ref={fileInputRef}
                              type="file"
                              className="sr-only"
                              accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Format recommandé: JPG, PNG</p>
                      <p>Taille maximale: 2MB</p>
                      <p>Résolution idéale: 800x600px</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="options">
            <Card>
              <CardHeader>
                <CardTitle>Options & Prix</CardTitle>
                <CardDescription>Définissez les prix et options disponibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prix">Prix (DH)</Label>
                    <Input
                      id="prix"
                      name="prix"
                      value={formData.prix || ""}
                      onChange={handleNumberInputChange}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Ex: 18.50"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="disponible"
                    checked={formData.disponible}
                    onCheckedChange={(checked) => handleSwitchChange("disponible", checked)}
                  />
                  <Label htmlFor="disponible">Disponible à la vente</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/dashboard/plats")}>
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enregistrement..." : "Enregistrer le plat"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

