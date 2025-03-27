"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { StockService } from "@/app/dashboard/services/StockService";

export default function AddStockPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    stock_id: "",
    quantite: 0,
    unite: "",
    nomS: "",
    categorie: "",
    niveau: 0, 
    action: "", 
  });


  const categories = ["Céréales", "Légumes", "Fruits", "Boissons", "Viandes", "Produits laitiers"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

  
    if (name === "quantite" || name === "niveau") {
      const numericValue = Math.max(0, Math.min(100, parseInt(value) || 0)); 
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  

    if (!formData.nomS || !formData.unite || formData.quantite <= 0 || formData.niveau < 0) {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires et valides.",
      });
      return;
    }
  
    try {
      await StockService.addStock({
        ...formData,
        niveau: formData.niveau.toString(), 
      });
      toast({
        variant: "success",
        title: "Stock ajouté",
        description: "Le stock a été ajouté avec succès.",
      });
      router.push("/dashboard/stocks");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du stock.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/stocks">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Ajouter un Stock</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations du Stock</CardTitle>
            <CardDescription>Ajoutez un nouveau stock à l'inventaire.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomS">Nom du Stock</Label>
                <Input 
                  id="nomS" 
                  name="nomS" 
                  value={formData.nomS} 
                  onChange={handleChange} 
                  placeholder="Ex: Riz" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select value={formData.categorie} onValueChange={(value) => setFormData({ ...formData, categorie: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((categorie) => (
                      <SelectItem key={categorie} value={categorie}>
                        {categorie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantite">Quantité</Label>
                <Input 
                  id="quantite" 
                  name="quantite" 
                  type="number" 
                  value={formData.quantite} 
                  onChange={handleChange} 
                  required 
                  max={100} 
                  min={0} 
                  placeholder="0 à 100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unite">Unité</Label>
                <Input 
                  id="unite" 
                  name="unite" 
                  value={formData.unite} 
                  onChange={handleChange} 
                  placeholder="Ex: kg" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="niveau">Niveau</Label>
              <Input 
                id="niveau" 
                name="niveau" 
                type="number" 
                value={formData.niveau} 
                onChange={handleChange} 
                placeholder="Ex: 50" 
                max={100} 
                min={0} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="action">Disponibilité</Label>
              <Select value={formData.action} onValueChange={(value) => setFormData({ ...formData, action: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la disponibilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Indisponible">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/stocks")}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}