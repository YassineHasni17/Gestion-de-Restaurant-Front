"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { type Plat, getPlatById, deletePlat } from "@/lib/services/plats-service"

export default function DetailPlatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const platId = Number(id)

  const router = useRouter()
  const { toast } = useToast()
  const [plat, setPlat] = useState<Plat | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Recup les  plat
  useEffect(() => {
    console.log(platId)
    const fetchPlat = async () => {
      // verf id
      if (!platId || isNaN(platId)) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "ID de plat invalide.",
        })
        router.push("/dashboard/plats")
        return
      }

      try {
        setIsLoading(true)
        const data = await getPlatById(platId)
        console.log(data)
        setPlat(data)
      } catch (error) {
        console.error("Erreur:", error)
        toast({
          variant: "destructive",
          title: "Plat non trouvé",
          description: "Le plat demandé n'existe pas ou a été supprimé.",
        })
        router.push("/dashboard/plats")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlat()
  }, [platId, router, toast])

  // supp
  const handleDelete = async () => {
    if (!plat?.plat_id) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'identifier le plat à supprimer.",
      })
      return
    }

    try {
      setIsDeleting(true)
      console.log(`Tentative de suppression du plat ${plat.plat_id}`)

      await deletePlat(plat.plat_id)

      toast({
        variant: "success",
        title: "Plat supprimé",
        description: "Le plat a été supprimé avec succès.",
      })

    
      router.push("/dashboard/plats")
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      toast({
        variant: "destructive",
        title: "Erreur de suppression",
        description: "Impossible de supprimer le plat. Vérifiez la console pour plus de détails.",
      })
    } finally {
      setIsDeleting(false)
      setOpenDialog(false)
    }
  }

  // Fonction pour convertir l'image base64 en URL
  const getImageUrl = (image?: string) => {
    if (!image) return "/placeholder.svg?height=300&width=300"
    return `data:image/jpeg;base64,${image}`
  }

  // la categorie des plt
  const formatCategorie = (categorie: string) => {
    const categories: Record<string, string> = {
      "plats-principaux": "Plats Principaux",
      entrees: "Entrées",
      desserts: "Desserts",
      boissons: "Boissons",
      accompagnements: "Accompagnements",
    }
    return categories[categorie] || categorie
  }

  

  if (!plat) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Plat non trouvé</h2>
        <p className="text-muted-foreground">Le plat demandé n'existe pas ou a été supprimé.</p>
        <Link href="/dashboard/plats">
          <Button>Retour à la liste des plats</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/plats">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{plat.nom}</h1>
          <Badge
            variant="outline"
            className={plat.disponible ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
          >
            {plat.disponible ? "Disponible" : "Indisponible"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer ce plat ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)} disabled={isDeleting}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="aspect-square overflow-hidden rounded-md">
              <img
                src={getImageUrl(plat.image) || "/placeholder.svg"}
                alt={plat.nom}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Prix:</span>
                <span className="text-xl font-bold">{plat.prix?.toFixed(2)} DH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Catégorie:</span>
                <span>{formatCategorie(plat.categorie)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Disponibilité:</span>
                <Badge
                  variant="outline"
                  className={plat.disponible ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}
                >
                  {plat.disponible ? "Disponible" : "Indisponible"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  {plat.description ? (
                    <p>{plat.description}</p>
                  ) : (
                    <p className="text-muted-foreground">Aucune description disponible.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

