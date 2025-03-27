"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StockService } from "@/app/dashboard/services/StockService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";


interface Stock {
  stock_id: string;
  nomS: string;
  categorie: string;
  quantite: number;
  unite: string;
  niveau: number;
  action: string;
}

export default function StockDetailPage() {
  const { id } = useParams();
  const stockId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stockId) {
      setLoading(true);
      StockService.getById(stockId)
        .then((data) => {
          setStock(data);
          setError(null);
        })
        .catch((err) => {
          setError("Erreur lors du chargement du stock");
          setStock(null);
        })
        .finally(() => setLoading(false));
    }
  }, [stockId]);

  if (loading) return <p className="text-center p-4">Chargement...</p>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!stock) return <div className="text-center p-4 text-red-500">Stock non trouvé</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/stocks">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{stock.nomS}</h1>
          <Badge
            variant="outline"
            className={
              stock.niveau > 50
                ? "bg-green-50 text-green-700"
                : stock.niveau > 20
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700"
            }
          >
            {stock.niveau > 50 ? "Suffisant" : stock.niveau > 20 ? "Bas" : "Critique"}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Niveau de stock actuel</h3>
            <div className="mt-2 flex items-center gap-2">
              <Progress value={stock.niveau} className="h-2 w-full" />
              <span className="text-sm font-medium">{stock.niveau}%</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Quantité: {stock.quantite} {stock.unite}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Catégorie:</span>
              <span>{stock.categorie}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Action:</span>
              <span>{stock.action}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
