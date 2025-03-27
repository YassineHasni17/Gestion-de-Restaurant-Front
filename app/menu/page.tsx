"use client"; 
import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/services/api-config"; 
import { Plat } from "@/lib/services/plats-service"; 

const Menu = () => {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const data = await fetchApi<Plat[]>("/plats");
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

  if (loading) return <p className="text-center text-lg font-semibold text-[#7C4B3C]">Chargement...</p>;
  if (error) return <p className="text-center text-lg font-semibold text-red-500">Erreur: {error}</p>;
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url('/pic22.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 w-full p-12 bg-[#ffffff] text-[#7C4B3C] rounded-lg shadow-xl border-2 border-[#F5F5DC] font-[Amiri, serif] text-center">
        <div className="relative bg-[url('/pic22.jpg')] bg-cover bg-center h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <h1 className="relative text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] border-b-4 border-[#F5F5DC] pb-3 tracking-wide z-10">
            دار تسنيم
          </h1>
        </div>
        <h2 className="relative text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d] border-b-4 border-[#F5F5DC] pb-3 tracking-wide z-10">
          Menu
        </h2>
        <ul className="space-y-8">
          {plats.map((plat, index) => (
            <li key={index} className="border-b border-[#7C4B3C] pb-4 flex justify-between items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold text-[#7C4B3C]">{plat.nom}</h3>
                <p className="text-[#7C4B3C] italic text-lg">{plat.description}</p>
              </div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d]">{plat.prix} DH</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 p-4 bg-[#F5F5DC] text-[#7C4B3C] rounded-lg shadow-md">
          <p className="text-xl font-semibold">Nos menus sont disponibles au prix de <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#7C4B3C] to-[#e1e14d]">700 DH.</span></p>
          <p className="text-lg italic">Dans le respect de nos traditions, les boissons alcoolisées sont interdites dans notre établissement. Les autres boissons sont bien entendu disponibles pour accompagner vos repas.</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;