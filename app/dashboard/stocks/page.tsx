"use client";
import { useEffect, useState } from "react";
import { StockService } from "@/app/dashboard/services/StockService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

interface Stock {
  id: string;
  nomS: string;
  quantite: number;
  unite: string;
  categorie: string;
  niveau: string;
  disponibilite: string;
  action: string;
}

export default function StockListPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await StockService.getAll();
        setStocks(data);
        setError(null);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des stocks :", err);
        setError(err.message || "Une erreur est survenue lors de la récupération des stocks.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <div className="text-center p-4">Chargement...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
        <Link href="/dashboard/stocks/ajouter">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un Stock
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventaire</CardTitle>
          <CardDescription>Gérez les stocks d'ingrédients</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrédient</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock, index) => (
                <TableRow key={`${stock.id ?? index}-${stock.nomS}-${stock.categorie}`}>
                  <TableCell className="font-medium">{stock.nomS}</TableCell>
                  <TableCell>{stock.categorie}</TableCell>
                  <TableCell>
                    {stock.quantite} {stock.unite}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={parseInt(stock.niveau)} className="h-2 w-[100px]" />
                      <span className="text-xs text-muted-foreground">{stock.niveau}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {stock.action === "Disponible" ? (
                      <Badge className="bg-green-50 text-green-700">Disponible</Badge>
                    ) : (
                      <Badge className="bg-red-50 text-red-700">Indisponible</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}