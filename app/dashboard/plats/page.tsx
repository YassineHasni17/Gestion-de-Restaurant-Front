"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { type Plat, getAllPlats, deletePlat } from "@/lib/services/plats-service"

export default function PlatsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [plats, setPlats] = useState<Plat[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [platToDelete, setPlatToDelete] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Recup des plat
  const fetchPlats = async () => {
    try {
      setIsLoading(true)
      const data = await getAllPlats()
      setPlats(data)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les plats. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlats()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredPlats = plats.filter(
    (plat) =>
      plat.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plat.categorie.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: number | undefined) => {
    if (!id) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "ID de plat invalide.",
      })
      return
    }
    console.log(`Préparation à la suppression du plat ${id}`)
    setPlatToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (platToDelete) {
      try {
        console.log(`Confirmation de suppression du plat ${platToDelete}`)
        await deletePlat(platToDelete)

        // Metre a..les plt
        setPlats(plats.filter((plat) => plat.plat_id !== platToDelete))

        toast({
          variant: "success",
          title: "Plat supprimé",
          description: "Le plat a été supprimé avec succès.",
        })
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
        toast({
          variant: "destructive",
          title: "Erreur de suppression",
          description: "Impossible de supprimer le plat. Vérifiez la console pour plus de détails.",
        })
      }
      setIsDeleteDialogOpen(false)
    }
  }

  const getImageUrl = (image?: string) => {
    if (!image) return "/placeholder.svg?height=48&width=48"
    return `data:image/jpeg;base64,${image}`
  }

  // Foct pour la categorie
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

  // click modif
  const handleEditClick = (id: number | undefined) => {
    if (!id) return

    try {
      //  query params pour annult de localstorg
      router.push(`/dashboard/plats/modifier?id=${id}`)
    } catch (error) {
      console.error("Erreur lors de la redirection:", error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier ce plat. Veuillez réessayer.",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Plats</h1>
        <Link href="/dashboard/plats/ajouter">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un Plat
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Menu du Restaurant</CardTitle>
              <CardDescription>Gérez les plats, prix et disponibilité</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un plat..."
                  className="w-64 pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Nom du Plat</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucun plat trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlats.map((plat) => (
                    <TableRow key={plat.plat_id}>
                      <TableCell>
                        <img
                          src={getImageUrl(plat.image) || "/placeholder.svg"}
                          alt={plat.nom}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{plat.nom}</TableCell>
                      <TableCell>{formatCategorie(plat.categorie)}</TableCell>
                      <TableCell>{plat.prix?.toFixed(2)} DH</TableCell>
                      <TableCell>
                        {plat.disponible ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                          >
                            Disponible
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                          >
                            Indisponible
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={`/dashboard/plats/${plat.plat_id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir les détails
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/dashboard/plats/${plat.plat_id}/modifier`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem></Link>
                            <DropdownMenuItem onClick={() => handleDelete(plat.plat_id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce plat ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le plat sera définitivement supprimé du menu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

