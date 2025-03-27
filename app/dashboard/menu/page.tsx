"use client"
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/services/api-config';
import { Plat } from '@/lib/services/plats-service';

const Menu = () => {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const data = await fetchApi<Plat[]>('/plats'); 
        setPlats(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue s'est produite.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlats();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Menu des Plats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plats.map((plat, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{plat.nom}</h2>
            <p className="text-gray-600">{plat.description}</p>
            <p className="text-lg font-bold mt-2">{plat.prix}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;