"use client"

import type React from "react"

import { useState, useEffect, useRef, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { type Plat, getPlatById, updatePlat, uploadPlatImage } from "@/lib/services/plats-service"

export default function ModifierPlatPage({ params: pageParams }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const params = use(pageParams)
  const { toast } = useToast()
  const [platId, setPlatId] = useState<number | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<Plat>({
    nom: "",
    description: "",
    prix: 0,
    categorie: "plats-principaux",
    disponible: true,
    allergenes: "",
  })

  useEffect(() => {
    const getIdFromStorage = () => {
      try {
        const idFromUrl = params.id
        if (idFromUrl && !isNaN(Number(idFromUrl))) {
          setPlatId(Number(idFromUrl))
          return
        }

        if (typeof window !== "undefined") {
          const storedId = localStorage.getItem("platToEdit")
          if (storedId && !isNaN(Number(storedId))) {
            setPlatId(Number(storedId))
            return
          }
        }

        setError("Aucun plat sélectionné pour modification.")
        setTimeout(() => {
          router.push("/dashboard/plats")
        }, 2000)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID:", error)
        setError("Impossible de récupérer les informations du plat.")
        setTimeout(() => {
          router.push("/dashboard/plats")
        }, 2000)
      }
    }

    const timer = setTimeout(getIdFromStorage, 100)
    return () => clearTimeout(timer)
  }, [router, toast])

  useEffect(() => {
    const fetchPlat = async () => {
      if (!platId) return

      try {
        setIsLoading(true)
        const data = await getPlatById(platId)
        setFormData(data)

        if (data.image) {
          setImagePreview(`data:image/jpeg;base64,${data.image}`)
        }
      } catch (error) {
        console.error("Erreur:", error)
        setError("Le plat demandé n'existe pas ou a été supprimé.")
        setTimeout(() => {
          router.push("/dashboard/plats")
        }, 2000)
      } finally {
        setIsLoading(false)
      }
    }

    if (platId) {
      fetchPlat()
    }
  }, [platId, router])

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

  const compressAndUploadImage = async (platId: number, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string

        img.onload = () => {
          const canvas = document.createElement("canvas")
          const MAX_WIDTH = 800
          const MAX_HEIGHT = 600
          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext("2d")
          ctx?.drawImage(img, 0, 0, width, height)

          // Convertir JPEG avec compresde qlt 70%
          canvas.toBlob(
            async (blob) => {
              if (!blob) {
                reject(new Error("Échec de compression de l'image"))
                return
              }

              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })

              try {
                await uploadPlatImage(platId, compressedFile)
                resolve()
              } catch (error) {
                reject(error)
              }
            },
            "image/jpeg",
            0.7,
          )
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!platId) return

    setIsSubmitting(true)

    try {
      //vldt
      if (!formData.nom || !formData.prix) {
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: "Veuillez remplir tous les champs obligatoires.",
        })
        setIsSubmitting(false)
        return
      }

      console.log(`Mise à jour du plat ${platId} avec les données:`, formData)

      // donner env
      const dataToUpdate = {
        nom: formData.nom,
        description: formData.description,
        prix: formData.prix,
        categorie: formData.categorie,
        disponible: formData.disponible,
        allergenes: formData.allergenes || "",
      }

      await updatePlat(platId, dataToUpdate)


      if (imageFile) {
        try {
          if (imageFile.size > 1 * 1024 * 1024) {
            throw new Error("L'image est trop volumineuse (maximum 1MB)")
          }

          if (!["image/jpeg", "image/png", "image/jpg"].includes(imageFile.type)) {
            throw new Error("Format d'image non supporté. Utilisez JPG ou PNG")
          }

          await compressAndUploadImage(platId, imageFile)
          console.log("Image téléchargée avec succès")
        } catch (error) {
          console.error("Erreur lors du téléchargement de l'image:", error)
          const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"

          toast({
            variant: "destructive",
            title: "⚠️ Attention",
            description: `Le plat a été mis à jour, mais l'image n'a pas pu être téléchargée. ${errorMessage}`,
          })
        }
      }

      toast({
        variant: "success",
        title: "✅ Succès",
        description: "Le plat a été mis à jour avec succès.",
      })

      try {
        if (typeof window !== "undefined") {
          localStorage.removeItem("platToEdit")
        }
      } catch (e) {
        console.error("Erreur lors du nettoyage du localStorage:", e)
      }

      setTimeout(() => {
        router.push(`/dashboard/plats/${platId}`)
      }, 500)
    } catch (error) {
      console.error("Erreur complète:", error)
      toast({
        variant: "destructive",
        title: "Erreur de mise à jour",
        description: "Une erreur est survenue lors de la mise à jour du plat. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/plats">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Modifier le Plat</h1>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Button onClick={() => router.push("/dashboard/plats")}>Retour à la liste des plats</Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
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
        <h1 className="text-3xl font-bold">Modifier le Plat</h1>
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
                <CardDescription>Modifiez les détails de base du plat</CardDescription>
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
                              accept="image/*"
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
                <CardDescription>Modifiez les prix et options disponibles</CardDescription>
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
                  {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}

